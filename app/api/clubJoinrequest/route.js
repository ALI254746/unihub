import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ClubJoinRequest from "@/models/Clubjoin";
import Club from "@/models/club"; // 🔑 Club modelini import qiling
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await connectDB();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Token yo'q" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    console.log("🔓 Foydalanuvchi IDsi (userId):", userId);
    const body = await req.json();
    console.log("📨 Keldi body:", body);
    // ✅ 1. Klubni topamiz clubId orqali
    const club = await Club.findById(body.clubId);
    if (!club) {
      console.log("🚫 Club topilmadi:", body.clubId);
      return NextResponse.json({ message: "Club topilmadi" }, { status: 404 });
    }
    console.log("🏠 Topilgan club:", club.name, "| ownerId:", club.userId);
    // ✅ 2. Klub egasining userId sini olish
    const ownerId = club.userId;

    // ✅ 3. So‘rov hujjatini yaratish
    const newRequest = await ClubJoinRequest.create({
      userId,
      clubId: body.clubId,
      clubName: body.clubName,
      firstName: body.firstName,
      lastName: body.lastName,
      direction: body.direction,
      course: body.course,
      phone: body.phone,
      reason: body.reason,
      ownerId, // 🔥 MUHIM: egasining ID si shu yerda saqlanadi
    });
    console.log("✅ So‘rov yaratildi:", newRequest);
    return NextResponse.json(
      { message: "So‘rov yuborildi", data: newRequest },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ So‘rovda xatolik:", err.message);
    return NextResponse.json(
      { message: "Server xatoligi", error: err.message },
      { status: 500 }
    );
  }
}
