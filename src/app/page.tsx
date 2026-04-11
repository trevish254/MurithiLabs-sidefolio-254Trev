import { dancing, caveat } from "@/lib/fonts";
import { Footer } from "@/components/Footer";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import RedesignedHero from "@/components/ui/RedesignedHero";
import VideoHero from "@/components/ui/VideoHero";
import SohubSection from "@/components/ui/SohubSection";
import FeaturedWork from "@/components/ui/FeaturedWork";
import FlagshipProducts from "@/components/ui/FlagshipProducts";
import LatestInsights from "@/components/ui/LatestInsights";
import ParallaxSection from "@/components/ui/ParallaxSection";
import GlobalPreloader from "@/components/ui/GlobalPreloader";


export default function Home() {
  return (
    <div className="w-full bg-black relative">
      <GlobalPreloader />

      {/* ═══════════════════════ VIDEO HERO (NEW) ═══════════════════════ */}
      <ParallaxSection zIndex={10}>
        <VideoHero />
      </ParallaxSection>

      {/* ═══════════════════════ SOHUB 3D DESIGN SECTION ═══════════════════════ */}
      <ParallaxSection zIndex={20}>
        <SohubSection />
      </ParallaxSection>

      {/* ═══════════════════════ HERO (EXISTING) ═══════════════════════ */}
      <ParallaxSection zIndex={30}>
        <RedesignedHero />
      </ParallaxSection>

      {/* ═══════════════════════ FEATURED WORK (NEW) ═══════════════════════ */}
      <div className="relative z-[40]">
        <FeaturedWork />
      </div>

      {/* ═══════════════════════ FLAGSHIP PRODUCTS SECTION ═══════════════════════ */}
      <div className="relative z-[50]">
        <FlagshipProducts />
      </div>

      {/* ═══════════════════════ LATEST INSIGHTS (NEW BLOG CARDS) ═══════════════════════ */}
      <div className="relative z-[60]">
        <LatestInsights />
      </div>

      {/* FOOTER */}
      <div className="relative z-[70] bg-black">
        <Footer />
      </div>

      {/* Chat bubble */}

      {/* Chat bubble */}
      <div className="fixed bottom-8 right-8 w-14 h-14 bg-white/10 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition z-50 shadow-2xl">
        <MessageSquare className="text-white w-6 h-6" />
      </div>
    </div>
  );
}
