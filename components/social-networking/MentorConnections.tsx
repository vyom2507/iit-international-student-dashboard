"use client";

import { Card } from "@/components/ui/Card";
import {
  HeartHandshake,
  MessageCircle,
  Users2,
  GraduationCap,
  Globe2
} from "lucide-react";

export function MentorConnections() {
  return (
    <Card>
      <header className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
          <HeartHandshake className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Peer & Mentor Connections
          </h2>
          <p className="text-xs text-slate-700">
            Go beyond events—build a support network of peers, mentors, and
            staff who understand the international student journey.
          </p>
        </div>
      </header>

      <div className="grid gap-3 text-xs md:grid-cols-3">
        {/* Peer buddies */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
          <div>
            <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-slate-100">
              <Users2 className="h-3.5 w-3.5 text-red-300" />
              Peer Buddy Matches
            </p>
            <p className="text-[10px] text-slate-300">
              Match with returning students (including former internationals)
              based on major, language, or interests.
            </p>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-600 px-2 py-1.5 text-[10px] font-semibold text-white hover:bg-red-500"
          >
            Find a peer buddy (beta)
          </button>
          <p className="mt-1 text-[9px] text-slate-500">
            TODO: Connect this button to a matching service and use 312 groups
            as onboarding communities.
          </p>
        </div>

        {/* Group chats / messaging */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
          <div>
            <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-slate-100">
              <MessageCircle className="h-3.5 w-3.5 text-red-300" />
              Group Chats & Channels
            </p>
            <p className="text-[10px] text-slate-300">
              Create or join focused discussion spaces: your program cohort,
              residence hall, or favorite student orgs.
            </p>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-2 py-1.5 text-[10px] font-semibold text-slate-100 ring-1 ring-slate-600 hover:bg-slate-800"
          >
            Open istudentshub chat
          </button>
          <p className="mt-1 text-[9px] text-slate-500">
            TODO: Wire this to your real-time chat backend and sync membership
            with 312 groups or IIT portal.
          </p>
        </div>

        {/* Academic mentors / staff */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800">
          <div>
            <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-slate-100">
              <GraduationCap className="h-3.5 w-3.5 text-red-300" />
              Academic Mentors & Staff
            </p>
            <p className="text-[10px] text-slate-300">
              Surface office hours and mentoring programs run by departments,
              advisors, and support offices that already post events on 312.
            </p>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-2 py-1.5 text-[10px] font-semibold text-slate-100 ring-1 ring-slate-600 hover:bg-slate-800"
          >
            View mentoring & office hour events
          </button>
          <p className="mt-1 text-[9px] text-slate-500">
            TODO: Filter 312 events for office hours, mentoring, and advising
            tags and display them directly here.
          </p>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
        <Globe2 className="h-3 w-3" />
        International twist: highlight mentors who have studied abroad, speak
        multiple languages, or specialize in supporting global students.
      </p>
    </Card>
  );
}
