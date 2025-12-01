// app/api/marketplace/conversations/[id]/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const student = await getCurrentStudent();
  if (!student) return new NextResponse("Unauthorized", { status: 401 });

  const conversation = await prisma.marketplaceConversation.findUnique({
    where: { id: params.id }
  });

  if (!conversation) return new NextResponse("Not found", { status: 404 });

  if (
    conversation.buyerId !== student.id &&
    conversation.sellerId !== student.id
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const messages = await prisma.marketplaceMessage.findMany({
    where: { conversationId: params.id },
    include: {
      sender: {
        select: { id: true, fullName: true }
      }
    },
    orderBy: { createdAt: "asc" }
  });

  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest, { params }: Params) {
  const student = await getCurrentStudent();
  if (!student) return new NextResponse("Unauthorized", { status: 401 });

  const conversation = await prisma.marketplaceConversation.findUnique({
    where: { id: params.id }
  });

  if (!conversation) return new NextResponse("Not found", { status: 404 });

  if (
    conversation.buyerId !== student.id &&
    conversation.sellerId !== student.id
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { content } = await req.json();
  if (!content || !content.trim()) {
    return new NextResponse("Message content is required", { status: 400 });
  }

  const message = await prisma.marketplaceMessage.create({
    data: {
      conversationId: params.id,
      senderId: student.id,
      content: content.trim()
    },
    include: {
      sender: { select: { id: true, fullName: true } }
    }
  });

  return NextResponse.json({ message }, { status: 201 });
}
