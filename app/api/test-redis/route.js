import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await redis.set("hello", "Salom Redis!");
    const data = await redis.get("hello");

    return NextResponse.json({ message: data });
  } catch (err) {
    console.error("Redis error:", err);
    return NextResponse.json({ message: "Redisda xatolik" }, { status: 500 });
  }
}
