// app/social-networking/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";

import { SocialHero } from "@/components/social-networking/SocialHero";
import { GroupsDirectory } from "@/components/social-networking/GroupsDirectory";
import { EventsFeed312 } from "@/components/social-networking/EventsFeed312";
import { MentorConnections } from "@/components/social-networking/MentorConnections";

type TabKey = "groups" | "events" | "mentors";

const slides = [
  {
    src: "/iit_cultural_night.jpg",
    title: "Cultural Night at IIT",
    subtitle: "Food, music, and performances from around the world."
  },
  {
    src: "/about.jpg",
    title: "Student Organizations Fair",
    subtitle: "Discover cultural, academic, and professional groups."
  },
  {
    src: "/campus-navigation.jpg",
    title: "Study & Project Teams",
    subtitle: "Build community through coursework and research."
  },
  {
    src: "/Chicago-Travel-Tips.jpg",
    title: "Chicago as Your Campus",
    subtitle: "Explore the city with fellow students and friends."
  },
  {
    src: "/visit.jpg",
    title: "International Welcome Events",
    subtitle: "Meet other new students adjusting to life at IIT."
  }
];

export default function SocialNetworkingPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("groups");
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-rotate slideshow
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const currentSlide = slides[slideIndex];

  return (
    <div className="flex min-h-screen bg-slate-200 text-slate-900">
      {/* Sticky sidebar */}
      <Sidebar />

      {/* Right side: navbar + content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Sticky top navbar */}
        <TopNavbar />

        {/* Page body */}
        <main className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* HERO + SLIDESHOW (similar pattern to Resource Directory) */}
            <section className="grid gap-4 md:grid-cols-[1.6fr,1.4fr]">
              {/* Text hero wrapped in IIT-style card */}
              <Card className="bg-slate-50/95 shadow-[0_18px_45px_rgba(127,17,17,0.20)] border-red-100">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500">
                    Social Networking · IIT International
                  </p>
                  <h1 className="text-lg font-semibold text-slate-900 md:text-xl">
                    Build your IIT community—on campus and online.
                  </h1>
                  <p className="text-xs text-slate-700 md:text-sm">
                    International life at Illinois Tech is more than classes and
                    paperwork. This space focuses on friendship, mentorship, and
                    belonging: student organizations, cultural groups, events, and
                    peer support communities that help you feel at home in Chicago.
                  </p>
                  <p className="text-[11px] text-slate-800">
                    Use the tabs below to explore student groups, upcoming events,
                    and ways to connect with mentors who understand your academic
                    and cultural journey.
                  </p>
                </div>
              </Card>

              {/* Visual slideshow of campus social life */}
              <Card className="relative overflow-hidden bg-slate-50/95 p-0 shadow-[0_18px_45px_rgba(127,17,17,0.25)] border-red-100">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={currentSlide.src}
                    alt={currentSlide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-slate-50">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200">
                      IIT Community · Moments
                    </p>
                    <h2 className="text-sm font-semibold">{currentSlide.title}</h2>
                    <p className="text-[11px] text-slate-100/90">
                      {currentSlide.subtitle}
                    </p>
                  </div>
                </div>

                {/* Slide indicators */}
                <div className="flex items-center justify-center gap-2 bg-slate-50/95 px-3 py-2">
                  {slides.map((slide, idx) => {
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

            {/* TABBED CONTENT – matches Resource Directory UX */}
            <Card className="bg-slate-50 shadow-[0_18px_45px_rgba(127,17,17,0.16)] border-red-100">
              {/* Tabs header */}
              <header className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-500">
                    Social Networking
                  </p>
                  <h2 className="text-base font-semibold text-slate-900">
                    Groups, events, and mentors that shape your IIT experience.
                  </h2>
                  <p className="text-xs text-slate-800">
                    Focus on what you need right now: communities to join,
                    events to attend, or people to learn from.
                  </p>
                </div>

                {/* Tab buttons */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setActiveTab("groups")}
                    className={`rounded-full px-3 py-1.5 font-semibold transition ${
                      activeTab === "groups"
                        ? "bg-red-600 text-white shadow-sm shadow-red-900/40"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Student Groups
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("events")}
                    className={`rounded-full px-3 py-1.5 font-semibold transition ${
                      activeTab === "events"
                        ? "bg-red-600 text-white shadow-sm shadow-red-900/40"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Events & Meetups
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("mentors")}
                    className={`rounded-full px-3 py-1.5 font-semibold transition ${
                      activeTab === "mentors"
                        ? "bg-red-600 text-white shadow-sm shadow-red-900/40"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Mentors & Peer Support
                  </button>
                </div>
              </header>

              {/* Tab content */}
              <div className="mt-2 space-y-4 text-sm text-slate-800">
                {activeTab === "groups" && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-600">
                      Browse IIT cultural, academic, and interest-based groups
                      where you can make friends and find your community.
                    </p>
                    <GroupsDirectory />
                  </div>
                )}

                {activeTab === "events" && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-600">
                      See upcoming events powered by IIT and 312.iit-style
                      feeds: socials, info sessions, workshops, and more.
                    </p>
                    <EventsFeed312 />
                  </div>
                )}

                {activeTab === "mentors" && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-600">
                      Connect with peer mentors, grad students, or staff who
                      understand what it&apos;s like to be an international
                      student at IIT.
                    </p>
                    <MentorConnections />
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
