import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import DailyUsageStats from "@/models/statistika/hourlyStats";
import redis from "@/lib/redis";

export function startDailyUsageStatsCron() {
  // Vaqtni o'zingiz xohlagan soatga o'zgartiring
  // Masalan, har kuni soat 23:59 da ishlaydi
  cron.schedule("59 * * * *", async () => {
    console.log(
      "⏰ [Cron] Bugungi foydalanuvchi va o'rtacha soat yangilanmoqda..."
    );

    try {
      await connectDB();

      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      // 1️⃣ Bugungi foydalanuvchilar (stulni active qilib ishlatganlar)
      const sessions = await SeatBooking.find({
        usageStartedAt: { $gte: startOfDay, $lte: endOfDay },
        usageExpiresAt: { $ne: null },
      }).lean();

      const uniqueUsers = new Set(sessions.map((s) => String(s.userId))).size;

      const totalHoursUsed = sessions.reduce((sum, s) => {
        const diff =
          (new Date(s.usageExpiresAt) - new Date(s.usageStartedAt)) /
          (1000 * 60 * 60);
        return sum + (diff > 0 ? diff : 0);
      }, 0);

      const averageUsage =
        uniqueUsers === 0 ? 0 : (totalHoursUsed / uniqueUsers).toFixed(1);

      // 2️⃣ Ayni paytdagi online foydalanuvchilar (active stullar)
      const onlineUsers = await SeatBooking.countDocuments({
        status: "active",
      });

      // 3️⃣ Growth hisoblash uchun oldingi kunni olish
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const startOfYesterday = new Date(yesterday);
      startOfYesterday.setHours(0, 0, 0, 0);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setHours(23, 59, 59, 999);

      const yesterdaySessions = await SeatBooking.find({
        usageStartedAt: { $gte: startOfYesterday, $lte: endOfYesterday },
        usageExpiresAt: { $ne: null },
      }).lean();

      const yesterdayUsers = new Set(
        yesterdaySessions.map((s) => String(s.userId))
      ).size;
      const yesterdayTotalHours = yesterdaySessions.reduce((sum, s) => {
        const diff =
          (new Date(s.usageExpiresAt) - new Date(s.usageStartedAt)) /
          (1000 * 60 * 60);
        return sum + (diff > 0 ? diff : 0);
      }, 0);
      const yesterdayAverage =
        yesterdayUsers === 0
          ? 0
          : (yesterdayTotalHours / yesterdayUsers).toFixed(1);

      const uniqueUsersGrowth =
        yesterdayUsers === 0
          ? "N/A"
          : `${(
              ((uniqueUsers - yesterdayUsers) / yesterdayUsers) *
              100
            ).toFixed(0)}%`;
      const averageUsageGrowth =
        yesterdayUsers === 0
          ? "N/A"
          : `${(
              ((averageUsage - yesterdayAverage) / yesterdayAverage) *
              100
            ).toFixed(0)}%`;

      // 4️⃣ JSON shakli
      const dailyStats = {
        date: today.toISOString().split("T")[0],
        uniqueUsers,
        uniqueUsersGrowth,
        totalHoursUsed: totalHoursUsed.toFixed(1),
        averageUsage,
        averageUsageGrowth,
        onlineUsers,
      };

      // 5️⃣ DB ga saqlash
      await DailyUsageStats.findOneAndUpdate(
        { date: dailyStats.date },
        dailyStats,
        { upsert: true, new: true }
      );

      // 6️⃣ Redis cache-ni tozalash
      const redisKey = `faculty:daily:${dailyStats.date}`;
      await redis.del(redisKey);
      console.log(`🧹 Redis cache tozalandi: ${redisKey}`);

      console.log(
        "✅ Bugungi foydalanuvchi va o'rtacha soat saqlandi:",
        dailyStats
      );
    } catch (error) {
      console.error("❌ [Cron] Bugungi statistika xatosi:", error);
    }
  });
}
