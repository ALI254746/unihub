import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import DailyStats from "@/models/statistika/dailystats";
import MonthlyStats from "@/models/statistika/monthlystats";
import redis from "@/lib/redis"; // 🔹 Redis ulanish

export function startMonthlyStatsCron() {
  // Har oy 1-kuni 00:10 da ishga tushadi
  cron.schedule("8 * * * *", async () => {
    console.log("⏰ Oylik statistika cron ishga tushdi");

    try {
      await connectDB();

      const currentYear = new Date().getFullYear();
      const monthIndex = new Date().getMonth(); // 🔹 Hozirgi oy (dynamic)
      const firstDay = new Date(currentYear, monthIndex, 1);
      const lastDay = new Date(currentYear, monthIndex + 1, 0, 23, 59, 59);

      // DailyStats dan ma'lumot olish
      const dailyStats = await DailyStats.find({
        date: { $gte: firstDay, $lte: lastDay },
      }).lean();

      let totalHours = 0;
      const uniqueUsersSet = new Set();

      dailyStats.forEach((day) => {
        day.data.forEach((h) => {
          totalHours += h.hoursUsed;
          if (h.uniqueUsers > 0) uniqueUsersSet.add(h.uniqueUsers);
        });
      });

      const monthText = firstDay.toLocaleString("uz-UZ", {
        month: "long",
        year: "numeric",
      });

      await MonthlyStats.findOneAndUpdate(
        { month: monthText },
        {
          month: monthText,
          hoursUsed: totalHours,
          uniqueUsers: uniqueUsersSet.size,
        },
        { upsert: true, new: true }
      );

      console.log("✅ Oylik statistika yangilandi:", {
        month: monthText,
        hoursUsed: totalHours,
        uniqueUsers: uniqueUsersSet.size,
      });

      // 🔥 Redis cache-ni tozalash
      try {
        const redisKey = `stats:monthly:${monthText}`;
        const deleted = await redis.del(redisKey);
        console.log(`🧹 Redis cache tozalandi (${redisKey}):`, deleted);
      } catch (redisError) {
        console.error("⚠️ Redis tozalashda xato:", redisError);
      }
    } catch (error) {
      console.error("❌ Oylik statistika cron xatosi:", error);
    }
  });

  // Server ishga tushganda ham ishga tushsin
  (async () => {
    try {
      console.log("🚀 Server ishga tushganda oylik cron ishga tushdi");
      const currentYear = new Date().getFullYear();
      const monthIndex = new Date().getMonth();
      const firstDay = new Date(currentYear, monthIndex, 1);
      const lastDay = new Date(currentYear, monthIndex + 1, 0, 23, 59, 59);

      const dailyStats = await DailyStats.find({
        date: { $gte: firstDay, $lte: lastDay },
      }).lean();

      let totalHours = 0;
      const uniqueUsersSet = new Set();

      dailyStats.forEach((day) => {
        day.data.forEach((h) => {
          totalHours += h.hoursUsed;
          if (h.uniqueUsers > 0) uniqueUsersSet.add(h.uniqueUsers);
        });
      });

      const monthText = firstDay.toLocaleString("uz-UZ", {
        month: "long",
        year: "numeric",
      });

      await MonthlyStats.findOneAndUpdate(
        { month: monthText },
        {
          month: monthText,
          hoursUsed: totalHours,
          uniqueUsers: uniqueUsersSet.size,
        },
        { upsert: true, new: true }
      );

      // Redis cache o‘chirish
      const redisKey = `stats:monthly:${monthText}`;
      await redis.del(redisKey);
      console.log(`🧹 Redis cache tozalandi (${redisKey})`);
    } catch (error) {
      console.error("❌ Server start paytida oylik cron xatosi:", error);
    }
  })();
}
