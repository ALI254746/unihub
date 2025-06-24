import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = await cookies(); // `await` kerak emas
  const token = cookieStore.get("unihub_token")?.value;

  if (!token) {
    return Response.json({ isLoggedIn: false });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return Response.json({
      isLoggedIn: true,
    });
  } catch (err) {
    return Response.json({ isLoggedIn: false });
  }
}
