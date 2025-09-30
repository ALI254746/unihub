// // app/api/tasks/[taskId]/files/route.js
// import { connectDB } from "@/lib/mongodb";
// import Task from "@/models/Task";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function GET(req, { params }) {
//   try {
//     await connectDB();
//     const { taskId } = params;

//     const cookieStore = cookies();
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

//     const task = await Task.findById(taskId);
//     if (!task)
//       return new Response(JSON.stringify({ error: "Task not found" }), {
//         status: 404,
//       });

//     return new Response(JSON.stringify({ uploadedFiles: task.uploadedFiles }), {
//       status: 200,
//     });
//   } catch (err) {
//     console.error("Error fetching uploaded files:", err);
//     return new Response(JSON.stringify({ error: "Server error" }), {
//       status: 500,
//     });
//   }
// }
