"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PointerEvent, useState, useEffect, useMemo } from "react";

export default function HoloSphere() {
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Base constant rotation
  const baseRotateY = useMotionValue(0);
  const baseRotateX = useMotionValue(10);
  
  useEffect(() => {
    let frame: number;
    let lastTime = performance.now();
    
    const updateRotation = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (!isDragging) {
        baseRotateY.set(baseRotateY.get() + (delta * 0.005));
      }
      frame = requestAnimationFrame(updateRotation);
    };
    
    frame = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(frame);
  }, [baseRotateY, isDragging]);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 80, damping: 30 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 80, damping: 30 });

  const finalRotateX = useTransform(() => baseRotateX.get() + dragY.get() + smoothTiltX.get());
  const finalRotateY = useTransform(() => baseRotateY.get() + dragX.get() + smoothTiltY.get());

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button === 2) { 
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      dragX.set(dragX.get() + e.movementX * 0.5);
      dragY.set(dragY.get() - e.movementY * 0.5);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltX.set(y * -40); 
      tiltY.set(x * 40);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      tiltX.set(0);
      tiltY.set(0);
    }
  };

  const arcs = useMemo(() => {
    // Reducido de 80 a 35 para optimización extrema de GPU
    return Array.from({ length: 35 }).map((_, i) => {
      const rx = Math.random() * 360;
      const ry = Math.random() * 360;
      const size = 260 + Math.random() * 80; 
      
      const borders = ['Top', 'Right', 'Bottom', 'Left'];
      // Aumentamos los bordes activos para compensar la menor cantidad de elementos
      const activeCount = 2 + Math.floor(Math.random() * 2); 
      const shuffled = borders.sort(() => 0.5 - Math.random());
      const activeBorders = shuffled.slice(0, activeCount);
      
      const colors = [
        'rgba(255, 184, 0, 0.9)', 
        'rgba(255, 94, 0, 0.8)',  
        'rgba(217, 32, 39, 0.7)', 
        'rgba(255, 230, 100, 0.8)',
        'rgba(255, 150, 0, 0.6)'  
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Ligeramente más grueso
      const thickness = 2 + Math.floor(Math.random() * 3); 
      
      const borderStyle = {
        borderTop: activeBorders.includes('Top') ? `${thickness}px solid ${color}` : `${thickness}px solid transparent`,
        borderRight: activeBorders.includes('Right') ? `${thickness}px solid ${color}` : `${thickness}px solid transparent`,
        borderBottom: activeBorders.includes('Bottom') ? `${thickness}px solid ${color}` : `${thickness}px solid transparent`,
        borderLeft: activeBorders.includes('Left') ? `${thickness}px solid ${color}` : `${thickness}px solid transparent`,
        // Eliminado shadow "inset" que es mortal para el rendimiento en 3D
        boxShadow: activeBorders.length > 0 ? `0 0 8px ${color}` : 'none'
      };

      const duration = 10 + Math.random() * 25; 
      const direction = Math.random() > 0.5 ? 1 : -1;
      
      // Arc global breathing delay
      const breatheDelay = Math.random() * 5;

      return { id: i, rx, ry, size, borderStyle, duration, direction, breatheDelay };
    });
  }, []);

  const wireframes = useMemo(() => {
    const rings = [];
    const sphereRadius = 140; 
    for(let i = 1; i < 6; i++) {
      const angle = (i / 6) * Math.PI; 
      const r = sphereRadius * Math.sin(angle);
      const y = sphereRadius * Math.cos(angle);
      rings.push({ rx: 90, ry: 0, tz: y, size: r * 2 });
    }
    for(let i = 0; i < 8; i++) {
      rings.push({ rx: 0, ry: i * (180 / 8), tz: 0, size: sphereRadius * 2 });
    }
    return rings;
  }, []);

  const dataNodes = useMemo(() => {
    // Reducido de 50 a 25
    return Array.from({ length: 25 }).map((_, i) => {
      const rx = Math.random() * 360;
      const ry = Math.random() * 360;
      const distance = 140 + Math.random() * 20; 
      // Convertir a rgba para radial-gradient
      const color = Math.random() > 0.3 ? 'rgba(255, 184, 0, 1)' : 'rgba(255, 94, 0, 1)';
      return { 
        id: i, rx, ry, distance, 
        delay: Math.random() * 3, 
        duration: 2 + Math.random() * 3,
        color
      };
    });
  }, []);

  if (!mounted) return <div style={{ width: 400, height: 400 }} />;

  return (
    <>
      <style>{`
        @keyframes rotateArc {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }
        @keyframes pulseArc {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes pulseNode {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        @keyframes pulseCore {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
      <div 
        onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onContextMenu={(e) => e.preventDefault()} 
      style={{
        width: "100%",
        maxWidth: "550px",
        aspectRatio: "1/1",
        perspective: "1200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: "0 auto",
        cursor: isDragging ? "grabbing" : "crosshair",
        touchAction: "none"
      }}
    >
      <div style={{ position: "absolute", bottom: "0rem", color: "var(--color-sun-yellow)", fontSize: "0.85rem", opacity: 0.6, pointerEvents: "none", fontWeight: "bold", letterSpacing: "1px" }}>
        MANTÉN CLIC DERECHO PARA ROTAR EL NEXO 3D
      </div>

      {/* CORE OUTSIDE OF 3D ROTATION: This guarantees it NEVER flattens into a line. It acts as a perfect sphere. */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 35px)", left: "calc(50% - 35px)",
          width: "70px", height: "70px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 255, 230, 1) 0%, rgba(255, 184, 0, 0.8) 30%, rgba(217, 32, 39, 0.6) 60%, transparent 100%)",
          boxShadow: "0 0 50px rgba(255, 184, 0, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.5)",
          pointerEvents: "none",
          zIndex: 10, // ensure it stays visible inside the shell
          animation: "pulseCore 4s ease-in-out infinite",
          willChange: "transform, opacity"
        }}
      />

      <motion.div
        style={{
          width: 0, 
          height: 0,
          position: "relative",
          rotateX: finalRotateX,
          rotateY: finalRotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <div style={{
          position: "absolute",
          top: "-150px", left: "-150px", width: "300px", height: "300px",
          background: "radial-gradient(circle, rgba(255, 94, 0, 0.15) 0%, transparent 70%)",
          transform: "translateZ(-50px)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />

        {wireframes.map((wf, i) => (
          <div key={`wf-${i}`} style={{
            position: 'absolute',
            transform: `rotateX(${wf.rx}deg) rotateY(${wf.ry}deg) translateZ(${wf.tz}px)`
          }}>
            <div style={{
              position: 'absolute',
              top: -wf.size / 2, left: -wf.size / 2,
              width: wf.size, height: wf.size,
              borderRadius: '50%',
              border: '1px solid rgba(255, 184, 0, 0.05)',
              pointerEvents: "none"
            }} />
          </div>
        ))}

        {arcs.map(arc => (
          <div 
            key={`arc-wrap-${arc.id}`} 
            style={{
              position: 'absolute',
              transform: `rotateX(${arc.rx}deg) rotateY(${arc.ry}deg)`
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -arc.size / 2,
                left: -arc.size / 2,
                width: arc.size,
                height: arc.size,
                borderRadius: '50%',
                pointerEvents: "none",
                animation: `rotateArc ${arc.duration}s linear infinite ${arc.direction === 1 ? 'normal' : 'reverse'}, pulseArc 6s ease-in-out infinite ${arc.breatheDelay}s`,
                willChange: "transform, opacity",
                ...arc.borderStyle
              }}
            />
          </div>
        ))}
        
        {dataNodes.map(node => (
          <div 
            key={`node-wrap-${node.id}`}
            style={{
              position: 'absolute',
              transform: `rotateX(${node.rx}deg) rotateY(${node.ry}deg) translateZ(${node.distance}px)`
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -6, left: -6,
                width: 12, height: 12,
                borderRadius: '50%',
                // Usando radial-gradient en vez de box-shadow para el glow (súper rápido en GPU)
                background: `radial-gradient(circle, ${node.color} 10%, transparent 70%)`,
                animation: `pulseNode ${node.duration}s ease-in-out infinite ${node.delay}s`,
                willChange: "transform, opacity"
              }}
            />
          </div>
        ))}

      </motion.div>
    </div>
    </>
  );
}
