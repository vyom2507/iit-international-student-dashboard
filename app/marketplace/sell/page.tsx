// app/marketplace/sell/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";

type Condition = "Like New" | "Good" | "Fair";
type Campus = "Mies Campus" | "Rice Campus" | "Online / Remote";

export default function MarketplaceSellPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState<Condition>("Like New");
  const [campus, setCampus] = useState<Campus>("Mies Campus");
  const [paymentCard, setPaymentCard] = useState(true);
  const [paymentInPerson, setPaymentInPerson] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !price.trim() || !category.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!paymentCard && !paymentInPerson) {
      setError("Select at least one payment option (card or in-person).");
      return;
    }

    const priceNumber = Number(price);
    if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      setError("Please enter a valid positive price.");
      return;
    }

    setSubmitting(true);

    try {
      // 1) Upload image to Cloudinary (if provided)
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
        );

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
          throw new Error("Cloudinary is not configured.");
        }

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData
          }
        );

        if (!cloudRes.ok) {
          const text = await cloudRes.text();
          throw new Error(text || "Image upload failed.");
        }

        const cloudData = await cloudRes.json();
        imageUrl = cloudData.secure_url;
      }

      // 2) Build payment options
      const paymentOptions: string[] = [];
      if (paymentCard) paymentOptions.push("card");
      if (paymentInPerson) paymentOptions.push("in_person");

      // 3) Call your marketplace listing API
      // ⬇️ If your existing API route uses a different path, adjust this URL
      const res = await fetch("/api/marketplace/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          priceCents: Math.round(priceNumber * 100),
          category: category.trim(),
          condition,
          campus,
          imageUrl,
          paymentOptions: paymentOptions.join(",")
        })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create listing.");
      }

      // 4) Redirect to marketplace or My Listings
      router.push("/marketplace/my");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto bg-slate-900/90 p-4 md:p-6">
          <div className="mx-auto max-w-3xl space-y-4">
            <header className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-300">
                List an item
              </p>
              <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
                Sell or share items with IIT students
              </h1>
              <p className="text-xs text-slate-300 md:text-sm">
                Post textbooks, furniture, electronics, or winter gear that other
                international students at IIT might need.
              </p>
            </header>

            <Card className="bg-slate-900/80 text-xs text-slate-100">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Title & category */}
                <div className="grid gap-3 md:grid-cols-[2fr,1.2fr]">
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold">
                      Item title *
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Example: CS textbook – Introduction to Algorithms (CLRS)"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold">
                      Category *
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="Textbook, Furniture, Electronics, Winter Clothing, etc."
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>

                {/* Price & condition */}
                <div className="grid gap-3 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold">
                      Price (USD) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      placeholder="e.g. 25.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold">
                      Condition *
                    </label>
                    <select
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as Condition)}
                    >
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold">
                      Campus *
                    </label>
                    <select
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                      value={campus}
                      onChange={(e) => setCampus(e.target.value as Campus)}
                    >
                      <option value="Mies Campus">Mies Campus</option>
                      <option value="Rice Campus">Rice Campus</option>
                      <option value="Online / Remote">Online / Remote</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Add details about condition, what’s included, pickup location on campus, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Payment options */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold">
                      Payment options *
                    </label>
                    <div className="space-y-1.5 text-[11px]">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={paymentCard}
                          onChange={(e) => setPaymentCard(e.target.checked)}
                          className="h-3 w-3"
                        />
                        <span>Card (Stripe checkout)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={paymentInPerson}
                          onChange={(e) => setPaymentInPerson(e.target.checked)}
                          className="h-3 w-3"
                        />
                        <span>In-person cash / transfer (meet on campus)</span>
                      </label>
                    </div>
                  </div>

                  {/* Image upload */}
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold">
                      Item photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-[11px] text-slate-200 file:mr-2 file:rounded-md file:border-none file:bg-slate-800 file:px-2 file:py-1 file:text-[11px] file:text-slate-100 hover:file:bg-slate-700"
                    />
                    {previewUrl && (
                      <div className="mt-2 h-24 w-32 overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <p className="text-[11px] text-red-400">
                    {error}
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/marketplace")}
                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-lg bg-red-600 px-4 py-1.5 text-[11px] font-semibold text-white shadow-md shadow-red-900/50 hover:bg-red-500 disabled:opacity-60"
                  >
                    {submitting ? "Publishing…" : "Publish listing"}
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
