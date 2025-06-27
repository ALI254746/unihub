import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // MongoDB ulanish
import Elon from "@/models/Elon"; // Model

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, category } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: "Barcha maydonlar to‘ldirilishi shart" },
        { status: 400 }
      );
    }

    const newElon = await Elon.create({ title, description, category });

    return NextResponse.json({ newElon }, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
// GET: barcha e'lonlarni olish
export async function GET() {
  try {
    await connectDB();

    const elonlar = await Elon.find().sort({ createdAt: -1 }); // eng oxirgi birinchi
    return NextResponse.json(elonlar, { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ message: "Server xatosi" }, { status: 500 });
  }
}
