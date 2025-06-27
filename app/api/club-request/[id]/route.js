// app/api/club-request/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ClubRequest from "@/models/ClubRequest";
export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    await ClubRequest.findByIdAndDelete(id);

    return NextResponse.json({ message: "Klub o‘chirildi" });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik" }, { status: 500 });
  }
}
