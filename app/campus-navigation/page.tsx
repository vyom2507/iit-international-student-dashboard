// app/campus-navigation/page.tsx
"use client";

import Image from "next/image";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { CampusMap } from "@/components/campus-navigation/CampusMap";
import { Card } from "@/components/ui/Card";

const campusBuildings = [
  {
    name: "MTCC – McCormick Tribune Campus Center",
    role: "Student Center · Food · Study Spaces",
    image: "/mtcc.jpg",
    note: "Common hub for student life, food, and informal meetups."
  },
  {
    name: "Hermann Hall",
    role: "Events · Orientation · Conferences",
    image: "/hermann-hall.jpg",
    note: "Many large orientation sessions and international student events happen here."
  },
  {
    name: "Galvin Library",
    role: "Library · Silent Study · Research",
    image: "/galvin-library.jpg",
    note: "Main library for quiet study, group rooms, and research support."
  },
  {
    name: "Stuart Building",
    role: "Classrooms · Labs",
    image: "/stuart-building.jpg",
    note: "Houses classrooms and labs for engineering, computing and tech courses."
  },
  {
    name: "Keating Sports Center",
    role: "Gym · Fitness · Sports",
    image: "/keating.jpg",
    note: "Go here for workouts, intramurals, and staying active during the semester."
  },
  {
    name: "CTA 35th–Bronzeville–IIT Station",
    role: "Transit · Green/Red Line",
    image: "/cta-station.jpg",
    note: "Your main CTA rail connection between campus and downtown Chicago."
  }
];

export default function CampusNavigationPage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Left sidebar */}
      <Sidebar />

      {/* Right side: navbar + page content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 bg-gray-100 p-4 md:p-6">
          <div className="space-y-6">
            {/* Map card (already styled light in CampusMap.tsx) */}
            <CampusMap />

            {/* Combined section: About + Slider in two columns */}
            <div className="border border-gray-200 bg-gray-100 p-4 text-slate-300 md:p-5">
              <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-6">
                {/* Left: About IIT Campus Navigation */}
                <div className="flex flex-col justify-center">
                  <h1 className="mb-2 text-sm font-semibold text-slate-900">
                    About IIT Campus Navigation
                  </h1>
                  <p className="mb-2 text-xs text-slate-800">
                    This campus navigation module uses OpenStreetMap tiles and
                    walking routes powered by openrouteservice. It helps you
                    estimate walking time and distance between key IIT locations
                    so you can plan your day across classes, housing, work, and
                    events.
                  </p>
                  <p className="text-xs text-slate-800">
                    Over time, this can evolve to include live shuttle tracking,
                    accessible paths, indoor navigation for major buildings, and
                    real-time overlays powered by IIT systems or
                    istudentshub.com.
                  </p>
                </div>

                {/* Right: Campus landmarks slider */}
                <div className="w-full">
                  <h2 className="mb-2 text-xs font-semibold text-slate-900">
                    Campus landmarks & buildings
                  </h2>
                  <p className="mb-3 text-[11px] text-slate-800">
                    Scroll through key IIT buildings where you&apos;ll spend
                    time for classes, study, social life, and commuting.
                  </p>

                  <div className="w-full">
                    <div className="flex w-full gap-4 overflow-x-auto py-1 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                      {campusBuildings.map((b) => (
                        <div
                          key={b.name}
                          className="w-56 flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200"
                        >
                          <div className="relative h-32 w-full overflow-hidden">
                            <Image
                              src={b.image}
                              alt={b.name}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
                          </div>
                          <div className="space-y-1 p-3">
                            <p className="text-[12px] font-semibold text-slate-900">
                              {b.name}
                            </p>
                            <p className="text-[11px] font-medium text-red-600">
                              {b.role}
                            </p>
                            <p className="text-[11px] text-slate-600">
                              {b.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
