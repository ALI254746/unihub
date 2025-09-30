// app/api/myclubs/[clubId]/members/[userId]/remove/route.js
import { connectDB } from "@/lib/mongodb";
import Club from "@/models/club";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("unihub_token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Token not found" }), {
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    const { clubId, userId } = await params;
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const club = await Club.findById(clubId).populate("members.user"); // populate agar ishlatilsa
    if (!club)
      return new Response(JSON.stringify({ error: "Club not found" }), {
        status: 404,
      });

    if (club.userId.toString() !== decoded.userId) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
      });
    }

    // ❌ Filter array safely
    club.members = club.members.filter(
      (m) => m.user._id.toString() !== userId.toString()
    );
    await club.save();

    // ❌ User role update
    await User.findByIdAndUpdate(userId, { role: "user" });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error removing member:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
