import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email va parol majburiy" },
        { status: 400 }
      );
    }

    // 🔌 MongoDB bilan ulanamiz
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Parol noto‘g‘ri" }, { status: 401 });
    }

    // 🔐 JWT token yaratamiz
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 🧠 Redisga ma’lumotlarni yozamiz
    if (!redis.isOpen) await redis.connect();

    const userData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      faculty: user.faculty,
      course: user.course,
    };

    // Redisga yozish
    await redis.setEx(`user:${user._id}`, 60 * 10, JSON.stringify(userData)); // 10 daqiqa
    await redis.set(`token:${user._id}`, token, { EX: 30 * 24 * 60 * 60 }); // 30 kun
    await redis.set(`token:${token}`, user._id.toString(), {
      EX: 30 * 24 * 60 * 60,
    });

    // 🍪 Cookie orqali tokenni yuborish (response orqali)
    const response = NextResponse.json(
      {
        message: "Kirish muvaffaqiyatli",
        token,
      },
      { status: 200 }
    );

    response.cookies.set("unihub_token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("❌ Login xatoligi:", err);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
