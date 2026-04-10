"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SohubSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className="relative w-full h-[50vh] min-h-[450px] overflow-hidden bg-black flex items-center justify-center py-5 px-6">
      {/* Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h2 
          style={{ x: textX }}
          className="text-[28vw] font-black text-white/50 leading-none tracking-tighter whitespace-nowrap mix-blend-screen"
        >
          VERTEX
        </motion.h2>
      </div>

      {/* Central 3D Design Element */}
      <div className="relative z-10 w-full max-w-6xl aspect-video flex items-center justify-center">
        <motion.div
          style={{ 
            scale: imageScale,
            rotateZ: imageRotate,
          }}
          className="relative w-full h-full"
        >
          <Image 
            src="/assets/Trevdesign.png"
            alt="Vertex Design Elements"
            fill
            className="object-contain drop-shadow-[0_35px_35px_rgba(255,255,255,0.05)]"
            priority
          />
        </motion.div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-10 left-10 text-white/40 font-mono text-[10px] uppercase tracking-[0.5em] vertical-rl">
        Vertex / Design / 2026
      </div>
      
      <div className="absolute bottom-10 right-10 text-right">
        <p className="text-white/60 font-medium text-sm tracking-widest uppercase mb-2">Uranium 238™</p>
        <div className="w-24 h-px bg-white/20 ml-auto" />
      </div>

      {/* Bottom Large Text Mask Effect (As seen in design) */}
      <div className="absolute bottom-[-10%] w-full text-center">
        <h3 className="text-[12vw] font-black text-white/5 tracking-tighter leading-none">
          © VERTEX BY TREV
        </h3>
      </div>
    </section>
  );
}
