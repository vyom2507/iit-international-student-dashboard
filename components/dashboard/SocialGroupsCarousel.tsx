"use client";

import { Card } from "@/components/ui/Card";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useRef } from "react";

const groups = [
  {
    name: "IIT International Students Association",
    focus:
      "Welcome events, airport pickups, and peer mentoring for new IIT internationals.",
    vibe: "All regions · Community",
    members: "1.2K members"
  },
  {
    name: "African Students at IIT",
    focus:
      "Celebrating African cultures, food, music, and academic success stories at IIT.",
    vibe: "Cultural · Social",
    members: "450 members"
  },
  {
    name: "South Asian Students @ IIT",
    focus:
      "Festivals, movie nights, and language exchanges for South Asian students and friends.",
    vibe: "Cultural · Social",
    members: "600 members"
  },
  {
    name: "Women in Tech at IIT",
    focus:
      "Mentorship, coding workshops, interview prep, and tech networking in Chicago.",
    vibe: "STEM · Career",
    members: "320 members"
  },
  {
    name: "IIT Grad & Research Circle",
    focus:
      "Grad-focused study groups, research talks, and conference preparation sessions.",
    vibe: "Academic · Grad",
    members: "280 members"
  }
];

export function SocialGroupsCarousel() {
  const listRef = useRef<HTMLDivElement | null>(null);

  function scrollByOffset(offset: number) {
    if (!listRef.current) return;
    listRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <Card className="h-full">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Campus Social Groups
          </h2>
          <p className="text-xs text-slate-400">
            Discover IIT communities you can plug into from day one.
          </p>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={() => scrollByOffset(-260)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByOffset(260)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="scrollbar-thin flex gap-3 overflow-x-auto pb-2 pt-1"
      >
        {groups.map((group) => (
          <div
            key={group.name}
            className="min-w-[240px] max-w-xs flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-3 ring-1 ring-slate-800"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-red-600/20 text-red-400 ring-1 ring-red-500/40">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-50">
                  {group.name}
                </p>
                <p className="text-[10px] text-slate-400">{group.vibe}</p>
              </div>
            </div>
            <p className="mb-2 text-[11px] text-slate-200">{group.focus}</p>
            <p className="text-[10px] font-medium text-slate-300">
              {group.members}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
