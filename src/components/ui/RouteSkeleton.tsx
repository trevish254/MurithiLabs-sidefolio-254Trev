"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RouteSkeleton() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    // We don't want this skeleton to run on the very first mount of the app, 
    // because GlobalPreloader handles the initial visit (Home Page).
    // We only want this to run on SUBSEQUENT cross-page navigations.
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    // Don't show skeleton when routing back to home page, since Home has its own logic
    // or if we just want it everywhere... let's trigger it everywhere except Home on subsequent loads.
    if (pathname === "/") return;

    setLoading(true);

    const checkImages = () => {
      const images = Array.from(document.querySelectorAll("img"));
      if (images.length === 0) {
        setLoading(false);
        return;
      }
      
      let loadedCount = 0;
      const countImage = () => {
        loadedCount++;
        if (loadedCount >= images.length) {
          // Add a tiny delay to allow CSS layouts to stabilize
          setTimeout(() => setLoading(false), 800);
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          countImage();
        } else {
          img.addEventListener('load', countImage, { once: true });
          img.addEventListener('error', countImage, { once: true });
        }
      });
    };

    // Give the DOM a split second to mount the new route's elements before querying images
    const domMountWait = setTimeout(checkImages, 150);

    // Failsafe: max 5 seconds of skeleton
    const failsafe = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(domMountWait);
      clearTimeout(failsafe);
    };
  }, [pathname, isInitialMount]);

  // Handle body scroll
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="route-skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99990] bg-black overflow-hidden pointer-events-auto flex flex-col pt-32 px-10 md:px-24 pb-32"
        >
          {/* HEADER SKELETON */}
          <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto mb-20 md:mb-32">
            <motion.div 
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[85%] md:w-3/4 h-16 md:h-28 bg-white/5 rounded-md"
            />
            <motion.div 
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="w-[60%] md:w-1/2 h-6 md:h-10 bg-white/5 rounded-md"
            />
            <motion.div 
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="w-1/3 h-4 md:h-5 bg-white/5 rounded-sm mt-6"
            />
          </div>

          {/* CONTENT SKELETON: MAPPING CARDS & VISUAL SECTIONS */}
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
             
             {/* LEFT / HERO IMAGE SKELETON */}
             <motion.div 
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                className="w-full md:w-1/2 aspect-square md:aspect-[4/5] bg-white/[0.03] rounded-xl shadow-2xl border border-white/5 overflow-hidden relative"
             >
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
                 <div className="absolute bottom-10 left-10 flex flex-col gap-3 w-1/2">
                    <div className="h-4 w-full bg-white/10 rounded-sm" />
                    <div className="h-4 w-2/3 bg-white/10 rounded-sm" />
                 </div>
             </motion.div>

             {/* RIGHT / ARCHITECTURAL TEXT & CARDS SKELETON */}
             <div className="w-full md:w-1/2 flex flex-col gap-10 py-4 md:py-10">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 + (i * 0.15) }}
                    className="w-full flex gap-8 items-start border-b border-white/5 pb-10"
                  >
                      {/* Decorative Tech Node Block */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-white/[0.03] flex-shrink-0 border border-white/5" />
                      
                      {/* Typographic Wireframes */}
                      <div className="flex flex-col gap-4 w-full pt-1">
                         <div className="w-3/4 h-6 md:h-8 bg-white/5 rounded-sm" />
                         <div className="w-full flex flex-col gap-2 mt-2">
                            <div className="w-full h-3 bg-white/5 rounded-sm" />
                            <div className="w-[90%] h-3 bg-white/5 rounded-sm" />
                            <div className="w-[60%] h-3 bg-white/5 rounded-sm" />
                         </div>
                      </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
