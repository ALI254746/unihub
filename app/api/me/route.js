//api/me/route.js
// Bu API foydalanuvchi ma'lumotlarini olish uchun ishlatiladi
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";
export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) {
      console.log("❌ Token yuborilmadi (localStorage)");
      return NextResponse.json({ isLoggedIn: false });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userId = payload.userId;

    if (!redis.isOpen) await redis.connect();

    const cachedUser = await redis.get(`user:${userId}`);
    if (cachedUser) {
      console.log("✅ Redisdan olindi (POST):", userId);
      const parsed = JSON.parse(cachedUser);
      return NextResponse.json({
        isLoggedIn: true,
        user: {
          email: parsed.email,
          firstName: parsed.firstName,
          lastName: parsed.lastName,
          role: parsed.role,
        },
      });
    }

    console.log("⚠️ Redisda topilmadi (POST), JWTdan qaytaryapmiz:", userId);
    return NextResponse.json({
      isLoggedIn: true,
      user: {
        email: payload.email,
        role: payload.role,
      },
    });
  } catch (err) {
    console.error("❌ Token tekshirish xatosi (POST):", err);
    return NextResponse.json({ isLoggedIn: false });
  }
}
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;

    if (!token) {
      console.log("❌ Cookie token topilmadi (GET)");
      return NextResponse.json({ isLoggedIn: false });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userId = payload.userId;

    if (!redis.isOpen) await redis.connect();

    const cachedUser = await redis.get(`user:${userId}`);
    if (cachedUser) {
      const parsed = JSON.parse(cachedUser);
      console.log("📌 Redisdan o‘qilgan role:", parsed.role); // ✅
      return NextResponse.json({
        isLoggedIn: true,
        userId,
        user: {
          email: parsed.email,
          firstName: parsed.firstName,
          lastName: parsed.lastName,
          role: parsed.role,
        },
      });
    }
    console.log("📌 JWT’dan o‘qilgan role:", payload.role); // ✅
    // Redisda topilmasa JWT'dan
    return NextResponse.json({
      isLoggedIn: true,
      userId,
      user: {
        email: payload.email,
        role: payload.role,
      },
    });
  } catch (err) {
    console.error("❌ Token tekshirish xatosi (GET):", err);
    return NextResponse.json({ isLoggedIn: false });
  }
}
