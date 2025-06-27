import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";

async function getUserFromToken() {
  try {
    const cookieStore = await cookies(); // ❗ cookies() sync, await kerak emas
    const token = cookieStore.get("unihub_token")?.value;
    console.log("token", token);

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { userId, email, name, ... }
  } catch (err) {
    console.error("TOKEN ERROR:", err.message);
    return null;
  }
}

// PATCH - profilni yangilash yoki yaratish
export async function PATCH(req) {
  await connectDB();

  const user = await getUserFromToken(); // ✅
  if (!user?.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedProfile = await Profile.findOneAndUpdate(
    { userId: user.userId },
    { $set: body },
    { new: true, upsert: true }
  );

  return NextResponse.json(updatedProfile);
}

// GET - profilni olish
export async function GET() {
  await connectDB();

  const user = await getUserFromToken(); // ✅
  if (!user?.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await Profile.findOne({ userId: user.userId });

  if (!profile) {
    return NextResponse.json({ message: "Profil topilmadi" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
