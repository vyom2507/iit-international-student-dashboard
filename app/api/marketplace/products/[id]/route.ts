// app/api/marketplace/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: { id: string };
};

// PATCH /api/marketplace/products/:id
// Body can include: { title?, description?, priceCents?, category?, condition?, imageUrl?, campus?, paymentOptions?, isActive? }
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = params;

  try {
    const body = await req.json();
    const data: any = {};

    if (body.title !== undefined) data.title = body.title;
    if (body.description !== undefined) data.description = body.description;
    if (body.priceCents !== undefined) data.priceCents = body.priceCents;
    if (body.category !== undefined) data.category = body.category;
    if (body.condition !== undefined) data.condition = body.condition;
    if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
    if (body.campus !== undefined) data.campus = body.campus;
    if (body.paymentOptions !== undefined)
      data.paymentOptions = body.paymentOptions;
    if (body.isActive !== undefined) data.isActive = body.isActive;
    if (body.soldAt !== undefined) data.soldAt = body.soldAt;

    const updated = await prisma.product.update({
      where: { id },
      data
    });

    return NextResponse.json({ product: updated });
  } catch (err) {
    console.error("PATCH /api/marketplace/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/marketplace/products/:id
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { id } = params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/marketplace/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
