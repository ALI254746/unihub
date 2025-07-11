// app/api/adminapi/talabaxizmatlari/[id]/route.js

import { connectDB } from "@/lib/mongodb";
import TalabaXizmati from "@/models/talabaxizmatlari";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await TalabaXizmati.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ message: "❌ O‘chirildi", data: deleted });
  } catch (err) {
    console.error("O‘chirishda xatolik:", err);
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}
