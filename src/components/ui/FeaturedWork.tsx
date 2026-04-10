"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "R-K",
    category: "Identity + Art Direction",
    image: "/identity_art_direction_abstract.png",
    colSpan: "md:col-span-3",
    aspect: "aspect-[3/4.5]",
  },
  {
    title: "Prop Films",
    category: "Exploration",
    image: "/prop_films_close_up.png",
    colSpan: "md:col-span-3",
    aspect: "aspect-[3/4.5]",
  },
  {
    title: "Buyt Bags",
    category: "Web Development",
    image: "/luxury_bags_web_dev.png",
    colSpan: "md:col-span-6",
    aspect: "aspect-[6/4.5]",
  },
];

export default function FeaturedWork() {
  return (
    <section className="bg-black px-6 py-24 pb-48 relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Text */}
        <div className="mb-16 md:ml-[30%]">
          <h2 className="text-white text-2xl md:text-3xl font-medium leading-tight tracking-tight">
            Settling <span className="italic font-serif text-white/90">is easy</span>
          </h2>
          <p className="text-white text-2xl md:text-3xl font-medium leading-tight tracking-tight">
            the work here isn't built for that
          </p>
        </div>

        {/* Featured Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 gap-y-12">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col group cursor-pointer ${project.colSpan}`}
            >
              <div className={`relative overflow-hidden mb-6 ${project.aspect}`}>
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-white text-lg font-bold tracking-tighter uppercase leading-none">
                  {project.title}
                </h3>
                <p className="text-white/50 text-base font-medium">
                  {project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
