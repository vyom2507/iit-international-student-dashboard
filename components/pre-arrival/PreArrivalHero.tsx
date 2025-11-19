"use client";

import { Card } from "@/components/ui/Card";
import { Plane, MapPin, Globe2 } from "lucide-react";

export function PreArrivalHero() {
  return (
    <Card className="bg-gradient-to-br from-red-600/20 via-slate-950 to-slate-900 border-red-500/30">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium text-red-100 ring-1 ring-red-500/40">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600/90 text-[10px]">
              <Plane className="h-3 w-3" />
            </span>
            Pre-arrival journey · IIT international students
          </p>
          <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
            Get ready for IIT before you even land in Chicago
          </h1>
          <p className="max-w-2xl text-xs text-slate-200 md:text-sm">
            Use this page as your command center for visas, housing, cultural
            orientation, and essential documents. Complete the checklist, upload
            your files, and arrive on campus confident and prepared.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 ring-1 ring-slate-700">
              <MapPin className="h-3 w-3" />
              IIT Main Campus · Chicago
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 ring-1 ring-slate-700">
              <Globe2 className="h-3 w-3" />
              istudentshub.com · Pre-arrival hub
            </span>
          </div>
        </div>
        <div className="grid w-full max-w-xs grid-cols-3 gap-2 text-center text-[11px] text-slate-200 md:max-w-sm">
          <div className="rounded-xl bg-black/30 p-2 ring-1 ring-red-500/30">
            <p className="text-base font-semibold text-red-200">1</p>
            <p>Visa & SEVIS</p>
          </div>
          <div className="rounded-xl bg-black/30 p-2 ring-1 ring-red-500/30">
            <p className="text-base font-semibold text-red-200">2</p>
            <p>Housing & Arrival</p>
          </div>
          <div className="rounded-xl bg-black/30 p-2 ring-1 ring-red-500/30">
            <p className="text-base font-semibold text-red-200">3</p>
            <p>Cultural prep</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
