import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("unihub_token")?.value;

  if (!token) {
    return { error: NextResponse.json({ message: "Avtorizatsiya talab etiladi" }, { status: 401 }) };
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return { payload };
  } catch {
    return { error: NextResponse.json({ message: "Token yaroqsiz" }, { status: 401 }) };
  }
}

export async function requireAdmin() {
  const { error, payload } = await verifyToken();
  if (error) return { error };

  if (payload.role !== "admin") {
    return {
      error: NextResponse.json(
        { message: "Faqat admin foydalanuvchilar uchun ruxsat etilgan" },
        { status: 403 }
      ),
    };
  }

  return { payload };
}

export async function requireAuth() {
  return verifyToken();
}
