// app/api/statistika/daily/route.js
import { connectDB } from "@/lib/mongodb";
import DailyUsageStats from "@/models/statistika/hourlyStats";
import redis from "@/lib/redis";

export async function GET(req) {
  try {
    await connectDB();
    console.log("🔹 MongoDB ulandi /api/statistika/daily ishlayapti");

    const today = new Date().toISOString().split("T")[0];
    const cacheKey = `faculty:daily:${today}`;

    // ⚡ 1. Avvalo Redis cache ni tekshiramiz
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("⚡ Redisdan qaytarildi:", cacheKey);
      return Response.json(JSON.parse(cachedData));
    }

    // 🧭 2. Redisda yo‘q bo‘lsa DB dan olamiz
    const dailyStats = await DailyUsageStats.findOne({ date: today }).lean();

    if (!dailyStats) {
      console.warn("⚠️ Bugungi statistika topilmadi");
      return Response.json(
        { error: "Bugungi statistika mavjud emas" },
        { status: 404 }
      );
    }

    // 💾 3. Redisga saqlaymiz (TTL 1 soat = 3600s)
    await redis.set(cacheKey, JSON.stringify(dailyStats), "EX", 3600);
    console.log("💾 Redisga saqlandi:", cacheKey);

    return Response.json(dailyStats);
  } catch (error) {
    console.error("❌ API xatosi:", error);
    return Response.json({ error: "Server xatosi" }, { status: 500 });
  }
}
