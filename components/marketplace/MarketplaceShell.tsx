// components/marketplace/MarketplaceShell.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Tag,
  MapPin,
  Search,
  SlidersHorizontal,
  PlusCircle
} from "lucide-react";
import { Card } from "@/components/ui/Card";

type MarketplaceProduct = {
  id: string;
  title: string;
  priceCents: number;
  category: string;
  condition: string;
  campus: string;
  imageUrl: string;
  isActive: boolean;
  ownerName: string;
  ownerProgram: string;
};

type Props = {
  initialProducts: MarketplaceProduct[];
};

const CATEGORIES = [
  "All",
  "Textbooks",
  "Furniture",
  "Electronics",
  "Kitchen",
  "Clothing",
  "Other"
];

export function MarketplaceShell({ initialProducts }: Props) {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">(
    "newest"
  );

  // 🔹 Hero slider data: take products with images, up to 8
  const heroProducts = useMemo(
    () =>
      initialProducts.filter((p) => p.imageUrl && p.imageUrl.length > 0).slice(0, 8),
    [initialProducts]
  );
  const [heroIndex, setHeroIndex] = useState(0);

  // 🔁 Auto-advance hero slider every 5 seconds
  useEffect(() => {
    if (heroProducts.length === 0) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroProducts.length]);

  const currentHero = heroProducts[heroIndex] ?? null;

  // 🔍 Filtering + sorting
  const filteredProducts = useMemo(() => {
    let items = [...initialProducts];

    if (category !== "All") {
      items = items.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim().length > 0) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.campus.toLowerCase().includes(q) ||
          p.ownerName.toLowerCase().includes(q)
      );
    }

    items.sort((a, b) => {
      if (sort === "price-asc") return a.priceCents - b.priceCents;
      if (sort === "price-desc") return b.priceCents - a.priceCents;
      // newest → backend already returns createdAt desc
      return 0;
    });

    return items;
  }, [initialProducts, category, search, sort]);

  return (
    <div className="space-y-6">
      {/* HERO SECTION (LEFT STATIC, RIGHT SLIDER) */}
      <section className="grid gap-4 md:grid-cols-[1.7fr,1.3fr]">
        {/* Left hero content */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-red-900 p-5 text-red-50 shadow-xl shadow-red-900/40">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-red-500 blur-3xl" />
            <div className="absolute bottom-[-80px] right-[-40px] h-64 w-64 rounded-full bg-black/40 blur-3xl" />
          </div>

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <ShoppingBag className="h-4 w-4" />
              <span>iStudents Marketplace · IIT</span>
            </div>

            <div className="mt-3 space-y-2">
              <h1 className="text-2xl font-semibold md:text-3xl">
                Buy & sell student essentials on campus.
              </h1>
              <p className="text-sm text-red-100/90">
                Textbooks, furniture, electronics, winter clothing – exchange
                items safely with fellow IIT students and save money while you
                settle into Chicago.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-red-100/90">
              <span className="rounded-full bg-black/20 px-3 py-1">
                · Neon + Prisma powered listings
              </span>
              <span className="rounded-full bg-black/20 px-3 py-1">
                · Card or in-person payment
              </span>
              <span className="rounded-full bg-black/20 px-3 py-1">
                · Student-to-student chat after purchase
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/marketplace/sell"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-red-700 shadow-md shadow-red-900/40 hover:bg-red-50"
              >
                <PlusCircle className="h-4 w-4" />
                Post a listing
              </Link>
              <Link
                href="/marketplace/my"
                className="inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-[12px] font-semibold text-red-50 hover:bg-black/30"
              >
                View my listings
              </Link>
            </div>
          </div>
        </div>

        {/* Right: HERO SLIDER FED BY LISTINGS */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-4 shadow-xl shadow-slate-900/60">
          {currentHero ? (
            <>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-slate-800 md:h-44">
                <Image
                  src={currentHero.imageUrl}
                  alt={currentHero.title}
                  fill
                  className="object-cover transition-all duration-500"
                />
                <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Featured listing
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] text-slate-50">
                  <MapPin className="h-3 w-3 text-red-300" />
                  <span>{currentHero.campus}</span>
                </div>
              </div>

              <div className="mt-3 space-y-1 text-sm text-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
                  Featured from listings
                </p>
                <p className="text-[13px] font-semibold leading-snug text-slate-50">
                  {currentHero.title}
                </p>
                <p className="text-[12px] font-bold text-red-400">
                  ${(currentHero.priceCents / 100).toFixed(2)}
                </p>
                <p className="text-[11px] text-slate-400">
                  Seller: {currentHero.ownerName}
                  {currentHero.ownerProgram && ` · ${currentHero.ownerProgram}`}
                </p>
              </div>

              {/* Slider dots */}
              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
                <span>
                  {heroIndex + 1} / {heroProducts.length} featured items
                </span>
                <div className="flex gap-1.5">
                  {heroProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setHeroIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === heroIndex
                          ? "w-4 bg-red-500"
                          : "w-2 bg-slate-500/60 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Fallback when no images/items yet
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-[12px] text-slate-300">
              <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-slate-800">
                <Image
                  src="/marketplace-placeholder.jpg"
                  alt="Marketplace placeholder"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-semibold text-slate-100">
                No featured items yet
              </p>
              <p className="max-w-xs text-[11px] text-slate-400">
                Once students start posting listings with photos, they&apos;ll
                appear here in a rotating hero slider.
              </p>
              <Link
                href="/marketplace/sell"
                className="mt-1 inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500"
              >
                <PlusCircle className="h-3 w-3" />
                Be the first to list an item
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-slate-200 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] text-slate-700">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Search for 'desk', 'monitor', 'winter coat', or 'textbook'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none bg-transparent text-[12px] outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${
                  category === cat
                    ? "bg-red-600 text-white shadow-sm shadow-red-900/40"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "All" ? (
                  <Tag className="h-3 w-3" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <span>Sort by</span>
          <select
            className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "newest" | "price-asc" | "price-desc")
            }
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <ShoppingBag className="h-3.5 w-3.5 text-red-500" />
            <span>
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredProducts.length}
              </span>{" "}
              item{filteredProducts.length === 1 ? "" : "s"}
            </span>
          </div>
          <span className="hidden text-[11px] text-slate-500 md:inline">
            Marketplace powered by IIT iStudentsHub · Neon · Prisma · Stripe
            (demo)
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <Card className="bg-white text-sm text-slate-600">
            No items match your filters yet. Try changing the category or search
            term, or{" "}
            <Link
              href="/marketplace/sell"
              className="font-semibold text-red-600 hover:text-red-500"
            >
              post the first listing
            </Link>
            .
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/marketplace/${product.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-200 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:ring-red-200"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={
                      product.imageUrl && product.imageUrl.length > 0
                        ? product.imageUrl
                        : "/marketplace-placeholder.jpg"
                    }
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {product.condition}
                  </div>
                  <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-800">
                    <MapPin className="h-3 w-3 text-red-500" />
                    <span>{product.campus}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-1 p-3 text-[11px] text-slate-800">
                  <p className="line-clamp-2 text-[12px] font-semibold text-slate-900">
                    {product.title}
                  </p>
                  <p className="text-[13px] font-bold text-red-600">
                    ${(product.priceCents / 100).toFixed(2)}
                  </p>
                  <p className="line-clamp-1 text-[10px] text-slate-500">
                    Seller: {product.ownerName}
                    {product.ownerProgram && ` · ${product.ownerProgram}`}
                  </p>
                  <p className="mt-auto text-[10px] text-slate-500">
                    Click to view details & purchase
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
