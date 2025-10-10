import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import MonthlyFacultyStats from "@/models/statistika/facultymonth";
import redisClient from "@/lib/redis"; // 🔹 Redis import

export async function updateFacultyStats() {
  try {
    await connectDB();
    console.log("🔹 MongoDB ga ulandi, Faculty stats cron ishga tushdi");

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
    const monthName = now.toLocaleString("uz-UZ", {
      month: "long",
      year: "numeric",
    });

    // SeatBooking dan usage olish
    const stats = await SeatBooking.aggregate([
      {
        $match: {
          usageStartedAt: { $ne: null },
          usageExpiresAt: { $ne: null },
        },
      },
      {
        $addFields: {
          month: {
            $dateToString: { format: "%Y-%m", date: "$usageStartedAt" },
          },
          usageMinutes: {
            $divide: [
              { $subtract: ["$usageExpiresAt", "$usageStartedAt"] },
              1000 * 60,
            ],
          },
        },
      },
      { $match: { month: currentMonth } },
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

    // ✅ MongoDB yangilash
    await MonthlyFacultyStats.findOneAndUpdate(
      { month: monthName },
      { month: monthName, data: facultyData },
      { upsert: true, new: true }
    );

    // 🔥 Redis cache-ni tozalash
    try {
      const redisKey = "faculty:month"; // siz API da shu key bilan saqlayapsiz
      const deleted = await redisClient.del(redisKey);
      console.log(`🧹 Redis cache tozalandi (${redisKey}):`, deleted);
    } catch (redisError) {
      console.error("⚠️ Redis tozalashda xato:", redisError);
    }

    console.log("✅ Faculty stats yangilandi va DBga saqlandi:", facultyData);
  } catch (error) {
    console.error("❌ Faculty stats cron xatosi:", error);
  }
}

// ✅ Cron ishga tushirish
export function startMonthlyFacultyStatsCron() {
  // Har 10 daqiqada ishlash (test uchun)
  cron.schedule("4 * * * *", () => {
    updateFacultyStats().catch(console.error);
  });

  // Server ishga tushganda ham darhol ishga tushadi
  updateFacultyStats().catch(console.error);
}
