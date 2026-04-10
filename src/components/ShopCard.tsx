"use client";
import React from "react";
import Image from "next/image";
import { ShoppingBag, ChevronRight } from "lucide-react";

interface ShopCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category?: string;
    stockStatus?: string;
  };
}

export const ShopCard = ({ product }: ShopCardProps) => {
  return (
    <div className="group relative w-full overflow-hidden transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
      style={{ aspectRatio: "556 / 806" }}
    >
      {/* ── INDUSTRIAL SHOP CHASSIS (SVG) ── */}
      <div className="absolute inset-0 z-0">
        <svg 
          viewBox="0 0 556 806" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-zinc-800 transition-all duration-500 group-hover:text-zinc-700"
        >
          {/* Main Outline */}
          <path d="M3.23035 34.7544L32.6266 3.63326C34.5157 1.63334 37.1452 0.5 39.8963 0.5H517.851C520.699 0.5 523.412 1.71459 525.31 3.83903L552.959 34.7992C554.595 36.6319 555.5 39.0031 555.5 41.4602V778.587C555.5 781.978 553.781 785.138 550.934 786.981L524.808 803.895C523.189 804.942 521.302 805.5 519.373 805.5H38.4035C36.5612 805.5 34.7546 804.991 33.1832 804.029L5.27969 786.951C2.31045 785.134 0.5 781.903 0.5 778.422V41.6211C0.5 39.0675 1.47688 36.6107 3.23035 34.7544Z" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1"/>
          
          {/* Top Left Ear (Category) */}
          <path d="M26.0334 52.1564L45.0173 30.8479C46.9148 28.7181 49.6314 27.5 52.4839 27.5H248.193C250.942 27.5 253.57 28.632 255.459 30.6299L275.766 52.1088C277.522 53.9655 278.5 56.4237 278.5 58.9789V208.932C278.5 210.931 277.901 212.885 276.779 214.54L270.975 223.108C269.114 225.855 266.013 227.5 262.696 227.5H200.906C197.002 227.5 193.454 225.227 191.822 221.68L171.178 176.82C169.546 173.273 165.998 171 162.094 171H51.9584C49.4155 171 46.968 170.031 45.114 168.291L26.6556 150.962C24.6421 149.072 23.5 146.433 23.5 143.672V58.8084C23.5 56.3554 24.4016 53.988 26.0334 52.1564Z" fill="white" fillOpacity="0.02" stroke="currentColor" strokeOpacity="0.2"/>
          
          {/* Top Right Ear (Price) */}
          <path d="M538.967 52.1564L519.983 30.8479C518.085 28.7181 515.369 27.5 512.516 27.5H316.807C314.058 27.5 311.43 28.632 309.541 30.6299L289.234 52.1088C287.478 53.9655 286.5 56.4237 286.5 58.9789V208.932C286.5 210.931 287.099 212.885 288.221 214.54L294.025 223.108C295.886 225.855 298.987 227.5 302.304 227.5H364.094C367.998 227.5 371.546 225.227 373.178 221.68L393.822 176.82C395.454 173.273 399.002 171 402.906 171H513.042C515.585 171 518.032 170.031 519.886 168.291L538.344 150.962C540.358 149.072 541.5 146.433 541.5 143.672V58.8084C541.5 56.3554 540.598 53.988 538.967 52.1564Z" fill="white" fillOpacity="0.02" stroke="currentColor" strokeOpacity="0.2"/>
          
          {/* Middle Body (Image Area) */}
          <path d="M509.5 245H48L29 271.5V501L48 524H509.5L530 501V271.5L509.5 245Z" fill="black" fillOpacity="0.3" stroke="currentColor" strokeOpacity="0.2"/>
          
          {/* Bottom Foot (Content Area) */}
          <path d="M32.5 561.5L49.5 538.5H176L196 561.5H314.5L339.5 538.5H487.5L514 561.5V747.5L502 778.5H49.5L32.5 747.5V561.5Z" fill="white" fillOpacity="0.01" stroke="currentColor" strokeOpacity="0.2"/>
        </svg>
      </div>

      {/* ── CONTENT OVERLAY ── */}
      <div className="absolute inset-0 z-10 text-white pointer-events-none font-mono flex flex-col p-8">
        
        {/* TOP ROW: Category & Price */}
        <div className="flex justify-between items-start h-[20%]">
          <div className="flex flex-col items-start gap-1 p-4">
             <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Category</span>
             <span className="text-xs font-bold uppercase tracking-widest text-amber-500/80">
               {product.category || "MODULE"}
             </span>
          </div>
          <div className="flex flex-col items-end gap-1 p-4 text-right">
             <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Price_Val</span>
             <span className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
               {product.price}
             </span>
          </div>
        </div>

        {/* MIDDLE ROW: Image Display */}
        <div className="absolute top-[31%] left-[10%] right-[10%] h-[31%] flex items-center justify-center">
            <div 
              className="relative w-full h-full bg-zinc-950/50 overflow-hidden"
              style={{ clipPath: "polygon(4% 0%, 96% 0%, 100% 10%, 100% 90%, 96% 100%, 4% 100%, 0% 90%, 0% 10%)" }}
            >
               <Image 
                 src={product.image} 
                 alt={product.name}
                 fill
                 className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
        </div>

        {/* BOTTOM ROW: Name & Action */}
        <div className="absolute bottom-[6%] left-[10%] right-[10%] h-[26%] flex flex-col justify-between py-6">
           <div className="space-y-1">
              <h3 className="text-lg font-black tracking-tight text-white uppercase italic truncate">
                {product.name}
              </h3>
              <p className="text-[10px] text-white/40 leading-snug line-clamp-2">
                {product.description}
              </p>
           </div>

           <div className="flex justify-between items-center pt-4 border-t border-white/10 group/btn cursor-pointer pointer-events-auto">
              <div className="flex items-center gap-2">
                 <ShoppingBag className="w-4 h-4 text-amber-500/60" />
                 <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 group-hover/btn:text-white transition-colors">
                   ADD_TO_CART
                 </span>
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
           </div>
        </div>

      </div>

      {/* CRT SCANLINES & OVERLAYS */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] transition-all"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)",
        }}
      />
    </div>
  );
};
