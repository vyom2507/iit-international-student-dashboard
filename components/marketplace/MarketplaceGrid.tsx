"use client";

import type { Product } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { useMarketplaceCart } from "./MarketplaceCartContext";
import { ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function MarketplaceGrid({ products }: { products: Product[] }) {
  const { addToCart } = useMarketplaceCart();

  return (
    <Card>
      <header className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h1 className="text-sm font-semibold text-slate-50">
            Student Marketplace
          </h1>
          <p className="text-xs text-slate-400">
            Buy or share used items with other IIT students—textbooks,
            furniture, electronics, and more.
          </p>
        </div>
        <Link
          href="/marketplace/new"
          className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] font-semibold text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800"
        >
          + New listing
        </Link>
      </header>

      <div className="grid gap-3 text-xs md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col justify-between rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800 transition hover:-translate-y-0.5 hover:ring-red-500/40"
          >
            <div>
              {/* Image thumbnail with ecommerce hover effect */}
              <div className="mb-2 overflow-hidden rounded-lg bg-slate-900">
                {product.imageUrl ? (
                  <div className="relative h-32 w-full">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center text-[10px] text-slate-500">
                    No image
                  </div>
                )}
              </div>

              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-slate-100 line-clamp-1">
                  {product.title}
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[9px] text-slate-300 ring-1 ring-slate-700">
                  <Tag className="h-3 w-3" />
                  {product.category}
                </span>
              </div>
              <p className="line-clamp-2 text-[10px] text-slate-300">
                {product.description}
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                Condition:{" "}
                <span className="font-medium text-slate-200">
                  {product.condition}
                </span>
              </p>
              <p className="text-[10px] text-slate-400">
                Campus:{" "}
                <span className="font-medium text-slate-200">
                  {product.campus}
                </span>
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="text-[11px] font-semibold text-red-200">
                ${(product.priceCents / 100).toFixed(2)}
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/marketplace/${product.slug}`}
                  className="rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-semibold text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800"
                >
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500"
                >
                  <ShoppingCart className="h-3 w-3" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
