import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    await connectDB();
    const now = new Date();

    // ✅ BOOKED holatdagi vaqti tugaganlar
    const expiredBooked = await SeatBooking.find({
      status: "booked",
      expiresAt: { $lt: now },
    });

    const bookedSeatIds = expiredBooked.map((b) => b.seatId);

    const updateBooked = await SeatBooking.updateMany(
      { seatId: { $in: bookedSeatIds } },
      {
        $set: {
          status: "empty",
          usageStartedAt: null,
          usageExpiresAt: null,
          userId: null,
          firstName: null,
          lastName: null,
          expiresAt: null,
          createdAt: null,
        },
      }
    );

    // ✅ ACTIVE holatdagi vaqti tugaganlar
    const expiredActive = await SeatBooking.find({
      status: "active",
      usageExpiresAt: { $lt: now },
    });

    const activeSeatIds = expiredActive.map((b) => b.seatId);

    const updateActive = await SeatBooking.updateMany(
      { seatId: { $in: activeSeatIds }, status: "active" },
      {
        $set: {
          status: "empty",
          usageStartedAt: null,
          usageExpiresAt: null,
          userId: null,
          firstName: null,
          lastName: null,
          expiresAt: null,
          createdAt: null,
        },
      }
    );

    // ✅ Redisni tozalaymiz
    const allSeatIds = [...bookedSeatIds, ...activeSeatIds];
    if (!redis.isOpen) await redis.connect();
    for (const seatId of allSeatIds) {
      await redis.del(`seat:${seatId}`);
    }

    // ✅ Log
    console.log(
      `🧹 Booked: ${updateBooked.modifiedCount}, Active: ${updateActive.modifiedCount} stul tozalandi.`
    );

    return NextResponse.json({
      message: `✅ ${updateBooked.modifiedCount} ta booked, ${updateActive.modifiedCount} ta active statusli joylar bo‘shatildi.`,
    });
  } catch (error) {
    console.error("❌ Cleanup error:", error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
