import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import DailyFacultyStats from "@/models/statistika/facultyDay";
import redis from "@/lib/redis"; // 🔹 Redis ulanishi

export async function updateDailyFacultyStats() {
  try {
    await connectDB();
    console.log("🔹 MongoDB ga ulandi, Daily Faculty stats cron ishga tushdi");

    const now = new Date();
    const currentDay = now.toISOString().split("T")[0]; // Masalan: 2025-10-08

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

    // ✅ Ma’lumotni MongoDB ga yozamiz
    await DailyFacultyStats.findOneAndUpdate(
      { day: currentDay },
      { day: currentDay, data: facultyData },
      { upsert: true, new: true }
    );

    console.log(
      "✅ Daily Faculty stats yangilandi va DB ga saqlandi:",
      facultyData
    );

    // 🔥 Redis cache-ni tozalash
    try {
      const redisKey = `faculty:day:${currentDay}`;
      const deleted = await redis.del(redisKey);
      console.log(`🧹 Redis cache tozalandi (${redisKey}):`, deleted);
    } catch (redisError) {
      console.error("⚠️ Redis tozalashda xato:", redisError);
    }
  } catch (error) {
    console.error("❌ Daily Faculty stats cron xatosi:", error);
  }
}

// ✅ Cron ishga tushirish
export function startDailyFacultyStatsCron() {
  // Har kuni soat 00:10 da ishlaydi
  cron.schedule("7 * * * *", () => {
    updateDailyFacultyStats().catch(console.error);
  });

  // Server ishga tushganda ham darhol ishga tushadi
  updateDailyFacultyStats().catch(console.error);
}
