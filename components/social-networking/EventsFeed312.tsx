"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { CalendarDays, Filter, ArrowUpRight } from "lucide-react";

type EventCategory =
  | "All"
  | "Social"
  | "Academic"
  | "Career Preparation"
  | "Cultural"
  | "Orientation";

interface SocialEvent {
  id: string;
  title: string;
  group: string;
  dateLabel: string;
  timeLabel: string;
  category: EventCategory;
  location: string;
  url: string;
  blurb: string;
}

const sampleEvents: SocialEvent[] = [
  {
    id: "intl-welcome-mixer",
    title: "International Student Welcome Mixer",
    group: "International Center & Student Life",
    dateLabel: "First week of classes",
    timeLabel: "Evening · On campus",
    category: "Orientation",
    location: "MTCC Ballroom",
    url: "https://312.iit.edu/events",
    blurb:
      "Meet other new international students, learn about campus resources, and enjoy snacks and music."
  },
  {
    id: "soccer-pickup",
    title: "Evening Pickup Soccer",
    group: "IIT Soccer Club",
    dateLabel: "Weekly",
    timeLabel: "Check 312 for times",
    category: "Social",
    location: "Stuart Field / Keating",
    url: "https://312.iit.edu/soccer/",
    blurb:
      "Casual pickup soccer games open to all skill levels—great way to de-stress and meet new friends."
  },
  {
    id: "career-resume",
    title: "Resume & LinkedIn Lab for International Students",
    group: "Career Services",
    dateLabel: "Mid-semester",
    timeLabel: "Afternoon",
    category: "Career Preparation",
    location: "Career Services or online",
    url: "https://312.iit.edu/events",
    blurb:
      "Get feedback on your resume and online presence with a focus on U.S. job search expectations."
  },
  {
    id: "cultural-night",
    title: "Global Cultural Night",
    group: "Cultural & Regional Student Orgs",
    dateLabel: "Once per semester",
    timeLabel: "Evening",
    category: "Cultural",
    location: "Campus venue",
    url: "https://312.iit.edu/events",
    blurb:
      "Performances, food, and cultural showcases from student groups across campus."
  }
];

export function EventsFeed312() {
  const [category, setCategory] = useState<EventCategory>("All");

  const filtered =
    category === "All"
      ? sampleEvents
      : sampleEvents.filter((e) => e.category === category);

  const categories: EventCategory[] = [
    "All",
    "Social",
    "Academic",
    "Career Preparation",
    "Cultural",
    "Orientation"
  ];

  return (
    <Card>
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Upcoming Social & Campus Events
            </h2>
            <p className="text-xs text-slate-700">
              These sample events mirror the kinds of activities posted on 312.
              Filter by what matters most to you.
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-2 py-1 text-[10px] text-slate-200 ring-1 ring-slate-700">
          <Filter className="h-3 w-3" />
          <select
            className="bg-transparent text-[10px] text-slate-100 focus:outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="space-y-2 text-xs">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  {event.title}
                </p>
                <p className="text-[10px] text-slate-400">{event.group}</p>
              </div>
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-slate-200 ring-1 ring-slate-700">
                {event.category}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-300">{event.blurb}</p>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
              <span>
                {event.dateLabel} · {event.timeLabel}
              </span>
              <span>{event.location}</span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-300 hover:text-red-200"
              >
                View details on 312
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <p className="text-[9px] text-slate-500">
                TODO: Replace with live events feed from 312 / CampusGroups or
                IIT portal.
              </p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://312.iit.edu/events"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-red-300 hover:text-red-200"
      >
        Browse all events on 312
        <ArrowUpRight className="h-3 w-3" />
      </a>
    </Card>
  );
}
