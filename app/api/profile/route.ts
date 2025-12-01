// app/api/profile/route.ts
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

function getCurrentStudentId() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const secret = process.env.AUTH_JWT_SECRET;

  if (!token || !secret) return null;

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload.id;
  } catch {
    return null;
  }
}

export async function GET() {
  const studentId = getCurrentStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      fullName: true,
      email: true,
      studentType: true,
      program: true,
      avatarUrl: true,
      isAdmin: true,
      lastActiveRoom: {
        select: { slug: true, name: true }
      }
    }
  });

  return NextResponse.json({ student });
}

export async function PUT(req: Request) {
  const studentId = getCurrentStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { fullName, program, avatarUrl } = body as {
    fullName?: string;
    program?: string;
    avatarUrl?: string | null;
  };

  if (!fullName || !program) {
    return NextResponse.json(
      { error: "Full name and program are required." },
      { status: 400 }
    );
  }

  const updated = await prisma.student.update({
    where: { id: studentId },
    data: {
      fullName,
      program,
      avatarUrl: avatarUrl ?? undefined
    },
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

  return NextResponse.json({ student: updated });
}
