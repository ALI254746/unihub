import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import TalabaXizmati from "@/models/talabaxizmatlari";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis"; // Redis client importi

// 🟡 Token orqali foydalanuvchini olish
async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log("token xatoligi:", err.message);
    return null;
  }
}

// 🟢 O‘rtacha bahoni hisoblash (Bayesian formula)
function bayesianAverage(ratings, globalAvg = 3.0, m = 5) {
  if (!ratings.length) return globalAvg;

  const n = ratings.length;
  const avg = ratings.reduce((acc, r) => acc + r.value, 0) / n;

  return +((n / (n + m)) * avg + (m / (n + m)) * globalAvg).toFixed(1);
}

// ✅ Yagona GET funksiyasi
export async function GET() {
  try {
    await connectDB();
    const user = await getUserFromToken();

    // 🟥 1. Redis dan tekshiramiz
    const cached = await redis.get("xizmatlar:approved");

    if (cached) {
      const parsed = JSON.parse(cached);

      // Har bir xizmatga userning reytingini qo‘shish
      const withUserRating = parsed.map((x) => {
        const myRating = x.ratings?.find((r) => r.user === user?.userId)?.value;

        return {
          ...x,
          myRating: myRating || null,
        };
      });

      return NextResponse.json({ data: withUserRating }, { status: 200 });
    }

    // 🟦 2. Agar Redisda bo‘lmasa — MongoDB’dan olamiz
    const xizmatlar = await TalabaXizmati.find({ status: "approved" })
      .populate("user")
      .lean();

    const withRank = xizmatlar.map((x) => {
      const avg = bayesianAverage(x.ratings || []);

      return {
        ...x,
        rank: avg,
        ratings: x.ratings.map((r) => ({
          user: r.user.toString(),
          value: r.value,
        })), // faqat kerakli ma'lumot qoldiramiz
      };
    });

    // 🟩 3. Redisga cache qilib qo‘yamiz
    await redis.set("xizmatlar:approved", JSON.stringify(withRank), "EX", 300); // 5 daqiqa

    // 🟨 4. Foydalanuvchining reytingini qo‘shib, frontendga qaytaramiz
    const withUserRating = withRank.map((x) => {
      const myRating = x.ratings?.find((r) => r.user === user?.userId)?.value;

      return {
        ...x,
        myRating: myRating || null,
      };
    });

    return NextResponse.json({ data: withUserRating }, { status: 200 });
  } catch (err) {
    console.error("Xizmatlarni olishda xatolik:", err);
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}
