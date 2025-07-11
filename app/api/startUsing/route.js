import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req) {
  await connectDB();
  const cookieStore = await cookies();

  try {
    const { seatId, scannedQR, usageDuration } = await req.json();
    console.log("📩 Request body:", { seatId, scannedQR, usageDuration });

    const token = cookieStore.get("unihub_token")?.value;
    if (!token) {
      console.log("⛔ Token yo‘q");
      return NextResponse.json({ error: "Token topilmadi" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const parsedQR = JSON.parse(scannedQR);
    if (parsedQR.seatId !== seatId) {
      console.log("❌ QR va seatId mos emas:", parsedQR.seatId, "!=", seatId);
      return NextResponse.json(
        { error: "QR noto‘g‘ri yoki joy mos emas" },
        { status: 400 }
      );
    }

    const now = new Date();
    const qrExpiresAt = new Date(parsedQR.expiresAt);
    if (qrExpiresAt < now) {
      console.log("⏳ QR muddati tugagan:", qrExpiresAt, "<", now);
      return NextResponse.json(
        { error: "QR muddati tugagan" },
        { status: 400 }
      );
    }

    // 🟢 MongoDB: holatni "active" ga o‘tkazamiz
    const usageExpiresAt = new Date(now.getTime() + usageDuration * 60000);
    const booking = await SeatBooking.findOneAndUpdate(
      { seatId, userId, status: "booked" },
      {
        status: "active",
        usageStartedAt: now,
        usageExpiresAt,
        expiresAt: null, // band qilish tugadi
      },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { error: "Booking topilmadi yoki allaqachon ishlatilgan" },
        { status: 404 }
      );
    }

    // 🧹 Redis: eski band qilish (booked) ma’lumotini o‘chiramiz
    if (!redis.isOpen) await redis.connect();
    await redis.del(`seat:${seatId}`);

    // 🟢 Redis: yangi active holat bilan yozamiz (foydalanuvchi hali foydalanmoqda)
    await redis.setEx(
      `seat:${seatId}`,
      usageDuration * 60,
      JSON.stringify({
        seatId,
        status: "active",
        usageStartedAt: now.toISOString(),
        usageExpiresAt: usageExpiresAt.toISOString(),
        firstName: booking.firstName,
        lastName: booking.lastName,
      })
    );

    console.log("🚀 Joy active bo‘ldi va Redis yangilandi");
    return NextResponse.json({ message: "Foydalanish boshlandi", booking });
  } catch (error) {
    console.error("❌ startUsing error:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
