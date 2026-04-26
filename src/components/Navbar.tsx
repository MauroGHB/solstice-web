"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "zh", label: "ZH" },
    { code: "pt", label: "PT" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 50 }}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "-1px", color: "white" }}
        >
          Sol<span className="text-gradient">Stice</span>
        </motion.h1>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/caracteristicas" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>
            {t("nav.features")}
          </Link>
          <Link href="/precios" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>
            {t("nav.pricing")}
          </Link>
          <Link href="/soporte" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontWeight: "500", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>
            {t("nav.support")}
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          
          {/* Custom Language Dropdown */}
          <div ref={langRef} style={{ position: "relative" }}>
            <motion.div 
              onClick={() => setIsLangOpen(!isLangOpen)}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "0.5rem", 
                background: "rgba(255,255,255,0.05)", 
                padding: "0.5rem 1rem", 
                borderRadius: "8px", 
                border: "1px solid var(--glass-border)",
                cursor: "pointer",
                color: "white",
                fontSize: "0.9rem",
                userSelect: "none"
              }}
            >
              <Globe size={16} color="var(--color-text-muted)" />
              <span style={{ fontWeight: "600" }}>{language.toUpperCase()}</span>
              <motion.div animate={{ rotate: isLangOpen ? 180 : 0 }}>
                <ChevronDown size={14} color="var(--color-text-muted)" />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="glass-panel"
                  style={{
                    position: "absolute",
                    top: "120%",
                    right: 0,
                    minWidth: "120px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5rem",
                    gap: "0.2rem",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
                  }}
                >
                  {languages.map((lang) => (
                    <motion.div
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLangOpen(false);
                      }}
                      whileHover={{ backgroundColor: "rgba(255, 184, 0, 0.2)", color: "white" }}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: language === lang.code ? "var(--color-sun-yellow)" : "var(--color-text-muted)",
                        fontWeight: language === lang.code ? "bold" : "normal",
                        transition: "color 0.2s"
                      }}
                    >
                      {lang.label}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 94, 0, 0.1)" }}
            style={{ 
              background: "var(--glass-bg)", 
              border: "1px solid var(--glass-border)", 
              color: "var(--color-sun-yellow)", 
              padding: "0.5rem 1.5rem", 
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "600",
              backdropFilter: "blur(10px)"
            }}
          >
            {t("nav.dashboard")}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
