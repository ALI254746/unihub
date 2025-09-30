import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req) {
  console.log("🔹 POST /startUsing ishga tushdi");
  await connectDB();
  console.log("✅ MongoDB ga ulandi");

  const cookieStore = await cookies();

  try {
    const { seatId, scannedQR, usageDuration } = await req.json();
    console.log("📩 Request body:", { seatId, scannedQR, usageDuration });

    const token = cookieStore.get("unihub_token")?.value;
    console.log("🔑 Token:", token ? "Topildi" : "Yo‘q");
    if (!token) {
      console.log("⛔ Token yo‘q");
      return NextResponse.json({ error: "Token topilmadi" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🧾 JWT decoded:", decoded);
    const userId = decoded.userId;

    const parsedQR = JSON.parse(scannedQR);
    console.log("🔍 QR parsed:", parsedQR);
    if (parsedQR.seatId !== seatId) {
      console.log("❌ QR va seatId mos emas:", parsedQR.seatId, "!=", seatId);
      return NextResponse.json(
        { error: "QR noto‘g‘ri yoki joy mos emas" },
        { status: 400 }
      );
    }

    const now = new Date();
    console.log("⏰ Hozirgi vaqt:", now);

    const qrExpiresAt = new Date(parsedQR.expiresAt);
    console.log("⏳ QR expiresAt:", qrExpiresAt);
    if (qrExpiresAt < now) {
      console.log("⏳ QR muddati tugagan:", qrExpiresAt, "<", now);
      return NextResponse.json(
        { error: "QR muddati tugagan" },
        { status: 400 }
      );
    }

    // 🟢 Avval bookingni topamiz (status booked)
    console.log("🔎 Bookingni qidiryapmiz...");
    let bookingb = await SeatBooking.findOne({
      seatId,
      userId,
      status: "booked",
    });
    console.log("📌 Booking topildi:", bookingb);
    if (!bookingb) {
      return NextResponse.json(
        { error: "Booking topilmadi yoki allaqachon ishlatilgan" },
        { status: 404 }
      );
    }

    // 🟢 MongoDB: holatni "active" ga o‘tkazamiz
    const usageExpiresAt = new Date(now.getTime() + usageDuration * 60000);
    console.log("🕒 usageExpiresAt hisoblandi:", usageExpiresAt);

    const booking = await SeatBooking.findOneAndUpdate(
      { seatId, userId, status: "booked" },
      {
        status: "active",
        usageStartedAt: now,
        usageExpiresAt,
        expiresAt: null, // booked tugadi
      },
      { new: true }
    );
    console.log("📌 Booking active qilindi:", booking);

    if (!booking) {
      console.log("❌ Booking active qilinmadi");
      return NextResponse.json(
        { error: "Booking topilmadi yoki allaqachon ishlatilgan" },
        { status: 404 }
      );
    }

    // 🧹 Redis: eski booked ma’lumotini o‘chiramiz
    console.log("🗑 Redis eski seat ma’lumotini o‘chirayapmiz:", seatId);
    if (!redis.isOpen) await redis.connect();
    await redis.del(`seat:${seatId}`);
    console.log("✅ Redis eski seat o‘chirildi");

    // 🟢 Redis: active holat bilan saqlaymiz
    console.log("💾 Redisga yangi active seat ma’lumotini saqlayapmiz...");
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
        faculty: booking.faculty,
      })
    );
    console.log("✅ Redis yangilandi:", `seat:${seatId}`);

    console.log("🚀 Joy active bo‘ldi va Redis yangilandi");
    return NextResponse.json({ message: "Foydalanish boshlandi", booking });
  } catch (error) {
    console.error("❌ startUsing error:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
