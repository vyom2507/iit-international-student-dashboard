// app/marketplace/my/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentStudent } from "@/lib/auth";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

async function MyMarketplaceInner() {
  const student = await getCurrentStudent();
  if (!student) {
    redirect("/login?next=/marketplace/my");
  }

  const [myActiveListings, mySoldListings, myPurchases] = await Promise.all([
    prisma.product.findMany({
      where: { ownerId: student.id, isActive: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.findMany({
      where: { ownerId: student.id, isActive: false },
      orderBy: { soldAt: "desc" }
    }),
    prisma.order.findMany({
      where: { buyerId: student.id },
      orderBy: { createdAt: "desc" },
      include: {
        product: true,
        conversations: true
      }
    })
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <header className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-300">
          My marketplace
        </p>
        <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
          Your listings and purchases
        </h1>
        <p className="text-xs text-slate-300 md:text-sm">
          Track what you&apos;re selling and what you&apos;ve bought from other IIT
          students.
        </p>
      </header>

      {/* Active Listings */}
      <Card className="bg-slate-900/85 text-slate-100">
        <h2 className="mb-2 text-sm font-semibold">Active listings</h2>
        {myActiveListings.length === 0 ? (
          <p className="text-[11px] text-slate-400">
            You don&apos;t have any active listings.{" "}
            <Link href="/marketplace/sell" className="text-red-300 underline">
              List an item now.
            </Link>
          </p>
        ) : (
          <div className="space-y-1 text-xs">
            {myActiveListings.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg bg-slate-950/80 px-3 py-2"
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-50">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    ${(p.priceCents / 100).toFixed(2)} · {p.category} ·{" "}
                    {p.condition}
                  </p>
                </div>
                <Link
                  href={`/marketplace/${p.id}`}
                  className="text-[11px] font-semibold text-red-300 underline"
                >
                  View listing
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Sold Listings */}
      <Card className="bg-slate-900/85 text-slate-100">
        <h2 className="mb-2 text-sm font-semibold">Sold / inactive listings</h2>
        {mySoldListings.length === 0 ? (
          <p className="text-[11px] text-slate-400">
            No sold or inactive listings yet.
          </p>
        ) : (
          <div className="space-y-1 text-xs">
            {mySoldListings.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg bg-slate-950/80 px-3 py-2"
              >
                <div>
                  <p className="text-[11px] font-semibold text-slate-50">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    ${(p.priceCents / 100).toFixed(2)} · {p.category} ·{" "}
                    {p.condition}
                  </p>
                </div>
                <Link
                  href={`/marketplace/${p.id}`}
                  className="text-[11px] font-semibold text-slate-300 underline"
                >
                  View listing
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Purchases */}
      <Card className="bg-slate-900/85 text-slate-100">
        <h2 className="mb-2 text-sm font-semibold">My purchases</h2>
        {myPurchases.length === 0 ? (
          <p className="text-[11px] text-slate-400">
            You haven&apos;t purchased anything yet.
          </p>
        ) : (
          <div className="space-y-1 text-xs">
            {myPurchases.map((o) => {
              const conversation = o.conversations[0];
              return (
                <div
                  key={o.id}
                  className="flex items-center justify-between rounded-lg bg-slate-950/80 px-3 py-2"
                >
                  <div>
                    <p className="text-[11px] font-semibold text-slate-50">
                      {o.product.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      ${(o.product.priceCents / 100).toFixed(2)} ·{" "}
                      {o.paymentMethod === "card" ? "Card" : "In-person"} ·{" "}
                      {o.status}
                    </p>
                  </div>
                  {conversation ? (
                    <Link
                      href={`/marketplace/chat/${conversation.id}`}
                      className="text-[11px] font-semibold text-red-300 underline"
                    >
                      Open chat
                    </Link>
                  ) : (
                    <span className="text-[10px] text-slate-500">
                      No chat yet
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

export default async function MyMarketplacePage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto bg-slate-900/90 p-4 md:p-6">
          <MyMarketplaceInner />
        </main>
      </div>
    </div>
  );
}
