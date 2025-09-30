import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import DailyStats from "@/models/statistika/dailystats";
import WeeklyStats from "@/models/statistika/weeklystats";

export function startWeeklyStatsCron() {
  // Har yakshanba 23:59 da ishlaydi
  cron.schedule("10 * * * *", async () => {
    console.log("⏰ Haftalik cron ishga tushdi");

    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Dushanbadan yakshangacha sanalarni aniqlaymiz
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday
    const sunday = new Date(today);
    const monday = new Date(today);

    monday.setDate(today.getDate() - dayOfWeek + 1); // Monday
    sunday.setDate(monday.getDate() + 6); // Sunday

    // DailyStats dan haftalik ma'lumotlarni olish
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
      const dayStats = dailyStats[index];
      if (!dayStats) {
        return { day, hoursUsed: 0, uniqueUsers: 0 };
      }
      // Jami hoursUsed va uniqueUsers
      const hoursUsed = dayStats.data.reduce((sum, h) => sum + h.hoursUsed, 0);
      const uniqueUsersSet = new Set();
      dayStats.data.forEach((h) => {
        if (h.uniqueUsers > 0) uniqueUsersSet.add(h.uniqueUsers); // uniqueUsers ni Set ga qo'shish
      });
      return {
        day,
        hoursUsed,
        uniqueUsers: uniqueUsersSet.size || 0,
      };
    });

    await WeeklyStats.create({
      weekStart: monday,
      weekEnd: sunday,
      data: weeklyData,
    });

    console.log("📊 Haftalik statistika saqlandi:", weeklyData);
  });
}
