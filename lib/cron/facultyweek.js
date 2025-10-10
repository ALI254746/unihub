import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import WeeklyFacultyStats from "@/models/statistika/facultyweek";
import redis from "@/lib/redis"; // 🔹 Redis ulaymiz

// ISO haftani olish funksiyasi
function getISOWeek(date) {
  const tmp = new Date(date.getTime());
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
  const week1 = new Date(tmp.getFullYear(), 0, 4);
  return (
    tmp.getFullYear() +
    "-W" +
    String(
      1 +
        Math.round(
          ((tmp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
        )
    ).padStart(2, "0")
  );
}

export async function updateWeeklyFacultyStats() {
  try {
    await connectDB();
    console.log("🔹 MongoDB ulandi, Weekly Faculty stats cron ishga tushdi");

    const now = new Date();
    const currentWeek = getISOWeek(now); // Masalan: "2025-W41"

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
          week: {
            $dateToString: { format: "%G-W%V", date: "$usageStartedAt" },
          },
          usageMinutes: {
            $divide: [
              { $subtract: ["$usageExpiresAt", "$usageStartedAt"] },
              1000 * 60,
            ],
          },
        },
      },
      { $match: { week: currentWeek } },
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

    // ✅ MongoDB ga yozamiz
    await WeeklyFacultyStats.findOneAndUpdate(
      { week: currentWeek },
      { week: currentWeek, data: facultyData },
      { upsert: true, new: true }
    );

    console.log("✅ Weekly Faculty stats yangilandi va DB ga saqlandi");

    // 🧹 Redis cache tozalash
    try {
      if (!redis.isOpen && !redis.isReady) await redis.connect();
      await redis.del("faculty:week");
      console.log("🧹 Redis cache tozalandi: faculty:weekly");
    } catch (err) {
      console.error("⚠️ Redisni tozalashda xatolik:", err.message);
    }
  } catch (error) {
    console.error("❌ Weekly Faculty stats cron xatosi:", error);
  }
}

// ✅ Cron ishga tushirish
export function startWeeklyFacultyStatsCron() {
  // Har kuni tunda (soat 00:00 da) ishga tushadi
  cron.schedule("3 * * * *", () => {
    updateWeeklyFacultyStats().catch(console.error);
  });

  // Server ishga tushganda ham ishga tushadi
  updateWeeklyFacultyStats().catch(console.error);
}
