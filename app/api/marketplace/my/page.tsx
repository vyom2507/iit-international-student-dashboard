// app/marketplace/my/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, CheckCircle2, Loader2 } from "lucide-react";

type Student = {
  id: string;
  fullName: string;
  email: string;
};

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  category: string;
  condition: string;
  campus: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
};

export default function MyMarketplacePage() {
  const router = useRouter();
  const [me, setMe] = useState<Student | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1) Load current student
  useEffect(() => {
    let mounted = true;
    const loadMe = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (mounted) setMe(null);
          return;
        }
        const data = await res.json();
        if (mounted) setMe(data.student ?? null);
      } catch (err) {
        console.error("Error loading me:", err);
      } finally {
        if (mounted) setLoadingMe(false);
      }
    };
    loadMe();
    return () => {
      mounted = false;
    };
  }, []);

  // 2) Once we have me, load my listings
  useEffect(() => {
    const loadProducts = async () => {
      if (!me) return;
      setLoadingProducts(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/marketplace/products?ownerId=${encodeURIComponent(me.id)}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load listings");
        }
        const data = await res.json();
        setProducts(data.products ?? []);
      } catch (err: any) {
        console.error("Error loading my listings:", err);
        setError(err.message || "Failed to load listings");
      } finally {
        setLoadingProducts(false);
      }
    };

    if (me) {
      loadProducts();
    }
  }, [me]);

  // If not logged in → redirect to login
  useEffect(() => {
    if (!loadingMe && !me) {
      router.push("/login");
    }
  }, [loadingMe, me, router]);

  const handleMarkSold = async (id: string) => {
    setActionLoadingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/marketplace/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to mark as sold");
      }
      // Update local state
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: false } : p))
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    setActionLoadingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/marketplace/products/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to delete listing");
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-6">
          <div className="mx-auto max-w-6xl space-y-4">
            <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500">
                  <ShoppingBag className="h-4 w-4" />
                  <span>My marketplace listings</span>
                </div>
                <h1 className="mt-1 text-lg font-semibold text-slate-900">
                  Items you&apos;ve posted for other IIT students
                </h1>
                {me && (
                  <p className="text-xs text-slate-600">
                    Signed in as{" "}
                    <span className="font-semibold">{me.fullName}</span> (
                    {me.email})
                  </p>
                )}
              </div>

              <Link
                href="/marketplace/sell"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-[12px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500"
              >
                Post new listing
              </Link>
            </header>

            {error && (
              <Card className="bg-red-50/90 text-[12px] text-red-700 ring-1 ring-red-200">
                {error}
              </Card>
            )}

            {loadingMe || loadingProducts ? (
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                <span>Loading your listings…</span>
              </div>
            ) : products.length === 0 ? (
              <Card className="bg-white text-sm text-slate-700">
                You haven&apos;t posted any items yet.{" "}
                <Link
                  href="/marketplace/sell"
                  className="font-semibold text-red-600 hover:text-red-500"
                >
                  Create your first listing
                </Link>
                .
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="flex flex-col overflow-hidden bg-white p-0"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={
                          product.imageUrl && product.imageUrl.length > 0
                            ? product.imageUrl
                            : "/marketplace-placeholder.jpg"
                        }
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      {!product.isActive && (
                        <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                          Sold / inactive
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-3 text-[11px] text-slate-800">
                      <p className="line-clamp-2 text-[12px] font-semibold text-slate-900">
                        {product.title}
                      </p>
                      <p className="text-[13px] font-bold text-red-600">
                        ${(product.priceCents / 100).toFixed(2)}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {product.category} · {product.condition} ·{" "}
                        {product.campus}
                      </p>
                      <div className="mt-2 flex gap-2">
                        {product.isActive && (
                          <button
                            type="button"
                            onClick={() => handleMarkSold(product.id)}
                            disabled={actionLoadingId === product.id}
                            className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-slate-900 px-2 py-1.5 text-[11px] font-semibold text-white hover:bg-black disabled:opacity-60"
                          >
                            {actionLoadingId === product.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            )}
                            <span>Mark as sold</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          disabled={actionLoadingId === product.id}
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 px-2 py-1.5 text-[11px] font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                        >
                          {actionLoadingId === product.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          <span>Delete</span>
                        </button>
                      </div>
                      <Link
                        href={`/marketplace/${product.id}`}
                        className="mt-1 text-[10px] text-red-600 hover:text-red-500"
                      >
                        View listing details →
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
