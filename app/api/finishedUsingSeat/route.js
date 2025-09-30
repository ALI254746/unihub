import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req) {
  await connectDB();
  const cookieStore = await cookies();

  try {
    console.log("📥 API chaqirildi: /api/finishusing");

    const { seatId } = await req.json();
    console.log("🎯 seatId:", seatId);

    const token = cookieStore.get("unihub_token")?.value;
    if (!token) {
      console.warn("⛔ Token topilmadi");
      return NextResponse.json({ error: "Token topilmadi" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log("✅ Token tekshirildi, userId:", userId);

    const booking = await SeatBooking.findOne({
      seatId,
      userId,
      status: "active",
    });

    if (!booking) {
      console.warn("❌ Faol joy topilmadi yoki sizga tegishli emas");
      return NextResponse.json(
        { error: "Faol joy topilmadi yoki sizga tegishli emas" },
        { status: 404 }
      );
    }

    console.log("📌 Aktiv booking topildi:", booking);

    const startedAt = booking.usageStartedAt;
    const finishedAt = new Date();
    const duration = Math.ceil((finishedAt - startedAt) / 1000 / 60); // daqiqa

    console.log("⏱ Vaqtlar:", {
      startedAt,
      finishedAt,
      duration,
    });

    const sessionDate = new Date(startedAt);
    sessionDate.setHours(0, 0, 0, 0); // faqat sana

    // ➕ usageSessions ga qo‘shish
    const userUpdate = await User.findByIdAndUpdate(userId, {
      $inc: { totalActiveMinutes: duration },
      $push: {
        usageSessions: {
          seatId,
          startedAt,
          finishedAt,
          duration,
          date: sessionDate,
        },
      },
    });

    console.log("🧾 Foydalanuvchi usageSessions yangilandi:", userUpdate);

    // SeatBooking ni tozalash
    const cleared = await SeatBooking.findOneAndUpdate(
      { seatId, userId, status: "active" },
      {
        status: "empty",

        usageExpiresAt: finishedAt, // tugash vaqtini yozib qo'yamiz
      }
    );

    console.log("🧹 SeatBooking tozalandi:", cleared);

    // Redis tozalash
    if (!redis.isOpen) await redis.connect();
    await redis.del(`seat:${seatId}`);
    console.log(`🚮 Redis tozalandi: seat:${seatId}`);

    return NextResponse.json({ message: "Joydan foydalanish tugatildi" });
  } catch (err) {
    console.error("❌ Xatolik:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
