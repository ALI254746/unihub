import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Issue from "@/models/muammo";

// ✅ GET: Barcha muammolarni olish
export async function GET() {
  await connectDB();
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: issues }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST: Yangi muammo qo‘shish
export async function POST(req) {
  await connectDB();
  try {
    const { title, description, category } = await req.json();

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: "Barcha maydonlar to‘ldirilishi shart" },
        { status: 400 }
      );
    }

    const newIssue = await Issue.create({
      title,
      description,
      category,
    });

    return NextResponse.json(
      { message: "Muammo yaratildi", data: newIssue },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server xatosi", error: error.message },
      { status: 500 }
    );
  }
}
