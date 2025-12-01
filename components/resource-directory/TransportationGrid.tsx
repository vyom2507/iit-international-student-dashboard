"use client";

import { Card } from "@/components/ui/Card";
import {
  TrainFront,
  Bus,
  Bike,
  Plane,
  MapPinned
} from "lucide-react";

interface TransportItem {
  id: string;
  mode: string;
  label: string;
  description: string;
  tip: string;
  icon: React.ComponentType<any>;
}

const transportItems: TransportItem[] = [
  {
    id: "cta-train",
    mode: "CTA Train",
    label: "Red & Green Line stations near IIT",
    description:
      "Two CTA train lines serve the campus area, connecting you to downtown Chicago and other neighborhoods.",
    tip:
      "Integrate real-time train times and directions from campus navigation using your mapping APIs.",
    icon: TrainFront
  },
  {
    id: "cta-bus",
    mode: "CTA Bus",
    label: "Bus routes around campus",
    description:
      "City buses connect campus to nearby grocery stores, neighborhoods, and transit hubs.",
    tip:
      "Include a simple &apos;How to ride&apos; guide: Ventra card, fares, and transfer basics.",
    icon: Bus
  },
  {
    id: "campus-shuttle",
    mode: "Campus Shuttle",
    label: "Shuttle / campus transportation",
    description:
      "Some routes or special shuttles may be available between campuses or key locations.",
    tip:
      "Pull live shuttle schedules from campus systems or embed links to timetable PDFs.",
    icon: MapPinned
  },
  {
    id: "bike",
    mode: "Bike & Micro-mobility",
    label: "Bikes & scooters (where allowed)",
    description:
      "Options to bike to campus or use shared mobility programs, with safety and parking information.",
    tip:
      "Add a map of bike racks and recommended routes around campus.",
    icon: Bike
  },
  {
    id: "airport",
    mode: "Airport Arrival",
    label: "From airport to IIT",
    description:
      "Guide from major airports to campus via train, bus, or ride-share, plus tips for late-night arrivals.",
    tip:
      "Include simple step-by-step directions and estimated costs; link to pre-arrival section.",
    icon: Plane
  }
];

export function TransportationGrid() {
  return (
    <Card>
      <header className="mb-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Transportation & Getting Around
        </h2>
        <p className="text-xs text-slate-700">
          Understand your options for moving between campus, home, and the rest
          of Chicago.
        </p>
      </header>

      <div className="grid gap-2 text-xs md:grid-cols-2">
        {transportItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-start gap-2 rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  {item.mode}
                </p>
                <p className="text-[10px] text-slate-300">{item.label}</p>
                <p className="mt-1 text-[10px] text-slate-300">
                  {item.description}
                </p>
                <p className="mt-1 text-[9px] text-slate-500">
                  TODO: {item.tip}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
