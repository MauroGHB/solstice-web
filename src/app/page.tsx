"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { BrainCircuit, TrendingUp, ShieldCheck, Zap, ArrowRight, Activity, Database, Network } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const { t } = useLanguage();

  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus(data.message);
        setFormData({ name: "", email: "", company: "" });
      } else {
        setSubmitStatus("Error: " + data.error);
      }
    } catch (error) {
      setSubmitStatus("Error de conexión al servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main ref={containerRef} style={{ position: "relative", minHeight: "100vh" }}>

      <div style={{ position: "relative", zIndex: 1, padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Hero Section */}
        <motion.section 
          style={{ y: yHero, opacity: opacityHero, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minHeight: "70vh", justifyContent: "center", gap: "2rem", perspective: "1000px" }}
        >
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <div style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              borderRadius: "50px",
              border: "1px solid rgba(255, 94, 0, 0.3)",
              background: "rgba(255, 94, 0, 0.1)",
              color: "var(--color-sun-yellow)",
              marginBottom: "2rem",
              fontSize: "0.9rem",
              fontWeight: "600"
            }}>
              {t("hero.badge")}
            </div>
            <h2 style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: "1", marginBottom: "1.5rem", fontWeight: "700" }}>
              {t("hero.title1")} <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </h2>
            <p style={{ fontSize: "1.25rem", color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto" }}>
              {t("hero.desc")}
            </p>
          </motion.div>

          <motion.div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 94, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("demo")}
              style={{ 
                background: "linear-gradient(45deg, var(--color-sun-red), var(--color-sun-orange))", 
                border: "none", 
                color: "white", 
                padding: "1rem 2.5rem", 
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              {t("hero.btn.start")} <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("features")}
              style={{ 
                background: "transparent", 
                border: "1px solid rgba(255, 255, 255, 0.2)", 
                color: "white", 
                padding: "1rem 2.5rem", 
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {t("hero.btn.docs")}
            </motion.button>
          </motion.div>
        </motion.section>

        {/* How it Works (Flow Section) */}
        <section id="features" style={{ marginTop: "5rem", padding: "4rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{t("how.title1")} <span className="text-gradient">{t("how.title2")}</span></h3>
            <p style={{ color: "var(--color-text-muted)", marginTop: "1rem", fontSize: "1.1rem" }}>
              {t("how.desc")}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: "2px", background: "linear-gradient(90deg, rgba(255,94,0,0) 0%, rgba(255,94,0,0.3) 50%, rgba(255,94,0,0) 100%)", zIndex: -1, display: "none" }} />
            
            <motion.div whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(255, 94, 0, 0.2)" }} className="glass-panel" style={{ flex: "1 1 250px", padding: "2.5rem", textAlign: "center", transition: "box-shadow 0.3s" }}>
              <div style={{ background: "rgba(255, 94, 0, 0.1)", width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--color-sun-orange)" }}>
                <Database size={32} />
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>{t("how.step1.title")}</h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                {t("how.step1.desc")}
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(255, 184, 0, 0.2)" }} className="glass-panel" style={{ flex: "1 1 250px", padding: "2.5rem", textAlign: "center", border: "1px solid rgba(255, 184, 0, 0.3)", transition: "box-shadow 0.3s" }}>
              <div style={{ background: "rgba(255, 184, 0, 0.1)", width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--color-sun-yellow)", boxShadow: "0 0 20px rgba(255, 184, 0, 0.2)" }}>
                <Activity size={32} />
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>{t("how.step2.title")}</h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                {t("how.step2.desc")}
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(217, 32, 39, 0.2)" }} className="glass-panel" style={{ flex: "1 1 250px", padding: "2.5rem", textAlign: "center", transition: "box-shadow 0.3s" }}>
              <div style={{ background: "rgba(217, 32, 39, 0.1)", width: "64px", height: "64px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--color-sun-red)" }}>
                <Network size={32} />
              </div>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>{t("how.step3.title")}</h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
                {t("how.step3.desc")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section style={{ marginTop: "5rem" }}>
          <div style={{ marginBottom: "3rem" }}>
            <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{t("feat.title1")} <span className="text-gradient">{t("feat.title2")}</span></h3>
          </div>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "1.5rem",
            gridAutoRows: "minmax(200px, auto)"
          }}>
            <motion.div whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(255, 184, 0, 0.15)", borderColor: "rgba(255, 184, 0, 0.4)" }} className="glass-panel" style={{ padding: "2rem", gridColumn: "span 2 / span 2", transition: "border-color 0.3s" }}>
              <BrainCircuit size={40} color="var(--color-sun-yellow)" style={{ marginBottom: "1rem" }} />
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{t("feat.grid1.title")}</h4>
              <p style={{ color: "var(--color-text-muted)" }}>
                {t("feat.grid1.desc")}
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(255, 94, 0, 0.3)" }} className="glass-panel" style={{ padding: "2rem", background: "linear-gradient(135deg, rgba(22, 10, 33, 0.8), rgba(255, 94, 0, 0.15))" }}>
              <TrendingUp size={40} color="var(--color-sun-orange)" style={{ marginBottom: "1rem" }} />
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{t("feat.grid2.title")}</h4>
              <p style={{ color: "var(--color-text-muted)" }}>
                {t("feat.grid2.desc")}
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(217, 32, 39, 0.15)", borderColor: "rgba(217, 32, 39, 0.4)" }} className="glass-panel" style={{ padding: "2rem", transition: "border-color 0.3s" }}>
              <ShieldCheck size={40} color="var(--color-sun-red)" style={{ marginBottom: "1rem" }} />
              <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{t("feat.grid3.title")}</h4>
              <p style={{ color: "var(--color-text-muted)" }}>
                {t("feat.grid3.desc")}
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(255, 184, 0, 0.15)", borderColor: "rgba(255, 184, 0, 0.4)" }} className="glass-panel" style={{ padding: "2rem", gridColumn: "span 2 / span 2", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", transition: "border-color 0.3s" }}>
              <div>
                <Zap size={40} color="var(--color-sun-yellow)" style={{ marginBottom: "1rem" }} />
                <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{t("feat.grid4.title")}</h4>
                <p style={{ color: "var(--color-text-muted)", maxWidth: "400px" }}>
                  {t("feat.grid4.desc")}
                </p>
              </div>
              <div style={{ background: "rgba(0,0,0,0.5)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", flex: "1 1 300px", fontFamily: "monospace", color: "var(--color-sun-orange)", fontSize: "0.9rem" }}>
                <span style={{color: "#888"}}>// Iniciar agente SolStice</span><br/>
                <span style={{color: "#c678dd"}}>import</span> &#123; SolStice &#125; <span style={{color: "#c678dd"}}>from</span> <span style={{color: "#98c379"}}>'@solstice/sdk'</span>;<br/>
                <br/>
                <span style={{color: "#e5c07b"}}>const</span> agent = <span style={{color: "#c678dd"}}>new</span> <span style={{color: "#e5c07b"}}>SolStice</span>(&#123; <br/>
                &nbsp;&nbsp;apiKey: process.env.<span style={{color: "#e06c75"}}>SOLSTICE_KEY</span> <br/>
                &#125;);<br/>
                <br/>
                <span style={{color: "#c678dd"}}>await</span> agent.<span style={{color: "#61afef"}}>analyzeMarket</span>(&#123; sector: <span style={{color: "#98c379"}}>'fintech'</span> &#125;);
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full Stack Demo Section (Contact/Lead Gen) */}
        <section id="demo" style={{ marginTop: "8rem", marginBottom: "5rem", display: "flex", justifyContent: "center" }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel"
            style={{ padding: "4rem", maxWidth: "600px", width: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "100%", height: "100%", background: "radial-gradient(circle, rgba(255, 94, 0, 0.15) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{t("demo.title1")} <span className="text-gradient">{t("demo.title2")}</span></h3>
              <p style={{ color: "var(--color-text-muted)", marginBottom: "3rem" }}>
                {t("demo.desc")}
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <input 
                  type="text" 
                  placeholder={t("demo.form.name")} 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ 
                    background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", 
                    padding: "1rem 1.5rem", borderRadius: "12px", color: "white", outline: "none", fontSize: "1rem",
                    transition: "border-color 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--color-sun-orange)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--glass-border)"}
                />
                <input 
                  type="email" 
                  placeholder={t("demo.form.email")} 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ 
                    background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", 
                    padding: "1rem 1.5rem", borderRadius: "12px", color: "white", outline: "none", fontSize: "1rem",
                    transition: "border-color 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--color-sun-orange)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--glass-border)"}
                />
                <input 
                  type="text" 
                  placeholder={t("demo.form.company")} 
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{ 
                    background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", 
                    padding: "1rem 1.5rem", borderRadius: "12px", color: "white", outline: "none", fontSize: "1rem",
                    transition: "border-color 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--color-sun-orange)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--glass-border)"}
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ 
                    background: "var(--color-sun-orange)", border: "none", color: "white", 
                    padding: "1rem", borderRadius: "12px", fontSize: "1.1rem", fontWeight: "bold",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(255, 94, 0, 0.3)"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {isSubmitting ? t("demo.form.processing") : t("demo.form.btn")}
                </button>
                
                {submitStatus && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ color: submitStatus.includes("Error") ? "var(--color-sun-red)" : "var(--color-sun-yellow)", marginTop: "1rem" }}
                  >
                    {submitStatus}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
