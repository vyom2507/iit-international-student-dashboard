// components/layout/TopNavbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

type MeResponse = {
  student: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string | null;
    program?: string | null;
  } | null;
};

export function TopNavbar() {
  const pathname = usePathname();
  const [me, setMe] = useState<MeResponse["student"] | null>(null);
  const [open, setOpen] = useState(false);

  // Shared function to load current student from API
  const fetchMe = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (!res.ok) {
        setMe(null);
        return;
      }
      const data: MeResponse = await res.json();
      setMe(data.student);
    } catch (err) {
      console.error("Error loading session:", err);
      setMe(null);
    }
  };

  // 1) Initial load
  useEffect(() => {
    fetchMe();
  }, []);

  // 2) Re-load whenever route changes (includes browser Back)
  useEffect(() => {
    setOpen(false); // close dropdown on route change
    fetchMe();      // refresh session based on cookie
  }, [pathname]);

  const firstName =
    me?.fullName?.split(" ")[0] ??
    (me?.email ? me.email.split("@")[0] : "Student");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-red-900/40 bg-gradient-to-r from-red-700 via-red-600 to-red-800 px-3 text-sm text-white shadow-lg shadow-red-900/40 md:h-16 md:px-5">
      {/* Left side: brand + route info */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 text-xs font-bold shadow-md shadow-black/40 md:h-9 md:w-9">
          <Link
                  href="/"
                  className="block rounded-lg px-3 py-2 hover:bg-slate-800/80"
                >
                  IIT
                </Link>
        </div>
        <div className="hidden flex-col md:flex">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-100/90">
            iStudentsHub
          </span>
          <span className="text-[11px] text-red-50/90">
            Illinois Institute of Technology · International Student Dashboard
          </span>
        </div>
      </div>

      {/* Right side: actions */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Notifications icon (placeholder for now) */}
        <button
          type="button"
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-900/40 text-red-100 hover:bg-red-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-red-700 focus-visible:ring-white/80"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-semibold text-emerald-950">
            •
          </span>
        </button>

        {/* If not logged in → show Login button */}
        {!me ? (
          <Link
            href="/login"
            className="rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-semibold text-red-50 shadow-sm shadow-black/40 hover:bg-black/55"
          >
            Login
          </Link>
        ) : (
          // Logged in → user dropdown
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-black/30 px-2 py-1.5 text-[11px] font-medium shadow-md shadow-black/40 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-red-700 focus-visible:ring-white/80 md:px-3"
            >
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-7 overflow-hidden rounded-full bg-red-900/60 ring-1 ring-red-300/60 md:h-8 md:w-8">
                  {me.avatarUrl ? (
                    <Image
                      src={me.avatarUrl}
                      alt={me.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold">
                      {firstName[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="hidden text-left md:block">
                  <p className="text-[11px] leading-tight">
                    Hi,{" "}
                    <span className="font-semibold text-white">
                      {firstName}
                    </span>{" "}
                    👋
                  </p>
                  {me.program && (
                    <p className="text-[10px] text-red-100/80">
                      {me.program}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`h-3 w-3 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-950/95 p-1 text-[11px] text-slate-100 shadow-xl shadow-black/70 ring-1 ring-slate-700/80">
                <div className="border-b border-slate-800 px-3 py-2">
                  <p className="text-[11px] font-semibold">
                    {me.fullName || firstName}
                  </p>
                  <p className="truncate text-[10px] text-slate-400">
                    {me.email}
                  </p>
                </div>

                {/* Profile link */}
                <Link
                  href="/profile"
                  className="block rounded-lg px-3 py-2 hover:bg-slate-800/80"
                >
                  Profile
                </Link>

                {/* Dashboard link */}
                <Link
                  href="/dashboard"
                  className="block rounded-lg px-3 py-2 hover:bg-slate-800/80"
                >
                  Dashboard
                </Link>
                 {/* Logout as normal link */}
                <Link
                  href="/api/auth/logout"
                  className="block rounded-lg px-3 py-2 hover:bg-slate-800/80"
                >
                  Logout
                </Link>
                {/* Divider */}
                <div className="my-1 border-t border-slate-800" />
              
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
