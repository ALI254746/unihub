// app/api/me/route.ts
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("unihub_token")?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
    });
  } catch (err) {
    return NextResponse.json({ isLoggedIn: false });
  }
}
