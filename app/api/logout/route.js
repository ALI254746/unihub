import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("unihub_token", "", {
    httpOnly: true,
    expires: new Date(0), // darhol o‘chadi
    path: "/",
  });
  return response;
}
