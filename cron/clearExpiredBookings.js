import cron from "node-cron";
import { connectDB } from "./lib/mongodb.js";
import SeatBooking from "./models/SeatBooking.js";

async function clearExpiredBookings() {
  await connectDB();
  // 1. Booked vaqti tugaganlarni empty qilish
  const result1 = await SeatBooking.updateMany(
    { status: "booked", expiresAt: { $lt: new Date() } },
    {
      $set: {
        status: "empty",
        userId: null,
        firstName: null,
        lastName: null,
        expiresAt: null,
      },
    }
  );
  // 2. Active vaqti tugaganlarni empty qilish
  const result2 = await SeatBooking.updateMany(
    { status: "active", usageExpiresAt: { $lt: new Date() } },
    {
      $set: {
        status: "empty",
        userId: null,
        firstName: null,
        lastName: null,
        usageStartedAt: null,
        usageExpiresAt: null,
      },
    }
  );

  console.log(`Expired booked cleared: ${result1.modifiedCount}`);
  console.log(`Expired active cleared: ${result2.modifiedCount}`);
}
// Har 5 daqiqada ishga tushirish
cron.schedule("*/5 * * * *", () => {
  console.log("Cron job started to clear expired bookings");
  clearExpiredBookings()
    .then(() => console.log("Expired bookings cleared successfully"))
    .catch((err) => console.error("Error clearing expired bookings:", err));
});
