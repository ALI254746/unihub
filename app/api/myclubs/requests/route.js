//api//myclubs//requests//route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club";
import ClubJoinRequest from "@/models/Clubjoin";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; // <-- BUNI QO‘SHING

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  await connectDB();

  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("unihub_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Token yo'q" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // ✅ userId ga tegishli klublarni topamiz
    const clubs = await Club.find({ userId: userId });
    console.log(
      "🟡 Klublar topildi:",
      clubs.map((c) => ({ id: c._id, name: c.name }))
    );
    // Har bir klub uchun unga tegishli pending so‘rovlarni olamiz
    const clubsWithRequests = await Promise.all(
      clubs.map(async (club) => {
        console.log("🔍 Tekshiruv clubId:", club._id.toString());
        const requests = await ClubJoinRequest.find({
          clubId: club._id.toString(),
          ownerId: new mongoose.Types.ObjectId(userId),
        });
        console.log(
          `🔍 Club: ${club.name} (${club._id}) uchun so‘rovlar topildi:`,
          requests.length
        );

        return {
          _id: club._id,
          name: club.name,
          description: club.description,
          interests: club.interest,
          pendingRequests: requests,
        };
      })
    );
    console.log("✅ Natijaviy response:", clubsWithRequests);
    return NextResponse.json({ data: clubsWithRequests }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Server xatoligi", error: err.message },
      { status: 500 }
    );
  }
}
