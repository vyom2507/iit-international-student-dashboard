"use client";

import type { Product } from "@prisma/client";
import { MarketplaceGrid } from "./MarketplaceGrid";
import { MarketplaceSidebarSummary } from "./MarketplaceSidebarSummary";

export function MarketplaceShell({ products }: { products: Product[] }) {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,2.2fr),minmax(260px,1fr)]">
        <MarketplaceGrid products={products} />
        <MarketplaceSidebarSummary />
      </section>
    </div>
  );
}
