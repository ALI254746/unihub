import { connectDB } from "@/lib/mongodb";
import UserStats from "@/models/statistikatopusers/topUsers";

export default async function handler(req, res) {
  try {
    console.log("🔹 TopUsers API chaqirildi");
    await connectDB();
    console.log("🔹 MongoDB ga ulandi");

    // Foydalanuvchilar statistikasi
    const stats = await UserStats.find().sort({ "dailyStats.date": -1 }).lean();
    console.log(`🔹 ${stats.length} foydalanuvchi statistikasi topildi`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transformedStats = stats.map((user) => {
      const todayStat = user.dailyStats?.find(
        (d) => new Date(d.date).getTime() === today.getTime()
      );

      console.log(
        `🔹 ${user.fullName} bugungi minutlar: ${todayStat?.minutes || 0}`
      );

      return {
        userId: user.user,
        fullName: user.fullName,
        faculty: user.faculty,
        course: user.course,
        clubs: user.clubs,
        topSeat: user.topSeat,
        totalActiveMinutes: todayStat?.minutes || 0,
      };
    });

    console.log("🔹 Transform qilingan ma'lumot:", transformedStats);

    res.status(200).json(transformedStats);
  } catch (error) {
    console.error("❌ Xato API:", error);
    res.status(500).json({ message: "Server xatosi" });
  }
}
