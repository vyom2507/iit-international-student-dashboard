// app/api/chat/rooms/pin/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "student_session";

type JwtPayload = {
  id: string;
};

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

export async function POST(req: Request) {
  const studentId = getStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { roomSlug, pin } = body as { roomSlug?: string; pin?: boolean };

  if (!roomSlug || typeof pin !== "boolean") {
    return NextResponse.json(
      { error: "roomSlug and pin are required" },
      { status: 400 }
    );
  }

  const room = await prisma.chatRoom.findUnique({
    where: { slug: roomSlug }
  });

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  if (pin) {
    await prisma.studentPinnedRoom.upsert({
      where: {
        studentId_roomId: {
          studentId,
          roomId: room.id
        }
      },
      create: {
        studentId,
        roomId: room.id
      },
      update: {}
    });
  } else {
    await prisma.studentPinnedRoom.deleteMany({
      where: {
        studentId,
        roomId: room.id
      }
    });
  }

  return NextResponse.json({ ok: true });
}
