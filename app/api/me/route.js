import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("unihub_token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userId = payload.userId;

    // 🔴 Redis orqali user ma'lumotini olib kelamiz
    if (!redis.isOpen) await redis.connect();

    const cachedUser = await redis.get(`user:${userId}`);
    if (cachedUser) {
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

    // ⚠️ Agar Redis’da topilmasa, faqat JWT payload’dan minimal ma’lumot qaytariladi
    return NextResponse.json({
      isLoggedIn: true,
      user: {
        email: payload.email,
        role: payload.role,
      },
    });
  } catch (err) {
    console.error("Token tekshirish xatosi:", err);
    return NextResponse.json({ isLoggedIn: false });
  }
}
