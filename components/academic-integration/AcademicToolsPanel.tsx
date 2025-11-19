"use client";

import { Card } from "@/components/ui/Card";
import {
  LayoutDashboard,
  BookOpenCheck,
  Laptop2,
  LibraryBig,
  CalendarCheck2
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  href?: string;
}

const tools: Tool[] = [
  {
    id: "myiit",
    name: "MyIIT / Student Portal",
    description:
      "Central place for registration, billing, holds, and personal information.",
    icon: LayoutDashboard
  },
  {
    id: "degree-audit",
    name: "Degree audit / planning tool",
    description:
      "Check which requirements you&apos;ve completed and what you still need.",
    icon: BookOpenCheck
  },
  {
    id: "lms",
    name: "Learning Management System",
    description:
      "Access course syllabi, assignments, and grades once the term starts.",
    icon: Laptop2
  },
  {
    id: "library",
    name: "Galvin Library resources",
    description:
      "Search for textbooks, research articles, and reserve study spaces.",
    icon: LibraryBig
  },
  {
    id: "calendar-sync",
    name: "Academic calendar sync",
    description:
      "Sync key deadlines and exam periods to your personal calendar app.",
    icon: CalendarCheck2
  }
];

export function AcademicToolsPanel() {
  return (
    <Card>
      <header className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
          <LayoutDashboard className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            My Academic Tools
          </h2>
          <p className="text-xs text-slate-400">
            Quick launch pad for the systems you&apos;ll use every week once you
            start at Illinois Tech.
          </p>
        </div>
      </header>

      <div className="grid gap-2 text-xs md:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="flex items-start gap-2 rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  {tool.name}
                </p>
                <p className="text-[10px] text-slate-300">
                  {tool.description}
                </p>
                <p className="mt-0.5 text-[9px] text-slate-500">
                  TODO: link this card to your actual IIT login pages and APIs
                  (Single Sign-On, deep links into registration, degree audit,
                  and LMS).
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
