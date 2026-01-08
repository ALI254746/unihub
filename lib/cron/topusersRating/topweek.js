import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import SeatBooking from "@/models/SeatBooking";
import UserStats from "@/models/statistikatopusers/topUsers";
import Club from "@/models/club";

// Haftalik cron: har soatda ishga tushadi (xohlasangiz cron vaqtini o'zgartiring)
export function statistikatopusersWeekly() {
  cron.schedule("* * * * *", async () => {
    console.log("⏳ Haftalik statistika yangilanmoqda...");
    try {
      await connectDB();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Dushanba = haftaning boshlanishi
      const dayOfWeek = today.getDay(); // Yakshanba=0, Dushanba=1
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - diffToMonday);
      weekStart.setHours(0, 0, 0, 0);

      const users = await User.find().populate("clubId", "name");

      const userStatsArray = [];

      for (const user of users) {
        const bookings = await SeatBooking.find({
          userId: user._id,
          usageStartedAt: { $gte: weekStart },
        });

        let totalActiveMinutes = 0;
        const seatUsageMap = {};

        bookings.forEach((b) => {
          if (!b.usageStartedAt || !b.usageExpiresAt) return;

          const start = new Date(b.usageStartedAt);
          const end = new Date(b.usageExpiresAt);
          const duration = Math.max(0, (end - start) / 1000 / 60);

          totalActiveMinutes += duration;
          if (!seatUsageMap[b.seatId]) seatUsageMap[b.seatId] = 0;
          seatUsageMap[b.seatId] += duration;
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
          topSeatId,
          maxUsage,
        });
      }

      // Top 10 foydalanuvchini aniqlash
      const top10 = userStatsArray
        .sort((a, b) => b.totalActiveMinutes - a.totalActiveMinutes)
        .slice(0, 10)
        .map((item, index) => ({ ...item, rank: index + 1 }));

      // Console da chiqarish
      console.log(
        "🏆 Haftalik Top 10 foydalanuvchi (DB ga saqlanishdan oldin):"
      );
      top10.forEach((u) => {
        console.log(
          `#${u.rank} - ${u.fullName} | Faculty: ${u.faculty} | Course: ${
            u.course
          } | Total Minutes: ${u.totalActiveMinutes.toFixed(2)} | Top Seat: ${
            u.topSeatId
          } (${u.maxUsage.toFixed(2)} min)`
        );
      });

      // DB ga saqlash
      for (const item of top10) {
        await UserStats.findOneAndUpdate(
          { user: item.user },
          {
            $set: {
              weekly: {
                weekStart,
                activeMinutes: item.totalActiveMinutes,
                topSeat: { seatId: item.topSeatId, usageCount: item.maxUsage },
                rank: item.rank,
              },
            },
          },
          { upsert: true, new: true }
        );
      }

      console.log(
        "✅ Haftalik top 10 foydalanuvchi statistikasi DB ga saqlandi!"
      );
    } catch (error) {
      console.error("❌ Xato (haftalik statistika):", error);
    }
  });
}
