"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Soporte() {
  const { t } = useLanguage();

  return (
    <main style={{ position: "relative", minHeight: "100vh", padding: "6rem 2rem 2rem", maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-panel"
          style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem", display: "flex", flexDirection: "column", gap: "3rem", textAlign: "center" }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: "bold" }}>
              {t("page.supp.title")} <span className="text-gradient">{t("page.supp.subtitle")}</span>
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.2rem", marginTop: "1rem" }}>
              {t("page.supp.desc")}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
            
            <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "rgba(255,255,255,0.05)", padding: "1.5rem 2rem", borderRadius: "16px", width: "100%", maxWidth: "500px", border: "1px solid rgba(255,184,0,0.2)" }}>
              <div style={{ background: "rgba(255,184,0,0.1)", padding: "1rem", borderRadius: "50%" }}>
                <Mail size={24} color="var(--color-sun-yellow)" />
              </div>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Email</h4>
                <p style={{ color: "var(--color-text-muted)" }}>{t("page.supp.email").replace("Correo: ", "").replace("Email: ", "").replace("电子邮件：", "").replace("E-mail: ", "")}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "rgba(255,255,255,0.05)", padding: "1.5rem 2rem", borderRadius: "16px", width: "100%", maxWidth: "500px", border: "1px solid rgba(255,94,0,0.2)" }}>
              <div style={{ background: "rgba(255,94,0,0.1)", padding: "1rem", borderRadius: "50%" }}>
                <Phone size={24} color="var(--color-sun-orange)" />
              </div>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Teléfono</h4>
                <p style={{ color: "var(--color-text-muted)" }}>{t("page.supp.phone").replace("Teléfono: ", "").replace("Phone: ", "").replace("电话：", "").replace("Telefone: ", "")}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "rgba(255,255,255,0.05)", padding: "1.5rem 2rem", borderRadius: "16px", width: "100%", maxWidth: "500px", border: "1px solid rgba(217,32,39,0.2)" }}>
              <div style={{ background: "rgba(217,32,39,0.1)", padding: "1rem", borderRadius: "50%" }}>
                <MapPin size={24} color="var(--color-sun-red)" />
              </div>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Oficina</h4>
                <p style={{ color: "var(--color-text-muted)" }}>{t("page.supp.address").replace("Sede: ", "").replace("HQ: ", "").replace("总部：", "")}</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </main>
  );
}
