import { connectDB } from "@/lib/mongodb";
import DailyStats from "@/models/statistika/dailystats";
import WeeklyStats from "@/models/statistika/weeklystats";
import MonthlyStats from "@/models/statistika/monthlystats";
import redis from "@/lib/redis"; // Redis ulanishini import qilamiz

export async function GET(req) {
  try {
    await connectDB();
    console.log("🔹 MongoDB ulandi /api/statistika/faculty ishlayapti");

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range");
    console.log("📌 So‘rov diapazoni:", range);

    let stats = [];
    let cacheKey = "";

    // 📦 1. Redis uchun cache kalitlarini aniqlaymiz
    if (range === "Kunlik") {
      const today = new Date().toISOString().split("T")[0];
      cacheKey = `faculty:daily:${today}`;
    } else if (range === "Haftalik") {
      cacheKey = `faculty:weekly`;
    } else if (range === "Oylik") {
      const monthText = new Date().toLocaleString("uz-UZ", {
        month: "long",
        year: "numeric",
      });
      cacheKey = `faculty:monthly:${monthText}`;
    } else {
      console.warn("⚠️ Noto‘g‘ri range keldi:", range);
      return Response.json(
        { error: "Noto‘g‘ri range qiymati" },
        { status: 400 }
      );
    }

    // ⚡ 2. Redisda bor-yo‘qligini tekshiramiz
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("⚡ Redisdan qaytarildi:", cacheKey);
      return Response.json(JSON.parse(cachedData));
    }

    // 🧭 3. Agar Redisda yo‘q bo‘lsa — DB dan olish
    if (range === "Kunlik") {
      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      console.log("🕒 Kun oralig‘i:", startOfDay, "-", endOfDay);

      stats = await DailyStats.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      }).lean();

      console.log("📊 Kunlik statistika topildi:", stats.length, "ta hujjat");
    } else if (range === "Haftalik") {
      stats = await WeeklyStats.find().sort({ createdAt: -1 }).limit(1).lean();
      console.log("📊 Haftalik statistika topildi:", stats.length, "ta hujjat");
    } else if (range === "Oylik") {
      stats = await MonthlyStats.find().sort({ month: -1 }).limit(12).lean();
      console.log("📊 Oylik statistika topildi:", stats.length, "ta hujjat");
    }

    // 💾 4. Redisga saqlaymiz (1 soatlik TTL bilan)
    await redis.set(cacheKey, JSON.stringify(stats), "EX", 3600);
    console.log("💾 Redisga saqlandi:", cacheKey);

    // 🔚 5. Natijani jo‘natamiz
    if (!stats || stats.length === 0) {
      console.warn("⚠️ Statistika topilmadi, bo‘sh massiv qaytarilmoqda");
    } else {
      console.log("✅ Statistika yuborilmoqda:", stats.length, "ta natija");
    }

    return Response.json(stats);
  } catch (error) {
    console.error("❌ API xatosi:", error);
    return Response.json({ error: "Server xatosi" }, { status: 500 });
  }
}
