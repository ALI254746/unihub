// app/api/clubs/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Token orqali foydalanuvchini olish
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
// ✅ GET - Barcha clublarni olish
export async function GET() {
  await connectDB();

  try {
    const clubs = await Club.find().sort({ createdAt: -1 }); // yangi yaratilganlar yuqorida bo‘ladi
    console.log("Barcha clublar:", clubs);
    return NextResponse.json(
      { message: "Barcha clublar olindi", data: clubs },
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

// ✅ POST - Yangi club yaratish (faqat admin)
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

    const newClub = await Club.create({
      fullname: body.fullname,
      name: body.name,
      interest: body.interests,
      createTime: body.createdAt,
      members: body.members || [], // ✅ a’zolarni qo‘shish
      description: body.description,

      userId: body.userId,
    });
    console.log("Yangi club yaratildi:", newClub);
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
