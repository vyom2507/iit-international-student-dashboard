"use client";

import type { Product } from "@prisma/client";
import { useMarketplaceCart } from "./MarketplaceCartContext";
import { ShoppingCart, Tag } from "lucide-react";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useMarketplaceCart();

  return (
    <div className="flex flex-col justify-between text-xs">
      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <h1 className="text-sm font-semibold text-slate-50">
            {product.title}
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[9px] text-slate-300 ring-1 ring-slate-700">
            <Tag className="h-3 w-3" />
            {product.category}
          </span>
        </div>
        <p className="text-[10px] text-slate-300">{product.description}</p>
        <p className="mt-2 text-[10px] text-slate-400">
          Condition:{" "}
          <span className="font-medium text-slate-200">
            {product.condition}
          </span>
        </p>
        <p className="text-[10px] text-slate-400">
          Campus:{" "}
          <span className="font-medium text-slate-200">{product.campus}</span>
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <div className="text-[13px] font-semibold text-red-200">
          ${(product.priceCents / 100).toFixed(2)}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="inline-flex items-center justify-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to cart
        </button>
        <p className="text-[9px] text-slate-500">
          TODO: Show seller profile, pickup location on campus, and messaging
          via istudentshub chat.
        </p>
      </div>
    </div>
  );
}
