// app/(public)/page.tsx  OR  app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const sliderImages = [
  {
    id: 1,
    src: "/walking.jpg",
    alt: "International students arriving at IIT campus"
  },
  {
    id: 2,
    src: "/resource-banner.jpg",
    alt: "Students studying together in a modern study space"
  },
  {
    id: 3,
    src: "/housing.jpg",
    alt: "IIT campus and Chicago skyline"
  }
];

const modules = [
  {
    href: "/pre-arrival",
    title: "Pre-Arrival Preparation",
    description:
      "Visa basics, housing options, packing lists, and a timeline for your first semester."
  },
  {
    href: "/campus-navigation",
    title: "Campus Navigation",
    description:
      "Explore IIT landmarks and plan routes using campus maps and transit integrations."
  },
  {
    href: "/academic-integration",
    title: "Academic Integration",
    description:
      "Course planning, advisor connections, and academic calendar highlights all in one place."
  },
  {
    href: "/social-networking",
    title: "Social Networking",
    description:
      "Discover cultural clubs, student organizations, and ways to build your IIT community."
  },
  {
    href: "/resource-directory",
    title: "Resource Directory",
    description:
      "Key IIT and Chicago resources: health, safety, banking, transit, and more."
  },
  {
    href: "/marketplace",
    title: "Student Marketplace",
    description:
      "Buy and sell textbooks, furniture, and essentials with other IIT students."
  }
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slider
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  const slide = sliderImages[currentSlide];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Simple public navbar */}
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-xs font-bold text-white shadow-sm shadow-red-500/60">
              IIT
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
                iStudentsHub
              </p>
              <p className="text-xs text-slate-500">
                International Student Onboarding 
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs md:text-sm">
            <Link
              href="#modules"
              className="text-slate-600 hover:text-red-600"
            >
              Modules
            </Link>
            <Link
              href="#why"
              className="hidden text-slate-600 hover:text-red-600 md:inline-block"
            >
              Why this hub
            </Link>
            <Link
              href="/dashboard"
              className="hidden text-slate-600 hover:text-red-600 md:inline-block"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-red-500/60 hover:bg-red-500"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 md:py-14">
        {/* Hero + image slider */}
        <section className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm shadow-slate-200 md:grid-cols-2 md:p-8">
          {/* Hero text */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-500">
              Welcome · IIT International Students
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              Your guided launchpad for studying and living at IIT, Chicago.
            </h1>
            <p className="mt-3 text-sm text-slate-700">
              iStudentsHub organizes your entire journey as an international student —
              from visas and housing before you arrive, to campus navigation, academics,
              social life, and the student marketplace once you&apos;re here.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-red-500/60 hover:bg-red-500"
              >
                Get started · Login / Register
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:border-red-400 hover:text-red-600"
              >
                Explore dashboard
              </Link>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              Designed around real questions from IIT international students about visas,
              housing, registration, and settling into Chicago.
            </p>
          </div>

          {/* Image slider */}
          <div className="flex flex-col">
            <div className="relative h-56 w-full overflow-hidden rounded-xl bg-slate-200 md:h-64">
              <Image
                key={slide.id}
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
              <div className="flex gap-1">
                {sliderImages.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 w-5 rounded-full transition ${
                      idx === currentSlide ? "bg-red-600" : "bg-slate-300"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span>
                {String(currentSlide + 1).padStart(2, "0")} /{" "}
                {String(sliderImages.length).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Scenes from IIT campus and international student life in Chicago.
            </p>
          </div>
        </section>

        {/* Why section (short) */}
        <section id="why" className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">
            Built for international students, not just another portal.
          </h2>
          <p className="max-w-3xl text-sm text-slate-700">
            Traditional university portals can feel overwhelming. iStudentsHub is
            designed as a focused, student-friendly workspace — combining campus
            information, practical checklists, navigation tools, and a social layer so
            you don&apos;t feel alone in the process.
          </p>
        </section>

        {/* Modules grid */}
        <section id="modules" className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Explore your onboarding modules
              </h2>
              <p className="text-sm text-slate-700">
                Each module in the dashboard connects to real data, campus resources,
                and tools built for IIT international students.
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              Hint: You can always access these from the dashboard sidebar later.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm shadow-slate-200 hover:-translate-y-0.5 hover:border-red-400/80 hover:shadow-md hover:shadow-red-100 transition"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-500">
                  {mod.title.split(" ")[0]}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-red-600">
                  {mod.title}
                </h3>
                <p className="mt-2 text-xs text-slate-700">{mod.description}</p>
                <span className="mt-3 text-[11px] font-semibold text-red-500 group-hover:text-red-600">
                  Open module →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
