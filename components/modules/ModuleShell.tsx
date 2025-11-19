"use client";

import { Card } from "@/components/ui/Card";
import { Loader2, CheckCircle2, Server } from "lucide-react";

interface ModuleShellProps {
  title: string;
  apiDescription: string;
  examples: string[];
  todoItems: string[];
}

export function ModuleShell({
  title,
  apiDescription,
  examples,
  todoItems
}: ModuleShellProps) {
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">{title}</h1>
          <p className="max-w-2xl text-xs text-slate-300">{apiDescription}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-[11px] text-slate-200 ring-1 ring-slate-700">
          <Server className="h-3.5 w-3.5 text-emerald-400" />
          <span>API-ready · Replace mocks with live endpoints</span>
        </div>
      </header>

      <Card>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Loader2 className="h-4 w-4 animate-spin text-red-400" />
          <p>
            This module is pre-wired for external APIs. Swap out the mock
            loaders with your IIT backend when it&apos;s ready.
          </p>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-2 text-sm font-semibold text-slate-50">
            Example integrations
          </h2>
          <ul className="space-y-1 text-xs text-slate-300">
            {examples.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="mb-2 text-sm font-semibold text-slate-50">
            Implementation checklist
          </h2>
          <ul className="space-y-1 text-xs text-slate-300">
            {todoItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="mb-2 text-sm font-semibold text-slate-50">
          API wiring pseudo-code
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-black/70 p-3 text-[11px] text-slate-200">
{`async function fetchData() {
  // TODO: Connect this to your real IIT campus API
  // Example:
  // const res = await fetch(
  //   process.env.NEXT_PUBLIC_IIT_API_BASE_URL + "/your-endpoint",
  //   { headers: { Authorization: "Bearer " + token } }
  // );
  // if (!res.ok) throw new Error("Failed to load");
  // return res.json();

  return mockData; // fallback for local prototyping
}`}
        </pre>
      </Card>
    </div>
  );
}
