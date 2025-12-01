// app/api/marketplace/listings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now()
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      priceCents,
      category,
      condition,
      campus,
      imageUrl,
      paymentOptions
    } = body || {};

    // Basic validation – keep it simple but safe
    if (
      !title ||
      !description ||
      !category ||
      typeof priceCents !== "number" ||
      priceCents <= 0
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    if (!paymentOptions || typeof paymentOptions !== "string") {
      return NextResponse.json(
        { error: "paymentOptions must be a comma-separated string." },
        { status: 400 }
      );
    }

    // Optional: in the future you can resolve the logged-in student
    // and set ownerId = student.id. For now we'll keep it nullable.
    // const student = await getCurrentStudentLikeHelperHere();
    // const ownerId = student?.id ?? null;

    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        slug: slugify(title),
        description: description.trim(),
        priceCents,
        category: category.trim(),
        condition: condition || "Good",
        campus: campus || "Mies Campus",
        imageUrl: imageUrl || "",
        paymentOptions,
        // ownerId,   // uncomment when you wire real auth → owner binding
        isActive: true
      }
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err: any) {
    console.error("Create product error:", err);
    return NextResponse.json(
      { error: "Failed to create listing." },
      { status: 500 }
    );
  }
}

// Optional GET (debug / listing fetch)
export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ products });
}
