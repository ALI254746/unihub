import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import redis from "@/lib/redis"; // Redis klientini chaqirish

export async function POST(req) {
  const cookieStore = await cookies();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("Email va parol majburiy", { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response("Foydalanuvchi topilmadi", { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response("Parol noto‘g‘ri", { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // 🔗 Redis bilan ishlash
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

    // 🧠 Redisga saqlaymiz
    await redis.setEx(`user:${user._id}`, 60 * 10, JSON.stringify(userData)); // 10 daqiqa
    await redis.set(`token:${user._id}`, token, {
      EX: 30 * 24 * 60 * 60, // 30 kun
    });
    await redis.set(`token:${token}`, user._id.toString(), {
      EX: 30 * 24 * 60 * 60,
    });

    // 🍪 Cookie orqali token saqlanadi
    cookieStore.set({
      name: "unihub_token",
      value: token,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return new Response("Kirish muvaffaqiyatli", { status: 200 });
  } catch (err) {
    console.error("Login xatoligi:", err);
    return new Response("Server xatosi", { status: 500 });
  }
}
