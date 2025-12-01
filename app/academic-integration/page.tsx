// app/academic-integration/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";

import { RegistrationPlanner } from "@/components/academic-integration/RegistrationPlanner";
import { AcademicCalendarWidget } from "@/components/academic-integration/AcademicCalendarWidget";

export default function AcademicIntegrationPage() {
  return (
    <div className="flex min-h-screen bg-slate-200 text-slate-900">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Right side: navbar + content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-6">
          <div className="space-y-6">
            {/* Hero with calendar image */}
            <Card className="border-none bg-gradient-to-r from-slate-200 via-slate-250 to-slate-300 text-slate-50">
              <div className="grid gap-4 md:grid-cols-[1.7fr,1.2fr] md:items-center">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800/90">
                    Academic Integration · IIT Chicago
                  </p>
                  <h1 className="text-xl font-semibold md:text-2xl text-slate-800/90">
                    Stay on top of IIT&apos;s academic calendar and key deadlines.
                  </h1>
                  <p className="text-xs text-slate-800/90">
                    Illinois Institute of Technology&apos;s academic calendar sets
                    the official dates for semester start and end, add/drop and
                    withdrawal deadlines, university holidays, and final exams.
                    This dashboard helps you line up your visa, course
                    registration, travel, and personal plans with those key dates.
                  </p>
                  <p className="text-[11px] text-slate-700">
                    Use this page to combine IIT&apos;s official calendar with
                    your own registration plan, advisor meetings, and study
                    workflow.
                  </p>

                  <p className="text-[11px] text-slate-900/90">
                    For full details, always verify against the Registrar&apos;s{" "}
                    <Link
                      href="https://www.iit.edu/registrar/academic-calendar"
                      target="_blank"
                      className="font-semibold underline underline-offset-2"
                    >
                      official academic calendar
                    </Link>
                    .
                  </p>
                </div>

                <div className="relative h-40 w-full md:h-48 lg:h-56">
                  <div className="absolute inset-0 rounded-2xl bg-black/15" />
                  <Image
                    src="/calendar.jpg"
                    alt="Academic calendar and planning"
                    fill
                    className="rounded-2xl object-cover shadow-lg shadow-black/40"
                  />
                </div>
              </div>
            </Card>

            {/* Registration + Calendar section */}
            <section className="grid gap-4 xl:grid-cols-[1.6fr,1.3fr]">
              {/* Registration planner */}
              <Card className="bg-white/95 text-slate-900">
                <h2 className="mb-2 text-sm font-semibold text-slate-900">
                  Registration & course planning
                </h2>
                <p className="mb-3 text-[11px] text-slate-600">
                  Map your IIT academic calendar to actual courses, credit load,
                  and registration windows so you don&apos;t miss enrollment
                  deadlines.
                </p>
                <RegistrationPlanner />
              </Card>

              {/* Academic calendar widget */}
              <Card className="bg-white/95 text-slate-900">
                <h2 className="mb-2 text-sm font-semibold text-slate-900">
                  Key academic dates snapshot
                </h2>
                <p className="mb-3 text-[11px] text-slate-600">
                  Use this widget to track term start/end, add/drop deadlines,
                  withdrawal dates, and exam periods based on IIT&apos;s
                  academic calendar.
                </p>
                <AcademicCalendarWidget />
                <p className="mt-3 text-[11px] text-slate-500">
                  This dashboard is designed to mirror IIT&apos;s official
                  calendar. If any date seems unclear, cross-check with the{" "}
                  <Link
                    href="https://www.iit.edu/registrar/academic-calendar"
                    target="_blank"
                    className="font-semibold underline underline-offset-2"
                  >
                    IIT Registrar academic calendar
                  </Link>
                  .
                </p>
              </Card>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
