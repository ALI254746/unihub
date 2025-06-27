// lib/getUserFromToken.js
import jwt from "jsonwebtoken";

export default function getUserFromToken(req) {
  const cookieHeader = req.headers.get("unihub_token");
  const token = cookieHeader
    ?.split(";")
    .find((c) => c.trim().startsWith("token"))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
    console.log("token", decoded); // { _id, email, name, ... }
  } catch (err) {
    return null;
  }
}
