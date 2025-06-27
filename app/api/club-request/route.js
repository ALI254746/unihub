// app/api/club-request/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import ClubRequest from "@/models/ClubRequest";

// ✅ Cookie orqali userni olish (sinxron)
async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;
    console.log("🍪 Cookie token:", token);
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Token xatoligi:", err.message);
    return null;
  }
}

// ✅ GET - barcha klub so‘rovlarini olish (admin uchun)
export async function GET() {
  await connectDB();

  const user = await getUserFromToken();
  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { message: "Faqat admin foydalanuvchilar uchun ruxsat etilgan" },
      { status: 403 }
    );
  }

  try {
    const requests = await ClubRequest.find().sort({ createdAt: -1 });
    console.log("Barcha klub so‘rovlari:", requests); // ✅ log avval
    return NextResponse.json(requests); // keyin return
  } catch (err) {
    return NextResponse.json(
      { message: "Xatolik", error: err.message },
      { status: 500 }
    );
  }
}

// ✅ POST - Yangi klub ochish so‘rovi yuborish
export async function POST(req) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user?.userId) {
    return NextResponse.json(
      { message: "Token noto‘g‘ri yoki mavjud emas" },
      { status: 401 }
    );
  }

  const body = await req.json();

  try {
    const newClubRequest = await ClubRequest.create({
      ...body,
      userId: user.userId,
    });

    return NextResponse.json(
      { message: "Yangi klub ochish so‘rovi saqlandi", data: newClubRequest },
      { status: 201 }
    );
  } catch (err) {
    console.error("Yaratishda xatolik:", err.message);
    return NextResponse.json(
      { message: "Xatolik yuz berdi", error: err.message },
      { status: 500 }
    );
  }
}
