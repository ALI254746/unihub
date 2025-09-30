import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Profile from "@/models/Profile";
import redis from "@/lib/redis";

async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("TOKEN ERROR:", err.message);
    return null;
  }
}

export async function GET() {
  await connectDB();
  if (!redis.isOpen) await redis.connect();

  const user = await getUserFromToken();
  if (!user?.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const redisKey = `profile:${user.userId}`;
  const cachedProfile = await redis.get(redisKey);

  if (cachedProfile) {
    return NextResponse.json(JSON.parse(cachedProfile));
  }

  const profile = await Profile.findOne({ userId: user.userId }).lean();

  if (!profile) {
    return NextResponse.json({ message: "Profil topilmadi" }, { status: 404 });
  }

  // Redisga 1 soatga (3600s) cache qilamiz
  await redis.setEx(redisKey, 3600, JSON.stringify(profile));

  return NextResponse.json(profile);
}
export async function PATCH(req) {
  await connectDB();
  if (!redis.isOpen) await redis.connect();

  const user = await getUserFromToken();
  if (!user?.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

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
      return NextResponse.json(
        { message: `${field} maydoni majburiy` },
        { status: 400 }
      );
    }
  }

  const updatedProfile = await Profile.findOneAndUpdate(
    { userId: user.userId },
    { $set: body },
    { new: true, upsert: true }
  ).lean();

  const redisKey = `profile:${user.userId}`;
  await redis.setEx(redisKey, 3600, JSON.stringify(updatedProfile)); // cache ni yangilash

  return NextResponse.json(updatedProfile);
}
