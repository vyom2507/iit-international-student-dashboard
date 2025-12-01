// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

const COOKIE_NAME = "student_session";

function buildRedirectLogoutResponse(req: Request) {
  const url = new URL(req.url);
  const homeUrl = new URL("/", url.origin);

  const res = NextResponse.redirect(homeUrl);

  // Clear the session cookie
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });

  return res;
}

export async function GET(req: Request) {
  return buildRedirectLogoutResponse(req);
}

export async function POST(req: Request) {
  return buildRedirectLogoutResponse(req);
}
