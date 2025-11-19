import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { MarketplaceShell } from "@/components/marketplace/MarketplaceShell";

// Ensure this page is always rendered on the server with fresh data
export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  let products: Product[] = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error loading products from Prisma:", error);
    // You can also show a friendly UI message instead of crashing
    products = [];
  }

  return (
    <div className="space-y-4">
      <MarketplaceShell products={products} />
    </div>
  );
}
