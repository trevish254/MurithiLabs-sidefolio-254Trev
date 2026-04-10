"use client";
import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Triangle, Circle, Square } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMobileNav } from "@/context/MobileNavContext";

export const Navbar = () => {
  const pathname = usePathname();
  const { toggleSidebar } = useMobileNav();

  // Prevention of hydration mismatch for the live clock
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-GB", { hour12: false });
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-[100] w-full bg-transparent px-12 py-8 pointer-events-auto select-none">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start max-w-[1400px]">
        
        {/* Column 1: Repertoire */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white rotate-[-45deg]" />
            <span className="text-sm font-medium tracking-tight">Repertoire</span>
          </div>
          <div className="flex flex-col space-y-2 pl-4">
            <Link href="/projects" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">Works</Link>
            <Link href="/insights" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">Insights</Link>
          </div>
        </div>

        {/* Column 2: Narrative */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-2.5 h-2.5 rounded-full border border-white" />
            <span className="text-sm font-medium tracking-tight">Narrative</span>
          </div>
          <div className="flex flex-col space-y-2 pl-4">
            <Link href="/about" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">About</Link>
            <Link href="/explore" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all italic">Explore</Link>
            <Link href="/story" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">Brand story</Link>
            <Link href="/contact" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">Connect</Link>
          </div>
        </div>

        {/* Column 3: Liaison */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-2.5 h-2.5 border border-white" />
            <span className="text-sm font-medium tracking-tight">Liaison</span>
          </div>
          <div className="flex flex-col space-y-2 pl-4">
            <Link href="/brands" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">For Brands</Link>
            <Link href="/agencies" className="text-xs text-white/90 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">For Agencies</Link>
          </div>
        </div>

        {/* Column 4: Metadata (Clock) */}
        <div className="flex flex-col items-end justify-start space-y-1">
          <div className="px-2 py-0.5 border border-white/40 rounded-sm min-w-[65px] flex justify-center">
            <span className="text-[10px] font-mono text-white/80 tabular-nums">
              {mounted ? formatTime(time) : "--:--:--"}
            </span>
          </div>
          <div className="flex flex-col items-end mr-1">
            <span className="text-[9px] text-white/40 uppercase tracking-widest leading-tight">CET</span>
            <span className="text-[9px] text-white/40 uppercase tracking-widest leading-tight">ENS</span>
          </div>
        </div>

      </div>
    </div>
  );
};

