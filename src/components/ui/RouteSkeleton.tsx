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
          {/* MINIMALIST ROUTE TRANSITION SCREEN */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-difference">
             <div className="w-16 h-16 border-t-2 border-white/50 border-r-2 border-transparent rounded-full animate-spin mb-8" />
             
             <div className="overflow-hidden h-6 relative flex items-center justify-center">
               <motion.span 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ duration: 0.4 }}
                 className="text-[10px] md:text-xs text-white/50 tracking-[0.5em] uppercase font-medium"
               >
                 LOADING INTERFACE
               </motion.span>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
