"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

/**
 * HIGH FIDELITY BLOG CARD V2 - FINAL PRECISION
 * Uses absolute positioning with exact percentage coordinates to avoid border overlap.
 */
export const BlogCardV2 = ({ blog, index }: BlogCardProps) => {
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block relative w-full overflow-hidden transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
      style={{ aspectRatio: "612 / 801" }}
    >
      {/* ── INDUSTRIAL CHASSIS (SVG BACKGROUND) ── */}
      <div className="absolute inset-0 z-0">
        <svg 
          viewBox="0 0 612 801" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-zinc-800 transition-all duration-500 group-hover:text-zinc-700"
        >
          {/* Main Outline */}
          <path d="M565.599 0.5H47.0122C44.3325 0.5 41.765 1.57545 39.8853 3.48522L3.37309 40.581C1.53192 42.4516 0.5 44.9711 0.5 47.5958V758.5C0.5 761.362 1.72623 764.086 3.86831 765.984L39.9847 797.985C41.8137 799.605 44.1727 800.5 46.6164 800.5H565.997C568.467 800.5 570.85 799.586 572.686 797.933L608.19 765.979C610.297 764.083 611.5 761.381 611.5 758.546V47.5501C611.5 44.9525 610.489 42.4569 608.682 40.5914L572.781 3.54121C570.897 1.5973 568.306 0.5 565.599 0.5Z" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>
          
          {/* Logo Zone Background */}
          <path d="M508.977 21.5H68.0231C66.0737 21.5 64.1668 22.0698 62.5369 23.1393L33.0138 42.512C30.1968 44.3605 28.5 47.5034 28.5 50.8728V95.7834C28.5 101.306 32.9771 105.783 38.5 105.783H135.48C138.699 105.783 141.722 107.333 143.6 109.947L175.507 154.337C177.386 156.95 180.408 158.5 183.627 158.5H284H401.174C404.223 158.5 407.106 157.109 409.003 154.722L444.901 109.561C446.798 107.174 449.68 105.783 452.729 105.783H538.5C544.023 105.783 548.5 101.306 548.5 95.7834V50.8728C548.5 47.5034 546.803 44.3605 543.986 42.512L514.463 23.1393C512.833 22.0698 510.926 21.5 508.977 21.5Z" fill="white" fillOpacity="0.02" stroke="currentColor" strokeOpacity="0.2"/>
          
          {/* Header Zone Outline */}
          <path d="M558.378 160.335L541.298 127.397C539.579 124.081 536.156 122 532.421 122H477.36C474.292 122 471.393 123.409 469.497 125.822L420.503 188.178C418.607 190.591 415.708 192 412.64 192H87.2215C84.5225 192 81.9381 193.091 80.0555 195.025L49.334 226.588C47.5168 228.455 46.5 230.958 46.5 233.563V266.437C46.5 269.042 47.5168 271.545 49.334 273.412L80.0555 304.975C81.9381 306.909 84.5225 308 87.2215 308H365.714C368.451 308 371.068 306.878 372.956 304.897L387.044 290.103C388.932 288.122 391.549 287 394.286 287H535.041C537.282 287 539.458 286.247 541.22 284.863L555.678 273.503C558.091 271.607 559.5 268.708 559.5 265.64V164.938C559.5 163.336 559.115 161.758 558.378 160.335Z" stroke="currentColor" strokeOpacity="0.2"/>
          
          {/* Image Zone Outline */}
          <path d="M368.061 325.234H88.7628C85.491 325.234 82.426 326.834 80.5564 329.519L65.2936 351.438C64.1259 353.115 63.5 355.109 63.5 357.152V580.858C63.5 582.404 63.8582 583.928 64.5464 585.312L80.7818 617.953C82.472 621.352 85.9401 623.5 89.7354 623.5H175.805C178.914 623.5 181.847 622.054 183.739 619.586L248.378 535.317C250.271 532.85 253.203 531.404 256.313 531.404H531.551C534.925 531.404 538.072 529.702 539.919 526.879L555.868 502.501C556.933 500.874 557.5 498.971 557.5 497.027V314.871C557.5 311.253 555.545 307.917 552.389 306.148L539.236 298.777C537.743 297.94 536.059 297.5 534.347 297.5H401.239C398.34 297.5 395.583 298.758 393.684 300.949L375.616 321.785C373.717 323.975 370.96 325.234 368.061 325.234Z" fill="black" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.2"/>
          
          {/* Context Zone Outline */}
          <path d="M42.9289 664.571L65.5711 641.929C67.4464 640.054 69.99 639 72.6421 639H208.092C211.188 639 214.109 637.566 216.002 635.117L267.998 567.883C269.891 565.434 272.812 564 275.908 564H556.781C559.769 564 562.6 565.336 564.5 567.643L580.219 586.731C581.694 588.521 582.5 590.768 582.5 593.088V760.493C582.5 763.065 581.509 765.538 579.734 767.398L564.455 783.405C562.568 785.382 559.954 786.5 557.221 786.5H386.489C383.07 786.5 379.888 784.753 378.053 781.869L369.947 769.131C368.112 766.247 364.93 764.5 361.511 764.5H276.706C273.17 764.5 269.896 766.368 268.097 769.413L260.903 781.587C259.104 784.632 255.83 786.5 252.294 786.5H71.9107C69.6994 786.5 67.5505 785.767 65.8001 784.416L43.8895 767.502C41.4365 765.609 40 762.685 40 759.587V671.642C40 668.99 41.0536 666.446 42.9289 664.571Z" stroke="currentColor" strokeOpacity="0.2"/>
        </svg>
      </div>

      {/* ── CONTENT LAYERS (Percentage Locked) ── */}
      <div className="absolute inset-0 z-10 text-white pointer-events-none font-mono">
        
        {/* LOGO AREA (y: 2.6% to 19.8%) */}
        <div className="absolute top-[6%] left-0 right-0 flex justify-center items-center h-[8%] px-12">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40">
              {blog.tags?.[0] || "TERMINAL"}
            </span>
            <div className="w-12 h-[1px] bg-white/10" />
          </div>
        </div>

        {/* HEADER AREA (y: 15.2% to 38.4%) - Reduced size to prevent leak */}
        <div className="absolute top-[21%] left-[10%] right-[10%] h-[15%] flex flex-col justify-center gap-1">
          <div className="flex justify-between items-end mb-1 border-b border-white/5 pb-1 opacity-50">
             <span className="text-[8px] text-white/40">FILE_REF: 0{index + 1}</span>
             <span className="text-[8px] text-white/40">DATE: {formattedDate.toUpperCase()}</span>
          </div>
          <h3 className="text-xs md:text-sm font-black leading-tight tracking-tight text-white group-hover:text-amber-400/90 transition-colors line-clamp-2 uppercase italic">
            {blog.title}
          </h3>
        </div>

        {/* IMAGE ZONE (y: 37.1% to 77.8%) */}
        <div className="absolute top-[42%] left-[11%] right-[11%] h-[32%] overflow-hidden">
          <div 
            className="absolute inset-0 bg-zinc-950 border border-white/5 overflow-hidden shadow-inner"
            style={{ 
              clipPath: "polygon(4% 0%, 96% 0%, 100% 10%, 100% 90%, 96% 100%, 4% 100%, 0% 90%, 0% 10%)" 
            }}
          >
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
          </div>
        </div>

        {/* CONTEXT AREA (y: 70.4% to 98.2%) */}
        <div className="absolute top-[77%] left-[12%] right-[12%] bottom-[5%] flex flex-col justify-between py-2">
          <p className="text-[10px] md:text-[11px] leading-snug text-white/60 group-hover:text-white/90 transition-colors line-clamp-3 font-medium">
            {blog.description}
          </p>
          
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/10">
            <span className="text-[8px] tracking-[0.2em] text-white/30 uppercase">
              {blog.readTime || "5 MIN"} READOUT
            </span>
            <div className="flex items-center gap-2 group-hover:translate-x-1 transition-all duration-300">
               <span className="text-[8px] font-black text-white/20 group-hover:text-white/60">ACCESS_FULL</span>
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-20 group-hover:opacity-80">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY EFFECTS */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      {/* SCANLINES */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.02] group-hover:opacity-[0.04] transition-all"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)",
        }}
      />
    </Link>
  );
};
