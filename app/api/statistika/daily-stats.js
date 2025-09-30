// //api/statikis/daily-route
// import cron from "node-cron";
// import dbConnect from "@/lib/mongodb";
// import SeatBooking from "@/models/SeatBooking";
// import DailyStats from "@/models/statistika/dailystats";

// export function startDailyStatsCron() {
//   // Har soat oxirida ishlaydi
//   cron.schedule("0 * * * *", async () => {
//     console.log("⏰ Cron ishga tushdi: Bugungi statistika yig‘ilyapti");

//     await dbConnect();

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     // 🔹 1. Bugungi bookinglarni olish
//     // Status "active" yoki "empty" bo'lganlar
//     const bookings = await SeatBooking.find({
//       usageStartedAt: { $gte: today, $lt: tomorrow },
//       usageExpiresAt: { $ne: null },
//       status: { $in: ["active", "empty"] },
//     }).lean();

//     const hours = Array.from({ length: 12 }, (_, i) => 9 + i); // 9–20

//     const stats = hours.map((h) => {
//       const start = new Date(today);
//       start.setHours(h, 0, 0, 0);

//       const end = new Date(today);
//       end.setHours(h + 1, 0, 0, 0);

//       const inRange = bookings.filter(
//         (b) => b.usageStartedAt < end && b.usageExpiresAt > start
//       );

//       let totalMs = 0;
//       const usersSet = new Set();

//       inRange.forEach((b) => {
//         const s = b.usageStartedAt < start ? start : b.usageStartedAt;
//         const e = b.usageExpiresAt > end ? end : b.usageExpiresAt;

//         totalMs += e - s;
//         usersSet.add(b.userId?.toString());
//       });

//       return {
//         hour: `${h}:00`,
//         hoursUsed: +(totalMs / 1000 / 60 / 60).toFixed(2),
//         uniqueUsers: usersSet.size,
//       };
//     });

//     // 🔹 2. Bazaga yozish
//     await DailyStats.findOneAndUpdate(
//       { date: today },
//       { date: today, data: stats },
//       { upsert: true, new: true }
//     );

//     console.log("📊 Bugungi statistika saqlandi:", stats);
//   });
// }
