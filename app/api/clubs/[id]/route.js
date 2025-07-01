// app/api/clubs/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club"; // mavjud klub modeli
//admin clubni o'chirish uchun
// admin clubni o'chirish uchun
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

export async function GET(_, { params }) {
  console.log("Keldi params.id:", params.id);
  await connectDB();
  try {
    const club = await Club.findById(params.id).populate(
      "members.user",
      "avatar name email"
    );
    if (!club) {
      return NextResponse.json({ message: "Klub topilmadi" }, { status: 404 });
    }
    return NextResponse.json(club, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error: error.message },
      { status: 500 }
    );
  }
}
