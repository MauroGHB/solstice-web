"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export default function GlassCard({ title, description, icon, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 40px rgba(255, 94, 0, 0.15)",
        borderColor: "rgba(255, 94, 0, 0.4)"
      }}
      className="glass-panel"
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s ease"
      }}
    >
      <div style={{ color: "var(--color-sun-yellow)", marginBottom: "0.5rem" }}>
        {icon}
      </div>
      <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--color-text-main)" }}>
        {title}
      </h3>
      <p style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
        {description}
      </p>

      {/* Subtle hover glow effect internal to the card */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle, rgba(255, 94, 0, 0.05) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />
    </motion.div>
  );
}
