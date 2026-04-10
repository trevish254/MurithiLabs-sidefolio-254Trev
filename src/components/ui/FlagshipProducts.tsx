"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

const products = [
  {
    id: "chapabiz",
    title: "Chapa",
    suffix: "biz",
    category: "Flagship SaaS / Business OS",
    description: "Integrated financial workflows, M-Pesa, client pipelines and automation — built for African businesses.",
    link: "/chapabiz",
    colSpan: "md:col-span-6",
    aspect: "aspect-[6/4.5]",
    color: "text-violet-400",
    bgGradient: "from-violet-900/40 to-black",
  },
  {
    id: "3d-web",
    title: "Unreal",
    suffix: "Web",
    category: "Immersive 3D / WebGL",
    description: "Physics simulations, scroll-driven camera paths, 5,000 stars at 60fps — real-time in the browser.",
    link: "/3d-experiences",
    colSpan: "md:col-span-3",
    aspect: "aspect-[3/4.5]",
    color: "text-sky-400",
    bgGradient: "from-sky-900/40 to-black",
  },
  {
    id: "systems",
    title: "System",
    suffix: "Labs",
    category: "Architecture / Writing",
    description: "Deep dives into SaaS architecture, multi-tenancy, API design, and scaling patterns.",
    link: "/blogs",
    colSpan: "md:col-span-3",
    aspect: "aspect-[3/4.5]",
    color: "text-amber-400",
    bgGradient: "from-amber-900/40 to-black",
  },
];

export default function FlagshipProducts() {
  return (
    <section className="bg-black relative z-20 w-full px-6 py-24 pb-48">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">Flagship Catalog</span>
          </div>
          <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none">
            Selected{" "}
            <span className={`${caveat.className} text-purple-400 italic font-normal`}>Products</span>
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl font-medium tracking-tight">
            Scalable platforms, SaaS systems, and immersive 3D web experiences — built from the ground up to redefine digital architecture.
          </p>
        </div>

        {/* High-Fidelity Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 gap-y-16">
          {products.map((product, index) => (
            <motion.a
              key={product.id}
              href={product.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col group ${product.colSpan}`}
            >
              <div className={`relative overflow-hidden mb-8 ${product.aspect} bg-[#0a0a0a] border border-white/5`}>
                {/* Product Preview / Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient} opacity-50`} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                {/* Centered Large Branding */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center group-hover:scale-105 transition-transform duration-700">
                    <span className="text-5xl md:text-7xl font-black text-white tracking-tighter block mb-1">
                      {product.title}
                    </span>
                    <span className={`${caveat.className} text-4xl md:text-5xl ${product.color} italic block -mt-2`}>
                      {product.suffix}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                     <ArrowRight className="w-6 h-6 text-white" />
                   </div>
                </div>
              </div>

              {/* Text Meta Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-white text-2xl font-black tracking-tighter uppercase leading-none">
                    {product.title} {product.suffix}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-white/10 rounded-full text-white/40`}>
                    0{index + 1}
                  </span>
                </div>
                <p className={`${product.color} text-xs font-bold uppercase tracking-[0.2em]`}>
                  {product.category}
                </p>
                <p className="text-neutral-400 text-base leading-relaxed font-medium max-w-md">
                  {product.description}
                </p>
                <div className={`pt-2 flex items-center ${product.color} text-sm font-bold group-hover:gap-2 gap-1 transition-all`}>
                  <span>Explore Product</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
