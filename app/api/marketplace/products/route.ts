import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      price,
      category,
      condition,
      campus,
      imageUrl
    } = body || {};

    if (!title || !description || !price || !category || !condition || !campus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }

    const priceCents = Math.round(priceNumber * 100);

    let baseSlug = slugify(title);
    if (!baseSlug) baseSlug = `item-${Date.now()}`;

    let slug = baseSlug;
    let attempt = 1;

    // ensure unique slug
    // (simple loop; in practice you might use a more robust strategy)
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const existing = await prisma.product.findUnique({ where: { slug } });
      if (!existing) break;
      slug = `${baseSlug}-${attempt++}`;
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        priceCents,
        category,
        condition,
        campus,
        imageUrl: imageUrl || "/marketplace/placeholder.jpg"
      }
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err: any) {
    console.error("Create product error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
