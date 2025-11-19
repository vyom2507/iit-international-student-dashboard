"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ClipboardList, UserCheck, AlertCircle, Link2 } from "lucide-react";

type StudentType = "undergrad" | "grad" | "coursera";

interface Step {
  id: string;
  title: string;
  description: string;
  note?: string;
}

const stepsByType: Record<StudentType, Step[]> = {
  undergrad: [
    {
      id: "pin",
      title: "Get your 6-digit registration PIN from your adviser",
      description:
        "At Illinois Tech, undergraduate students need a unique PIN from their academic adviser before registering.",
      note: "You will receive your adviser after you confirm enrollment; connect with them before registration opens."
    },
    {
      id: "placement",
      title: "Complete Math and Writing placement tests (if required)",
      description:
        "Some courses are locked until your placement scores are on file.",
      note: "Check your admitted-student checklist for placement testing links."
    },
    {
      id: "plan",
      title: "Plan your schedule using Degree planning tools",
      description:
        "Use your degree audit and sample plans to choose courses that match your major and term.",
      note: "You can mirror IIT’s recommended first-year sequence, then adjust with your adviser."
    },
    {
      id: "register",
      title: "Register through MyIIT / registration system",
      description:
        "When registration opens for your group, use your PIN to add courses and resolve any registration errors.",
      note: "Official registration dates come from the Registrar’s academic calendar."
    }
  ],
  grad: [
    {
      id: "adviser",
      title: "Confirm your graduate program adviser",
      description:
        "Graduate students typically work with a program director or faculty adviser in their department.",
      note: "Check your department&apos;s advising page for the correct contact."
    },
    {
      id: "holds",
      title: "Clear any holds that block registration",
      description:
        "Financial, immunization, or document holds may prevent you from enrolling.",
      note: "You can see holds in the student information/registration system."
    },
    {
      id: "plan",
      title: "Review program curriculum and plan courses",
      description:
        "Use your program handbook and degree audit to pick core and elective courses.",
      note: "Bring a draft plan to your adviser meeting before registration."
    },
    {
      id: "register",
      title: "Register when your time ticket opens",
      description:
        "Use the official registration portal to add, drop, or waitlist classes.",
      note: "Exact dates come from the Registrar and may differ by program."
    }
  ],
  coursera: [
    {
      id: "admit",
      title: "Complete performance-based admission steps",
      description:
        "For some online programs, you complete specific Coursera courses before full admission.",
      note: "Follow the program&apos;s Coursera student guide and enrollment instructions."
    },
    {
      id: "choose",
      title: "Select track and courses for the next session",
      description:
        "Pick courses that align with your plan and prerequisites within the Coursera portal.",
      note: "Confirm that each course has the correct CRN or Illinois Tech listing."
    },
    {
      id: "register",
      title: "Register & pay through the designated portal",
      description:
        "Use the program&apos;s Register & Pay tab to finalize registration and access any required PIN.",
      note: "Double-check that you are placed in the correct IIT Coursera course listing."
    }
  ]
};

export function RegistrationPlanner() {
  const [studentType, setStudentType] = useState<StudentType>("undergrad");

  const steps = stepsByType[studentType];

  return (
    <Card>
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <ClipboardList className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              Course Registration Guide
            </h2>
            <p className="text-xs text-slate-400">
              Step-by-step help for registering at Illinois Tech as an
              international student.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-300">I am a</span>
          <select
            className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            value={studentType}
            onChange={(e) => setStudentType(e.target.value as StudentType)}
          >
            <option value="undergrad">Undergraduate student</option>
            <option value="grad">Graduate student</option>
            <option value="coursera">Online / Coursera student</option>
          </select>
        </div>
      </header>

      <ol className="space-y-2 text-xs">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="flex gap-3 rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
          >
            <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600/80 text-[11px] font-semibold text-white">
              {index + 1}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-100">
                {step.title}
              </p>
              <p className="text-[10px] text-slate-300">{step.description}</p>
              {step.note && (
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
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
        Exact registration dates and rules come from the IIT Office of the
        Registrar and your academic department. This planner is a student-facing
        guide you can wire to those systems via API.
      </p>

      <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
        <Link2 className="h-3 w-3" />
        TODO: connect to live registration status and holds from your campus
        student information system.
      </p>
    </Card>
  );
}
