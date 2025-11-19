"use client";

import { Card } from "@/components/ui/Card";
import { Users2, Sparkles, Globe2 } from "lucide-react";

export function SocialHero() {
  return (
    <Card className="bg-gradient-to-br from-red-600/20 via-slate-950 to-slate-900 border-red-500/30">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium text-red-100 ring-1 ring-red-500/40">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600/90 text-[10px]">
              <Users2 className="h-3 w-3" />
            </span>
            Social networking · Powered by 312 & istudentshub
          </p>
          <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
            Find your people at Illinois Tech before and after you arrive
          </h1>
          <p className="max-w-2xl text-xs text-slate-200 md:text-sm">
            Use this hub to discover student organizations, campus events, and
            peer communities. We mirror IIT&apos;s official 312 platform so you
            can browse groups here and jump into the real events and sign-ups
            when you&apos;re ready.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 ring-1 ring-slate-700">
              <Sparkles className="h-3 w-3" />
              Based on IIT&apos;s 312 student engagement platform
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 ring-1 ring-slate-700">
              <Globe2 className="h-3 w-3" />
              Designed especially for international students
            </span>
          </div>
        </div>

        <div className="grid w-full max-w-xs grid-cols-3 gap-2 text-center text-[11px] text-slate-200 md:max-w-sm">
          <div className="rounded-xl bg-black/30 p-2 ring-1 ring-red-500/30">
            <p className="text-base font-semibold text-red-200">200+</p>
            <p>Student orgs on 312*</p>
          </div>
          <div className="rounded-xl bg-black/30 p-2 ring-1 ring-red-500/30">
            <p className="text-base font-semibold text-red-200">400+</p>
            <p>Events / year*</p>
          </div>
          <div className="rounded-xl bg-black/30 p-2 ring-1 ring-red-500/30">
            <p className="text-base font-semibold text-red-200">∞</p>
            <p>New connections</p>
          </div>
          <p className="col-span-3 text-[9px] text-slate-500">
            *Numbers are illustrative; pull live counts from 312 APIs or IIT
            portal when available.
          </p>
        </div>
      </div>
    </Card>
  );
}
