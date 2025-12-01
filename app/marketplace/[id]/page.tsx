// app/marketplace/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";
import { PurchaseActions } from "@/components/marketplace/PurchaseActions";

type PageProps = {
  params: {
    id: string; // if your route folder is [slug], change this to slug: string
  };
};

export default async function MarketplaceProductPage({ params }: PageProps) {
  // If your route is /marketplace/[slug], change this where clause:
  // where: { slug: params.id } or where: { slug: params.slug }
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      owner: true
    }
  });

  if (!product) {
    notFound();
  }

  const displayPrice = (product.priceCents / 100).toFixed(2);

  // Map to the shape expected by PurchaseActions (with nullable owner)
  const uiProduct = {
    id: product.id,
    title: product.title,
    priceCents: product.priceCents,
    isActive: product.isActive,
    paymentOptions: product.paymentOptions,
    owner: product.owner
      ? {
          id: product.owner.id,
          fullName: product.owner.fullName,
          program: product.owner.program
        }
      : null
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Left sidebar (sticky in its own component) */}
      <Sidebar />

      {/* Right side: top navbar + page content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 md:p-6">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:grid md:grid-cols-[1.4fr,1fr]">
            {/* Left: product image + description */}
            <Card className="bg-slate-950/90 border-slate-800 text-slate-100">
              <div className="grid gap-4 md:grid-rows-[auto,1fr]">
                <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900 md:h-72">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                      No image provided
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <h1 className="text-lg font-semibold text-white">
                    {product.title}
                  </h1>
                  <p className="text-xl font-bold text-red-300">
                    ${displayPrice}
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 ring-1 ring-slate-700">
                      Category: {product.category}
                    </span>
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 ring-1 ring-slate-700">
                      Condition: {product.condition}
                    </span>
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 ring-1 ring-slate-700">
                      Campus: {product.campus}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-slate-200">
                    {product.description}
                  </p>
                </div>
              </div>
            </Card>

            {/* Right: purchase / delete actions */}
            <PurchaseActions product={uiProduct} />
          </div>
        </main>
      </div>
    </div>
  );
}
