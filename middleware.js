import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = [
  "/chat",
  "/elonlar",
  "/profile",
  "/talabalarkulubi",
  "/muammolar",
  "/ustozreyting",
  "/staff",
  "/darsresurslari",
  "/turnirlar",
  "/booking",
];

const adminRoutes = ["/admin"];

export async function middleware(request) {
  const token = request.cookies.get("unihub_token")?.value;
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAdminPage = adminRoutes.some((route) => path.startsWith(route));

  if (!token && (isProtected || isAdminPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      if (isAdminPage && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("❌ Token xato yoki eskirgan:", err);
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
    "/ustozreyting/:path*",
    "/staff/:path*",
    "/darsresurslari/:path*",
    "/admin/:path*",
    "/turnirlar/:path*",
    "/booking/:path*",
  ],
};
