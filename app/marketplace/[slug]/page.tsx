import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductDetailClient } from "@/components/marketplace/ProductDetailClient";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug }
  });

  if (!product) return notFound();

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
        <div className="grid gap-4 md:grid-cols-[1.6fr,1.4fr]">
          {/* Image */}
          <div className="relative rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
            {product.imageUrl ? (
              <div className="group relative h-64 w-full overflow-hidden rounded-lg bg-slate-900">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg bg-slate-900 text-xs text-slate-500">
                No image provided for this item
              </div>
            )}
          </div>

          {/* Details & add-to-cart */}
          <ProductDetailClient product={product} />
        </div>
      </Card>
    </div>
  );
}
