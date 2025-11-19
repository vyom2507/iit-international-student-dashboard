"use client";

import { Card } from "@/components/ui/Card";
import Image from "next/image";
import { MapPinned, Building2, LifeBuoy } from "lucide-react";

export function ResourceHero() {
  return (
    <Card className="overflow-hidden border-red-500/30 bg-gradient-to-br from-red-600/20 via-slate-950 to-slate-900">
      <div className="grid gap-4 md:grid-cols-[1.2fr,1.4fr] md:items-center">
        {/* Text side */}
        <div className="space-y-3 pr-0 md:pr-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium text-red-100 ring-1 ring-red-500/40">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600/90 text-[10px]">
              <LifeBuoy className="h-3 w-3" />
            </span>
            Resource Directory · IIT international students
          </p>
          <h1 className="text-lg font-semibold text-slate-50 md:text-xl">
            Everything you need to live, study, and stay safe around IIT
          </h1>
          <p className="text-xs text-slate-200 md:text-sm">
            This hub pulls together campus services, local essentials, transport
            options, and key contacts so you can settle into Chicago with
            confidence. It&apos;s designed to work alongside istudentshub.com and
            official IIT systems.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 ring-1 ring-slate-700">
              <Building2 className="h-3 w-3" />
              Campus services & support
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 ring-1 ring-slate-700">
              <MapPinned className="h-3 w-3" />
              Local amenities & transport
            </span>
          </div>
        </div>

        {/* Banner image */}
        <div className="relative h-40 w-full overflow-hidden rounded-xl md:h-48 lg:h-56">
          <Image
            src="/resource-banner.jpg"
            alt="Students walking on campus near IIT with city in the background"
            fill
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-slate-950/50 via-slate-950/10 to-transparent" />
        </div>
      </div>
    </Card>
  );
}
