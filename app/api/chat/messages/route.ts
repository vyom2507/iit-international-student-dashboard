// app/api/chat/messages/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { pusherServer } from "@/lib/pusher";

const COOKIE_NAME = "student_session";

type JwtPayload = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roomSlug = searchParams.get("room");

    if (!roomSlug) {
      return NextResponse.json(
        { error: "Missing room parameter" },
        { status: 400 }
      );
    }

    const room = await prisma.chatRoom.findUnique({
      where: { slug: roomSlug }
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    const messages = await prisma.chatMessage.findMany({
      where: { roomId: room.id },
      orderBy: { createdAt: "asc" },
      take: 100,
      include: {
        student: true
      }
    });

    return NextResponse.json({ room, messages });
  } catch (error) {
    console.error("GET /api/chat/messages error:", error);
    return NextResponse.json(
      { error: "Failed to load messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomSlug, content } = body as {
      roomSlug?: string;
      content?: string;
    };

    if (!roomSlug || !content?.trim()) {
      return NextResponse.json(
        { error: "roomSlug and content are required" },
        { status: 400 }
      );
    }

    // Get current student from JWT cookie
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const secret = process.env.AUTH_JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, secret) as JwtPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    const room = await prisma.chatRoom.findUnique({
      where: { slug: roomSlug }
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    const message = await prisma.chatMessage.create({
      data: {
        roomId: room.id,
        studentId: payload.id,
        content: content.trim()
      },
      include: { student: true }
    });

    const payloadForClients = {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      roomSlug,
      student: {
        id: message.student.id,
        fullName: message.student.fullName,
        avatarUrl: message.student.avatarUrl ?? null
      }
    };

    // 🔴 Trigger Pusher event to update all subscribed clients
    const channel = `chat-room-${roomSlug}`;
    await pusherServer.trigger(channel, "message:new", payloadForClients);

    return NextResponse.json({ message: payloadForClients });
  } catch (error) {
    console.error("POST /api/chat/messages error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
