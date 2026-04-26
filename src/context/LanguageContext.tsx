"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations } from "../translations";

type Language = "es" | "en" | "zh" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Could load from localStorage here if desired
    const saved = localStorage.getItem("solstice_lang") as Language;
    if (saved && ["es", "en", "zh", "pt"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("solstice_lang", lang);
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  if (!mounted) {
    // Prevent hydration mismatch by rendering default briefly
    return (
      <LanguageContext.Provider value={{ language: "es", setLanguage: changeLanguage, t: (k) => translations["es"][k as keyof typeof translations["es"]] || k }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
