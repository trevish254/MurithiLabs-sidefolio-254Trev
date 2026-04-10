"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CalSans = localFont({
  src: [{ path: "../../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
});


export default function StoryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  const listItems = [
    { title: "Generative AI Systems", number: "01" },
    { title: "AI-Assisted Development", number: "02" },
    { title: "Custom LoRA Training", number: "03" },
    { title: "Advanced Prompt Engineering", number: "04" },
    { title: "Intelligent Systems Architecture", number: "05" },
    { title: "Humanoid Workflow Design", number: "06" },
  ];

  useEffect(() => {
    if (!containerRef.current || !rightSideRef.current) return;

    // Register plugin inside useEffect to be safe with Next.js SSR/Hydration
    gsap.registerPlugin(ScrollTrigger);

    const scroller = document.querySelector("#main-scroll");
    if (!scroller) {
      console.warn("StoryHero: Scroller #main-scroll not found yet.");
      return;
    }

    const ctx = gsap.context(() => {
      // ── ACCURATE SCROLL CALCULATION ──
      const rightContentHeight = rightSideRef.current!.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate exactly how much we need to scroll to finish the text narrative
      // We stop when the content has moved up by its height minus a small offset
      const scrollDistance = Math.max(0, rightContentHeight - (windowHeight * 0.4));

      ScrollTrigger.create({
        trigger: containerRef.current,
        scroller: scroller,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: true,
        pinSpacing: true,
        animation: gsap.to(rightSideRef.current, {
           y: -scrollDistance,
           ease: "none",
        }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col md:flex-row px-6 md:px-16 lg:px-24 z-10"
    >
      
      {/* ── LEFT SIDE: PINNED BACKGROUND NUMBER ── */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[45%] flex items-center justify-center select-none pointer-events-none z-0">
        <h1 className={twMerge(
           CalSans.className,
           "text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] leading-[0.8] text-white/[0.08] font-bold tracking-tighter"
        )}>
          01
        </h1>
      </div>

      {/* ── RIGHT SIDE: SCROLLING CONTENT ── */}
      <div className="relative z-10 w-full h-full ml-auto md:w-[45%] flex flex-col items-start pt-[35vh] md:pt-[50vh]">
        
        {/* ANIMATED INNER BOX */}
        <div ref={rightSideRef} className="w-full max-w-lg space-y-12 pb-10">
          
          <div className="space-y-4">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-black uppercase leading-[1.2] tracking-tight">
               Designing the future with <br className="hidden lg:block"/>
               <span className="text-white">intelligent</span> creative systems
            </h2>

            <p className="text-neutral-500 text-xs md:text-sm font-normal leading-relaxed max-w-md">
              I use AI as a creative amplifier—building custom tools, producing on-brand imagery, 
              training custom LoRAs, and designing automated workflows that accelerate output. 
              Across image, video, audio, copy, and code, AI removes the friction once inherent 
              in ideation and iteration, enabling faster exploration, broader experimentation, 
              and more fully realized creative ideas.
            </p>
          </div>

          {/* CAPABILITIES LIST */}
          <div className="space-y-4">
             <p className="text-neutral-600 text-[8px] uppercase tracking-[0.4em] font-black">Capabilities</p>
             <div className="w-full border-t border-neutral-800/40">
               {listItems.map((item, index) => (
                 <div
                   key={item.title}
                   className="group flex items-center justify-between py-4 border-b border-neutral-800/40 cursor-pointer overflow-hidden"
                 >
                   <span className="text-base md:text-lg font-bold text-neutral-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                     {item.title}
                   </span>
                   <span className="text-sm text-neutral-700 font-mono tracking-widest group-hover:text-neutral-400 transition-colors duration-300">
                     {item.number}
                   </span>
                 </div>
               ))}
             </div>
          </div>

          {/* EXTRA SECTIONS */}
          <div className="pt-4 space-y-6">
             <div className="h-[1px] w-6 bg-white/10" />
             <div className="space-y-3">
                <h3 className="text-sm md:text-base font-bold uppercase text-neutral-400">The Modern Workflow</h3>
                <p className="text-neutral-600 text-xs leading-relaxed max-w-sm">
                  Intelligent systems require more than just models. We build the interfaces and 
                  abstractions that bridge the gap between creative intent and machine execution. 
                  Every pixel is considered; every token is optimized.
                </p>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-white/5 rounded-lg border border-white/5 flex flex-col justify-end p-3">
                    <span className="text-[8px] uppercase text-neutral-700 font-bold mb-1">Systems built</span>
                    <span className="text-base font-bold">24+</span>
                </div>
                <div className="h-20 bg-white/5 rounded-lg border border-white/5 flex flex-col justify-end p-3">
                    <span className="text-[8px] uppercase text-neutral-700 font-bold mb-1">Efficiency Gain</span>
                    <span className="text-base font-bold">140%</span>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* ── FIXED SIDEBAR TAB ── */}
      <div className="invisible md:visible fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center bg-white text-black py-10 px-5 border-y border-l border-neutral-200 shadow-2xl">
        <span className="font-extrabold text-2xl mb-12 tracking-tighter">w.</span>
        <div className="rotate-180 [writing-mode:vertical-lr]">
          <span className="text-[12px] uppercase tracking-[0.4em] font-black opacity-80">Honors</span>
        </div>
      </div>

    </section>
  );
}
