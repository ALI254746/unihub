import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import DailyStats from "@/models/statistika/dailystats";
import WeeklyStats from "@/models/statistika/weeklystats";
import redis from "@/lib/redis"; // 🧠 Redisni import qilamiz

export function startWeeklyStatsCron() {
  // Har yakshanba soat 00:00 da ishga tushadi
  cron.schedule("0 0 * * 0", async () => {
    console.log("⏰ Haftalik cron ishga tushdi");

    try {
      await connectDB();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Haftaning boshini (Dushanba) va oxirini (Yakshanba) topamiz
      const dayOfWeek = today.getDay(); // 0=Yakshanba, 1=Dushanba,...
      const diffToMonday = (dayOfWeek + 6) % 7;
      const monday = new Date(today);
      monday.setDate(today.getDate() - diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      // 📊 Haftalik ma'lumotlarni olish
      const dailyStats = await DailyStats.find({
        date: { $gte: monday, $lte: sunday },
      }).lean();

      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const weeklyData = daysOfWeek.map((day, index) => {
        const dayStats = dailyStats.find(
          (d) => (new Date(d.date).getDay() + 6) % 7 === index
        );

        if (!dayStats) return { day, hoursUsed: 0, uniqueUsers: 0 };

        const hoursUsed = dayStats.data.reduce(
          (sum, h) => sum + h.hoursUsed,
          0
        );
        const uniqueUsers = dayStats.data.reduce(
          (sum, h) => sum + h.uniqueUsers,
          0
        );

        return { day, hoursUsed, uniqueUsers };
      });

      // 🔄 Upsert (agar mavjud bo‘lsa yangilaydi)
      await WeeklyStats.findOneAndUpdate(
        { weekStart: monday },
        { weekStart: monday, weekEnd: sunday, data: weeklyData },
        { upsert: true, new: true }
      );

      console.log(
        "📊 Haftalik statistika saqlandi:",
        weeklyData.length,
        "kunlik ma'lumot"
      );

      // 🧹 Redis cache-ni tozalaymiz
      const redisKey = "faculty:weekly";
      try {
        const deleted = await redis.del(redisKey);
        console.log(`🧹 Redis cache tozalandi (${redisKey}):`, deleted);
      } catch (redisError) {
        console.error("⚠️ Redis tozalashda xato:", redisError);
      }
    } catch (error) {
      console.error("❌ Haftalik cron xatosi:", error);
    }
  });
}
