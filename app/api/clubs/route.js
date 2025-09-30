import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis"; // ✅ Redis clientini chaqiramiz
import User from "@/models/User"; // Eslatma: User modelini import qilishni unutmang

// 🔐 Token orqali foydalanuvchini olish
async function getUserFromToken() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("unihub_token")?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Token xatoligi:", err.message);
    return null;
  }
}

// ✅ GET - Barcha clublarni olish (Redis bilan)
export async function GET() {
  await connectDB();
  try {
    if (!redis.isOpen) await redis.connect();

    // 1️⃣ Avval redisdan tekshiramiz
    const cachedClubs = await redis.get("clubs:all");
    if (cachedClubs) {
      console.log("✅ Clublar Redisdan olindi");
      return NextResponse.json(
        { message: "Clublar Redisdan olindi", data: JSON.parse(cachedClubs) },
        { status: 200 }
      );
    }

    // 2️⃣ Agar Redisda yo‘q bo‘lsa, DB’dan olamiz
    const clubs = await Club.find().sort({ createdAt: -1 });
    console.log("📦 Clublar DB’dan olindi");

    // 3️⃣ Redisga saqlaymiz (10 daqiqa)
    await redis.setEx("clubs:all", 60 * 10, JSON.stringify(clubs));

    return NextResponse.json(
      { message: "Clublar DB’dan olindi", data: clubs },
      { status: 200 }
    );
  } catch (err) {
    console.error("Clublarni olishda xatolik:", err.message);
    return NextResponse.json(
      { message: "Serverda xatolik", error: err.message },
      { status: 500 }
    );
  }
}

// ✅ POST - Yangi club yaratish (Redis cache invalidation bilan)
export async function POST(req) {
  await connectDB();
  const user = await getUserFromToken();

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { message: "Faqat adminlar club yaratishi mumkin" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    // 🔍 1. Club egasi allaqachon club ochganmi – tekshiramiz
    const existingClub = await Club.findOne({ userId: body.userId });
    if (existingClub) {
      return NextResponse.json(
        { message: "Bu user allaqachon club ochgan" },
        { status: 400 }
      );
    }

    const newClub = await Club.create({
      fullname: body.fullname,
      name: body.name,
      interest: body.interests,
      createTime: body.createdAt,
      members: body.members || [],
      description: body.description,
      userId: body.userId,
    });

    console.log("🟢 Yangi club yaratildi:", newClub);
    // ✅ USER ROLE ni club-owner ga o‘zgartiramiz
    await User.findByIdAndUpdate(body.userId, { role: "club-owner" });
    console.log("🔄 User roli club-owner ga o‘zgartirildi");

    // 🔄 Redis cache’ni yangilash uchun o‘chiramiz
    if (!redis.isOpen) await redis.connect();
    await redis.del("clubs:all");
    console.log("🧹 Redisdagi 'clubs:all' cache tozalandi");

    return NextResponse.json(
      { message: "Club yaratildi", data: newClub },
      { status: 201 }
    );
  } catch (err) {
    console.error("Club yaratishda xatolik:", err.message);
    return NextResponse.json(
      { message: "Serverda xatolik", error: err.message },
      { status: 500 }
    );
  }
}
