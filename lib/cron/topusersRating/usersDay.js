import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import SeatBooking from "@/models/SeatBooking";
import UserStats from "@/models/statistikatopusers/topUsers";
import Club from "@/models/club";

// Har daqiqa ishga tushadi, xohlasang cronni o'zgartir
export function statistikatopusers() {
  cron.schedule("* * * * *", async () => {
    console.log("⏳ Kunlik statistika yangilanmoqda...");
    try {
      await connectDB();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const users = await User.find().populate("clubId", "name");

      const userStatsArray = [];

      for (const user of users) {
        const bookings = await SeatBooking.find({
          userId: user._id,
          usageStartedAt: { $gte: today },
        });

        let totalActiveMinutes = 0;
        const seatUsageMap = {};
        const dailySessions = [];

        bookings.forEach((b) => {
          if (!b.usageStartedAt || !b.usageExpiresAt) return;

          const start = new Date(b.usageStartedAt);
          const end = new Date(b.usageExpiresAt);
          const duration = Math.max(0, (end - start) / 1000 / 60);

          totalActiveMinutes += duration;
          if (!seatUsageMap[b.seatId]) seatUsageMap[b.seatId] = 0;
          seatUsageMap[b.seatId] += duration;

          dailySessions.push({
            seatId: b.seatId,
            startedAt: start,
            finishedAt: end,
            duration,
          });
        });

        let topSeatId = null;
        let maxUsage = 0;
        for (const [seatId, minutes] of Object.entries(seatUsageMap)) {
          if (minutes > maxUsage) {
            maxUsage = minutes;
            topSeatId = seatId;
          }
        }

        userStatsArray.push({
          user: user._id,
          fullName: `${user.firstName} ${user.lastName}`,
          faculty: user.faculty || "",
          course: user.course || "",
          clubs: user.clubId
            ? [
                {
                  clubId: user.clubId._id,
                  name: user.clubId.name,
                  role: user.role === "club_owner" ? "owner" : "member",
                },
              ]
            : [],
          totalActiveMinutes,
          daily: {
            date: today,
            activeMinutes: totalActiveMinutes,
            topSeat: { seatId: topSeatId, usageCount: maxUsage },
            sessions: dailySessions,
          },
        });
      }

      // Top 10 ga saralash
      const top10 = userStatsArray
        .sort((a, b) => b.totalActiveMinutes - a.totalActiveMinutes)
        .slice(0, 10)
        .map((item, index) => ({ ...item, rank: index + 1 }));

      // ✅ Console da chiqarish
      console.log("🏆 Top 10 foydalanuvchi (DB ga saqlanishdan oldin):");
      top10.forEach((u) => {
        console.log(
          `#${u.rank} - ${u.fullName} | Faculty: ${u.faculty} | Course: ${
            u.course
          } | Total Minutes: ${u.totalActiveMinutes.toFixed(2)} | Top Seat: ${
            u.daily.topSeat.seatId
          } (${u.daily.topSeat.usageCount.toFixed(2)} min)`
        );
      });

      // DB ga yozish
      for (const item of top10) {
        await UserStats.findOneAndUpdate(
          { user: item.user },
          {
            $set: {
              user: item.user,
              fullName: item.fullName,
              faculty: item.faculty,
              course: item.course,
              clubs: item.clubs,
              rank: item.rank,
              daily: item.daily,
            },
          },
          { upsert: true, new: true }
        );
      }

      console.log("✅ Top 10 foydalanuvchi statistikasi DB ga saqlandi!");
    } catch (error) {
      console.error("❌ Xato (kunlik statistika):", error);
    }
  });
}
