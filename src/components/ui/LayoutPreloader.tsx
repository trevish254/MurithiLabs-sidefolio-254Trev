"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LayoutPreloader({ children }: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return p + Math.floor(Math.random() * 15);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0">
        <video
          src="/assets/hero section video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette/darkening to ensure text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* NOISE OVERLAY */}
      <div 
         className="pointer-events-none absolute -inset-[100%] opacity-[0.05] z-[100] mix-blend-screen" 
         style={{
           backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")',
           animation: "noise-animation 0.8s steps(4) infinite"
         }}
      />
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-8"
          >
             <div className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                 <Sparkles className="w-3 h-3 text-white/70" />
                 Loading Identity
             </div>
             <div className="text-[100px] md:text-[180px] font-black text-white leading-none tracking-tighter mix-blend-difference">
                {Math.min(progress, 100)}<span className="text-white/30 text-[40px] md:text-[80px]">.</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center p-8 lg:p-12 justify-between pt-32 lg:pt-0">
         {/* LEFT / TYPOGRAPHY */}
          <motion.div 
             initial={{ opacity: 0, y: 50 }} 
             animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
             transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="max-w-xl flex flex-col gap-6 w-full"
          >
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                PIONEERING <br /> <span className="text-white/40 italic font-serif font-light tracking-normal">AESTHETICS</span>
             </h1>
             <p className="text-white/50 max-w-sm text-sm md:text-base font-light leading-relaxed mt-4">
               Crafting cinematic, extremely high-fidelity digital experiences bridging the gap between structural layouts and premium responsive 3D motion design.
             </p>
             <button className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded-none w-fit text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300 mt-8 group active:scale-95">
                 <span>Explore My Process</span>
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>

          {/* RIGHT / VISUAL */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
             animate={!loading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
             transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="relative w-full max-w-[400px] aspect-[3/4] overflow-hidden mt-12 md:mt-0 shadow-2xl border border-white/5"
          >
             <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" alt="Abstract aesthetic layout" className="object-cover w-full h-full grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-700 ease-in-out" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
             <div className="absolute bottom-6 left-6 flex items-center justify-between right-6 text-white text-[10px] uppercase font-black tracking-widest leading-none">
                <span className="opacity-50">Volume 1</span>
                <span>Spatial Dynamics</span>
             </div>
          </motion.div>
      </div>
      
      {children}
    </div>
  );
}
