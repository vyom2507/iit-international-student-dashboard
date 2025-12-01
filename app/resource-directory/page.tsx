// app/resource-directory/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";

import { CampusServicesGrid } from "@/components/resource-directory/CampusServicesGrid";
import { LocalAmenitiesGrid } from "@/components/resource-directory/LocalAmenitiesGrid";
import { TransportationGrid } from "@/components/resource-directory/TransportationGrid";
import { EmergencyContactsPanel } from "@/components/resource-directory/EmergencyContactsPanel";

type TabKey = "campus" | "amenities" | "transport" | "emergency";

const slideshowSlides = [
  {
    src: "/mtcc.jpg",
    title: "MTCC · Campus Life Hub",
    subtitle: "Student services, food, study areas, and events."
  },
  {
    src: "/IIT_Galvin_Library.jpg",
    title: "Library & Learning Commons",
    subtitle: "Quiet study spaces, research support, and tech resources."
  },
  {
    src: "/iit.jpg",
    title: "Chicago as Your Campus",
    subtitle: "Transit, neighborhoods, and city resources for IIT students."
  }
];

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all
        ${
          isActive
            ? "bg-red-600 text-white shadow-sm shadow-red-900/40"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
    >
      {label}
    </button>
  );
}

export default function ResourceDirectoryPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("campus");
  const [slideIndex, setSlideIndex] = useState(0);

  // Simple auto-slideshow
  useEffect(() => {
    if (slideshowSlides.length <= 1) return;
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowSlides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const currentSlide = slideshowSlides[slideIndex];

  return (
    <div className="flex min-h-screen bg-slate-200 text-slate-900">
      {/* Sticky sidebar */}
      <Sidebar />

      {/* Right side: navbar + page content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Sticky top navbar */}
        <TopNavbar />

        <main className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* HERO (TEXT ONLY) + SLIDESHOW */}
            <section className="grid gap-5 md:grid-cols-[1.6fr,1.4fr]">
              {/* Text-only hero */}
              <Card className="bg-slate-50/95 shadow-[0_16px_40px_rgba(127,17,17,0.18)] border-red-100">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                    Resource Directory · IIT International
                  </p>
                  <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
                    All the support you need for life at IIT, in one place.
                  </h1>
                  <p className="text-[13px] leading-relaxed text-slate-700 md:text-sm">
                    As an international student at Illinois Institute of Technology,
                    you&apos;ll rely on campus offices, nearby essentials, city
                    transportation, and emergency support. This directory brings those
                    resources together in a single, student-friendly dashboard so you
                    don&apos;t have to search across multiple sites.
                  </p>
                  <p className="text-[12px] leading-relaxed text-slate-800">
                    Use the tabs below to explore campus services, local amenities,
                    transportation options, and emergency contacts tailored to your
                    IIT journey in Chicago.
                  </p>
                </div>
              </Card>

              {/* Slideshow / visual panel */}
              <Card className="relative overflow-hidden bg-slate-50/95 p-0 shadow-[0_16px_40px_rgba(127,17,17,0.22)] border-red-100">
                <div className="relative h-56 w-full overflow-hidden md:h-60">
                  <Image
                    src={currentSlide.src}
                    alt={currentSlide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-slate-50">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200">
                      IIT Resources · Visual Tour
                    </p>
                    <h2 className="text-sm font-semibold">{currentSlide.title}</h2>
                    <p className="text-[11px] text-slate-100/90">
                      {currentSlide.subtitle}
                    </p>
                  </div>
                </div>

                {/* Slide indicators */}
                <div className="flex items-center justify-center gap-2 bg-slate-50/95 px-3 py-2">
                  {slideshowSlides.map((slide, idx) => {
                    const isActive = idx === slideIndex;
                    return (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setSlideIndex(idx)}
                        className={`h-2.5 rounded-full transition-all ${
                          isActive
                            ? "w-7 bg-red-600 shadow-sm shadow-red-800"
                            : "w-2.5 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Show slide: ${slide.title}`}
                      />
                    );
                  })}
                </div>
              </Card>
            </section>

            {/* TABS SECTION */}
            <Card className="bg-slate-50 shadow-[0_16px_40px_rgba(127,17,17,0.16)] border-red-100">
              {/* Tabs header */}
              <header className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                    Resource Directory
                  </p>
                  <h2 className="text-base font-semibold text-slate-900 md:text-lg">
                    Explore IIT services.
                  </h2>
                  <p className="text-[12px] leading-relaxed text-slate-700">
                      Explore offices like the International Center, Registrar, Student
                      Health & Wellness, Career Services, Academic Advising, and more.
                      These are your first stops for academic, immigration, and
                      wellbeing support.
                    </p>
                </div>

                {/* Tab buttons */}
                <div className="flex flex-wrap gap-2">
                  <TabButton
                    label="Campus Services"
                    isActive={activeTab === "campus"}
                    onClick={() => setActiveTab("campus")}
                  />
                  <TabButton
                    label="Local Amenities"
                    isActive={activeTab === "amenities"}
                    onClick={() => setActiveTab("amenities")}
                  />
                  <TabButton
                    label="Transportation"
                    isActive={activeTab === "transport"}
                    onClick={() => setActiveTab("transport")}
                  />
                  <TabButton
                    label="Emergency Contacts"
                    isActive={activeTab === "emergency"}
                    onClick={() => setActiveTab("emergency")}
                  />
                </div>
              </header>

              {/* Tab content */}
              <div className="mt-2 space-y-4 text-sm text-slate-800">
                {activeTab === "campus" && (
                  <div className="space-y-3">
                    
                    <CampusServicesGrid />
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div className="space-y-3">
                    <p className="text-[12px] leading-relaxed text-slate-700">
                      Find groceries, banks, clinics, pharmacies, and other everyday
                      essentials around Mies Campus and across Chicago so you can settle
                      in comfortably.
                    </p>
                    <LocalAmenitiesGrid />
                  </div>
                )}

                {activeTab === "transport" && (
                  <div className="space-y-3">
                    <p className="text-[12px] leading-relaxed text-slate-700">
                      Learn how to commute using CTA trains and buses, Metra, IIT
                      shuttles, biking, and walking. We highlight safety tips and common
                      routes used by IIT students.
                    </p>
                    <TransportationGrid />
                  </div>
                )}

                {activeTab === "emergency" && (
                  <div className="space-y-3">
                    <p className="text-[12px] leading-relaxed text-red-700">
                      These are the numbers and contacts you should save in your phone
                      as soon as you arrive. In any life-threatening emergency, always
                      call <span className="font-semibold">911</span> first, then follow
                      IIT&apos;s safety and support procedures.
                    </p>
                    <EmergencyContactsPanel />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
