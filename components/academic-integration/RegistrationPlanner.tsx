"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { ClipboardList, UserCheck, AlertCircle, Link2 } from "lucide-react";

type StudentType = "undergrad" | "grad" | "coursera";

interface Step {
  id: string;
  title: string;
  description: string;
  note?: string;
}

type MeResponse = {
  student: {
    id: string;
    fullName: string;
    email: string;
    studentType?: string | null; // e.g. "undergraduate", "graduate", "phd", "online / coursera"
    program?: string | null;
  } | null;
};

const stepsByType: Record<StudentType, Step[]> = {
  undergrad: [
    {
      id: "pin",
      title: "Get your 6-digit registration PIN from your adviser",
      description:
        "At Illinois Tech, undergraduate students typically need a unique PIN from their academic adviser before registering.",
      note: "You will be assigned an adviser after you confirm enrollment; connect with them before registration opens."
    },
    {
      id: "placement",
      title: "Complete math, writing, and other placement tests (if required)",
      description:
        "Certain courses are locked until your placement scores are on file with the Registrar and academic departments.",
      note: "Check your admitted-student checklist or onboarding portal for placement testing links."
    },
    {
      id: "plan",
      title: "Plan your first-term schedule using degree planning tools",
      description:
        "Use your degree audit, academic bulletin, and sample plans to choose courses that satisfy IIT core and major requirements.",
      note: "You can mirror IIT’s recommended first-year sequence, then adjust with your adviser."
    },
    {
      id: "register",
      title: "Register through myIIT / registration system when your time ticket opens",
      description:
        "When registration opens for your group, log in to the registration system, enter your PIN, and add or adjust courses.",
      note: "Official registration dates and add/drop deadlines come from the Registrar’s academic calendar."
    }
  ],
  grad: [
    {
      id: "adviser",
      title: "Confirm your graduate program adviser or director",
      description:
        "Graduate students typically work with a program director or faculty adviser who approves course selection.",
      note: "Check your department’s advising or graduate program page for the correct contact."
    },
    {
      id: "holds",
      title: "Clear any holds that block registration",
      description:
        "Financial, immunization, international document, or academic holds can prevent you from enrolling in classes.",
      note: "You can see registration holds inside the student information/registration system."
    },
    {
      id: "plan",
      title: "Review program curriculum and plan courses for the term",
      description:
        "Use your program handbook, degree audit, and catalog to choose required core courses and appropriate electives.",
      note: "Prepare a draft plan and review it with your adviser before your registration window opens."
    },
    {
      id: "register",
      title: "Register when your graduate time ticket opens",
      description:
        "Use the official registration portal to add/drop courses, manage waitlists, and confirm full-time status.",
      note: "Exact dates come from the Registrar and may differ by program or academic level."
    }
  ],
  coursera: [
    {
      id: "admit",
      title: "Complete performance-based admission or entry requirements",
      description:
        "For some IIT-Coursera or online programs, you complete specific online courses and benchmarks before full admission.",
      note: "Follow the program’s Coursera or online student guide and admission instructions."
    },
    {
      id: "choose",
      title: "Select your track and courses for the upcoming session",
      description:
        "Within the Coursera/online portal, choose courses that align with your plan, prerequisites, and session dates.",
      note: "Confirm that each course has the correct IIT course number and CRN, if listed."
    },
    {
      id: "register",
      title: "Register and pay through the designated IIT/Coursera portal",
      description:
        "Use the program’s Register & Pay page or integrated portal to finalize your IIT registration and tuition.",
      note: "Double-check that you appear in the correct IIT course section for credit and transcripts."
    }
  ]
};

/**
 * Normalize backend studentType into our UI union.
 * Examples:
 *  - "undergraduate", "undergrad" -> "undergrad"
 *  - "graduate", "grad"           -> "grad"
 *  - "coursera", "online"         -> "coursera"
 */
function normalizeStudentType(raw?: string | null): StudentType | null {
  if (!raw) return null;
  const v = raw.toLowerCase().trim();

  if (v.startsWith("under")) return "undergrad";
  if (v.startsWith("grad") && !v.includes("under")) return "grad";
  if (v.includes("coursera") || v.includes("online")) return "coursera";

  return null;
}

export function RegistrationPlanner() {
  const [me, setMe] = useState<MeResponse["student"] | null>(null);
  const [fallbackType, setFallbackType] = useState<StudentType>("undergrad");

  useEffect(() => {
    let mounted = true;
    const loadMe = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data: MeResponse = await res.json();
        if (mounted) setMe(data.student);
      } catch (err) {
        console.error("Error loading session in RegistrationPlanner:", err);
      }
    };
    loadMe();
    return () => {
      mounted = false;
    };
  }, []);

  const derivedType = normalizeStudentType(me?.studentType);
  const effectiveType: StudentType = derivedType ?? fallbackType;
  const steps = stepsByType[effectiveType];

  const typeLabel =
    effectiveType === "undergrad"
      ? "Undergraduate student"
      : effectiveType === "grad"
      ? "Graduate student"
      : "Online / Coursera student";

  return (
    <Card className="bg-white/95 text-slate-900">
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/15 text-red-700 ring-1 ring-red-500/30">
            <ClipboardList className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Course Registration Guide
            </h2>
            <p className="text-xs text-slate-600">
              Step-by-step help for registering at Illinois Tech as an
              international student.
            </p>
          </div>
        </div>

        {/* If we know the student type from profile → show it and hide selector */}
        {derivedType ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] text-red-800 ring-1 ring-red-200">
            <UserCheck className="h-3 w-3" />
            <span>
              Showing registration steps for{" "}
              <span className="font-semibold">{typeLabel}</span>
            </span>
          </div>
        ) : (
          // Fallback: allow manual selection if type not set in profile
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-500">I am a</span>
            <select
              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={fallbackType}
              onChange={(e) =>
                setFallbackType(e.target.value as StudentType)
              }
            >
              <option value="undergrad">Undergraduate student</option>
              <option value="grad">Graduate student</option>
              <option value="coursera">Online / Coursera student</option>
            </select>
          </div>
        )}
      </header>

      {/* Steps for the effective student type */}
      <ol className="space-y-2 text-xs">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="flex gap-3 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-200"
          >
            <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-semibold text-white">
              {index + 1}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-900">
                {step.title}
              </p>
              <p className="text-[10px] text-slate-700">{step.description}</p>
              {step.note && (
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>{step.note}</span>
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-3 flex items-center gap-1 text-[10px] text-slate-500">
        <UserCheck className="h-3 w-3" />
        Exact registration dates, time tickets, and rules come from the IIT
        Office of the Registrar and your academic department. This planner is a
        student-facing guide that you can later wire to live registration and
        holds via API.
      </p>

      <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
        <Link2 className="h-3 w-3" />
        In the future, connect this module to myIIT and your student
        information system to display real-time registration status.
      </p>
    </Card>
  );
}
