// lib/getUserFromToken.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import redis from "./redis";
import User from "@/models/User";
import { connectDB } from "./mongodb";

export async function getUserFromToken() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("unihub_token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Redisni ulaymiz (birinchi martada)
    if (!redis.isOpen) await redis.connect();

    // 1. Redisdan tekshiramiz
    const cached = await redis.get(`user:${userId}`);
    if (cached) return JSON.parse(cached);

    // 2. MongoDB dan topamiz
    await connectDB();
    const user = await User.findById(userId).lean();

    if (!user) return null;

    // 3. Redisga saqlaymiz (10 daqiqa muddat bilan)
    await redis.setEx(`user:${userId}`, 600, JSON.stringify(user));

    return user;
  } catch (err) {
    console.error("getUserFromToken error:", err);
    return null;
  }
}
