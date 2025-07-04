import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const cookieStore = await cookies();

  try {
    const { seatId, scannedQR, usageDuration } = await req.json();
    console.log("📩 Request body:", { seatId, scannedQR, usageDuration });
    const token = cookieStore.get("unihub_token")?.value;
    console.log("⛔ Token yo‘q");
    if (!token) {
      console.log("⛔ Token yo‘q");
      return NextResponse.json({ error: "Token topilmadi" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log("🔐 TOKEN PAYLOAD:", decoded);
    console.log("👤 User ID:", userId);
    const parsedQR = JSON.parse(scannedQR);
    console.log("📦 Parsed QR:", parsedQR);

    // ⚠️ QR va joy mosligini tekshiramiz
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
    console.log("🔍 Bookingni izlash:", { seatId, userId, status: "booked" });
    // 🟢 Joyni faollashtiramiz
    const booking = await SeatBooking.findOneAndUpdate(
      { seatId, userId, status: "booked" },
      {
        status: "active",
        usageStartedAt: now,
        usageExpiresAt: new Date(now.getTime() + usageDuration * 60000),
      },
      { new: true }
    );
    console.log("Booking started:", booking);
    if (!booking) {
      return NextResponse.json(
        { error: "Booking topilmadi yoki allaqachon ishlatilgan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Foydalanish boshlandi", booking });
  } catch (error) {
    console.error("startUsing error:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
