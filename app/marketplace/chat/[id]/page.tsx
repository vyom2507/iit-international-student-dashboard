// app/marketplace/chat/[id]/page.tsx
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { MarketplaceChat } from "@/components/marketplace/MarketplaceChat";

interface Props {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function MarketplaceChatPage({ params }: Props) {
  const student = await getCurrentStudent();
  if (!student) {
    redirect("/login");
  }

  const conversation = await prisma.marketplaceConversation.findUnique({
    where: { id: params.id },
    include: {
      order: {
        include: {
          product: true
        }
      },
      buyer: true,
      seller: true
    }
  });

  if (!conversation) {
    redirect("/marketplace/my");
  }

  if (
    conversation.buyerId !== student.id &&
    conversation.sellerId !== student.id
  ) {
    redirect("/marketplace/my");
  }

  const isBuyer = conversation.buyerId === student.id;
  const otherParty = isBuyer ? conversation.seller : conversation.buyer;

  return (
    <div className="space-y-4">
      <Card className="bg-white/95 text-slate-900">
        <h1 className="text-sm font-semibold">
          Chat about: {conversation.order.product.title}
        </h1>
        <p className="text-[11px] text-slate-600">
          You are chatting with{" "}
          <span className="font-semibold">
            {otherParty.fullName || "IIT student"}
          </span>
          .
        </p>
      </Card>

      <MarketplaceChat conversationId={conversation.id} currentUserId={student.id} />
    </div>
  );
}
