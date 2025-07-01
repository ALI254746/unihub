import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ClubJoinRequest from "@/models/Clubjoin";

export async function DELETE(request, { params }) {
  await connectDB();

  const requestId = params.requestId;

  try {
    // So‘rovni topib o‘chiramiz
    const deleted = await ClubJoinRequest.findByIdAndDelete(requestId);

    if (!deleted) {
      return NextResponse.json(
        { message: "So‘rov topilmadi" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "So‘rov muvaffaqiyatli rad etildi" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server xatoligi", error: err.message },
      { status: 500 }
    );
  }
}
