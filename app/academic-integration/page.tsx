"use client";

import { AcademicHero } from "@/components/academic-integration/AcademicHero";
import { RegistrationPlanner } from "@/components/academic-integration/RegistrationPlanner";
import { AcademicCalendarWidget } from "@/components/academic-integration/AcademicCalendarWidget";
import { AdvisorConnectPanel } from "@/components/academic-integration/AdvisorConnectPanel";
import { AcademicToolsPanel } from "@/components/academic-integration/AcademicToolsPanel";

export default function AcademicIntegrationPage() {
  return (
    <div className="space-y-6">
      <AcademicHero />

      <section className="grid gap-4 xl:grid-cols-[1.6fr,1.3fr]">
        <RegistrationPlanner />
        <AcademicCalendarWidget />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <AdvisorConnectPanel />
        <AcademicToolsPanel />
      </section>
    </div>
  );
}
