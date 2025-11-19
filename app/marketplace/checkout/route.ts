import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is not set");
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20" as any
    })
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured on the server" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const items: {
      id: string;
      title: string;
      priceCents: number;
      quantity: number;
    }[] = body.items || [];

    if (!items.length) {
      return NextResponse.json(
        { error: "No items to checkout" },
        { status: 400 }
      );
    }

    const line_items = items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.priceCents,
        product_data: {
          name: item.title
        }
      }
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${appUrl}/marketplace?success=1`,
      cancel_url: `${appUrl}/marketplace/checkout?canceled=1`
    });

    // Store a basic order record for future webhook updates
    await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        amountTotal:
          (session.amount_total ?? items.reduce((s, i) => s + i.priceCents * i.quantity, 0)),
        status: "created",
        currency: session.currency || "usd"
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error", err);
    return NextResponse.json(
      { error: err.message || "Stripe checkout error" },
      { status: 500 }
    );
  }
}
