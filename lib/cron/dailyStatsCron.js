import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import DailyStats from "@/models/statistika/dailystats";
import redis from "@/lib/redis";

export function startDailyStatsCron() {
  // ⏰ Har 10 daqiqada yangilanadi
  cron.schedule("5 * * * *", async () => {
    console.log("⏰ [Cron] Har 10 daqiqalik yangilanish boshlandi...");

    try {
      await connectDB();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const bookings = await SeatBooking.find({
        usageStartedAt: { $gte: today, $lt: tomorrow },
        usageExpiresAt: { $ne: null },
        status: { $in: ["empty"] },
      }).lean();

      const hours = Array.from({ length: 24 }, (_, i) => i);

      const stats = hours.map((h) => {
        const start = new Date(today);
        start.setHours(h, 0, 0, 0);
        const end = new Date(today);
        end.setHours(h + 1, 0, 0, 0);

        const inRange = bookings.filter(
          (b) => b.usageStartedAt < end && b.usageExpiresAt > start
        );

        let totalMs = 0;
        const usersSet = new Set();

        inRange.forEach((b) => {
          const s = b.usageStartedAt < start ? start : b.usageStartedAt;
          const e = b.usageExpiresAt > end ? end : b.usageExpiresAt;
          totalMs += e - s;
          usersSet.add(b.userId?.toString());
        });

        return {
          hour: `${h}:00`,
          hoursUsed: +(totalMs / 1000 / 60 / 60).toFixed(2),
          uniqueUsers: usersSet.size,
        };
      });

      await DailyStats.findOneAndUpdate(
        { date: today },
        { date: today, data: stats },
        { upsert: true, new: true }
      );

      console.log("📊 [Cron] Kunlik statistika yangilandi.");

      // 🧹 Redis cache ni tozalaymiz
      const cacheKey = `faculty:daily:${today.toISOString().split("T")[0]}`;
      try {
        await redis.del(cacheKey);
        console.log(`🧹 [Cron] Redis cache tozalandi: ${cacheKey}`);
      } catch (e) {
        console.error("⚠️ [Cron] Redisni tozalashda xatolik:", e.message);
      }
    } catch (err) {
      console.error("❌ [Cron] Xatolik:", err.message);
    }
  });
}
