import { connectDB } from "@/lib/mongodb";
import DailyFacultyStats from "@/models/statistika/facultyDay";
import WeeklyFacultyStats from "@/models/statistika/facultyweek";
import MonthlyFacultyStats from "@/models/statistika/facultymonth";
import redis from "@/lib/redis"; // Redis ulanishini shu fayldan import qilasan
import { utcToZonedTime } from "date-fns-tz";
export async function GET(req) {
  try {
    console.log("🔌 DB ga ulanilmoqda...");
    await connectDB();
    console.log("✅ DB ulandi!");

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range");
    console.log("📥 Kelgan range:", range);

    let cacheKey = "";
    let stats = [];

    if (range === "Kunlik") {
      const today = new Date().toISOString().split("T")[0];
      cacheKey = `faculty:day:${today}`;
    } else if (range === "Haftalik") {
      cacheKey = `faculty:week`;
    } else if (range === "Oylik") {
      cacheKey = `faculty:month`;
    } else {
      return Response.json(
        { error: "Noto‘g‘ri range qiymati" },
        { status: 400 }
      );
    }

    // 🔍 1. Avval Redisdan tekshiramiz
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("⚡ Redisdan ma’lumot qaytarildi:", cacheKey);
      return Response.json(JSON.parse(cached));
    }

    // 🧭 2. Agar Redisda yo‘q bo‘lsa — DB dan olish
    if (range === "Kunlik") {
      const today = new Date();
      const currentDay = today.toISOString().split("T")[0];
      stats = await DailyFacultyStats.find({ day: currentDay }).lean();
    } else if (range === "Haftalik") {
      stats = await WeeklyFacultyStats.find()
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();
    } else if (range === "Oylik") {
      stats = await MonthlyFacultyStats.find()
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();
    }

    // 🚀 3. Agar topilsa — Redisga saqlab qo‘yamiz (1 soatlik TTL bilan)
    if (stats.length > 0) {
      await redis.set(cacheKey, JSON.stringify(stats), "EX", 3600);
      console.log("💾 Redisga saqlandi:", cacheKey);
    } else {
      console.warn("⚠️ Statistika topilmadi, bo‘sh massiv saqlandi:", cacheKey);
      await redis.set(cacheKey, JSON.stringify([]), "EX", 600);
    }

    console.log("✅ Yakuniy javob jo‘natilmoqda...");
    return Response.json(stats);
  } catch (error) {
    console.error("❌ Xatolik:", error);
    return Response.json({ error: "Server xatosi" }, { status: 500 });
  }
}
