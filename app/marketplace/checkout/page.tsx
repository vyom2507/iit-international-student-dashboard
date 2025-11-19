"use client";

import { Card } from "@/components/ui/Card";
import { useMarketplaceCart } from "@/components/marketplace/MarketplaceCartContext";
import { ShoppingCart, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function MarketplaceCheckoutPage() {
  const { items, clearCart } = useMarketplaceCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("./api/marketplace/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            title: i.product.title,
            priceCents: i.product.priceCents,
            quantity: i.quantity
          }))
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Checkout failed");
      }

      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      } else {
        throw new Error("No Stripe checkout URL returned");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong with Stripe checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-slate-100"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to marketplace
      </Link>

      <Card>
        <header className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <CreditCard className="h-4 w-4" />
          </span>
          <div>
            <h1 className="text-sm font-semibold text-slate-50">
              Checkout (test mode)
            </h1>
            <p className="text-xs text-slate-400">
              Review your items and pay securely via Stripe. Use Stripe&apos;s
              test card numbers during development.
            </p>
          </div>
        </header>

        <div className="grid gap-4 text-xs lg:grid-cols-[minmax(0,1.8fr),minmax(260px,1fr)]">
          {/* Order summary with thumbnails */}
          <div className="space-y-2">
            {items.length === 0 ? (
              <p className="text-slate-400">
                Your cart is empty. Add some items from the marketplace first.
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 rounded-lg bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
                >
                  {/* Thumbnail */}
                  <div className="relative h-14 w-14 overflow-hidden rounded-md bg-slate-900">
                    {item.product.imageUrl ? (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[9px] text-slate-500">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-100 line-clamp-1">
                        {item.product.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Qty: {item.quantity} · {item.product.condition}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-200">
                      $
                      {(
                        (item.product.priceCents * item.quantity) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment box */}
          <div className="rounded-lg bg-slate-950/70 p-3 ring-1 ring-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Items ({items.length})</span>
              <span>${(totalCents / 100).toFixed(2)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
              <span>Estimated fees</span>
              <span>$0.00</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">Total</span>
              <span className="text-[13px] font-semibold text-red-200">
                ${(totalCents / 100).toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              disabled={items.length === 0 || loading}
              onClick={handleCheckout}
              className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-900"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {loading ? "Redirecting to Stripe..." : "Checkout with Stripe"}
            </button>

            {error && (
              <p className="mt-2 text-[10px] text-red-300">
                Error: {error}
              </p>
            )}

            <div className="mt-3 space-y-1 text-[9px] text-slate-500">
              <p>
                In test mode, you can use{" "}
                <span className="font-mono">4242 4242 4242 4242</span> with any
                future expiry and CVC to simulate a successful payment.
              </p>
              <p>
                TODO: Add an order confirmation page and connect Stripe webhooks
                to mark orders as &quot;paid&quot; in the Neon database.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
