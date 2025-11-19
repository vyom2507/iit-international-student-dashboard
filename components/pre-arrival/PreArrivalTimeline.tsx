"use client";

import { Card } from "@/components/ui/Card";
import { Clock, CheckCircle2 } from "lucide-react";

const phases = [
  {
    label: "8–12 weeks before departure",
    items: [
      "Receive your admission letter and I-20 from IIT.",
      "Pay your SEVIS fee and keep the receipt.",
      "Schedule your visa interview (if required) and gather documents."
    ]
  },
  {
    label: "4–8 weeks before departure",
    items: [
      "Confirm housing (on-campus or off-campus) and sign agreements.",
      "Book your flight to Chicago and share details with family or mentor.",
      "Upload scans of your passport, visa, and I-20 to istudentshub.com or your IIT portal."
    ]
  },
  {
    label: "2–3 weeks before departure",
    items: [
      "Review IIT orientation schedule and required sessions.",
      "Finalize packing and make a folder for important documents in your carry-on.",
      "Review cultural orientation materials and academic expectations."
    ]
  },
  {
    label: "Arrival week",
    items: [
      "Go through U.S. immigration with documents ready.",
      "Travel to IIT Main Campus and check in to housing.",
      "Visit the international office and complete any remaining steps."
    ]
  }
];

export function PreArrivalTimeline() {
  return (
    <Card>
      <header className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
          <Clock className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Pre-Arrival Timeline
          </h2>
          <p className="text-xs text-slate-400">
            A simple roadmap from admission to arrival in Chicago.
          </p>
        </div>
      </header>

      <ol className="space-y-3 text-xs">
        {phases.map((phase) => (
          <li key={phase.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                <CheckCircle2 className="h-3 w-3" />
              </span>
              <span className="mt-1 h-full w-px flex-1 bg-slate-700/60" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-100">
                {phase.label}
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-[11px] text-slate-300">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-2 text-[10px] text-slate-500">
        TODO: Drive this timeline from live data (e.g. IIT term dates, housing
        deadlines, and orientation schedule) via your campus APIs.
      </p>
    </Card>
  );
}
