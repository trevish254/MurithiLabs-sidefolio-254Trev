"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

const loadingTextStates = [
  "INITIALIZING ENVIRONMENT...",
  "LOADING ASSETS...",
  "PREPARING 3D MODELS...",
  "COMPILING SHADERS...",
  "MOUNTING IMAGES...",
  "ALMOST THERE...",
  "FINALIZING...",
];

export default function GlobalPreloader() {
  const { progress: threeProgress, active: threeActive } = useProgress();

  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Track all real progress sources
  const hasThreeJS = useRef(false);
  const imageProgressRef = useRef(0);
  const threeProgressRef = useRef(0);
  const resolvedRef = useRef(false);

  // --- Text cycling ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTextStates.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // --- Track Three.js progress ---
  useEffect(() => {
    if (threeActive) hasThreeJS.current = true;
    threeProgressRef.current = threeProgress;
    recalc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threeProgress, threeActive]);

  // --- Track image progress ---
  useEffect(() => {
    // Small delay to allow images to be injected into the DOM by React
    const t = setTimeout(() => {
      const images = Array.from(document.images);

      if (images.length === 0) {
        imageProgressRef.current = 100;
        recalc();
        return;
      }

      let loaded = 0;
      const onLoad = () => {
        loaded++;
        imageProgressRef.current = Math.floor((loaded / images.length) * 100);
        recalc();
      };

      images.forEach((img) => {
        // Already loaded (cached or inline SVG)
        if (img.complete && img.naturalWidth > 0) {
          loaded++;
        } else {
          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onLoad, { once: true });
        }
      });

      // Seed the initial count for already-complete images
      imageProgressRef.current = Math.floor((loaded / images.length) * 100);
      recalc();
    }, 150);

    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Recalculate combined progress ---
  const recalc = () => {
    if (resolvedRef.current) return;

    let p = 0;
    if (hasThreeJS.current) {
      // 3D content present: weight 80% three + 20% images
      p = Math.floor(threeProgressRef.current * 0.8 + imageProgressRef.current * 0.2);
    } else {
      // No 3D content: purely image-based
      p = imageProgressRef.current;
    }

    setDisplayProgress((prev) => Math.max(prev, p));

    const threeDone = !hasThreeJS.current || threeProgressRef.current >= 100;
    const imagesDone = imageProgressRef.current >= 100;

    if (threeDone && imagesDone) {
      resolve();
    }
  };

  const resolve = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    setDisplayProgress(100);
    setTimeout(() => setLoading(false), 900);
  };

  // --- Hard fallback: never let user wait more than 10 seconds ---
  useEffect(() => {
    const fallback = setTimeout(resolve, 10000);
    return () => clearTimeout(fallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Lock body scroll while loading ---
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);

  // --- Simulated minimum forward progress so bar never appears frozen ---
  useEffect(() => {
    if (!loading) return;
    // Animate to at least 30% within 2s regardless of asset state (perceived progress)
    let sim = 0;
    const tick = setInterval(() => {
      sim = Math.min(sim + 2, 30);
      setDisplayProgress((prev) => (prev < sim ? sim : prev));
      if (sim >= 30) clearInterval(tick);
    }, 120);
    return () => clearInterval(tick);
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
          {/* Subtle noise overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-screen"
            style={{
              backgroundImage:
                'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")',
              backgroundRepeat: "repeat",
              backgroundSize: "150px",
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

            {/* Cycling text */}
            <div className="h-[20px] overflow-hidden relative w-64 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/60 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold absolute text-center w-full"
                >
                  {loadingTextStates[textIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-4 mt-4 w-full justify-center">
              <div className="w-48 md:w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  animate={{ width: `${displayProgress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <div className="text-white/40 text-[10px] font-mono tracking-widest w-10 text-right font-bold">
                {displayProgress}%
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
