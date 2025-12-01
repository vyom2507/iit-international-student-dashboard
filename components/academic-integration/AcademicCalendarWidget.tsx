"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

type TermKey = "fall" | "spring" | "summer";
type StudentTypeNormalized = "undergraduate" | "graduate" | "phd";

type Milestone = {
  label: string;
  date: string;
  description: string;
  importantFor?: Partial<Record<StudentTypeNormalized, boolean>>;
};

type TermCalendar = {
  displayName: string;
  yearLabel: string;
  summary: string;
  milestones: Milestone[];
};

type MeResponse = {
  student: {
    id: string;
    fullName: string;
    email: string;
    studentType?: string | null;
    program?: string | null;
  } | null;
};

const TERMS: Record<TermKey, TermCalendar> = {
  fall: {
    displayName: "Fall Semester",
    yearLabel: "Example: 2024–2025",
    summary:
      "The main term for many new international arrivals. Classes usually begin in late August and end in mid-December.",
    milestones: [
      {
        label: "Classes begin",
        date: "Late August (see official calendar)",
        description: "First day of full-semester classes for the fall term.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Last day to add/drop without record",
        date: "Within first week of classes",
        description:
          "Deadline to adjust your schedule without a W (withdrawal) on your transcript.",
        importantFor: {
          undergraduate: true,
          graduate: true
        }
      },
      {
        label: "Graduate / PhD add/drop & enrollment lock",
        date: "Early in the term",
        description:
          "Graduate and PhD students finalize enrollment that can affect assistantships, funding, and full-time status.",
        importantFor: {
          graduate: true,
          phd: true
        }
      },
      {
        label: "Midterm period",
        date: "Mid-October (approx.)",
        description:
          "Time when many courses schedule midterm exams, projects, or progress checks.",
        importantFor: {
          undergraduate: true,
          graduate: true
        }
      },
      {
        label: "Last day to withdraw from classes",
        date: "Late October / early November",
        description:
          "Final date to withdraw from a course with a W grade, if needed.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Thanksgiving recess",
        date: "Late November",
        description:
          "University holiday period — no classes, limited campus services.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Final exams",
        date: "Early to mid-December",
        description:
          "Official exam week(s) that conclude the fall semester.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      }
    ]
  },

  spring: {
    displayName: "Spring Semester",
    yearLabel: "Example: 2024–2025",
    summary:
      "Spring term typically runs from January to early May and includes a mid-semester spring break.",
    milestones: [
      {
        label: "Classes begin",
        date: "Early / mid-January",
        description: "Start of full-semester classes for the spring term.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Last day to add/drop without record",
        date: "Within first week of classes",
        description:
          "Period to finalize your schedule before a W grade would appear on your transcript.",
        importantFor: {
          undergraduate: true,
          graduate: true
        }
      },
      {
        label: "Spring census / enrollment verification",
        date: "Early in the term",
        description:
          "Important for financial aid, billing, and maintaining full-time status.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Spring break",
        date: "Mid-March (approx.)",
        description:
          "One-week break from classes; campus services may have adjusted hours.",
        importantFor: {
          undergraduate: true,
          graduate: true
        }
      },
      {
        label: "Last day to withdraw from classes",
        date: "Late March / early April",
        description:
          "Final date to withdraw from a spring course with a W grade.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Final exams",
        date: "Late April / early May",
        description: "Exam period that closes the spring semester.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      }
    ]
  },

  summer: {
    displayName: "Summer Term(s)",
    yearLabel: "Example: Summer Session(s)",
    summary:
      "Summer at IIT may be divided into multiple shorter sessions (e.g., Summer A, B, full summer) with intensive coursework.",
    milestones: [
      {
        label: "Summer session starts",
        date: "Early / mid-May (varies by session)",
        description:
          "Beginning of the first summer session; later sessions may start in June/July.",
        importantFor: {
          undergraduate: true,
          graduate: true
        }
      },
      {
        label: "Add/drop deadlines for each session",
        date: "Very early in each session",
        description:
          "Because summer sessions are compressed, add/drop windows are short.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Last day to withdraw (by session)",
        date: "Midpoint of each summer session",
        description:
          "Deadline to withdraw from a summer course while remaining in good standing.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      },
      {
        label: "Final exams / end of summer",
        date: "Varies by session",
        description:
          "Each summer session has its own final exam or final project period.",
        importantFor: {
          undergraduate: true,
          graduate: true,
          phd: true
        }
      }
    ]
  }
};

const TABS: { key: TermKey; label: string }[] = [
  { key: "fall", label: "Fall" },
  { key: "spring", label: "Spring" },
  { key: "summer", label: "Summer" }
];

function normalizeStudentType(raw?: string | null): StudentTypeNormalized | null {
  if (!raw) return null;
  const v = raw.toLowerCase().trim();
  if (v.startsWith("under")) return "undergraduate";
  if (v.startsWith("grad")) return "graduate";
  if (v === "phd" || v.startsWith("ph.d") || v.startsWith("doctor")) return "phd";
  return null;
}

export function AcademicCalendarWidget() {
  const [activeTerm, setActiveTerm] = useState<TermKey>("fall");
  const [me, setMe] = useState<MeResponse["student"] | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadMe = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data: MeResponse = await res.json();
        if (mounted) setMe(data.student);
      } catch (err) {
        console.error("Error loading session in AcademicCalendarWidget:", err);
      }
    };
    loadMe();
    return () => {
      mounted = false;
    };
  }, []);

  const normalizedType = normalizeStudentType(me?.studentType);
  const term = TERMS[activeTerm];

  const currentTypeLabel =
    normalizedType === "undergraduate"
      ? "Undergraduate"
      : normalizedType === "graduate"
      ? "Graduate"
      : normalizedType === "phd"
      ? "PhD / Doctoral"
      : null;

  return (
    <div className="flex flex-col gap-3 text-xs text-slate-900">
      {/* Term tabs */}
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex overflow-hidden rounded-full bg-slate-100 p-1 ring-1 ring-slate-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTerm(tab.key)}
              className={clsx(
                "px-3 py-1.5 text-[11px] font-semibold transition",
                "rounded-full",
                activeTerm === tab.key
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {currentTypeLabel && (
          <div className="hidden rounded-full bg-red-50 px-2 py-1 text-[10px] font-medium text-red-700 ring-1 ring-red-200 md:inline-flex">
            Viewing as{" "}
            <span className="ml-1 font-semibold">{currentTypeLabel}</span>
          </div>
        )}
      </div>

      {/* Header summary */}
      <div className="rounded-xl bg-slate-100 p-3 ring-1 ring-slate-200">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700">
              {term.displayName}
            </p>
            <p className="text-[10px] text-slate-500">{term.yearLabel}</p>
          </div>
          <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-700 ring-1 ring-red-200">
            IIT Academic Calendar
          </span>
        </div>
        <p className="mt-2 text-[11px] text-slate-700">{term.summary}</p>
      </div>

      {/* Milestones list with per-student-type highlighting */}
      <div className="space-y-2">
        {term.milestones.map((m) => {
          const isImportantForUser =
            normalizedType && m.importantFor?.[normalizedType];

          return (
            <div
              key={m.label}
              className={clsx(
                "rounded-xl p-3 ring-1 transition",
                isImportantForUser
                  ? "bg-red-50 ring-red-300 shadow-[0_0_0_1px_rgba(220,38,38,0.2)]"
                  : "bg-white ring-slate-200"
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={clsx(
                    "text-[11px] font-semibold",
                    isImportantForUser ? "text-red-800" : "text-slate-900"
                  )}
                >
                  {m.label}
                </p>
                <p
                  className={clsx(
                    "text-[10px] font-medium",
                    isImportantForUser ? "text-red-700" : "text-slate-500"
                  )}
                >
                  {m.date}
                </p>
              </div>
              <p
                className={clsx(
                  "mt-1 text-[11px]",
                  isImportantForUser ? "text-red-900/90" : "text-slate-700"
                )}
              >
                {m.description}
              </p>

              {/* Importance chips */}
              <div className="mt-2 flex flex-wrap gap-1">
                {m.importantFor?.undergraduate && (
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                      normalizedType === "undergraduate"
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    )}
                  >
                    UG
                  </span>
                )}
                {m.importantFor?.graduate && (
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                      normalizedType === "graduate"
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    )}
                  >
                    Grad
                  </span>
                )}
                {m.importantFor?.phd && (
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-[9px] font-semibold",
                      normalizedType === "phd"
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    )}
                  >
                    PhD
                  </span>
                )}
                {isImportantForUser && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-semibold text-red-800">
                    Important for you
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Official calendar notice */}
      <p className="mt-1 text-[10px] text-slate-500">
        These term groups and milestones are structured to mirror how
        Illinois Tech&apos;s academic calendar is organized (classes begin, add/drop,
        withdrawal, final exams). Exact dates vary by year and term — always
        confirm details on the{" "}
        <Link
          href="https://www.iit.edu/registrar/academic-calendar"
          target="_blank"
          className="font-semibold text-red-700 underline underline-offset-2"
        >
          official Registrar academic calendar
        </Link>
        , especially for immigration, billing, CPT/OPT, and graduation
        requirements.
      </p>
    </div>
  );
}
