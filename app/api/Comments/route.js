// import { connectDB } from "@/lib/mongodb";
// import { NextResponse } from "next/server";
// import Comment from "@/models/Comment";
// import Issue from "@/models/Issue";

// // ✅ Izoh yozish (POST)
// export async function POST(req) {
//   await connectDB();
//   try {
//     const { issueId, author, message } = await req.json();

//     if (!issueId || !author || !message) {
//       return NextResponse.json(
//         { message: "Barcha maydonlar kerak" },
//         { status: 400 }
//       );
//     }

//     const newComment = await Comment.create({ issueId, author, message });

//     // Issue comment sonini oshiramiz
//     await Issue.findByIdAndUpdate(issueId, { $inc: { comments: 1 } });

//     return NextResponse.json(
//       { message: "Izoh qo‘shildi", data: newComment },
//       { status: 201 }
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Server xatosi", error: err.message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Izohlarni olish (GET)
// export async function GET(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const issueId = searchParams.get("issueId");

//   if (!issueId) {
//     return NextResponse.json(
//       { message: "issueId query param kerak" },
//       { status: 400 }
//     );
//   }

//   try {
//     const comments = await Comment.find({ issueId }).sort({ createdAt: -1 });
//     return NextResponse.json({ data: comments }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Server xatosi", error: err.message },
//       { status: 500 }
//     );
//   }
// }
