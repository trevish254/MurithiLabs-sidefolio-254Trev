"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { MessageSquare, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Mockup Design",
    slug: "macbook-pro-16",
    image: "/images/macbook-orange.png",
    color: "bg-zinc-900"
  },
  {
    id: 2,
    title: "Book Cover",
    slug: "showcase-a4",
    image: "/images/book-blue.png",
    color: "bg-blue-50"
  },
  {
    id: 3,
    title: "Font Design",
    slug: "tape-duct",
    image: "/images/tape-orange.png",
    color: "bg-red-600"
  },
  {
    id: 4,
    title: "Application",
    slug: "iphone-16-pro",
    image: "/images/iphone-purple.png",
    color: "bg-zinc-800"
  }
];

export default function PortfolioPage() {
  return (
    <div className="w-full bg-black min-h-screen relative font-sans text-white">
      
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        
        {/* Giant Hollow Header — Optimized for Dark Theme */}
        <div className="mb-12 overflow-hidden">
          <h1 
            className="text-6xl md:text-8xl font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap select-none"
            style={{ 
              WebkitTextStroke: "1px rgba(255,255,255,0.2)", 
              color: "transparent",
              filter: "drop-shadow(0 0 1px rgba(255,255,255,0.05))"
            }}
          >
            LATEST PORTFOLIO
          </h1>
        </div>

        {/* Portfolio Grid — Balanced constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              className="group block relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl hover:translate-y-[-6px] transition-all duration-500"
            >
              {/* Background color placeholder while image loads */}
              <div className={`absolute inset-0 ${project.color}`} />
              
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay / Bottom Pill */}
              <div className="absolute bottom-8 left-8 flex items-center gap-3">
                <div className="bg-white px-6 py-2.5 rounded-full shadow-lg flex items-center border border-black/5">
                  <span className="text-black text-xs font-black uppercase tracking-widest">{project.title}</span>
                </div>
                <div className="bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Hover Glow effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>

      </div>

      <div className="bg-black">
        <Footer />
      </div>

      {/* Floating Interaction Button */}
      <div className="fixed bottom-8 right-8 w-14 h-14 bg-white/10 backdrop-blur-lg border border-black/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-black group transition z-50 shadow-2xl">
        <MessageSquare className="text-black group-hover:text-white w-6 h-6" />
      </div>

    </div>
  );
}
