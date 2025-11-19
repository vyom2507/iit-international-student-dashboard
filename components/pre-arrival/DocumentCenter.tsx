"use client";

import { Card } from "@/components/ui/Card";
import { UploadCloud, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

type Status = "missing" | "in-review" | "uploaded";

interface Doc {
  key: string;
  name: string;
  description: string;
  status: Status;
  required: boolean;
  lastUpdated?: string;
}

const initialDocs: Doc[] = [
  {
    key: "passport",
    name: "Passport",
    description: "Valid for at least 6 months beyond your intended stay.",
    status: "missing",
    required: true
  },
  {
    key: "visa",
    name: "Student Visa",
    description: "Visa stamp aligned with your IIT program and SEVIS record.",
    status: "missing",
    required: true
  },
  {
    key: "i20",
    name: "I-20 / Admission Document",
    description: "Signed I-20 or official admission letter issued by IIT.",
    status: "missing",
    required: true
  },
  {
    key: "i94",
    name: "I-94 (after arrival)",
    description: "Record of arrival to be downloaded once you enter the U.S.",
    status: "missing",
    required: true
  },
  {
    key: "transcripts",
    name: "Academic Transcripts",
    description: "Optional copies for advising and credit evaluation.",
    status: "missing",
    required: false
  }
];

function statusStyles(status: Status) {
  switch (status) {
    case "uploaded":
      return "bg-emerald-500/15 text-emerald-300 ring-emerald-400/40";
    case "in-review":
      return "bg-amber-500/15 text-amber-200 ring-amber-400/40";
    default:
      return "bg-slate-700/40 text-slate-200 ring-slate-500/40";
  }
}

function statusLabel(status: Status) {
  switch (status) {
    case "uploaded":
      return "Uploaded";
    case "in-review":
      return "In review";
    default:
      return "Not uploaded";
  }
}

export function DocumentCenter() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);

  const handleMockUpload = (key: string) => {
    const now = new Date().toLocaleString();
    setDocs((prev) =>
      prev.map((doc) =>
        doc.key === key
          ? { ...doc, status: "uploaded", lastUpdated: now }
          : doc
      )
    );
  };

  return (
    <Card>
      <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600/20 text-red-300 ring-1 ring-red-500/40">
            <UploadCloud className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              Pre-Arrival Document Center
            </h2>
            <p className="text-xs text-slate-400">
              Keep digital copies of your most important documents ready for
              check-in and immigration.
            </p>
          </div>
        </div>
        <p className="flex items-center gap-1 text-[10px] text-slate-400">
          <Clock className="h-3 w-3" />
          Mock uploads only · Wire this to your real storage / IIT systems
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-xs">
        {docs.map((doc) => (
          <div
            key={doc.key}
            className="flex flex-col justify-between rounded-xl bg-slate-950/70 p-3 ring-1 ring-slate-800"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-slate-100">
                  {doc.name}
                  {doc.required && (
                    <span className="ml-1 rounded-full bg-red-600/20 px-1.5 py-0.5 text-[9px] font-medium text-red-200">
                      Required
                    </span>
                  )}
                </p>
              </div>
              <p className="text-[10px] text-slate-400">{doc.description}</p>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span
                className={
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ring-1 " +
                  statusStyles(doc.status)
                }
              >
                {doc.status === "uploaded" ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <UploadCloud className="h-3 w-3" />
                )}
                <span>{statusLabel(doc.status)}</span>
              </span>
              <button
                type="button"
                onClick={() => handleMockUpload(doc.key)}
                className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500"
              >
                <UploadCloud className="h-3 w-3" />
                <span>{doc.status === "uploaded" ? "Re-upload" : "Mock upload"}</span>
              </button>
            </div>
            {doc.lastUpdated && (
              <p className="mt-1 text-[9px] text-slate-500">
                Last updated: {doc.lastUpdated}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] text-slate-500">
        Implementation idea: connect this section to your real document upload
        service (S3, Cloudinary, or campus storage), then store per-student
        status in your IIT backend so staff can review and approve.
      </p>
    </Card>
  );
}
