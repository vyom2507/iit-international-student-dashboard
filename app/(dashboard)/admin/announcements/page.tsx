// app/(dashboard)/admin/announcements/page.tsx
"use client";

import { useEffect, useState } from "react";

type Announcement = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  createdBy: {
    fullName: string;
    email: string;
  };
};

export default function AdminAnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/announcements");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load announcements.");
        return;
      }
      setList(data.announcements || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title || !body) {
      setError("Title and body are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create announcement.");
      }
      setTitle("");
      setBody("");
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to create announcement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
          Admin · Announcements
        </p>
        <h1 className="mt-1 text-xl font-semibold text-slate-50">
          Broadcast updates to IIT international students
        </h1>
        <p className="text-xs text-slate-400">
          Post important notices about orientation, immigration advising,
          deadlines, and campus events. These can be surfaced on the dashboard
          later.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 rounded-2xl bg-slate-950/80 p-4 ring-1 ring-slate-800"
      >
        {error && (
          <div className="rounded-lg border border-red-500/60 bg-red-950/60 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-slate-200">
            Title
          </label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Orientation schedule updated"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-slate-200">
            Message
          </label>
          <textarea
            className="min-h-[90px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share details about time, location, and what students should bring..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          {submitting ? "Posting…" : "Post announcement"}
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-100">
          Recent announcements
        </h2>
        {loading ? (
          <p className="text-xs text-slate-400">Loading…</p>
        ) : list.length === 0 ? (
          <p className="text-xs text-slate-400">
            No announcements yet. Create the first one above.
          </p>
        ) : (
          <div className="space-y-2">
            {list.map((a) => (
              <div
                key={a.id}
                className="rounded-xl bg-slate-950/80 p-3 text-xs ring-1 ring-slate-800"
              >
                <p className="text-[11px] font-semibold text-slate-50">
                  {a.title}
                </p>
                <p className="mt-1 text-[11px] text-slate-200">{a.body}</p>
                <p className="mt-2 text-[10px] text-slate-500">
                  Posted by {a.createdBy.fullName} &lt;{a.createdBy.email}&gt; ·{" "}
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
