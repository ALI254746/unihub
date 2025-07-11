// /api/cancelBooking
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
    const { seatId } = await req.json();
    const token = cookieStore.get("unihub_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Token topilmadi" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const booking = await SeatBooking.findOneAndUpdate(
      { seatId, userId, status: "booked" },
      {
        status: "empty",
        userId: null,
        firstName: null,
        lastName: null,

        usageStartedAt: null,
        usageExpiresAt: null,
      },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { error: "Band joy topilmadi yoki sizga tegishli emas" },
        { status: 404 }
      );
    }

    if (!redis.isOpen) await redis.connect();
    await redis.del(`seat:${seatId}`);

    return NextResponse.json({ message: "Band qilish bekor qilindi" });
  } catch (err) {
    console.error("❌ cancelBooking error:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
