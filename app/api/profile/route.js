import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Profile from "@/models/Profile";
import redis from "@/lib/redis";
import mongoose from "mongoose";

async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;
    console.log("🔑 Token:", token);

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);
    return decoded;
  } catch (err) {
    console.error("❌ TOKEN ERROR:", err.message);
    return null;
  }
}

export async function GET() {
  console.log("📥 GET /api/profile ishladi");
  await connectDB();
  if (!redis.isOpen) await redis.connect();

  const user = await getUserFromToken();
  console.log("👤 User from token:", user);

  if (!user?.userId) {
    console.log("🚫 User ID topilmadi");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const redisKey = `profile:${user.userId}`;
  const cachedProfile = await redis.get(redisKey);
  console.log("📦 Redisdan profil:", cachedProfile ? "Topildi" : "Topilmadi");

  if (cachedProfile) {
    console.log("♻️ Redis profil qaytarilmoqda");
    return NextResponse.json(JSON.parse(cachedProfile));
  }

  const profile = await Profile.findOne({
    userId: new mongoose.Types.ObjectId(user.userId),
  }).lean();
  console.log("🧾 Mongo profili:", profile);

  if (!profile) {
    console.log("⚠️ Profil MongoDB dan topilmadi");
    return NextResponse.json({ message: "Profil topilmadi" }, { status: 404 });
  }

  await redis.setEx(redisKey, 3600, JSON.stringify(profile));
  console.log("✅ Profil Redisga cache qilindi:", redisKey);

  return NextResponse.json(profile);
}

export async function PATCH(req) {
  console.log("🛠 PATCH /api/profile ishladi");
  await connectDB();
  if (!redis.isOpen) await redis.connect();

  const user = await getUserFromToken();
  console.log("👤 PATCH user:", user);

  if (!user?.userId) {
    console.log("🚫 PATCH da User ID topilmadi");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log("📨 PATCH body:", body);

  const requiredFields = [
    "name",
    "surname",
    "direction",
    "course",
    "group",
    "phone",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      console.log(`⚠️ ${field} maydoni yo‘q`);
      return NextResponse.json(
        { message: `${field} maydoni majburiy` },
        { status: 400 }
      );
    }
  }

  const updatedProfile = await Profile.findOneAndUpdate(
    { userId: new mongoose.Types.ObjectId(user.userId) },
    { $set: body },
    { new: true, upsert: true }
  ).lean();

  const redisKey = `profile:${user.userId}`;
  await redis.setEx(redisKey, 3600, JSON.stringify(updatedProfile));

  console.log("✅ Profil yangilandi va Redisga saqlandi:", updatedProfile);

  return NextResponse.json(updatedProfile);
}
