import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, CalendarDays, Store } from "lucide-react";
import { Card } from "@/components/ui/Card";

// 🔴 IMPORTANT: make sure these filenames exist in your /public folder
// For example:
//   /public/pre-arrival.jpg                -> image: "/pre-arrival.jpg"
//   /public/campus-navigation.jpg          -> image: "/campus-navigation.jpg"
//   /public/academic-integration.jpg       -> image: "/academic-integration.jpg"
//   /public/social-networking.jpg          -> image: "/social-networking.jpg"

const featureCards = [
  {
    id: "pre-arrival",
    title: "Pre-Arrival Preparation",
    href: "/pre-arrival",
    description:
      "Visa checklists, housing guidance, cultural orientation, and essential documents to bring to IIT.",
    image: "/pre-arrival.jpg",
    badge: "Step 1"
  },
  {
    id: "campus-navigation",
    title: "Campus Navigation",
    href: "/campus-navigation",
    description:
      "Interactive campus navigation powered by OpenRouteService to help you move confidently around IIT.",
    image: "/campus-navigation.jpg",
    badge: "On Campus"
  },
  {
    id: "academic-integration",
    title: "Academic Integration",
    href: "/academic-integration",
    description:
      "Course planning, academic calendar highlights, and advisor connections tailored for international students.",
    image: "/academic-integration.jpg",
    badge: "Academics"
  },
  {
    id: "social-networking",
    title: "Social Networking",
    href: "/social-networking",
    description:
      "Join student orgs, events, and peer communities through IIT’s social spaces and 312.iit.edu.",
    image: "/social-networking.jpg",
    badge: "Community"
  }
];

const socialGroups = [
  {
    name: "International Student Welcome Circle",
    focus: "Arrival support · Airport pickup coordination",
    members: "120+ students"
  },
  {
    name: "Grad Research & Tech Meetups",
    focus: "CS, Cybersecurity, AI, and Data Science",
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
  }
];

const marketplaceHighlights = [
  {
    title: "Used Textbooks & Course Materials",
    description:
      "Find IIT-specific textbooks, lab manuals, and reference books from seniors at student-friendly prices.",
    tag: "Study Essentials"
  },
  {
    title: "Dorm & Apartment Setup",
    description:
      "Beds, lamps, organizers, kitchen tools and more from students moving out or upgrading their setups.",
    tag: "Room & Furniture"
  },
  {
    title: "Electronics & Study Gear",
    description:
      "Monitors, laptop stands, keyboards, and other accessories ideal for hybrid classes and research.",
    tag: "Tech & Devices"
  },
  {
    title: "Winter Clothing Swap",
    description:
      "Chicago winters are serious. Get coats, boots, and layers from students who no longer need them.",
    tag: "Seasonal"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
            iStudentsHub · IIT International
          </p>
          <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            Your international student launchpad for IIT.
          </h1>
          <p className="text-sm text-slate-300">
            From visas and housing to campus maps, academics, social life, and
            a student marketplace — everything is organized in one modern
            dashboard to support your journey to Chicago and IIT.
          </p>
        </div>

        <div className="hidden h-28 w-full max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-red-700/70 via-slate-900 to-black p-[1px] ring-1 ring-red-500/60 md:block">
          <div className="flex h-full w-full flex-col justify-between rounded-[14px] bg-slate-950/90 p-3 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-600/20 px-2 py-0.5 text-[10px] font-medium text-red-200 ring-1 ring-red-500/40">
                Live Campus Hub
              </span>
              <span className="text-[10px] text-slate-400">
                IIT · Chicago, IL
              </span>
            </div>
            <p className="text-[11px] text-slate-200">
              Pre-arrival checklists, navigation, classes, events, and a
              marketplace for real IIT students.
            </p>
            <p className="text-[10px] text-slate-500">
              Designed for international students transitioning to IIT.
            </p>
          </div>
        </div>
      </section>

      {/* Feature cards with pictures */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => (
          <Card key={card.id} className="flex flex-col overflow-hidden p-0">
            {/* Image */}
            <div className="relative h-28 w-full overflow-hidden bg-slate-900">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2 p-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[9px] font-medium text-slate-200 ring-1 ring-slate-700">
                {card.badge}
              </span>
              <h2 className="text-[13px] font-semibold text-slate-50">
                {card.title}
              </h2>
              <p className="flex-1 text-[11px] leading-snug text-slate-300">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-300 hover:text-red-200"
              >
                Open module
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        ))}
      </section>

      {/* Messaging + events */}
      <section className="grid gap-4 lg:grid-cols-2">
        {/* Group messaging preview */}
        <Card>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
              <MessageCircle className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                Group messaging (preview)
              </h2>
              <p className="text-xs text-slate-400">
                Imagine real-time group chats for airport arrivals, housing, and
                academic cohorts.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="rounded-lg bg-slate-950/70 p-2 ring-1 ring-slate-800">
              <p className="text-[11px] font-semibold text-slate-100">
                🛬 New Arrivals · Fall 2025
              </p>
              <p className="text-[11px] text-slate-300">
                &quot;My flight gets in at 3 PM at O&apos;Hare. Anyone else
                arriving around that time?&quot;
              </p>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-2 ring-1 ring-slate-800">
              <p className="text-[11px] font-semibold text-slate-100">
                🏠 Housing & Roommates
              </p>
              <p className="text-[11px] text-slate-300">
                &quot;Looking for a roommate near Mies Campus — budget
                $700–$900, open to sharing with another grad student.&quot;
              </p>
            </div>
          </div>
        </Card>

        {/* Campus event calendar preview */}
        <Card>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                Campus events calendar (preview)
              </h2>
              <p className="text-xs text-slate-400">
                This will plug into IIT&apos;s calendar APIs and social feeds
                for real events.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-lg bg-slate-950/70 p-2 ring-1 ring-slate-800">
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  International Student Orientation
                </p>
                <p className="text-[10px] text-slate-400">
                  Hermann Hall · Welcome, visa check, campus tour
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] text-slate-200">
                Aug 20
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-950/70 p-2 ring-1 ring-slate-800">
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  IIT Cultural Night
                </p>
                <p className="text-[10px] text-slate-400">
                  MTCC · Food stalls, performances, student groups
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] text-slate-200">
                Sep 06
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* Social groups + marketplace highlight */}
      <section className="grid gap-4 lg:grid-cols-2">
        {/* Social groups horizontal cards */}
        <Card>
          <div className="mb-2 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                Campus social groups
              </h2>
              <p className="text-xs text-slate-400">
                Discover communities that can support you socially, culturally,
                and academically.
              </p>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {socialGroups.map((group) => (
              <div
                key={group.name}
                className="min-w-[210px] rounded-xl bg-slate-950/80 p-3 ring-1 ring-slate-800"
              >
                <p className="text-[11px] font-semibold text-slate-100">
                  {group.name}
                </p>
                <p className="mt-1 text-[10px] text-slate-300">
                  {group.focus}
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  {group.members}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Marketplace highlight with clear link */}
        <Card>
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
                <Store className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-slate-50">
                  Student marketplace (beta)
                </h2>
                <p className="text-xs text-slate-400">
                  Buy, sell, or share used items with other IIT students.
                  Backed by Neon + Prisma + Stripe.
                </p>
              </div>
            </div>
            <Link
              href="/marketplace"
              className="hidden rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 md:inline-flex"
            >
              Open marketplace
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {marketplaceHighlights.map((item) => (
              <Link
                key={item.title}
                href="/marketplace"
                className="min-w-[220px] rounded-xl bg-slate-950/80 p-3 ring-1 ring-slate-800 transition hover:-translate-y-0.5 hover:ring-red-500/50"
              >
                <p className="text-[11px] font-semibold text-slate-100">
                  {item.title}
                </p>
                <p className="mt-1 text-[10px] text-slate-300">
                  {item.description}
                </p>
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[9px] text-slate-200 ring-1 ring-slate-700">
                  {item.tag}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-3 md:hidden">
            <Link
              href="/marketplace"
              className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-[11px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500"
            >
              Open full marketplace
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
