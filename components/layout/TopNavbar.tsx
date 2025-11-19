"use client";

import { Bell, ChevronDown, Settings } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function TopNavbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-red-900/40 bg-red-gradient/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-red-50 shadow-sm shadow-red-900/40 ring-1 ring-red-300/40 hover:bg-black/30">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            You&apos;re on the IIT International Student Journey dashboard
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <LanguageSwitcher />

          <button
            type="button"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-red-50 shadow-md shadow-red-900/40 ring-1 ring-red-300/40 hover:bg-black/30"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-semibold text-amber-950 ring-1 ring-amber-200">
              3
            </span>
          </button>

          <button
            type="button"
            className="hidden h-9 items-center gap-2 rounded-full bg-black/20 px-3 text-xs font-medium text-red-50 shadow-md shadow-red-900/40 ring-1 ring-red-300/40 hover:bg-black/30 md:inline-flex"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Quick settings</span>
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full bg-black/30 px-2 py-1 text-xs text-red-50 shadow-md shadow-red-900/40 ring-1 ring-red-300/60 hover:bg-black/40"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-red-200/40 bg-black/40">
                <Image
                  src="https://avatars.githubusercontent.com/u/1?v=4"
                  alt="Profile"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="hidden text-left text-[11px] leading-tight sm:block">
                <p className="font-semibold">New IIT International Student</p>
                <p className="text-[10px] text-red-100/80">
                  IIT ID #A00012345 · Main Campus
                </p>
              </div>
              <ChevronDown className="h-3 w-3" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800/80 bg-slate-950/95 p-1 text-sm shadow-xl shadow-black/60 backdrop-blur-md">
                <div className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-xs text-slate-200">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-700/60 bg-black/60">
                    <Image
                      src="https://avatars.githubusercontent.com/u/1?v=4"
                      alt="Profile"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50">
                      New IIT International Student
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Computer Science · First semester at IIT
                    </p>
                  </div>
                </div>
                <div className="my-1 border-t border-slate-800" />
                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80">
                  <span>Update profile</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80">
                  <span>Change password</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-red-300 hover:bg-red-600/70 hover:text-white">
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
