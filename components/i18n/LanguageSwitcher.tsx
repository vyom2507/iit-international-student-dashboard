"use client";

import { Globe2 } from "lucide-react";
import { useI18n } from "./I18nProvider";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="inline-flex items-center rounded-full bg-black/25 p-0.5 text-[11px] text-red-50 ring-1 ring-red-300/60 shadow-sm shadow-red-900/30">
      <span className="ml-1 flex items-center gap-1 px-1.5 py-0.5">
        <Globe2 className="h-3 w-3" />
        <span className="hidden sm:inline">Language</span>
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-2 py-0.5 ${
          lang === "en"
            ? "bg-red-500 text-white"
            : "text-red-100 hover:bg-black/30"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`rounded-full px-2 py-0.5 ${
          lang === "es"
            ? "bg-red-500 text-white"
            : "text-red-100 hover:bg-black/30"
        }`}
      >
        ES
      </button>
    </div>
  );
}
