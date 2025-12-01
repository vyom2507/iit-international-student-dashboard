// components/marketplace/PurchaseActions.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";

type Product = {
  id: string;
  title: string;
  priceCents: number;
  isActive: boolean;
  paymentOptions: string;
  owner?: {
    id: string;
    fullName: string | null;
    program: string | null;
  } | null;
};

type MeResponse = {
  student: {
    id: string;
    fullName: string;
    email: string;
  } | null;
};

export function PurchaseActions({ product }: { product: Product }) {
  const router = useRouter();
  const [me, setMe] = useState<MeResponse["student"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Safely parse payment options
  const paymentOptions = (product.paymentOptions ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  useEffect(() => {
    let mounted = true;
    const loadMe = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data: MeResponse = await res.json();
        if (mounted) setMe(data.student);
      } catch (err) {
        console.error(err);
      }
    };
    loadMe();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ owner may be null / undefined, so guard it
  const ownerId = product.owner?.id ?? null;
  const isOwner = !!ownerId && me?.id === ownerId;

  const handlePurchase = async (paymentMethod: "card" | "in_person") => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/marketplace/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, paymentMethod })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create order");
      }

      const data = await res.json();

      if (paymentMethod === "card" && data.checkoutUrl) {
        // Stripe Checkout redirect
        window.location.href = data.checkoutUrl;
        return;
      }

      // In-person: go straight to chat if conversation created
      if (data.conversationId) {
        router.push(`/marketplace/chat/${data.conversationId}`);
        router.refresh();
        return;
      }

      router.push("/marketplace");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    setDeleteLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/marketplace/products/${product.id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete listing");
      }
      router.push("/marketplace");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const sellerName =
    product.owner?.fullName && product.owner.fullName.trim().length > 0
      ? product.owner.fullName
      : "IIT student";

  const sellerProgram = product.owner?.program || "";

  return (
    <Card className="bg-white/95 text-slate-900">
      <h2 className="mb-1 text-sm font-semibold">Listing details</h2>
      <p className="text-[11px] text-slate-600">
        Seller:{" "}
        <span className="font-semibold">
          {sellerName}
        </span>
        {sellerProgram && ` · ${sellerProgram}`}
      </p>

      {error && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-[11px] text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      )}

      {isOwner ? (
        <div className="mt-3 space-y-2 text-xs">
          <p className="text-[11px] text-slate-600">
            You posted this listing. You can remove it once it&apos;s no longer
            available.
          </p>
          {/* TODO: add an edit modal if you want inline editing */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white hover:bg-black disabled:opacity-60"
          >
            {deleteLoading ? "Removing..." : "Delete listing"}
          </button>
        </div>
      ) : !product.isActive ? (
        <p className="mt-3 text-[11px] text-slate-500">
          This item has already been sold or reserved.
        </p>
      ) : (
        <div className="mt-3 space-y-2 text-xs">
          <p className="text-[11px] text-slate-600">
            Choose how you want to pay for this item.
          </p>

          {paymentOptions.includes("card") && (
            <button
              type="button"
              onClick={() => handlePurchase("card")}
              disabled={loading}
              className="w-full rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:opacity-60"
            >
              {loading ? "Processing..." : "Pay by card (demo)"}
            </button>
          )}

          {paymentOptions.includes("in_person") && (
            <button
              type="button"
              onClick={() => handlePurchase("in_person")}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[11px] font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? "Reserving..." : "Reserve for in-person payment"}
            </button>
          )}

          <p className="mt-2 text-[10px] text-slate-500">
            For in-person payments, you and the seller should agree on a safe,
            public campus location (e.g., MTCC) and confirm the item before
            exchanging money.
          </p>
        </div>
      )}
    </Card>
  );
}
