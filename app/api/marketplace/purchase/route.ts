// app/api/marketplace/purchase/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/auth";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: "2024-06-20"
    })
  : null;

export async function POST(req: NextRequest) {
  const student = await getCurrentStudent();
  if (!student) return new NextResponse("Unauthorized", { status: 401 });

  const { productId, paymentMethod } = await req.json();

  if (!productId || !paymentMethod) {
    return new NextResponse("Missing productId or paymentMethod", {
      status: 400
    });
  }

  if (!["card", "in_person"].includes(paymentMethod)) {
    return new NextResponse("Invalid payment method", { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product || !product.isActive) {
    return new NextResponse("Product not available", { status: 400 });
  }

  if (product.ownerId === student.id) {
    return new NextResponse("You cannot purchase your own listing", {
      status: 400
    });
  }

  // Create order first
  let stripeSessionId: string | null = null;

  if (paymentMethod === "card") {
    if (!stripe) {
      return new NextResponse(
        "Stripe is not configured. Set STRIPE_SECRET_KEY.",
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: {
              name: product.title,
              description: product.description
            }
          },
          quantity: 1
        }
      ],
      success_url: `${appUrl}/marketplace/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/marketplace/${product.id}`,
      metadata: {
        productId: product.id,
        buyerId: student.id
      }
    });

    stripeSessionId = session.id;

    // NOTE:
    // In a production app, you'd mark the order as "created" now and
    // switch to "paid" in a Stripe webhook. For this project, we’ll
    // immediately mark it as sold so it disappears from the marketplace.
  }

  const order = await prisma.order.create({
    data: {
      productId: product.id,
      buyerId: student.id,
      paymentMethod,
      status: paymentMethod === "card" ? "paid" : "created",
      stripeSessionId: stripeSessionId || undefined
    }
  });

  // Mark listing as sold / inactive
  await prisma.product.update({
    where: { id: product.id },
    data: {
      isActive: false,
      soldAt: new Date()
    }
  });

  // Create buyer-seller conversation
  const conversation = await prisma.marketplaceConversation.create({
    data: {
      orderId: order.id,
      buyerId: student.id,
      sellerId: product.ownerId,
      messages: {
        create: {
          senderId: student.id,
          content:
            paymentMethod === "card"
              ? "Hi, I just purchased this item via card. When can we arrange delivery/pickup?"
              : "Hi, I reserved this item for in-person payment. When and where can we meet on campus?"
        }
      }
    }
  });

  if (paymentMethod === "card" && stripeSessionId) {
    const session = await stripe!.checkout.sessions.retrieve(stripeSessionId);
    return NextResponse.json({
      checkoutUrl: session.url,
      orderId: order.id,
      conversationId: conversation.id
    });
  }

  // In-person: no external redirect, just send user to chat
  return NextResponse.json({
    orderId: order.id,
    conversationId: conversation.id
  });
}
