"use client";

import { Card } from "@/components/ui/Card";
import {
  UserCircle2,
  Users2,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

export function AdvisorConnectPanel() {
  return (
    <Card>
      <header className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
          <Users2 className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Connect with Academic Advising
          </h2>
          <p className="text-xs text-slate-400">
            Your adviser is your first partner for course planning, registration
            PINs, and degree progress at Illinois Tech.
          </p>
        </div>
      </header>

      <div className="grid gap-3 text-xs md:grid-cols-3">
        {/* My Academic Adviser */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
          <div>
            <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-slate-100">
              <UserCircle2 className="h-3.5 w-3.5 text-red-300" />
              My Academic Adviser
            </p>
            <p className="text-[10px] text-slate-300">
              Once you&apos;re enrolled, you&apos;re assigned an adviser in your major.
              They help you choose courses and share your registration PIN.
            </p>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-600 px-2 py-1.5 text-[10px] font-semibold text-white hover:bg-red-500"
          >
            View adviser details (from SIS)
          </button>
          <p className="mt-1 text-[9px] text-slate-500">
            TODO: Pull adviser name, email, and office hours from your student
            information system.
          </p>
        </div>

        {/* Central Academic Advising */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
          <div>
            <p className="mb-1 text-[11px] font-semibold text-slate-100">
              Central Academic Advising
            </p>
            <p className="text-[10px] text-slate-300">
              Use Illinois Tech&apos;s academic advising site for placement
              testing, policies, and campus-wide forms.
            </p>
          </div>
          <div className="mt-2 space-y-1 text-[10px] text-slate-200">
            <a
              href="https://www.iit.edu/academic-advising"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-red-300 hover:text-red-200"
            >
              Advising website
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Department Advising */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
          <div>
            <p className="mb-1 text-[11px] font-semibold text-slate-100">
              Department Advising
            </p>
            <p className="text-[10px] text-slate-300">
              Departments host their own advising pages with contacts and FAQs
              for specific programs.
            </p>
          </div>
          <div className="mt-2 space-y-1 text-[10px] text-slate-200">
            <a
              href="https://www.iit.edu/academic-advising/department-academic-advising"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-red-300 hover:text-red-200"
            >
              Find my department&apos;s advising page
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <p className="mt-1 flex items-center gap-1 text-[9px] text-slate-500">
            <Phone className="h-3 w-3" />
            <span>Keep emergency and office numbers in your phone before registration opens.</span>
          </p>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
        <Mail className="h-3 w-3" />
        Pro tip: email your adviser a draft plan before your meeting. It saves
        time and helps you ask better questions.
      </p>
    </Card>
  );
}
