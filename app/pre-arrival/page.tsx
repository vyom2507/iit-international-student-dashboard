"use client";

import { PreArrivalHero } from "@/components/pre-arrival/PreArrivalHero";
import { PreArrivalChecklistBoard } from "@/components/pre-arrival/PreArrivalChecklistBoard";
import { PreArrivalTimeline } from "@/components/pre-arrival/PreArrivalTimeline";
import { DocumentCenter } from "@/components/pre-arrival/DocumentCenter";

export default function PreArrivalPage() {
  return (
    <div className="space-y-6">
      <PreArrivalHero />
      <section className="grid gap-4 xl:grid-cols-[2fr,1.4fr]">
        <PreArrivalChecklistBoard />
        <PreArrivalTimeline />
      </section>
      <DocumentCenter />
    </div>
  );
}
