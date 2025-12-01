"use client";

import { Card } from "@/components/ui/Card";
import {
  PhoneCall,
  ShieldAlert,
  HeartPulse,
  MessageCircle,
  Globe2
} from "lucide-react";

interface ContactRow {
  id: string;
  label: string;
  description: string;
  example?: string;
  severity: "urgent" | "non-urgent" | "info";
}

const contacts: ContactRow[] = [
  {
    id: "emergency-911",
    label: "Emergency (911)",
    description:
      "For life-threatening emergencies in the U.S., dial 911 to reach police, fire, or ambulance.",
    example: "Serious injury, fire, immediate danger.",
    severity: "urgent"
  },
  {
    id: "campus-public-safety",
    label: "Campus Public Safety",
    description:
      "Campus security / public safety office for urgent issues on or near campus.",
    example: "Safety concerns, suspicious activity, urgent on-campus incidents.",
    severity: "urgent"
  },
  {
    id: "health-after-hours",
    label: "After-hours medical guidance",
    description:
      "Use your insurance provider hotline or local nurse line to get advice when the health center is closed.",
    example: "Non-emergency illness, questions about where to go for care.",
    severity: "non-urgent"
  },
  {
    id: "counseling",
    label: "Counseling & crisis support",
    description:
      "Campus counseling center or partner hotline for emotional crises, anxiety, or feeling overwhelmed.",
    example:
      "If you are in distress and need to talk to someone urgently but are not in physical danger.",
    severity: "urgent"
  },
  {
    id: "intl-center",
    label: "International Student Office (business hours)",
    description:
      "Questions about status, travel signatures, documents, and non-urgent immigration concerns.",
    example: "Travel signature before break, document updates, general questions.",
    severity: "info"
  }
];

function severityClass(severity: ContactRow["severity"]) {
  if (severity === "urgent") {
    return "bg-red-600/15 text-red-200 ring-red-500/40";
  }
  if (severity === "non-urgent") {
    return "bg-amber-500/15 text-amber-100 ring-amber-400/40";
  }
  return "bg-slate-700/40 text-slate-200 ring-slate-500/40";
}

export function EmergencyContactsPanel() {
  return (
    <Card>
      <header className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
          <ShieldAlert className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Emergency & Support Contacts
          </h2>
          <p className="text-xs text-slate-700">
            Know who to call for urgent help, health concerns, or immigration
            questions—before you ever need it.
          </p>
        </div>
      </header>

      <div className="space-y-2 text-xs">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="rounded-xl bg-slate-950/70 p-2.5 ring-1 ring-slate-800"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-slate-100">
                  {c.label}
                </p>
                <p className="text-[10px] text-slate-300">{c.description}</p>
                {c.example && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Example: {c.example}
                  </p>
                )}
              </div>
              <span
                className={
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] ring-1 " +
                  severityClass(c.severity)
                }
              >
                <PhoneCall className="h-3 w-3" />
                {c.severity === "urgent"
                  ? "Urgent"
                  : c.severity === "non-urgent"
                  ? "Non-urgent"
                  : "Info"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
        <MessageCircle className="h-3 w-3" />
        TODO: Pull official campus emergency numbers and crisis lines from IIT
        systems so this list always stays accurate.
      </p>
      <p className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
        <Globe2 className="h-3 w-3" />
        If you&apos;re unsure which number to use, start with your campus public
        safety or the international office during business hours for guidance.
      </p>
    </Card>
  );
}
