"use client";

import { Card } from "@/components/ui/Card";
import { MapPin, School, Users, Plane } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    title: "Pre-Arrival Preparation",
    href: "/public/pre-arrival.jpg",
    description:
      "Visa, housing, finances, and cultural orientation checklists tailored to your journey to IIT.",
    icon: Plane
  },
  {
    title: "Campus Navigation",
    href: "/campus-navigation",
    description:
      "Interactive campus maps, building guides, and location-based services on IIT Main Campus.",
    icon: MapPin
  },
  {
    title: "Academic Integration",
    href: "/academic-integration",
    description:
      "Course registration guidance, IIT academic calendar, and advisor connection tools.",
    icon: School
  },
  {
    title: "Social & Community",
    href: "/social-networking",
    description:
      "Peer groups, mentorship, and student organizations to help you build your IIT community.",
    icon: Users
  }
];

export function DashboardCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link key={card.title} href={card.href}>
            <Card className="group flex h-full flex-col justify-between bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/80 transition-transform hover:-translate-y-1 hover:shadow-red-900/40">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-50">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-300">
                    {card.description}
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/40 group-hover:bg-red-500/20">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-red-200">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  API-ready module
                </span>
                <span className="font-medium underline underline-offset-2">
                  Open
                </span>
              </div>
            </Card>
          </Link>
        );
      })}
    </section>
  );
}
