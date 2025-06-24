import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = [
  "/chat",
  "/elonlar",
  "/profile",
  "/talabalarkulubi",
  "/muammolar",
  "/ustozreytingi",
  "/staff",
  "/darsresurslari",
];

const adminRoutes = ["/admin"];

export async function middleware(request) {
  const token = request.cookies.get("unihub_token")?.value;
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );
  const isAdmin = adminRoutes.some((route) => currentPath.startsWith(route));

  if (!token && (isProtected || isAdmin)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      console.log("TOKEN PAYLOAD:", payload); // 👈 terminalga chiqadi
      // Admin bo'lmagan foydalanuvchi admin sahifaga kirsa, bosh sahifaga redirect qilamiz
      if (isAdmin && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Aks holda (ruxsat berilgan yo'l bo‘lsa) davom etaveradi
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/chat/:path*",
    "/elonlar/:path*",
    "/profile/:path*",
    "/talabalarkulubi/:path*",
    "/muammolar/:path*",
    "/ustozreytingi/:path*",
    "/staff/:path*",
    "/darsresurslari/:path*",
    "/admin/:path*",
  ],
};
