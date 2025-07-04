import { connectDB } from "@/lib/mongodb";
import SeatBooking from "@/models/SeatBooking";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// Avval foydalanuvchining mavjud aktiv bookingi borligini tekshiramiz

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

    if (!token) {
      return new Response(
        JSON.stringify({ error: "No token found in cookies" }),
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Foydalanuvchining mavjud aktiv bookingi borligini tekshirish
    const existingBooking = await SeatBooking.findOne({
      userId: user._id,
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

    // Ushbu seatId band emasligini tekshirish
    const existingSeatBooking = await SeatBooking.findOne({
      seatId,
      expiresAt: { $gt: new Date() },
    });

    if (existingSeatBooking) {
      return new Response(
        JSON.stringify({ error: "Bu stul allaqachon band qilingan" }),
        { status: 400 }
      );
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationMinutes * 60000);

    // Yangi booking yaratish
    const booking = new SeatBooking({
      seatId,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      expiresAt,
      createdAt: now,
      status: "booked",
    });

    await booking.save();

    return new Response(JSON.stringify({ success: true, booking }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in bookSeat:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  await connectDB();

  try {
    const now = new Date();

    const bookings = await SeatBooking.find({
      expiresAt: { $gt: now },
    });

    const formatted = bookings.map((b) => ({
      seatId: b.seatId,
      createdAt: b.createdAt,
      expiresAt: b.expiresAt,
      firstName: b.firstName,
      lastName: b.lastName,

      status: b.status, // ❗️ Bu qo‘shilmasa isSeatActive() noto‘g‘ri ishlaydi
    }));
    console.log("Formatted bookings:", formatted);
    return new Response(JSON.stringify({ bookings: formatted }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
