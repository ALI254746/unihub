import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { clubId } = await params;

    const club = await Club.findById(clubId).populate("members");

    if (!club) {
      return NextResponse.json({ message: "Club topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ data: club.members }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Serverda xatolik", error: err.message },
      { status: 500 }
    );
  }
}
