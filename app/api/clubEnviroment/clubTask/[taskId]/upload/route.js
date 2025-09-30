// import { connectDB } from "@/lib/mongodb";
// import Task from "@/models/Task";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import fs from "fs";
// import path from "path";

// export async function POST(req, { params }) {
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

//     const formData = await req.formData();
//     const file = formData.get("file");
//     const firstName = formData.get("firstName");
//     const lastName = formData.get("lastName");

//     if (!file)
//       return new Response(JSON.stringify({ error: "No file uploaded" }), {
//         status: 400,
//       });

//     // Faylni saqlash (server/public/uploads folderga)
//     const uploadsDir = path.join(process.cwd(), "public/uploads");
//     if (!fs.existsSync(uploadsDir))
//       fs.mkdirSync(uploadsDir, { recursive: true });

//     const filePath = path.join(uploadsDir, file.name);
//     const buffer = Buffer.from(await file.arrayBuffer());
//     fs.writeFileSync(filePath, buffer);

//     const fileUrl = `/uploads/${file.name}`;

//     const task = await Task.findById(taskId);
//     if (!task)
//       return new Response(JSON.stringify({ error: "Task not found" }), {
//         status: 404,
//       });

//     task.uploadedFiles.push({
//       userId: decoded.userId,
//       firstName,
//       lastName,
//       fileUrl,
//     });

//     await task.save();

//     return new Response(JSON.stringify({ success: true, task, fileUrl }), {
//       status: 200,
//     });
//   } catch (err) {
//     console.error("Error uploading file:", err);
//     return new Response(JSON.stringify({ error: "Server error" }), {
//       status: 500,
//     });
//   }
// }
