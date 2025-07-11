// app/api/adminapi/talabaxizmatlari/approve/[id]/route.js

import { connectDB } from "@/lib/mongodb";
import TalabaXizmati from "@/models/talabaxizmatlari";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const updated = await TalabaXizmati.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ message: "✅ Tasdiqlandi", data: updated });
  } catch (err) {
    console.error("Tasdiqlashda xatolik:", err);
    return NextResponse.json({ message: "Xatolik" }, { status: 500 });
  }
}
