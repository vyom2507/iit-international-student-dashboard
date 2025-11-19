"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

type Dictionary = Record<string, string>;

const translations: Record<Language, Dictionary> = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.preArrival": "Pre-Arrival",
    "nav.campusNavigation": "Campus Navigation",
    "nav.academicIntegration": "Academic Integration",
    "nav.socialNetworking": "Social Networking",
    "nav.resourceDirectory": "Resource Directory",
    "nav.marketplace": "Marketplace"
  },
  es: {
    "nav.dashboard": "Panel",
    "nav.preArrival": "Antes de llegar",
    "nav.campusNavigation": "Navegación del campus",
    "nav.academicIntegration": "Integración académica",
    "nav.socialNetworking": "Red social",
    "nav.resourceDirectory": "Directorio de recursos",
    "nav.marketplace": "Mercado"
  }
};

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string) => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
