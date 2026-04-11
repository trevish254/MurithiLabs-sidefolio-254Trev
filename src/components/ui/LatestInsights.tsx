"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const insights = [
  {
    title: "When is it time for a Rebrand?",
    meta: "4m read-time. Mon 9 March '26",
    author: "Author: Ravi Klaassens",
    image: "/rebrand_insight_preview.webp",
  },
  {
    title: "Process of a R-K project",
    meta: "3m read-time. Fri 20 February '26",
    author: "Author: Ravi Klaassens",
    image: "/process_insight_preview.webp",
  },
  {
    title: "Presence as a brand cornerstone",
    meta: "3m read-time. Fri 9 January '26",
    author: "Author: Ravi Klaassens",
    image: "/prop_films_close_up.webp",
  },
  {
    title: "Creation of the R—K brand",
    meta: "5m read-time. Fri 5 December '25",
    author: "Author: Ravi Klaassens",
    image: "/luxury_bags_web_dev.webp",
  },
];

export default function LatestInsights() {
  const bgCards = [...insights, ...insights]; // Double for seamless loop

  return (
    <section className="bg-black px-0 py-0 relative overflow-hidden border-t border-white/5">
      {/* Animated Background Cards Layer */}
      <div className="absolute top-0 left-0 right-0 h-[350px] overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [0, -1400] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-8 items-center h-full pt-12 whitespace-nowrap pl-0 text-white"
        >
          {bgCards.map((card, i) => (
            <div key={i} className="min-w-[300px] h-full flex flex-col grayscale-0 opacity-80">
              <div className="relative aspect-[16/9] w-full mb-4 opacity-70">
                <Image src={card.image} alt="bg" fill className="object-cover rounded-sm" />
              </div>
              <div className="space-y-1 px-1">
                <div className="h-2 w-32 bg-white/20 rounded-full" />
                <div className="h-2 w-20 bg-white/10 rounded-full" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-20 relative z-10">
        {/* Header Text */}
        <div className="mb-0 md:ml-[30%]">
          <h2 className="text-white text-2xl md:text-3xl font-medium leading-tight tracking-tight">
            Recent <span className="italic font-serif text-white/90">Insights & News</span>
          </h2>
          <p className="text-white/40 text-base font-medium max-w-sm mt-4">
             A collection of thoughts, research, and explorations into the future of digital architecture.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full h-[700px] border-t border-white/10 relative z-10">
        {insights.map((insight, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-1 flex flex-col group cursor-pointer border-r border-white/5 last:border-r-0 relative overflow-hidden"
          >
            {/* Full-Height Image */}
            <div className="absolute inset-0 z-0">
               <Image 
                 src={insight.image}
                 alt={insight.title}
                 fill
                 className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                 priority
               />
            </div>

            {/* Bottom Label Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500">
               <div className="space-y-4">
                 <h3 className="text-white text-lg font-medium leading-tight">
                   + {insight.title}
                 </h3>
                 <div className="space-y-0.5">
                   <p className="text-white/60 text-[11px] font-medium uppercase tracking-tight">
                     {insight.meta}
                   </p>
                   <p className="text-white/60 text-[11px] font-medium uppercase tracking-tight">
                     {insight.author}
                   </p>
                 </div>
               </div>
            </div>

            {/* Default State Labels (Visible when not hovered) */}
            <div className="absolute bottom-6 left-0 right-0 p-6 z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
               <div className="space-y-4">
                 <h3 className="text-white text-lg font-bold leading-tight drop-shadow-2xl">
                   + {insight.title}
                 </h3>
                 <div className="space-y-0.5">
                   <p className="text-white/80 text-[11px] font-bold uppercase tracking-tight drop-shadow-lg">
                     {insight.meta}
                   </p>
                   <p className="text-white/80 text-[11px] font-bold uppercase tracking-tight drop-shadow-lg">
                     {insight.author}
                   </p>
                 </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
