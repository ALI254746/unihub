import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // MongoDB ulanish
import Elon from "@/models/Elon"; // Model
import redis from "@/lib/redis";
import { requireAdmin } from "@/lib/adminAuth";
export async function POST(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const body = await req.json();
    const { title, description, category } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: "Barcha maydonlar to‘ldirilishi shart" },
        { status: 400 }
      );
    }

    const newElon = await Elon.create({ title, description, category });

    return NextResponse.json({ newElon }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
// GET: barcha e'lonlarni olish

const CACHE_KEY = "elonlar:all";
export async function GET() {
  try {
    // 🔌 Redis ulanishini tekshiramiz
    if (!redis.isOpen) {
      console.log("🔄 Redisga ulanmoqda...");
      await redis.connect();
      console.log("✅ Redisga ulandi");
    }

    // 🧠 Redisdan tekshiramiz
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
      console.log("📦 Redis'dan olindi (cache):");
      return NextResponse.json(JSON.parse(cached), { status: 200 });
    }

    // 🌐 MongoDB dan olamiz
    console.log("📡 MongoDB'dan olinmoqda...");
    await connectDB();
    const elonlar = await Elon.find().sort({ createdAt: -1 });
    console.log("✅ MongoDB'dan olindi:", elonlar.length, "ta e'lon");
    // 📝 Redisga yozamiz
    await redis.setEx(CACHE_KEY, 600, JSON.stringify(elonlar));
    console.log("🧠 Ma’lumot Redis cache'ga yozildi (10 daqiqa)");

    return NextResponse.json(elonlar, { status: 200 });
  } catch (err) {
    console.error("❌ Xatolik:", err);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
