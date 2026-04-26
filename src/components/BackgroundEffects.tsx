"use client";

import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: -1, overflow: "hidden" }}>
      {/* Dynamic Ambient Background Light that follows the cursor */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 94, 0, 0.15), transparent 60%),
            radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 32, 39, 0.08), transparent 50%),
            radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 184, 0, 0.1), transparent 70%)
          `
        }}
      />
      
      {/* Static abstract shapes/glows for the "Solstice" feel in dark areas */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 94, 0, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(217, 32, 39, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
      }} />
    </div>
  );
}
