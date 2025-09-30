// import { connectDB } from "@/lib/mongodb";
// import Task from "@/models/clubEnviroment/Task";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const cookieStore = await cookies();
//     const token = cookieStore.get("unihub_token")?.value;
//     if (!token)
//       return new Response(JSON.stringify({ error: "Token not found" }), {
//         status: 401,
//       });

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//       return new Response(JSON.stringify({ error: "Invalid token" }), {
//         status: 401,
//       });
//     }

//     if (decoded.role !== "club-owner" && decoded.role !== "admin") {
//       return new Response(JSON.stringify({ error: "Not authorized" }), {
//         status: 403,
//       });
//     }
//     const body = await req.json();
//     console.log("📥 Kelgan body:", body);

//     const { title, description, deadline, fileUrl, clubId } = body;

//     const task = new Task({
//       title,
//       description,
//       deadline,
//       fileUrl: fileUrl || null,
//       clubId,
//       uploadedFiles: [],
//     });

//     await task.save();

//     return new Response(JSON.stringify({ success: true, task }), {
//       status: 201,
//     });
//   } catch (err) {
//     console.error("Error creating task:", err);
//     return new Response(JSON.stringify({ error: "Server error" }), {
//       status: 500,
//     });
//   }
// }
