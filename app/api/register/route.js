import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const cookieStore = cookies();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { message: "Email va parol kerak" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "Bu Email Allaqachon Mavjud" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    cookieStore.set({
      name: "unihub_token",
      value: token,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return Response.json(
      { message: "Ro‘yxatdan o‘tish muvaffaqiyatli" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Xatolik:", err);
    return Response.json(
      { message: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
