"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const loadingTextStates = [
  "INITIALIZING ENVIRONMENT...",
  "LOADING ASSETS...",
  "PREPARING 3D MODELS...",
  "COMPILING SHADERS...",
  "MOUNTING IMAGES...",
  "ALMOST THERE...",
  "FINALIZING..."
];

export default function GlobalPreloader() {
  const { progress: threeProgress, active: threeActive } = useProgress();
  const pathname = usePathname();
  
  const [loading, setLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  // Trigger preloader open on route changes
  useEffect(() => {
    setLoading(true);
    setImageProgress(0);
    setTotalProgress(0);
    setHasStartedLoading(false);
    
    // Cycle text
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTextStates.length);
    }, 1000);

    return () => clearInterval(textInterval);
  }, [pathname]);

  useEffect(() => {
    if (threeActive) setHasStartedLoading(true);
  }, [threeActive]);

  // Monitor DOM Images tracking
  useEffect(() => {
    if (!loading) return;

    // Wait a brief moment for images to inject into DOM
    const mountWait = setTimeout(() => {
      const images = Array.from(document.images);
      if (images.length === 0) {
        setImageProgress(100);
        return;
      }
      
      let loaded = 0;
      const countImage = () => {
        loaded++;
        setImageProgress(Math.floor((loaded / images.length) * 100));
      };

      images.forEach((img) => {
        if (img.complete) {
          countImage();
        } else {
          img.addEventListener('load', countImage, { once: true });
          img.addEventListener('error', countImage, { once: true });
        }
      });
    }, 200);

    return () => clearTimeout(mountWait);
  }, [loading, pathname]);

  // Calculate Combined Progress
  useEffect(() => {
     let calcProgress = 0;
     if (hasStartedLoading || threeActive) {
       // If 3D models exist on page, they take priority weight
       calcProgress = Math.floor(((threeActive ? threeProgress : 100) * 0.8) + (imageProgress * 0.2));
     } else {
       // Otherwise (like on About/Story pages), purely rely on image loading
       calcProgress = imageProgress;
     }
     
     setTotalProgress(Math.max(calcProgress, totalProgress)); // prevents shrinking
  }, [threeProgress, threeActive, imageProgress, hasStartedLoading, totalProgress]);

  // Finalize when everything is done
  useEffect(() => {
    // Determine condition for "100%"
    // Either (ThreeJS reaches 100% OR wasn't active) AND (Images reach 100%)
    const threeDone = (threeProgress === 100 && hasStartedLoading) || (!threeActive && !hasStartedLoading);
    const imagesDone = imageProgress === 100;

    if (threeDone && imagesDone && loading) {
      // Small timeout to show completed state
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [threeProgress, threeActive, hasStartedLoading, imageProgress, loading]);

  // Failsafe timeout to ensure user is never stuck
  useEffect(() => {
    if (!loading) return;
    const fallback = setTimeout(() => {
      setLoading(false);
    }, 12000); // 12 seconds max
    return () => clearTimeout(fallback);
  }, [loading, pathname]);

  // Handle body scroll
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
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
                   initial={{ width: "0%" }}
                   animate={{ width: `${Math.max(totalProgress, 2)}%` }}
                   transition={{ duration: 0.2 }}
                 />
               </div>
               <div className="text-white/40 text-[10px] font-mono tracking-widest w-10 text-right font-bold">
                 {totalProgress}%
               </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
