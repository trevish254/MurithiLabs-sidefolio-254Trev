import React from "react";
import { ChevronRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ShopCard } from "@/components/ShopCard";

const COURSES = [
  {
    id: "course-1",
    name: "SAAS 201: Finding SaaS Idea",
    description: "How to find a high-ticket profitable SaaS idea with very low churn.",
    price: "Free",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop",
    category: "COURSE",
  },
  {
    id: "course-2",
    name: "SAAS 101: Mindset",
    description: "Learn to think like a SaaS entrepreneur and break out of your 9 - 5 mindset.",
    price: "Free",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop",
    category: "COURSE",
  },
  {
    id: "course-3",
    name: "SaaS 320: Bulletproof Offers",
    description: "Following Alex hormozi's 100M Offers - learn to create a SaaS offer so good, people feel stupid saying no.",
    price: "Free",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    category: "COURSE",
  },
];

const SOURCE_CODE = [
  {
    id: "code-1",
    name: "S2C Codebase + Bonuses",
    description: "Unlike most AI tools that try to replace designers s2c is built to empower them. Sketch to code.",
    price: "$97",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    category: "CODE",
  },
  {
    id: "code-2",
    name: "SOTTA MCP + Frontend",
    description: "Get the ultimate frontend architecture used by professionals today for scalable apps.",
    price: "$97",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop",
    category: "CODE",
  },
  {
    id: "code-3",
    name: "Grouple - Community SaaS",
    description: "Learning management platform for coaches and course creators. Build communities instantly.",
    price: "$97",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    category: "CODE",
  },
];

const FIGMA_DESIGNS = [
  {
    id: "figma-1",
    name: "Slide Figma Design",
    description: "Professionally designed pages, components, tokens and more for your next big thing.",
    price: "$37",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop",
    category: "FIGMA",
  },
  {
    id: "figma-2",
    name: "S2C Figma File",
    description: "In this figma design you will get professionally designed pages, components, and design system.",
    price: "$37",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cbca37?q=80&w=600&auto=format&fit=crop",
    category: "FIGMA",
  },
  {
    id: "figma-3",
    name: "Opal Figma Design",
    description: "Modern SaaS application design with dark mode and premium components.",
    price: "$37",
    image: "https://images.unsplash.com/photo-1541462608141-ad603a1ee596?q=80&w=600&auto=format&fit=crop",
    category: "FIGMA",
  },
];

export default function StorePage() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-black rounded-tl-2xl border border-white/5 relative min-h-screen flex flex-col">
      <div className="flex-1 overflow-x-hidden p-8 lg:p-12 space-y-24">
        
        {/* Section 1: Courses */}
        <div className="relative">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-white text-6xl font-bold tracking-tight mb-3">Courses</h1>
              <p className="text-neutral-400 text-lg">Explore our comprehensive course library</p>
            </div>
            <a href="#" className="text-white text-sm font-medium hover:underline tracking-wide">View All</a>
          </div>

          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-8">
              {COURSES.map((course) => (
                <div key={course.id} className="min-w-[320px] w-[320px]">
                  <ShopCard product={course} />
                </div>
              ))}
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-neutral-800 transition z-10 translate-x-1/2 hidden lg:flex">
               <ChevronRight className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-0 right-0 bottom-8 w-40 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-[5] blur-[2px]" />
          </div>
        </div>

        {/* Section 2: Source Code */}
        <div className="relative">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-white text-6xl font-bold tracking-tight mb-3">Source Code</h1>
              <p className="text-neutral-400 text-lg">Download complete project source code and templates</p>
            </div>
            <a href="#" className="text-white text-sm font-medium hover:underline tracking-wide">View All</a>
          </div>

          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-8">
              {SOURCE_CODE.map((code) => (
                <div key={code.id} className="min-w-[320px] w-[320px]">
                  <ShopCard product={code} />
                </div>
              ))}
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-neutral-800 transition z-10 translate-x-1/2 hidden lg:flex">
               <ChevronRight className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-0 right-0 bottom-8 w-40 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-[5] blur-[2px]" />
          </div>
        </div>

        {/* Section 3: Figma Designs */}
        <div className="relative">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-white text-6xl font-bold tracking-tight mb-3">Figma Designs</h1>
              <p className="text-neutral-400 text-lg">Professional design files and UI kits</p>
            </div>
            <a href="#" className="text-white text-sm font-medium hover:underline tracking-wide">View All</a>
          </div>

          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-8">
              {FIGMA_DESIGNS.map((figma) => (
                <div key={figma.id} className="min-w-[320px] w-[320px]">
                  <ShopCard product={figma} />
                </div>
              ))}
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-neutral-800 transition z-10 translate-x-1/2 hidden lg:flex">
               <ChevronRight className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-0 right-0 bottom-8 w-40 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-[5] blur-[2px]" />
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
