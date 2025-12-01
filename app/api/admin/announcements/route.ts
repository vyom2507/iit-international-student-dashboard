// app/api/admin/announcements/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "student_session";

type JwtPayload = {
  id: string;
  isAdmin?: boolean;
};

function getAdmin() {
  const token = cookies().get(COOKIE_NAME)?.value;
  const secret = process.env.AUTH_JWT_SECRET;
  if (!token || !secret) return null;
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    if (!payload.isAdmin) return null;
    return payload.id;
  } catch {
    return null;
  }
}

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      createdBy: {
        select: { fullName: true, email: true }
      }
    }
  });

  return NextResponse.json({ announcements });
}

export async function POST(req: Request) {
  const adminId = getAdmin();
  if (!adminId) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { title, body: message } = body as {
    title?: string;
    body?: string;
  };

  if (!title || !message) {
    return NextResponse.json(
      { error: "Title and body are required." },
      { status: 400 }
    );
  }

  const ann = await prisma.announcement.create({
    data: {
      title,
      body: message,
      createdById: adminId
    },
    include: {
      createdBy: {
        select: { fullName: true, email: true }
      }
    }
  });

  return NextResponse.json({ announcement: ann });
}
