"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const heroHighlights = [
  "Pre-arrival checklists for visas, housing, and essential documents.",
  "Interactive navigation for IIT Mies Campus and Chicago transit.",
  "Academic planning with advisor connections and calendar insights.",
  "Social discovery: clubs, events, and a student marketplace."
];

export default function LandingPage() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((prev) => (prev + 1) % heroHighlights.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-300">
            Welcome · IIT International Students
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
            A smoother journey from{" "}
            <span className="text-red-400">home country</span> to{" "}
            <span className="text-red-400">IIT campus in Chicago</span>.
          </h1>
          <p className="text-sm text-slate-200">
            iStudentsHub is your unified landing page for everything you need as an
            international student: pre-arrival prep, campus navigation, academic
            integration, social life, and a marketplace — all in one modern dashboard.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2 font-semibold text-white shadow-sm shadow-red-500/40 hover:bg-red-500"
            >
              Login to Dashboard
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg border border-slate-500 bg-slate-900/60 px-5 py-2 font-semibold text-slate-100 hover:bg-slate-800"
            >
              I&apos;m a new student
            </Link>
          </div>

          <div className="mt-4 rounded-2xl border border-red-500/30 bg-slate-900/70 p-3 text-xs text-red-100">
            <p className="font-semibold text-red-200">Live highlight</p>
            <p className="mt-1 text-[11px] text-red-100">{heroHighlights[idx]}</p>
          </div>
        </div>

        {/* Right-side card stack */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-red-700 via-slate-900 to-black p-[1px] ring-1 ring-red-500/60">
            <div className="flex h-40 flex-col justify-between rounded-[14px] bg-slate-950/95 p-4 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-red-600/20 px-2 py-0.5 text-[10px] font-medium text-red-200 ring-1 ring-red-500/40">
                  IIT · International Hub
                </span>
                <span className="text-[10px] text-slate-400">
                  Mies Campus · Chicago
                </span>
              </div>
              <p className="text-[11px] text-slate-100">
                Track your pre-arrival tasks, find housing near campus, understand
                your academic plan, and connect with new friends — before you even
                land in Chicago.
              </p>
              <p className="text-[10px] text-slate-500">
                Designed for visas, time zones, and the realities of moving to a new
                country.
              </p>
            </div>
          </div>

          <div className="grid gap-3 text-[11px] md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <p className="text-[10px] font-semibold text-red-300">
                Pre-Arrival
              </p>
              <p className="mt-1 text-slate-200">
                Visa basics, housing, packing lists, money, and health insurance
                — organized into a simple checklist.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <p className="text-[10px] font-semibold text-red-300">
                Campus & City
              </p>
              <p className="mt-1 text-slate-200">
                Maps, CTA tips, safety notes, and how to move between campus
                buildings confidently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-50">
          Everything you need in one dashboard
        </h2>
        <p className="text-sm text-slate-300">
          iStudentsHub becomes your hub once you log in — but here&apos;s an overview of
          what&apos;s waiting for you inside.
        </p>

        <div className="grid gap-4 md:grid-cols-3 text-xs">
          <div className="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800">
            <p className="text-[11px] font-semibold text-red-300">
              Pre-Arrival Preparation
            </p>
            <p className="mt-2 text-slate-200">
              Turn a chaotic to-do list into a timeline you can actually follow:
              documents, flights, housing, and must-do tasks.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800">
            <p className="text-[11px] font-semibold text-red-300">
              Academic Integration
            </p>
            <p className="mt-2 text-slate-200">
              Understand course registration, academic calendars, and how to reach your
              advisor without getting lost in portals.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800">
            <p className="text-[11px] font-semibold text-red-300">
              Social & Marketplace
            </p>
            <p className="mt-2 text-slate-200">
              Find student groups, events, and a marketplace for textbooks and
              essentials shared by other IIT students.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
