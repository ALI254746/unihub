import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // <-- Next.js 13+ cookies olish
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    // 🍪 Cookie’dan token olish
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token topilmadi" }, { status: 401 });
    }

    // 🔑 Tokenni decode qilish
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Token noto‘g‘ri yoki muddati tugagan" },
        { status: 401 }
      );
    }

    // 👤 Foydalanuvchini bazadan topish
    const user = await User.findById(decoded.userId);
    console.log("👤 Sessiyadan olingan user:", user);
    if (!user) {
      return NextResponse.json(
        { message: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    // 📌 Faqat owner bo‘lgan klublarni olish
    const clubs = await Club.find({ owner: user._id });
    console.log("🏠 Owner bo'lgan klublar:", clubs);
    return NextResponse.json({ clubs });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Xatolik", error: err.message },
      { status: 500 }
    );
  }
}
