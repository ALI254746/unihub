import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies(); // token saqlash uchun

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

    // JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role }, // role qo‘shildi
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // cookie ga tokenni saqlaymiz
    cookieStore.set({
      name: "unihub_token",
      value: token,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 kun
      path: "/",
    });

    return new Response("Kirish muvaffaqiyatli", { status: 200 });
  } catch (err) {
    console.error("Login xatoligi:", err);
    return new Response("Server xatosi", { status: 500 });
  }
}
