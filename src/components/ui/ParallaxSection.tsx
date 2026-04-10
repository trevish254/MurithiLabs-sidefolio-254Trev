"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  zIndex?: number;
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  zIndex = 1,
  className = "",
  id,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disabled aggressive GSAP pinning to prevent global document height collapse.
    // Native document vertical flow is restored, fully enabling the Framer Motion transitions 
    // inside the sections independently without overlapping footer bugs.
  }, []);

  return (
    <div 
      ref={sectionRef} 
      id={id}
      className={`sticky top-0 w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center ${className}`} 
      style={{ zIndex }}
    >
      {/* Dynamic top shadow to create depth when this section slides OVER the pinned one beneath it */}
      {zIndex > 10 && (
         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[100]" />
      )}
      {children}
    </div>
  );
}
