// lib/cron/cleanupCron.js
import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import redis from "@/lib/redis";

export function startCleanupCron() {
  // Har 10 daqiqada ishga tushadi
  cron.schedule("10 * * * *", async () => {
    console.log("🧹 [CRON] Tozalash jarayoni boshlandi...");

    try {
      await connectDB();
      const now = new Date();

      // ✅ BOOKED holatdagi vaqti tugaganlar
      const expiredBooked = await SeatBooking.find({
        status: "booked",
        expiresAt: { $lt: now },
      });

      const bookedSeatIds = expiredBooked.map((b) => b.seatId);

      const updateBooked = await SeatBooking.updateMany(
        { seatId: { $in: bookedSeatIds } },
        {
          $set: {
            status: "empty",
            usageStartedAt: null,
            usageExpiresAt: null,
            userId: null,
            firstName: null,
            lastName: null,
            expiresAt: null,
          },
        }
      );

      // ✅ ACTIVE holatdagi vaqti tugaganlar
      const expiredActive = await SeatBooking.find({
        status: "active",
        usageExpiresAt: { $lt: now },
      });

      const activeSeatIds = expiredActive.map((b) => b.seatId);

      const updateActive = await SeatBooking.updateMany(
        { seatId: { $in: activeSeatIds }, status: "active" },
        { $set: { status: "empty" } }
      );

      // ✅ Redisni xavfsiz tozalaymiz
      if (!redis.isOpen && !redis.isReady) {
        await redis
          .connect()
          .catch((err) =>
            console.error("Redisga ulanib bo‘lmadi:", err.message)
          );
      }

      const allSeatIds = [...bookedSeatIds, ...activeSeatIds];
      for (const seatId of allSeatIds) {
        try {
          await redis.del(`seat:${seatId}`);
        } catch (err) {
          console.warn(
            `⚠️ Redisdan seat:${seatId} ni o‘chirishda xato:`,
            err.message
          );
        }
      }

      console.log(
        `✅ [CRON] Booked: ${updateBooked.modifiedCount}, Active: ${updateActive.modifiedCount} joylar tozalandi.`
      );
    } catch (error) {
      console.error("❌ [CRON] Cleanup xatosi:", error);
    }
  });

  console.log("✅ Cleanup CRON ishga tushdi (har 10 daqiqa)");
}
