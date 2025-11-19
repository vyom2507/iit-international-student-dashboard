import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductDetailClient } from "@/components/marketplace/ProductDetailClient";

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
            {/* You can use next/image + a nicer layout later */}
            <div className="flex h-48 items-center justify-center rounded-lg bg-slate-900 text-xs text-slate-500">
              Item photo placeholder
            </div>
          </div>

          {/* Details */}
          <ProductDetailClient product={product} />
        </div>
      </Card>
    </div>
  );
}
