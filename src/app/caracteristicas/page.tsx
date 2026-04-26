"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import HoloSphere from "@/components/HoloSphere";
import { Users, Target, Shield, CheckCircle2 } from "lucide-react";

export default function Caracteristicas() {
  const { t } = useLanguage();

  return (
    <main style={{ position: "relative", minHeight: "100vh", padding: "6rem 2rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "8rem" }}>
        
        {/* Hero Section: Sol AI Hologram */}
        <section style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "4rem", minHeight: "60vh" }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: "1 1 400px" }}
          >
            <h2 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: "bold", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              {t("page.feat.title")} <br/>
              <span className="text-gradient">{t("page.feat.subtitle")}</span>
            </h2>
            <p style={{ fontSize: "1.2rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              {t("page.feat.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}
          >
            <HoloSphere />
          </motion.div>
        </section>

        {/* Info Grid Sections */}
        <section style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>
            {/* Quiénes Somos */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(255, 184, 0, 0.15)", borderColor: "rgba(255, 184, 0, 0.4)" }}
              className="glass-panel"
              style={{ flex: "1 1 350px", padding: "3rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s" }}
            >
              <div style={{ position: "absolute", top: "-10%", right: "-10%", opacity: 0.1 }}>
                <Users size={200} color="var(--color-sun-yellow)" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Users color="var(--color-sun-yellow)" /> {t("page.feat.who.title")}
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
                {t("page.feat.who.desc")}
              </p>
            </motion.div>

            {/* Propósito */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(255, 94, 0, 0.15)", borderColor: "rgba(255, 94, 0, 0.6)" }}
              className="glass-panel"
              style={{ flex: "1 1 350px", padding: "3rem", position: "relative", overflow: "hidden", border: "1px solid rgba(255, 94, 0, 0.3)", transition: "border-color 0.3s" }}
            >
              <div style={{ position: "absolute", top: "-10%", right: "-10%", opacity: 0.1 }}>
                <Target size={200} color="var(--color-sun-orange)" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Target color="var(--color-sun-orange)" /> {t("page.feat.why.title")}
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
                {t("page.feat.why.desc")}
              </p>
            </motion.div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>
            {/* Ideología */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(217, 32, 39, 0.15)", borderColor: "rgba(217, 32, 39, 0.6)" }}
              className="glass-panel"
              style={{ flex: "1 1 350px", padding: "3rem", position: "relative", overflow: "hidden", border: "1px solid rgba(217, 32, 39, 0.3)", transition: "border-color 0.3s" }}
            >
              <div style={{ position: "absolute", top: "-10%", right: "-10%", opacity: 0.1 }}>
                <Shield size={200} color="var(--color-sun-red)" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Shield color="var(--color-sun-red)" /> {t("page.feat.ideology.title")}
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
                {t("page.feat.ideology.desc")}
              </p>
            </motion.div>

            {/* Beneficios */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(255, 184, 0, 0.1)" }}
              className="glass-panel"
              style={{ flex: "1 1 350px", padding: "3rem", background: "linear-gradient(135deg, rgba(22, 10, 33, 0.9), rgba(255, 184, 0, 0.1))" }}
            >
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
                {t("page.feat.benefits.title")}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[1, 2, 3, 4].map((num) => (
                  <motion.li 
                    key={num}
                    whileHover={{ x: 10, color: "white" }}
                    style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "1.1rem", color: "var(--color-text-muted)", transition: "color 0.2s", cursor: "default" }}
                  >
                    <CheckCircle2 color="var(--color-sun-yellow)" size={20} />
                    {/* @ts-ignore */}
                    {t(`page.feat.benefits.${num}`)}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

        </section>
      </div>
    </main>
  );
}
