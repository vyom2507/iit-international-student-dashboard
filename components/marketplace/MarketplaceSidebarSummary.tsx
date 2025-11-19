"use client";

import { Card } from "@/components/ui/Card";
import { useMarketplaceCart } from "./MarketplaceCartContext";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MarketplaceSidebarSummary() {
  const { items } = useMarketplaceCart();

  const totalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0
  );

  return (
    <Card>
      <header className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
          <ShoppingCart className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-semibold text-slate-50">Cart summary</h2>
      </header>

      <div className="space-y-1 text-xs text-slate-300">
        {items.length === 0 && (
          <p className="text-slate-400">
            Your cart is empty. Add some items from the marketplace.
          </p>
        )}
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between gap-2">
            <span className="line-clamp-1">
              {item.quantity} × {item.product.title}
            </span>
            <span className="shrink-0">
              ${(item.product.priceCents * item.quantity / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Total ({items.length} item{items.length !== 1 ? "s" : ""})
        </span>
        <span className="text-[13px] font-semibold text-red-200">
          ${(totalCents / 100).toFixed(2)}
        </span>
      </div>

      <div className="mt-3">
        <Link
          href="/marketplace/checkout"
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-900"
        >
          <ArrowRight className="h-3.5 w-3.5" />
          Go to checkout
        </Link>
        <p className="mt-1 text-[9px] text-slate-500">
          Checkout is powered by Stripe. For now this is a test integration—
          use Stripe&apos;s test cards when trying it.
        </p>
      </div>
    </Card>
  );
}
