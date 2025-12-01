// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "student_session";

type JwtPayload = {
  id: string;
  fullName: string;
  email: string;
  isAdmin?: boolean;
};

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const secret = process.env.AUTH_JWT_SECRET;

    if (!token || !secret) {
      // Not logged in
      return NextResponse.json({ student: null }, { status: 200 });
    }

    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, secret) as JwtPayload;
    } catch {
      // Invalid / expired token → treat as logged out
      return NextResponse.json({ student: null }, { status: 200 });
    }

    const student = await prisma.student.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        studentType: true,
        program: true,
        avatarUrl: true,
        isAdmin: true
      }
    });

    if (!student) {
      return NextResponse.json({ student: null }, { status: 200 });
    }

    return NextResponse.json({ student }, { status: 200 });
  } catch (error) {
    console.error("GET /api/auth/me error:", error);
    return NextResponse.json({ student: null }, { status: 200 });
  }
}
