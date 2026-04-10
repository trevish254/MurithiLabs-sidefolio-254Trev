"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-[10px] font-bold tracking-[0.2em] text-white/40 transition-colors hover:text-white uppercase"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 transition-colors hover:text-white">
    <Icon className="h-4 w-4" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-black p-8 font-sans md:p-12 border-b border-white/5',
        className
      )}
    >
      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 py-10">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-2 md:order-1 text-center md:text-left mt-12 md:mt-0"
        >
          <div className="mb-6 bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/5 hidden md:block">
            <span className="text-white text-[9px] font-bold uppercase tracking-widest">About Director</span>
          </div>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-zinc-400 md:mx-0 font-medium">{mainText}</p>
          <a href={readMoreLink} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group">
            <span className="border-b border-white/20 pb-0.5 group-hover:border-white transition-all">Read Full Story</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
               <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[260px] w-[260px] rounded-full bg-red-600 md:h-[360px] md:w-[360px] lg:h-[460px] lg:w-[460px] shadow-[0_0_100px_rgba(220,38,38,0.3)] border border-white/10"
            ></motion.div>
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto w-48 object-cover md:w-56 scale-150 lg:w-64"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/111111/ffffff?text=Trevor`;
                }}
            />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-6xl font-black text-white md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter uppercase whitespace-nowrap">
            {overlayText.part1}
            <br />
            <span className="text-zinc-500 italic font-medium">{overlayText.part2}</span>
          </h1>
        </motion.div>
      </div>

    </div>
  );
};
