// app/api/marketplace/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/marketplace/products?ownerId=... (optional)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId") ?? undefined;

    const where = ownerId ? { ownerId } : {};
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        owner: true
      }
    });

    return NextResponse.json({ products });
  } catch (err) {
    console.error("GET /api/marketplace/products error:", err);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

// POST /api/marketplace/products
// Body: { title, description, priceCents, category, condition, imageUrl, campus, paymentOptions, ownerId }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      priceCents,
      category,
      condition,
      imageUrl,
      campus,
      paymentOptions,
      ownerId
    } = body;

    if (
      !title ||
      !description ||
      !priceCents ||
      !category ||
      !condition ||
      !imageUrl ||
      !campus ||
      !paymentOptions ||
      !ownerId
    ) {
      return NextResponse.json(
        { error: "Missing required fields for product" },
        { status: 400 }
      );
    }

    const slugBase =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "listing";
    const slug = `${slugBase}-${Date.now().toString(36)}`;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        priceCents,
        category,
        condition,
        imageUrl,
        campus,
        paymentOptions, // e.g. "card,in_person"
        ownerId,
        slug,
        isActive: true
      }
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error("POST /api/marketplace/products error:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
