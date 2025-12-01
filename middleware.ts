// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/pre-arrival",
  "/campus-navigation",
  "/academic-integration",
  "/social-networking",
  "/resource-directory",
  "/marketplace",
  "/admin",
  "/profile" 
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard specific routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = req.cookies.get("student_session")?.value;

  // If no JWT cookie → redirect to login
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // (Simple guard: just check cookie exists. 
  // If you want to decode JWT here, we can extend this.)

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pre-arrival/:path*",
    "/campus-navigation/:path*",
    "/academic-integration/:path*",
    "/social-networking/:path*",
    "/resource-directory/:path*",
    "/marketplace/:path*",
    "/admin/:path*",
    "/profile/:path*"
  ]
};
