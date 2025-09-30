import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import SeatBooking from "@/models/SeatBooking";
import UserStats from "@/models/statistikatopusers/topUsers";
import Club from "@/models/club";

// Har kuni 00:10 da ishlaydi
export function statistikatopusers() {
  cron.schedule("10 * * * *", async () => {
    console.log("⏳ Kunlik statistika yangilanmoqda...");
    try {
      await connectDB();

      const users = await User.find().populate("clubId", "name");

      for (const user of users) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // ✅ Userning bugungi bookinglari
        const bookings = await SeatBooking.find({
          userId: user._id,
          usageStartedAt: { $gte: today },
        });

        // ✅ Jami ishlatilgan vaqt
        let totalActiveMinutes = 0;
        const seatUsageMap = {};

        bookings.forEach((b) => {
          if (!b.usageStartedAt || !b.usageExpiresAt) return;

          const start = new Date(b.usageStartedAt);
          const end = new Date(b.usageExpiresAt);
          const duration = Math.max(0, (end - start) / 1000 / 60); // daqiqa

          totalActiveMinutes += duration;

          if (!seatUsageMap[b.seatId]) seatUsageMap[b.seatId] = 0;
          seatUsageMap[b.seatId] += duration;
        });

        // ✅ Eng ko‘p ishlatilgan stul
        let topSeatId = null;
        let maxUsage = 0;
        for (const [seatId, minutes] of Object.entries(seatUsageMap)) {
          if (minutes > maxUsage) {
            maxUsage = minutes;
            topSeatId = seatId;
          }
        }

        // ✅ UserStats yangilash
        const updatedStats = await UserStats.findOneAndUpdate(
          { user: user._id },
          {
            $set: {
              user: user._id,
              fullName: `${user.firstName} ${user.lastName}`,
              faculty: user.faculty || "",
              course: user.course || "",
              clubs: user.clubId
                ? [
                    {
                      clubId: user.clubId._id,
                      role: user.role === "club_owner" ? "owner" : "member",
                    },
                  ]
                : [],
              topSeat: {
                seatId: topSeatId,
                usageCount: maxUsage,
              },
            },
            $inc: { totalActiveMinutes },
            $push: {
              dailyStats: {
                date: new Date(),
                minutes: totalActiveMinutes,
              },
              usageSessions: bookings.map((b) => ({
                seatId: b.seatId,
                startedAt: b.usageStartedAt,
                finishedAt: b.usageExpiresAt,
                duration: Math.max(
                  0,
                  (new Date(b.usageExpiresAt) - new Date(b.usageStartedAt)) /
                    1000 /
                    60
                ),
              })),
            },
          },
          { upsert: true, new: true }
        );

        console.log("📊 Foydalanuvchi statistikasi:", updatedStats);
      }

      console.log("✅ Kunlik statistika yangilandi!");
    } catch (error) {
      console.error("❌ Xato (kunlik statistika):", error);
    }
  });
}
