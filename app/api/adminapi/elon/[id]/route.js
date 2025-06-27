import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // MongoDB ulanish
import Elon from "@/models/Elon";

export async function DELETE(_, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deleted = await Elon.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "E’lon topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ message: "O‘chirildi" }, { status: 200 });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
