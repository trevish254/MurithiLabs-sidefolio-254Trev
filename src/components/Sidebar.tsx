'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileNav } from '@/context/MobileNavContext';
import { useFocus } from '@/context/FocusContext';
import {
  Home, ShoppingBag, Box, FileText, Youtube, Rss, Mail, 
  Heart, Palette, Video, Library, ChevronRight, User,
  PanelLeftClose, PanelLeftOpen, X
} from 'lucide-react';

type NavItem = {
  href?: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: 'new' | 'beta';
  chevron?: boolean;
};

const PLATFORM: NavItem[] = [
  { href: '/',             label: 'Home',             icon: Home     },
  { href: '/story',        label: 'The Story',        icon: Library, badge: 'New', badgeVariant: 'new' },
  { href: '/explore',      label: 'Explore',          icon: Box      },
  { href: '/about',        label: 'About',            icon: FileText },
  { href: '/store',        label: 'Store',            icon: ShoppingBag, chevron: true },
  { href: '/chapabiz',     label: 'Chapabiz',         icon: Box,     badge: 'New', badgeVariant: 'new' },
  { href: '/license',      label: 'License Terms',    icon: FileText },
  { href: '/3d-experiences', label: '3D Web Experiences', icon: Youtube },
  { href: '/blog',         label: 'Blogs',            icon: Rss      },
  { href: '/contact',      label: 'Contact',          icon: Mail     },
];
import { SidebarChassis } from './SidebarChassis';

const NAV_PLATFORM = [
  { href: '/',             label: 'Home',               icon: Home,           top: '34.11%' },
  { href: '/story',        label: 'The Story',          icon: Library,        top: '37.71%' },
  { href: '/explore',      label: 'Explore',            icon: Box,            top: '41.68%' },
  { href: '/about',        label: 'About',              icon: FileText,       top: '45.28%' },
  { href: '/store',        label: 'Store',              icon: ShoppingBag,    top: '49.37%' },
  { href: '/chapabiz',     label: 'Chapabiz',           icon: Box,            top: '52.97%' },
  { href: '/license',      label: 'License terms',      icon: FileText,       top: '56.57%' },
  { href: '/3d-experiences', label: '3D web experiences', icon: Youtube,      top: '61.04%' },
];

const NAV_BLOGS_CONTACT = [
  { href: '/blog',         label: 'Blogs',              icon: Rss,            top: '70.96%' },
  { href: '/contact',      label: 'Contact',            icon: Mail,           top: '75.06%' },
];

const NAV_SERVICES = [
  { href: '/sponsorship',  label: 'Sponsorship',        icon: Heart,          top: '84.61%' },
  { href: '/design',       label: 'Design Services',    icon: Palette,        top: '88.70%' },
  { href: '/animated-intro',label: 'Animated Intro',    icon: Video,          top: '92.80%' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useMobileNav();
  const { setFocusedArea, focusedArea } = useFocus();

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div 
      onMouseEnter={() => !isMobile && setFocusedArea('sidebar')}
      onMouseLeave={() => !isMobile && setFocusedArea(null)}
      className={`h-full sticky top-0 flex flex-col justify-start items-center pt-8 pb-4 overflow-hidden 
        ${isMobile ? 'w-full px-4' : 'w-[280px] shrink-0 px-2 max-h-screen'}
        ${focusedArea === 'content' && !isMobile ? 'opacity-40 blur-[2px] transition-all duration-700' : 'transition-all duration-700'}
      `}
    >
      {/* ── FORCE ASPECT RATIO CONTAINER BASED ON 556x806 SVG ── */}
      <div 
        className="relative w-full aspect-[556/806] max-h-[95vh] max-w-[556px] mx-auto flex-shrink-0 group"
        style={{ containerType: 'inline-size' }}
      >
        
        {/* The SVG Base */}
        <SidebarChassis className="absolute inset-0 w-full h-full text-white/20 transition-all duration-500 group-hover:text-[#BFA05A]/40" />

        {/* ── MENUS POSITIONED ABSOLUTELY OVER THE SVG PATHS ── */}

        {/* 1. Top Left Panel - Logo */}
        <div className="absolute top-[4.5%] left-[8%] w-[35%] h-[20%] flex flex-col items-center justify-center p-2">
           <Link href="/" className="block transition-transform duration-500 hover:scale-105 hover:glow-yellow rounded-xl w-[80%]">
             <Image 
               src="/murithi-labs-logo.webp" 
               alt="Logo" 
               width={160} 
               height={40} 
               className="object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 w-full" 
             />
           </Link>
        </div>

        {/* 2. Top Right Panel - User Profile */}
        <div className="absolute top-[4.5%] right-[7%] w-[33%] h-[20%] flex flex-col items-center justify-center p-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer group/profile">
           
           {/* Avatar Node */}
           <div 
             className="relative rounded-full border border-[#BFA05A]/40 flex items-center justify-center mb-[2cqw] bg-[#050505] group-hover/profile:border-[#BFA05A] transition-all duration-300 shadow-[0_0_10px_rgba(191,160,90,0.1)]"
             style={{ width: '10cqw', height: '10cqw' }}
           >
              <User style={{ width: '4.5cqw', height: '4.5cqw' }} className="text-[#BFA05A]/70 group-hover/profile:text-[#BFA05A] transition-colors" />
              
              {/* Live Status Light */}
              <div 
                className="absolute bottom-0 right-[2%] rounded-full bg-green-500 animate-pulse border-[1px] border-black glow-green" 
                style={{ width: '2.5cqw', height: '2.5cqw' }} 
              />
           </div>

           {/* User Meta Data */}
           <span className="text-white font-black uppercase tracking-[0.1em] group-hover/profile:text-[#BFA05A] transition-colors duration-300" style={{ fontSize: 'clamp(6px, 2.2cqw, 14px)' }}>
             Trevor
           </span>
           <span className="text-[#888] font-bold uppercase tracking-widest mt-[0.5cqw]" style={{ fontSize: 'clamp(4px, 1.3cqw, 10px)' }}>
             Admin Online
           </span>
        </div>

        {/* 3. Global Navigation Links Array */}
        {[...NAV_PLATFORM, ...NAV_BLOGS_CONTACT, ...NAV_SERVICES].map((item, i) => (
          <Link 
            key={i} 
            href={item.href}
            style={{ 
              top: item.top, 
              fontSize: 'clamp(8px, 2.7cqw, 14px)' 
            }}
            className={`absolute left-[15.6%] flex items-center transition-all duration-300 group/link
              ${pathname === item.href ? 'text-[#BFA05A] font-bold drop-shadow-[0_0_8px_rgba(191,160,90,0.8)]' : 'text-neutral-400 hover:text-white'}
            `}
          >
            {/* The Icon (Pulled to the left so text baseline stays identical) */}
            <span className={`absolute right-full flex items-center transition-all duration-500
              ${pathname === item.href ? 'opacity-100 scale-110 text-[#BFA05A]' : 'opacity-40 group-hover/link:opacity-100 group-hover/link:scale-110'}
            `} style={{ marginRight: '1.5cqw' }}>
               <item.icon style={{ width: '3cqw', height: '3cqw' }} />
            </span>
            
            <span>{item.label}</span>
          </Link>
        ))}

      </div>

      {/* ── MIDDLE INFINITE SCROLLING TICKER ── */}
      <div className="w-full my-auto py-4 relative flex overflow-hidden opacity-80" style={{ maskImage: 'linear-gradient(to right, transparent 0, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)' }}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap w-max"
        >
          {/* Duplicate exactly twice to allow the -50% translation to trigger a completely invisible loop jump */}
          {[...Array(2)].map((_, i) => (
             <div key={i} className="flex whitespace-nowrap">
                {[
                  "Branding", "Web Design", "Web Development", 
                  "3D Design", "Creative Direction", "VFX"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-[#BFA05A] text-[clamp(8px,1cqw,12px)] uppercase font-black tracking-widest opacity-60">
                      {item}
                    </span>
                    <span className="mx-4 text-white/20 text-[8px]">•</span>
                  </div>
                ))}
             </div>
          ))}
        </motion.div>
      </div>

      {/* ── BOTTOM TERMINAL VIDEO FEED ── */}
      <div className="w-full mt-auto relative rounded-xl overflow-hidden border border-white/5 bg-[#050505] shadow-[0_0_15px_rgba(0,0,0,0.5)] group/video cursor-pointer">
        <video
          src="/assets/hero section video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover aspect-[4/3] sm:aspect-video opacity-60 group-hover/video:opacity-100 transition-opacity duration-700"
        />
        
        {/* Authentic Cyberdeck Overlays */}
        <div className="absolute inset-0 border border-[#BFA05A]/20 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />
        <div className="absolute w-full h-[1px] bg-white/10 animate-scanline pointer-events-none z-20" />
        
        {/* Internal HUD Elements */}
        <div className="absolute top-2 left-2 z-20 px-1.5 py-0.5 bg-black/60 rounded backdrop-blur-sm border border-white/10 flex items-center gap-1 opacity-50 group-hover/video:opacity-100 transition-opacity duration-300">
           <span className="text-[#BFA05A] text-[6px] uppercase tracking-widest font-black">FEED-01</span>
        </div>
        
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-1.5 py-0.5 bg-black/60 rounded backdrop-blur-sm border border-white/10 opacity-70 group-hover/video:opacity-100 transition-opacity duration-300">
          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse drop-shadow-[0_0_3px_rgba(239,68,68,1)]" />
          <span className="text-red-500 text-[6px] uppercase tracking-widest font-bold">REC</span>
        </div>
        
        <div className="absolute bottom-2 left-2 z-20 w-fit">
           <span className="text-white/60 text-[5px] uppercase tracking-[0.2em] font-mono mix-blend-screen inline-block animate-pulse">Data Stream active...</span>
        </div>
      </div>

    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSidebar} className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[1000] lg:hidden" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30 }} className="fixed inset-y-0 left-0 z-[1001] lg:hidden w-[85%] max-w-[400px] h-full bg-[#0a0a0a] border-r border-[#1a1a1a]">
              <SidebarContent isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden lg:flex sticky top-0 left-0 h-screen z-50 bg-[#050505]">
        <SidebarContent />
      </div>
    </>
  );
};

