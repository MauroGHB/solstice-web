"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TouchGlow {
  id: number;
  x: number;
  y: number;
}

export default function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [touchGlows, setTouchGlows] = useState<TouchGlow[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleTouch = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const newGlow = { id: Date.now(), x: touch.clientX, y: touch.clientY };
          
          setTouchGlows(prev => {
            const next = [...prev, newGlow];
            // Keep max 3 simultaneous
            if (next.length > 3) return next.slice(next.length - 3);
            return next;
          });

          // Auto-remove after 3 seconds
          setTimeout(() => {
            setTouchGlows(prev => prev.filter(g => g.id !== newGlow.id));
          }, 3000);
        }
      };
      
      let lastTouch = 0;
      const throttledTouch = (e: TouchEvent) => {
        const now = Date.now();
        if (now - lastTouch > 600) { // spawn one every 600ms to avoid overlapping too heavily
          handleTouch(e);
          lastTouch = now;
        }
      };

      window.addEventListener("touchmove", throttledTouch, { passive: true });
      window.addEventListener("touchstart", handleTouch, { passive: true });
      
      return () => {
        window.removeEventListener("touchmove", throttledTouch);
        window.removeEventListener("touchstart", handleTouch);
      };
    } else {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMobile]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: -1, overflow: "hidden" }}>
      
      {!isMobile && (
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
      )}

      {isMobile && (
        <AnimatePresence>
          {touchGlows.map(glow => (
            <motion.div
              key={glow.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.8, 0.4, 0.6, 0], 
                scale: [0.8, 1.2, 1.1, 1.3, 1.5] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, times: [0, 0.2, 0.4, 0.6, 1], ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: glow.y - 150,
                left: glow.x - 150,
                width: 300,
                height: 300,
                background: "radial-gradient(circle, rgba(255, 184, 0, 0.2) 0%, rgba(255, 94, 0, 0.15) 30%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
                mixBlendMode: "screen"
              }}
            />
          ))}
        </AnimatePresence>
      )}
      
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
