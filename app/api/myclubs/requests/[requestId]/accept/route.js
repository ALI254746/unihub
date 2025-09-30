import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ClubJoinRequest from "@/models/Clubjoin";
import Club from "@/models/club";
import User from "@/models/User";

export async function PATCH(req, { params }) {
  const requestId = await params.requestId;
  await connectDB();

  try {
    const request = await ClubJoinRequest.findById(requestId);
    if (!request) {
      return NextResponse.json(
        { message: "So‘rov topilmadi" },
        { status: 404 }
      );
    }

    const club = await Club.findById(request.clubId);
    if (!club) {
      return NextResponse.json({ message: "Klub topilmadi" }, { status: 404 });
    }

    const user = await User.findById(request.userId);
    if (!user) {
      return NextResponse.json(
        { message: "Foydalanuvchi topilmadi" },
        { status: 404 }
      );
    }

    // 1️⃣ Foydalanuvchi rolini club_member ga o‘zgartirish
    user.role = "club_member";
    user.clubId = club._id;
    await user.save();

    // 2️⃣ Klub a’zolariga qo‘shish (agar oldin bo‘lmasa)
    if (!Array.isArray(club.members)) {
      club.members = [];
    }

    const alreadyMember = club.members.some(
      (m) => m.user && m.user.toString() === user._id.toString()
    );

    if (!alreadyMember) {
      club.members.push({
        user: user._id,
        firstName: request.firstName || user.firstName,
        lastName: request.lastName || user.lastName,
        direction: request.direction || user.direction,
        course: request.course || user.course,
        phone: request.phone || user.phone,
        joinedAt: new Date(),
      });

      await club.save();
    }

    // 3️⃣ So‘rovni o‘chirish
    await ClubJoinRequest.findByIdAndDelete(requestId);

    return NextResponse.json(
      { message: "✅ Foydalanuvchi klubga qo‘shildi va roli o‘zgartirildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Server xatoligi:", error.message);
    return NextResponse.json(
      { message: "Server xatoligi", error: error.message },
      { status: 500 }
    );
  }
}
