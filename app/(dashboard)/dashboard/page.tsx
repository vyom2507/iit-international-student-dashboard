// app/(dashboard)/dashboard/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Store } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { RealtimeGroupChat } from "@/components/chat/RealtimeGroupChat";
import { prisma } from "@/lib/prisma";

// Feature modules (cards)
const featureCards = [
  {
    id: "pre-arrival",
    title: "Pre-Arrival Preparation",
    href: "/pre-arrival",
    description:
      "Visa prep, housing decisions, and required documents before you land in Chicago.",
    image: "/pre-arrival.jpg",
    badge: "Start Here"
  },
  {
    id: "campus-navigation",
    title: "Campus Navigation",
    href: "/campus-navigation",
    description:
      "Maps and routes to classrooms, labs, MTCC, Galvin Library, and more.",
    image: "/campus-navigation.jpg",
    badge: "On Campus"
  },
  {
    id: "academic-integration",
    title: "Academic Integration",
    href: "/academic-integration",
    description:
      "Plan courses, understand milestones, and connect with advisers.",
    image: "/academic-integration.jpg",
    badge: "Academics"
  },
  {
    id: "social-networking",
    title: "Social Networking",
    href: "/social-networking",
    description:
      "Join student orgs, cultural groups, and peer communities at IIT.",
    image: "/social-networking.jpg",
    badge: "Community"
  }
];

// Campus groups (simple grid, no slider)
const campusGroups = [
  {
    name: "International Student Welcome Circle",
    focus: "Arrival support · Airport pickup coordination",
    members: "120+ students"
  },
  {
    name: "Grad Research & Tech Meetups",
    focus: "CS, Cybersecurity, AI, Data Science, and more",
    members: "85+ students"
  },
  {
    name: "Cultural Fusion Nights @ IIT",
    focus: "Food, music, and cultural exchange events",
    members: "200+ students"
  },
  {
    name: "Housing & Roommate Connect",
    focus: "Find roommates and off-campus housing tips",
    members: "150+ students"
  },
  {
    name: "Wellness & Balance Community",
    focus: "Mental health, fitness, and wellbeing",
    members: "90+ students"
  }
];

export default async function DashboardPage() {
  // Latest active marketplace listings from Neon via Prisma
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: {
      owner: true
    }
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* HERO SECTION (short) */}
      <section className="grid gap-4 lg:grid-cols-[1.7fr,1.3fr]">
        {/* Left: main hero text */}
        <Card className="bg-slate-50/95 border-red-100 shadow-[0_14px_32px_rgba(127,17,17,0.18)]">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
              iStudentsHub · IIT International
            </p>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              One dashboard for your IIT international student journey.
            </h1>
            <p className="text-[12px] leading-relaxed text-slate-700">
              Use this space to prepare for arrival, navigate campus, register
              for classes, connect with peers, and trade items through the
              student marketplace.
            </p>
            <p className="text-[11px] text-slate-800">
              Start with <span className="font-semibold">Pre-Arrival</span> to
              get your visa and documents ready, then explore{" "}
              <span className="font-semibold">Campus Navigation</span>,{" "}
              <span className="font-semibold">Academic Integration</span>, and{" "}
              <span className="font-semibold">Social Networking</span> modules
              as you settle into life in Chicago.
            </p>
          </div>
        </Card>

        {/* Right: compact info card */}
        <Card className="bg-slate-50/95 border-red-100 shadow-[0_14px_32px_rgba(127,17,17,0.22)]">
          <div className="flex h-full flex-col justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                Quick Overview
              </p>
              <h2 className="text-sm font-semibold text-slate-900">
                What this dashboard gives you
              </h2>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700">
                <li>• Pre-arrival checklists tailored to IIT requirements.</li>
                <li>• Campus maps and transit guidance around Mies Campus.</li>
                <li>• Academic planning tied to IIT&apos;s calendars.</li>
                <li>• Real-time student chats and marketplace listings.</li>
              </ul>
            </div>
            <Link
              href="/pre-arrival"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500"
            >
              Go to Pre-Arrival
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </Card>
      </section>

      {/* FEATURE MODULE CARDS (with images) */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => (
          <Card
            key={card.id}
            className="flex flex-col overflow-hidden bg-slate-50 p-0 border-red-100 shadow-[0_14px_32px_rgba(15,23,42,0.22)]"
          >
            <div className="relative h-24 w-full overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[9px] font-medium text-slate-100 ring-1 ring-slate-700">
                {card.badge}
              </span>
              <h2 className="text-[13px] font-semibold text-slate-900">
                {card.title}
              </h2>
              <p className="flex-1 text-[11px] leading-snug text-slate-700">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-500"
              >
                Open module
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        ))}
      </section>

      {/* CAMPUS GROUPS SECTION (simple grid) */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-slate-50 border-red-100 shadow-[0_14px_32px_rgba(15,23,42,0.2)]">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                Campus Groups
              </p>
              <h2 className="text-sm font-semibold text-slate-900">
                Communities to join at IIT.
              </h2>
              <p className="text-[11px] text-slate-700">
                These examples mirror the kinds of student orgs you&apos;ll find
                through IIT and 312.iit.edu.
              </p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {campusGroups.map((group) => (
              <div
                key={group.name}
                className="rounded-xl bg-white p-3 ring-1 ring-slate-200"
              >
                <p className="text-[11px] font-semibold text-slate-900">
                  {group.name}
                </p>
                <p className="mt-1 text-[10px] text-slate-700">
                  {group.focus}
                </p>
                <p className="mt-1 text-[10px] font-semibold text-red-700">
                  {group.members}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick “Next Steps” or Events */}
        <Card className="bg-slate-50 border-red-100 shadow-[0_14px_32px_rgba(15,23,42,0.2)]">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/15 text-red-600 ring-1 ring-red-300">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Upcoming milestones (example)
              </h2>
              <p className="text-[11px] text-slate-700">
                Tie these to IIT&apos;s academic calendar and your student type.
              </p>
            </div>
          </div>
          <ul className="space-y-1.5 text-[11px] text-slate-700">
            <li>• Arrival window & move-in dates.</li>
            <li>• International Student Orientation at Hermann Hall.</li>
            <li>• Add/drop deadlines for your first term.</li>
            <li>• Career services events for new students.</li>
          </ul>
        </Card>
      </section>

      {/* GROUP CHAT + MARKETPLACE SECTION */}
      <section className="grid gap-4 xl:grid-cols-[1.6fr,1.4fr]">
        {/* Real-time chat card */}
        <Card className="bg-slate-50 border-red-100 shadow-[0_16px_40px_rgba(15,23,42,0.22)]">
          <div className="mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
              Group Chat
            </p>
            <h2 className="text-sm font-semibold text-slate-900">
              New Arrivals · Airport, housing, and first-week questions
            </h2>
            <p className="text-[11px] text-slate-700">
              Chat with other international students in real time. Messages show
              names and avatars from your dashboard profile.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white">
            <RealtimeGroupChat defaultRoomSlug="new-arrivals" />
          </div>
        </Card>

        {/* Marketplace highlight (grid, not slider) */}
        <Card className="bg-slate-50 border-red-100 shadow-[0_16px_40px_rgba(15,23,42,0.22)]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                Student Marketplace
              </p>
              <h2 className="text-sm font-semibold text-slate-900">
                Latest listings from IIT students.
              </h2>
              <p className="text-[11px] text-slate-700">
                Buy or sell textbooks, furniture, electronics, and more.
              </p>
            </div>
            <Link
              href="/marketplace/sell"
              className="hidden rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 md:inline-flex"
            >
              Post a listing
            </Link>
          </div>

          {products.length === 0 ? (
            <p className="rounded-lg bg-slate-100 px-3 py-2 text-[11px] text-slate-700">
              No active listings yet. Be the first to{" "}
              <Link
                href="/marketplace/sell"
                className="font-semibold text-red-600 underline-offset-2 hover:underline"
              >
                post an item
              </Link>{" "}
              for sale.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {products.map((product) => {
                const price = (product.priceCents || 0) / 100;
                const sellerName =
                  (product.owner as any)?.fullName || "IIT student";
                return (
                  <Link
                    key={product.id}
                    href={`/marketplace/${product.slug}`}
                    className="group overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-red-500/60"
                  >
                    <div className="relative h-24 w-full overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <p className="absolute bottom-1 left-2 right-2 truncate text-[11px] font-semibold text-slate-50 drop-shadow">
                        {product.title}
                      </p>
                    </div>
                    <div className="space-y-1 p-2.5">
                      <p className="text-[11px] font-semibold text-slate-900">
                        ${price.toFixed(2)}
                      </p>
                      <p className="truncate text-[10px] text-slate-700">
                        Seller: {sellerName}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-700">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-500"
            >
              View full marketplace
              <Store className="h-3 w-3" />
            </Link>
            <Link
              href="/marketplace/sell"
              className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 md:hidden"
            >
              Post a listing
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
