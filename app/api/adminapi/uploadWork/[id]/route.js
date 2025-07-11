import { connectDB } from "@/lib/mongodb";
import AdminWork from "@/models/tayyorishpdf";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const deleted = await AdminWork.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ message: "O'chirildi" }, { status: 200 });
  } catch (error) {
    console.error("O‘chirishda xatolik:", error);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
