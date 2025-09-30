import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import redis from "@/lib/redis";
import DailyFacultyStats from "@/models/statistika/facultyDay";

export async function updateDailyFacultyStats() {
  try {
    await connectDB();
    console.log("🔹 MongoDB ga ulandi, Daily Faculty stats cron ishga tushdi");

    const now = new Date();
    const currentDay = now.toISOString().split("T")[0]; // 2025-09-20

    // Statistika olish
    const stats = await SeatBooking.aggregate([
      {
        $match: {
          usageStartedAt: { $ne: null },
          usageExpiresAt: { $ne: null },
        },
      },
      {
        $addFields: {
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$usageStartedAt" },
          },
          usageMinutes: {
            $divide: [
              { $subtract: ["$usageExpiresAt", "$usageStartedAt"] },
              1000 * 60,
            ],
          },
        },
      },
      { $match: { day: currentDay } },
      {
        $group: {
          _id: "$faculty",
          totalMinutes: { $sum: "$usageMinutes" },
          uniqueUsers: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          _id: 1,
          totalHours: { $divide: ["$totalMinutes", 60] },
          uniqueUsersCount: { $size: "$uniqueUsers" },
        },
      },
      { $sort: { totalHours: -1 } },
    ]);

    // Fakultetlar ro‘yxati
    const facultyList = [
      "Axborot texnologiyalari",
      "Kompyuter ilmlari",
      "Sun'iy intellekt",
      "Kiber xavfsizlik",
      "Dasturiy injinering",
    ];

    const totalHours = stats.reduce((sum, f) => sum + f.totalHours, 0) || 1;

    const facultyData = facultyList.map((name) => {
      const stat = stats.find((s) => s._id === name);
      const hoursUsed = stat ? parseFloat(stat.totalHours.toFixed(2)) : 0;
      const uniqueUsers = stat ? stat.uniqueUsersCount : 0;
      return {
        faculty: name,
        hoursUsed,
        uniqueUsers,
        percent: parseFloat(((hoursUsed / totalHours) * 100).toFixed(1)),
      };
    });

    // ✅ Redisga yozamiz
    if (!redis.isOpen) await redis.connect();
    await redis.set("facultyDay", JSON.stringify(facultyData));

    // ✅ MongoDB ga yozamiz (kunlik)
    await DailyFacultyStats.findOneAndUpdate(
      { day: currentDay },
      { day: currentDay, data: facultyData },
      { upsert: true, new: true }
    );

    console.log(
      "✅ Daily Faculty stats yangilandi va DB+Redisga saqlandi:",
      facultyData
    );
  } catch (error) {
    console.error("❌ Daily Faculty stats cron xatosi:", error);
  }
}

// ✅ Cron ishga tushirish
export function startDailyFacultyStatsCron() {
  // Har kuni tungi 00:00 da ishlaydi
  cron.schedule("10 * * * *", () => {
    updateDailyFacultyStats().catch(console.error);
  });

  // Server ishga tushganda ham yangilash
  updateDailyFacultyStats().catch(console.error);
}
