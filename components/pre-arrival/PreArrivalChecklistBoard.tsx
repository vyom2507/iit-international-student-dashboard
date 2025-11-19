"use client";

import { Card } from "@/components/ui/Card";
import { Plane, Home, Globe2 } from "lucide-react";
import { useState } from "react";

type Category = "visa" | "housing" | "culture";

interface Task {
  id: string;
  label: string;
  helpText?: string;
  category: Category;
  done: boolean;
}

const initialTasks: Task[] = [
  {
    id: "pay-sevis",
    label: "Pay SEVIS fee and keep receipt",
    helpText: "You may need this at your visa interview and upon entry to the U.S.",
    category: "visa",
    done: false
  },
  {
    id: "book-visa",
    label: "Schedule and attend visa interview",
    helpText: "Confirm the location and required documents for your country.",
    category: "visa",
    done: false
  },
  {
    id: "check-i20",
    label: "Verify I-20 / admission letter details",
    helpText: "Name, program dates, and funding information should all be correct.",
    category: "visa",
    done: false
  },
  {
    id: "choose-housing",
    label: "Choose IIT housing or off-campus option",
    helpText: "Compare cost, distance, roommates, and contract dates.",
    category: "housing",
    done: false
  },
  {
    id: "airport-arrival",
    label: "Plan airport arrival & transport to IIT",
    helpText: "Save directions from airport to IIT Main Campus and emergency contacts.",
    category: "housing",
    done: false
  },
  {
    id: "packing-list",
    label: "Pack essentials and important documents",
    helpText: "Keep documents and valuables in your carry-on, not checked baggage.",
    category: "housing",
    done: false
  },
  {
    id: "culture-brief",
    label: "Review U.S. classroom & campus culture tips",
    helpText: "Understand participation, office hours, and academic integrity basics.",
    category: "culture",
    done: false
  },
  {
    id: "health-insurance",
    label: "Understand health insurance and immunization requirements",
    helpText: "Check what is required by IIT and Illinois state law.",
    category: "culture",
    done: false
  },
  {
    id: "money-plan",
    label: "Set up your money plan for the first month",
    helpText: "Estimate living costs, banking options, and payment methods in Chicago.",
    category: "culture",
    done: false
  }
];

export function PreArrivalChecklistBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completed = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const progress = Math.round((completed / total) * 100) || 0;

  const byCategory = (category: Category) =>
    tasks.filter((t) => t.category === category);

  return (
    <Card>
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Pre-Arrival Checklist
          </h2>
          <p className="text-xs text-slate-400">
            Track the essentials across visas, housing, and cultural preparation
            before you fly to Chicago.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-24 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-emerald-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-slate-200">
              {completed}/{total} done · {progress}%
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-3 text-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
              <Plane className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold">Visa & Immigration</span>
          </div>
          <ul className="space-y-1">
            {byCategory("visa").map((task) => (
              <li
                key={task.id}
                className="flex items-start gap-2 rounded-lg bg-slate-950/70 p-2 ring-1 ring-slate-800"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-red-500 focus:ring-red-500"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <div>
                  <p className="text-[11px] font-medium text-slate-100">
                    {task.label}
                  </p>
                  {task.helpText && (
                    <p className="text-[10px] text-slate-400">
                      {task.helpText}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
              <Home className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold">Housing & Arrival</span>
          </div>
          <ul className="space-y-1">
            {byCategory("housing").map((task) => (
              <li
                key={task.id}
                className="flex items-start gap-2 rounded-lg bg-slate-950/70 p-2 ring-1 ring-slate-800"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-red-500 focus:ring-red-500"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <div>
                  <p className="text-[11px] font-medium text-slate-100">
                    {task.label}
                  </p>
                  {task.helpText && (
                    <p className="text-[10px] text-slate-400">
                      {task.helpText}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
              <Globe2 className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold">Cultural & Practical Life</span>
          </div>
          <ul className="space-y-1">
            {byCategory("culture").map((task) => (
              <li
                key={task.id}
                className="flex items-start gap-2 rounded-lg bg-slate-950/70 p-2 ring-1 ring-slate-800"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-red-500 focus:ring-red-500"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <div>
                  <p className="text-[11px] font-medium text-slate-100">
                    {task.label}
                  </p>
                  {task.helpText && (
                    <p className="text-[10px] text-slate-400">
                      {task.helpText}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-2 text-[10px] text-slate-500">
        TODO: Persist this checklist to your backend or the student&apos;s IIT
        account so they can resume progress across devices.
      </p>
    </Card>
  );
}
