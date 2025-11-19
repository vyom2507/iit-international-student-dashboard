"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Tag, ArrowLeft, UploadCloud, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

type Condition = "New" | "Like New" | "Very Good" | "Good" | "Fair";

const categories = [
  "Textbooks",
  "Furniture & Room",
  "Electronics & Accessories",
  "Kitchen",
  "Clothing",
  "Other"
];

const campuses = [
  "IIT Main Campus (Mies)",
  "Downtown Campus",
  "Online / Remote",
  "Other"
];

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function MarketplaceNewListingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Textbooks");
  const [condition, setCondition] = useState<Condition>("Like New");
  const [campus, setCampus] = useState("IIT Main Campus (Mies)");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!cloudName || !uploadPreset) {
      setError(
        "Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local."
      );
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error?.message || "Image upload failed. Try a smaller file."
        );
      }

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("No secure_url returned from Cloudinary.");
      }

      setImageUrl(data.secure_url as string);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(
        err.message || "Failed to upload image. Please try a smaller file."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !price) {
      setError("Title, description, and price are required.");
      return;
    }

    if (uploading) {
      setError("Please wait for the image upload to finish.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/marketplace/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price,
          category,
          condition,
          campus,
          imageUrl // Cloudinary URL (or empty if no image selected)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create listing");
      }

      router.push("/marketplace");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
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
            <Tag className="h-4 w-4" />
          </span>
          <div>
            <h1 className="text-sm font-semibold text-slate-50">
              List an item for IIT students
            </h1>
            <p className="text-xs text-slate-400">
              Share a used textbook, furniture, or other items with the IIT
              international student community.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <div>
                <label className="block text-[11px] text-slate-200">
                  Item title *
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="e.g. Intro to Programming Textbook, Twin Bed Frame"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-200">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="e.g. 25.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-200">
                    Category
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-200">
                    Condition
                  </label>
                  <select
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    value={condition}
                    onChange={(e) =>
                      setCondition(e.target.value as Condition)
                    }
                  >
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-200">
                  Campus / pickup location
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                >
                  {campuses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] text-slate-200">
                  Description *
                </label>
                <textarea
                  className="mt-1 min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Give details about the item, its condition, what’s included, and how you prefer to meet on campus."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-200">
                  Item photo (optional)
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-medium text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800">
                    <UploadCloud className="h-4 w-4" />
                    <span>
                      {uploading ? "Uploading..." : "Choose image file"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={uploading}
                    />
                  </label>
                  {imageUrl && (
                    <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-slate-900 ring-1 ring-slate-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </span>
                  )}
                  {!imageUrl && !uploading && (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-slate-400 ring-1 ring-slate-700">
                      <ImageIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[9px] text-slate-500">
                  Images are uploaded to Cloudinary using an unsigned upload
                  preset and linked to this listing via a public URL.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-300">Error: {error}</p>
          )}

          <div className="flex items-center justify-between pt-2 text-[10px]">
            <p className="text-slate-500">
              By listing an item, you agree to meet safely on campus and follow
              IIT/istudentshub guidelines.
            </p>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-900"
            >
              {submitting
                ? "Creating listing..."
                : uploading
                ? "Uploading image..."
                : "Create listing"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
