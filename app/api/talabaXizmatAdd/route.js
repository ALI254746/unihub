import { connectDB } from "@/lib/mongodb";
import TalabaXizmati from "@/models/talabaxizmatlari";
import { NextResponse } from "next/server";
import User from "@/models/User"; // 🔑 MUHIM
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import redis from "@/lib/redis"; // 🟥 Redisni chaqiramiz
async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token").value;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log("token xatoligi:", err.massege);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Token orqali foydalanuvchini aniqlaymiz (ixtiyoriy)
    const user = await getUserFromToken(); // foydalanuvchi ID olinsin

    const newXizmat = await TalabaXizmati.create({
      fan: body.Fan,
      xizmatTuri: body.service,
      narxi: body.Narx,
      telegramHavola: body.telegram,
      description: body.description,
      kurs: body.Kurs,
      user: user.userId, // foydalanuvchi ID
      status: "pending", // 👈 bu yerda
    });
    // ✅ Redis: eski cache'ni tozalaymiz
    await redis.del("talaba-xizmatlar");

    return NextResponse.json(newXizmat, { status: 201 });
  } catch (error) {
    console.error("Xizmat yaratishda xatolik:", error);
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}
