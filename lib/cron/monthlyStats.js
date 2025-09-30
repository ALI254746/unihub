import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import DailyStats from "@/models/statistika/dailystats";
import MonthlyStats from "@/models/statistika/monthlystats";

export function startMonthlyStatsCron() {
  // Har sentyabr oyining 1-kuni 00:10 da ishga tushadi
  cron.schedule("10 * * * *", async () => {
    console.log("⏰ Oylik cron ishga tushdi (Sentyabr)");

    await connectDB();

    const currentYear = new Date().getFullYear();
    const monthIndex = 8; // 0 = January, 8 = September

    const firstDay = new Date(currentYear, monthIndex, 1);
    const lastDay = new Date(currentYear, monthIndex + 1, 0, 23, 59, 59);

    // DailyStats dan ma'lumotlarni olish
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

    const monthText = firstDay.toLocaleString("en-US", {
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

    console.log("📊 Oylik statistika saqlandi:", {
      month: monthText,
      hoursUsed: totalHours,
      uniqueUsers: uniqueUsersSet.size,
    });
  });
}
