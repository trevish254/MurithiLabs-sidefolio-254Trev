"use client";
import React from "react";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { Footer } from "@/components/Footer";
import { MessageSquare, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import LayoutPreloader from "@/components/ui/LayoutPreloader";

const dancing = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

export default function ExplorePage() {
  return (
    <div className="w-full bg-black min-h-screen relative font-sans text-white">
      
      {/* ═══════════════════════ CINEMATIC NOISE HERO SECTION ═══════════════════════ */}
      <LayoutPreloader />

      {/* ═══════════════════════ ORIGINAL METRICS SECTION ═══════════════════════ */}
      <section className="relative w-full px-6 py-32 bg-black overflow-hidden border-b border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          <div className="mb-20 bg-zinc-900 px-6 py-2 rounded-full border border-white/10">
            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Experience & Impact</span>
          </div>

          <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
            {/* Left Stats */}
            <div className="flex flex-col space-y-20 flex-1 md:text-left text-center">
              <div className="border-b border-white/5 pb-8">
                <span className="block text-white text-6xl md:text-8xl font-thin tracking-tighter">07</span>
                <span className="block text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2 uppercase">Years of Exp.</span>
              </div>
              <div className="pt-4">
                <span className="block text-white text-6xl md:text-8xl font-thin tracking-tighter">120+</span>
                <span className="block text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2">Total Projects</span>
              </div>
            </div>

            {/* Central Portrait */}
            <div className="relative flex justify-center items-center z-10 flex-1">
              <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-2 border-white bg-gradient-to-b from-orange-500 to-red-600 shadow-2xl">
                <Image
                  src="/trevor-real.png"
                  alt="Trevor Murithi"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Download CV Badge — Wavy/Round look */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20">
                <div className="relative w-32 h-32 md:w-36 md:h-36 bg-white rounded-full flex flex-col items-center justify-center border-2 border-black/5 shadow-2xl group cursor-pointer hover:bg-black hover:text-white transition-all duration-300">
                  <span className="text-[10px] font-black uppercase text-center leading-tight mb-1 text-black group-hover:text-white">DOWNLOAD<br/>MY CV</span>
                  <div className="w-1 h-3 bg-black group-hover:bg-white mt-2" />
                </div>
              </div>
            </div>

            {/* Right Stats */}
            <div className="flex flex-col space-y-20 flex-1 md:text-right text-center">
              <div className="border-b border-white/5 pb-8 text-right">
                <div className="flex items-center justify-center md:justify-end gap-1 mb-2">
                   {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-500 text-[10px]">★</span>)}
                </div>
                <span className="block text-white text-6xl md:text-8xl font-thin tracking-tighter">5.00</span>
                <span className="block text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2">70+ Ratings</span>
              </div>
              <div className="pt-4">
                <span className="block text-white text-6xl md:text-8xl font-thin tracking-tighter">03</span>
                <span className="block text-zinc-500 text-sm font-bold uppercase tracking-widest mt-2">Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content / Vision */}
      <div className="py-32 border-b border-white/5 flex flex-col items-center">
          <div className="max-w-3xl text-center">
             <h3 className="text-white text-3xl font-bold tracking-tight mb-8 uppercase">Directing Digital Innovation</h3>
             <p className="text-zinc-400 text-lg leading-relaxed">
                As a Systems Builder and Lead Developer at Murithi Labs, I specialize in transforming complex business requirements 
                into sleek, high-performance digital products. My approach combines the structural integrity of advanced backend architecture 
                with the expressive precision of 3D-driven web interfaces.
             </p>
          </div>
      </div>

      <div className="bg-black">
        <Footer />
      </div>

      {/* Chat bubble */}
      <div className="fixed bottom-8 right-8 w-14 h-14 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-800 group transition z-50 shadow-2xl">
        <MessageSquare className="text-white w-6 h-6" />
      </div>

    </div>
  );
}
