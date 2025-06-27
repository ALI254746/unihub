// app/api/clubs/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club"; // mavjud klub modeli

export async function DELETE(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    await Club.findByIdAndDelete(id);

    return NextResponse.json({ message: "Klub o‘chirildi" });
  } catch (error) {
    return NextResponse.json({ error: "Xatolik" }, { status: 500 });
  }
}
