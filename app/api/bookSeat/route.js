import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import redis from "@/lib/redis";

export async function POST(request) {
  await connectDB();

  try {
    const { seatId, durationMinutes } = await request.json();

    if (!seatId || !durationMinutes) {
      return new Response(
        JSON.stringify({ error: "Missing seatId or durationMinutes" }),
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;
    if (!token)
      return new Response(JSON.stringify({ error: "No token" }), {
        status: 401,
      });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    const existingSeatBooking = await SeatBooking.findOne({
      seatId,
      status: "booked",
      expiresAt: { $gt: new Date() },
    });

    if (existingSeatBooking) {
      return new Response(
        JSON.stringify({ error: "Bu stul allaqachon band qilingan" }),
        { status: 400 }
      );
    }

    const existingBooking = await SeatBooking.findOne({
      userId: user._id,
      status: "booked",
      expiresAt: { $gt: new Date() },
    });

    if (existingBooking) {
      return new Response(
        JSON.stringify({
          error: "Siz allaqachon bir stulni band qilgansiz",
        }),
        { status: 400 }
      );
    }

    // const activeBooking = await SeatBooking.findOne({
    //   userId: user._id,
    //   status: "active",
    //   usageExpiresAt: { $gt: new Date() },
    // });

    // if (activeBooking) {
    //   return new Response(
    //     JSON.stringify({ error: "Siz allaqachon faol stulga egasiz" }),
    //     { status: 400 }
    //   );
    // }

    await SeatBooking.updateMany(
      {
        status: "booked",
        $or: [
          { expiresAt: { $lt: new Date() } },
          {
            expiresAt: null,
            createdAt: { $lt: new Date(Date.now() - 10 * 60000) },
          }, // 10 daqiqa oldingi bookinglar
        ],
      },
      {
        $set: {
          status: "empty",
          userId: null,
          firstName: null,
          lastName: null,
          usageStartedAt: null,
          usageExpiresAt: null,
        },
      }
    );

    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationMinutes * 60000);

    const booking = await SeatBooking.findOneAndUpdate(
      { seatId, status: { $in: ["empty", "booked"] } },
      {
        $set: {
          seatId,
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          status: "booked",
          expiresAt,
          usageStartedAt: null,
          usageExpiresAt: null,
          createdAt: now,
        },
      },
      { upsert: true, new: true }
    );
    console.log("✅ DB saqlandi:", booking);
    if (!redis.isOpen) await redis.connect();

    await redis.setEx(
      `seat:${seatId}`,
      durationMinutes * 60,
      JSON.stringify({
        seatId,
        createdAt: now,
        expiresAt,
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id.toString(), // 🟢 BU QATOR MUHIM
        status: "booked",
        expiresAt,
      })
    );

    console.log("✅ Redisga saqlandi:", seatId);

    return new Response(JSON.stringify({ success: true, booking }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ POST booking error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  await connectDB();

  try {
    const now = new Date();

    if (!redis.isOpen) await redis.connect();

    const keys = await redis.keys("seat:*");

    if (keys.length > 0) {
      const values = await redis.mGet(keys);
      const parsed = values.filter(Boolean).map((val) => JSON.parse(val));

      console.log("✅ Ma'lumot Redisdan olindi:", parsed.length, "ta");
      return new Response(JSON.stringify({ bookings: parsed }), {
        status: 200,
      });
    }

    const bookings = await SeatBooking.find({
      expiresAt: { $gt: now },
    });

    const formatted = bookings.map((b) => ({
      seatId: b.seatId,
      userId: b.userId?.toString(), // ✅ Bu to‘g‘ri yo‘l
      createdAt: b.createdAt,
      expiresAt: b.expiresAt,
      firstName: b.firstName,
      lastName: b.lastName,
      status: b.status,
    }));

    for (const seat of formatted) {
      await redis.setEx(`seat:${seat.seatId}`, 600, JSON.stringify(seat));
    }

    console.log(
      "✅ Ma'lumot DBdan olindi va Redisga cache qilindi:",
      formatted.length,
      "ta"
    );

    return new Response(JSON.stringify({ bookings: formatted }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ GET booking error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
