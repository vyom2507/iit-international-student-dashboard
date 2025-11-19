"use client";

import { Card } from "@/components/ui/Card";
import { CalendarDays, Link2 } from "lucide-react";

const events = [
  {
    title: "IIT International Student Orientation",
    date: "Aug 24",
    time: "09:00–13:00",
    location: "MTCC Ballroom",
    type: "Required"
  },
  {
    title: "IIT Campus & Chicago Neighborhood Tour",
    date: "Aug 25",
    time: "14:00–16:30",
    location: "Starts at MTCC Welcome Desk",
    type: "Social"
  },
  {
    title: "Meet Your Academic Advisor",
    date: "Aug 27",
    time: "By appointment",
    location: "IIT Academic Resource Center",
    type: "Academic"
  },
  {
    title: "Global Cultures Night @ IIT",
    date: "Sep 02",
    time: "18:00–21:00",
    location: "MTCC Bridge",
    type: "Community"
  }
];

export function EventCalendar() {
  return (
    <Card className="flex h-full flex-col">
      <header className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-red-400" />
          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              IIT Campus Event Calendar
            </h2>
            <p className="text-xs text-slate-400">
              Stay on top of IIT check-ins, workshops, and social events.
            </p>
          </div>
        </div>
        <button className="rounded-full bg-slate-900 px-2 py-1 text-[10px] font-medium text-slate-200 ring-1 ring-slate-700 hover:bg-slate-800">
          <span className="inline-flex items-center gap-1">
            <Link2 className="h-3 w-3" />
            Sync with IIT calendar API
          </span>
        </button>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto rounded-xl bg-slate-950/60 p-3 text-xs scrollbar-thin">
        {events.map((event) => (
          <div
            key={event.title}
            className="flex items-start justify-between gap-3 rounded-lg bg-slate-900/80 p-2 ring-1 ring-slate-800"
          >
            <div>
              <p className="text-[11px] font-semibold text-slate-50">
                {event.title}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-300">
                {event.date} · {event.time}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-400">
                {event.location}
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-100">
              {event.type}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1 text-[10px] text-slate-500">
        TODO: Replace static data with events fetched from IIT&apos;s calendar
        APIs (e.g. Office of Campus Life events feed or Outlook calendar).
      </p>
    </Card>
  );
}
