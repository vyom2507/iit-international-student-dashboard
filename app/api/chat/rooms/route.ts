import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "student_session";

type JwtPayload = { id: string };

function getStudentId() {
  const token = cookies().get(COOKIE_NAME)?.value;
  const secret = process.env.AUTH_JWT_SECRET;
  if (!token || !secret) return null;
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    return payload.id;
  } catch {
    return null;
  }
}

const DEFAULT_ROOMS = [
  {
    slug: "new-arrivals",
    name: "🛬 New Arrivals · Fall 2025",
    description: "Coordinate arrival plans, airport pickups, and first-day questions."
  },
  {
    slug: "housing-roommates",
    name: "🏠 Housing & Roommates",
    description: "Find roommates and share housing tips around IIT and Chicago."
  },
  {
    slug: "cs-cyber-cohort",
    name: "💻 CS & Cybersecurity Cohort",
    description: "Connect with peers in CS, Cyber, Data Science, and related programs."
  }
];

export async function GET() {
  try {
    for (const room of DEFAULT_ROOMS) {
      await prisma.chatRoom.upsert({
        where: { slug: room.slug },
        create: room,
        update: {}
      });
    }

    const rooms = await prisma.chatRoom.findMany({
      orderBy: { createdAt: "asc" }
    });

    const studentId = getStudentId();
    if (!studentId) {
      return NextResponse.json({
        rooms: rooms.map((r) => ({ ...r, pinned: false, isLastActive: false }))
      });
    }

    const pinned = await prisma.studentPinnedRoom.findMany({
      where: { studentId },
      include: { room: true }
    });

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: { lastActiveRoomId: true }
    });

    const pinnedIds = new Set(pinned.map((p) => p.roomId));
    const lastActiveId = student?.lastActiveRoomId ?? null;

    return NextResponse.json({
      rooms: rooms.map((r) => ({
        ...r,
        pinned: pinnedIds.has(r.id),
        isLastActive: r.id === lastActiveId
      }))
    });
  } catch (error) {
    console.error("GET /api/chat/rooms error:", error);
    return NextResponse.json(
      { error: "Failed to load rooms" },
      { status: 500 }
    );
  }
}
