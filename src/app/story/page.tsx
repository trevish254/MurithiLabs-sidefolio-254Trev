import React from "react";
import StoryHero from "@/components/ui/StoryHero";
import { StorySectionTwo } from "@/components/ui/StorySectionTwo";
import { StorySectionThree } from "@/components/ui/StorySectionThree";
import { StorySectionFour } from "@/components/ui/StorySectionFour";
import { StorySectionFive } from "@/components/ui/StorySectionFive";
import { StorySectionSix } from "@/components/ui/StorySectionSix";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Story | Trevor",
  description: "Exploring the intersection of AI, design, and intelligent creative systems.",
};

export default function StoryPage() {
  return (
    <main className="w-full bg-black">
      {/* ── SECTION 01: STORY HERO ── */}
      <StoryHero />
      
      {/* ── SECTION 02: WEB DESIGN CHAPTER ── */}
      <StorySectionTwo />

      {/* ── SECTION 03: WEB DEVELOPMENT CHAPTER ── */}
      <StorySectionThree />

      {/* ── SECTION 04: BRANDING CHAPTER ── */}
      <StorySectionFour />

      {/* ── SECTION 05: DIGITAL CREATIVES CHAPTER ── */}
      <StorySectionFive />

      {/* ── SECTION 06: 3D IMMERSIVE CHAPTER ── */}
      <StorySectionSix />
    </main>
  );
}
