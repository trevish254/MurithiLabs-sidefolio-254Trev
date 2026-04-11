"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

const loadingTextStates = [
  "INITIALIZING ENVIRONMENT...",
  "LOADING ASSETS...",
  "PREPARING 3D MODELS...",
  "COMPILING SHADERS...",
  "ALMOST THERE...",
  "FINALIZING..."
];

export default function GlobalPreloader() {
  const { progress, active } = useProgress();
  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  useEffect(() => {
    // Mark as started once we see active loading to prevent premature clearing
    if (active) setHasStartedLoading(true);
  }, [active]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTextStates.length);
    }, 1500);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    // We add a min display time of 2 seconds to build anticipation even if from cache,
    // but we also wait until progress hits 100%. If it loads instantly from cache (progress = 100 right away), 
    // it will still show for 2 seconds.
    if ((progress === 100 && hasStartedLoading) || (progress === 100 && !active)) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress, active, hasStartedLoading]);

  // Failsafe timeout to ensure user is never stuck on loading screen
  useEffect(() => {
    const fallback = setTimeout(() => {
      setLoading(false);
    }, 12000); // Max wait time of 12 seconds
    return () => clearTimeout(fallback);
  }, []);

  // Prevent scroll while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#030303] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Subtle noise background */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-screen" 
            style={{
              backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")',
              backgroundRepeat: 'repeat',
              backgroundSize: '150px',
            }}
          />

          <div className="z-10 flex flex-col items-center gap-8 px-6">
            
            {/* Spinning Indicator */}
            <div className="relative w-16 h-16 flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-t-2 border-r-2 border-transparent border-t-white/80 rounded-full" 
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-2 border-b-2 border-l-2 border-transparent border-b-white/40 rounded-full" 
               />
               <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            
            {/* Rotating Text */}
            <div className="h-[20px] overflow-hidden relative w-64 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={textIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/60 text-[11px] uppercase tracking-[0.4em] font-bold absolute text-center w-full"
                >
                  {loadingTextStates[textIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-4 mt-4 w-full">
               <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden flex-1 rounded-full">
                 <motion.div 
                   className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                   initial={{ width: "0%" }}
                   animate={{ width: `${Math.max(progress, 2)}%` }}
                   transition={{ duration: 0.2 }}
                 />
               </div>
               <div className="text-white/40 text-[10px] font-mono tracking-widest w-8 text-right font-bold">
                 {Math.floor(progress)}%
               </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
