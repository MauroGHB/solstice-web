"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Check } from "lucide-react";

export default function Precios() {
  const { t } = useLanguage();

  return (
    <main style={{ position: "relative", minHeight: "100vh", padding: "6rem 2rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: "bold" }}
          >
            {t("page.price.title")} <span className="text-gradient">{t("page.price.subtitle")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: "var(--color-text-muted)", fontSize: "1.2rem", marginTop: "1rem" }}
          >
            {t("page.price.desc")}
          </motion.p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {/* Plan Semanal */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(255, 184, 0, 0.15)" }}
            className="glass-panel"
            style={{ flex: "1 1 300px", maxWidth: "350px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>{t("page.price.weekly")}</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-sun-yellow)" }}>$499 <span style={{ fontSize: "1rem", color: "var(--color-text-muted)", fontWeight: "normal" }}>/ sem</span></div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem", color: "var(--color-text-muted)", flexGrow: 1 }}>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-yellow)" /> Análisis de un sector</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-yellow)" /> 1 Agente activo</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-yellow)" /> Soporte estándar</li>
            </ul>
            <button style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,184,0,0.4)", background: "transparent", color: "white", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,184,0,0.1)"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>{t("page.price.btn")}</button>
          </motion.div>

          {/* Plan Mensual (Popular) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(255, 94, 0, 0.3)" }}
            className="glass-panel"
            style={{ flex: "1 1 300px", maxWidth: "350px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", border: "1px solid rgba(255, 94, 0, 0.5)", position: "relative" }}
          >
            <div style={{ position: "absolute", top: "-15px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(45deg, var(--color-sun-red), var(--color-sun-orange))", padding: "0.2rem 1rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold", color: "white" }}>POPULAR</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>{t("page.price.monthly")}</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-sun-orange)" }}>$1,899 <span style={{ fontSize: "1rem", color: "var(--color-text-muted)", fontWeight: "normal" }}>/ mes</span></div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem", color: "var(--color-text-muted)", flexGrow: 1 }}>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-orange)" /> Sectores ilimitados</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-orange)" /> 5 Agentes de debate</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-orange)" /> Ejecución automática</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-orange)" /> Soporte prioritario</li>
            </ul>
            <button style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", background: "linear-gradient(45deg, var(--color-sun-red), var(--color-sun-orange))", color: "white", fontWeight: "bold", cursor: "pointer", transition: "transform 0.3s" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>{t("page.price.btn")}</button>
          </motion.div>

          {/* Plan Anual */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(217, 32, 39, 0.15)" }}
            className="glass-panel"
            style={{ flex: "1 1 300px", maxWidth: "350px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>{t("page.price.annual")}</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--color-sun-red)" }}>$18,999 <span style={{ fontSize: "1rem", color: "var(--color-text-muted)", fontWeight: "normal" }}>/ año</span></div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem", color: "var(--color-text-muted)", flexGrow: 1 }}>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-red)" /> Nivel Enterprise Completo</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-red)" /> Agentes ilimitados</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-red)" /> Infraestructura dedicada</li>
              <li style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Check size={18} color="var(--color-sun-red)" /> Soporte 24/7</li>
            </ul>
            <button style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(217,32,39,0.4)", background: "transparent", color: "white", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(217,32,39,0.1)"} onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>{t("page.price.btn")}</button>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
