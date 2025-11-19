"use client";

import { Card } from "@/components/ui/Card";
import { CalendarDays, ExternalLink } from "lucide-react";

interface Term {
  code: string;
  name: string;
  highlights: { label: string; detail: string }[];
}

const mockTerms: Term[] = [
  {
    code: "fall-2025",
    name: "Fall 2025",
    highlights: [
      {
        label: "Classes begin",
        detail: "Late August · Check Registrar for exact date"
      },
      {
        label: "Last day to add / drop (full-term)",
        detail: "About 1 week after classes start"
      },
      {
        label: "Final exam period",
        detail: "Early December · See official calendar"
      }
    ]
  },
  {
    code: "spring-2026",
    name: "Spring 2026",
    highlights: [
      {
        label: "Classes begin",
        detail: "Mid-January"
      },
      {
        label: "Last day to withdraw (full-term)",
        detail: "Mid-semester · date set by Registrar"
      },
      {
        label: "Final exam period",
        detail: "Early May"
      }
    ]
  }
];

export function AcademicCalendarWidget() {
  return (
    <Card>
      <header className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              Academic Calendar Highlights
            </h2>
            <p className="text-xs text-slate-400">
              Keep track of IIT term start, add/drop, and exam windows while you
              plan travel and course loads.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-2 text-xs">
        {mockTerms.map((term) => (
          <div
            key={term.code}
            className="rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
          >
            <p className="text-[11px] font-semibold text-slate-100">
              {term.name}
            </p>
            <ul className="mt-1 space-y-1 text-[10px] text-slate-300">
              {term.highlights.map((h) => (
                <li key={h.label} className="flex justify-between gap-2">
                  <span className="font-medium">{h.label}</span>
                  <span className="text-right text-slate-400">{h.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a
        href="https://www.iit.edu/registrar/academic-calendar"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-red-300 hover:text-red-200"
      >
        Open full IIT academic calendar
        <ExternalLink className="h-3 w-3" />
      </a>

      <p className="mt-1 text-[10px] text-slate-500">
        TODO: Replace this mocked term list with live data from the Registrar&apos;s
        calendar (via RSS, ICS, or a custom API), and show events directly in
        your dashboard.
      </p>
    </Card>
  );
}
