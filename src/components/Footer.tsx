"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ 
      borderTop: "1px solid var(--glass-border)", 
      paddingTop: "3rem", 
      paddingBottom: "2rem",
      marginTop: "4rem", 
      maxWidth: "1200px",
      margin: "4rem auto 0",
      display: "flex", 
      flexDirection: "column",
      gap: "2rem",
      color: "var(--color-text-muted)", 
      fontSize: "0.9rem",
      padding: "2rem"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
        <div style={{ maxWidth: "300px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white", marginBottom: "1rem" }}>
            Sol<span className="text-gradient">Stice</span>
          </h2>
          <p>{t("hero.desc")}</p>
        </div>
        
        <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h4 style={{ color: "white", fontWeight: "bold", marginBottom: "0.5rem" }}>Plataforma</h4>
            <span style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>{t("nav.features")}</span>
            <span style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>{t("nav.pricing")}</span>
            <span style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>{t("nav.support")}</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h4 style={{ color: "white", fontWeight: "bold", marginBottom: "0.5rem" }}>Legal</h4>
            <span style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>{t("footer.terms")}</span>
            <span style={{ cursor: "pointer", transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "white"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>{t("footer.privacy")}</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", marginTop: "1rem" }}>
        <div>{t("footer.rights")}</div>
      </div>
    </footer>
  );
}
