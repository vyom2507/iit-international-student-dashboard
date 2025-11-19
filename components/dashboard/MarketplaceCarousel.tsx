"use client";

import { Card } from "@/components/ui/Card";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useRef } from "react";

const items = [
  {
    title: "CS 201 Textbook · Discrete Mathematics",
    price: "$25",
    condition: "Good",
    category: "Books",
    location: "Pickup near MTCC",
    image:
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    title: "IIT-Branded Hoodie (Red)",
    price: "$18",
    condition: "Like New",
    category: "Clothing",
    location: "Main Campus · Size M",
    image:
      "https://images.pexels.com/photos/6311583/pexels-photo-6311583.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    title: "Study Desk & Chair Set",
    price: "$45",
    condition: "Fair",
    category: "Furniture",
    location: "On-campus housing",
    image:
      "https://images.pexels.com/photos/159839/books-chair-chiars-desk-159839.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    title: "27 Monitor for Coding",
    price: "$60",
    condition: "Very Good",
    category: "Electronics",
    location: "IIT Tower",
    image:
      "https://images.pexels.com/photos/3746949/pexels-photo-3746949.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export function MarketplaceCarousel() {
  const listRef = useRef<HTMLDivElement | null>(null);

  function scrollByOffset(offset: number) {
    if (!listRef.current) return;
    listRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <Card className="h-full">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Student Marketplace
          </h2>
          <p className="text-xs text-slate-400">
            Buy or share used items with other IIT students before and after
            arrival.
          </p>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={() => scrollByOffset(-260)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByOffset(260)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="scrollbar-thin flex gap-3 overflow-x-auto pb-2 pt-1"
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="min-w-[240px] max-w-xs flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 ring-1 ring-slate-800"
          >
            <div className="h-32 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-50 line-clamp-2">
                  {item.title}
                </p>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/40">
                  {item.price}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {item.category} · {item.condition}
              </p>
              <p className="mt-1 text-[10px] text-slate-300">
                {item.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] text-slate-500">
        TODO: Replace these mock items with data from your marketplace API
        (e.g. a custom IIT backend, Fake Store API, or DummyJSON products).
      </p>
    </Card>
  );
}
