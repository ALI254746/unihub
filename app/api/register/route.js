// File: app/api/register/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import redis from "@/lib/redis"; // 🔴 Redis import qilinadi

export async function POST(req) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();
    const { email, password, firstName, lastName, faculty, course } = body;

    console.log("✅ So‘rov kelib tushdi:", body);

    // 🔐 Maydonlarni tekshiramiz
    if (!email || !password || !firstName || !lastName || !faculty || !course) {
      console.log("❌ Bo‘sh maydon bor");
      return Response.json(
        { message: "Barcha maydonlarni to‘ldiring!" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("❌ Parol juda qisqa:", password);
      return Response.json(
        { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" },
        { status: 400 }
      );
    }

    await connectDB();
    console.log("✅ MongoDB ulanib bo‘ldi");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email allaqachon mavjud:", email);
      return Response.json(
        { message: "Bu Email allaqachon mavjud" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Parol hashlandi");

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      faculty,
      course,
    });

    await newUser.save();
    console.log("✅ Yangi foydalanuvchi saqlandi:", newUser);

    // 🔐 JWT Token yaratamiz
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    console.log("✅ JWT token yaratildi:", token);

    // 🍪 Cookie'ga tokenni yozamiz
    cookieStore.set({
      name: "unihub_token",
      value: token,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    console.log("✅ Token cookie'ga yozildi");

    // 🧠 Redis'ga yozamiz
    if (!redis.isOpen) {
      await redis.connect();
      console.log("✅ Redis ulanib bo‘ldi");
    }

    await redis.setEx(`user:${newUser._id}`, 600, JSON.stringify(newUser)); // 10 daqiqa
    await redis.set(`token:${newUser._id}`, token, { EX: 60 * 60 * 24 * 30 });
    await redis.set(`token:${token}`, newUser._id.toString(), {
      EX: 60 * 60 * 24 * 30,
    });

    console.log("✅ Redis'ga token va foydalanuvchi ma’lumoti saqlandi");

    return Response.json(
      { message: "Ro‘yxatdan o‘tish muvaffaqiyatli" },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Server xatoligi:", err);
    return Response.json(
      { message: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
