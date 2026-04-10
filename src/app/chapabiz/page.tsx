"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { caveat } from "@/lib/fonts";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { BallpitHero } from "@/components/ui/interactive-hero-backgrounds";

// ── Launch countdown target: 30 days from now ────────────────────────────────
const LAUNCH = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

type CountdownState = { days: number; hours: number; minutes: number; seconds: number };

function useCountdown(target: Date) {
  const calc = useCallback((): CountdownState => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [target]);
  // Start null so server and client both render "--" initially — fixes hydration mismatch
  const [t, setT] = useState<CountdownState | null>(null);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return t;
}

function TimeBlock({ value, label }: { value: number | null; label: string }) {
  const display = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1">
        {display.split("").map((d, i) => (
          <div
            key={i}
            className="w-14 h-16 md:w-20 md:h-24 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-white font-bold text-3xl md:text-5xl tabular-nums tracking-tight">
              {d}
            </span>
          </div>
        ))}
      </div>
      <span className="text-neutral-500 text-xs uppercase tracking-widest mt-3 suppress" suppressHydrationWarning>{label}</span>
    </div>
  );
}

// ── Hoisted OUTSIDE component so its reference never changes on countdown re-renders ──
const BALLPIT_CONFIG = {
  count: 55,
  gravity: 0.6,
  friction: 0.88,
  wallBounce: 0.1,
  minSize: 0.3,
  maxSize: 0.9,
  maxVelocity: 0.12,
  lightIntensity: 4,
  colors: ["#3b0764", "#1e1b4b", "#0f172a", "#1a1a1a", "#0d0d0d"],
};

export default function ChapabizPage() {
  const countdown = useCountdown(LAUNCH);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full bg-black relative flex flex-col">

      {/* ─── INTERACTIVE HERO ─── */}
      <BallpitHero
        title={
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10 backdrop-blur-md w-fit mx-auto">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-white/80 text-sm font-medium">Flagship Project — Launching Soon</span>
            </div>
            <h1 className="text-white font-bold text-7xl md:text-9xl tracking-tighter leading-none mb-4">
              Chapa<span className={`${caveat.className} text-violet-400 italic`}>biz</span>
            </h1>
          </div>
        }
        subtitle="Multi-Tenant Business Operating System"
        description="Designed a scalable multi-tenant system with integrated financial and automation workflows — built for African businesses at scale."
        emailPlaceholder="Enter your email to join waitlist"
        ballpitConfig={BALLPIT_CONFIG}
      />

      {/* ─── COUNTDOWN + WAITLIST ─── */}
      <div className="w-full flex flex-col items-center px-6 pt-28 pb-20 relative">
        {/* Countdown */}
        <p className="text-neutral-500 text-sm uppercase tracking-widest mb-10">Launching in</p>
        <div className="flex items-start gap-4 md:gap-6 mb-14">
          <TimeBlock value={countdown?.days ?? null} label="Days" />
          <span className="text-white/30 text-4xl md:text-6xl font-thin mt-3 md:mt-5 select-none">:</span>
          <TimeBlock value={countdown?.hours ?? null} label="Hours" />
          <span className="text-white/30 text-4xl md:text-6xl font-thin mt-3 md:mt-5 select-none">:</span>
          <TimeBlock value={countdown?.minutes ?? null} label="Minutes" />
          <span className="text-white/30 text-4xl md:text-6xl font-thin mt-3 md:mt-5 select-none">:</span>
          <TimeBlock value={countdown?.seconds ?? null} label="Seconds" />
        </div>

        {/* Days note */}
        <div className="flex items-center space-x-2 text-neutral-400 text-sm mb-12">
          <Calendar className="w-4 h-4" />
          <span suppressHydrationWarning>{countdown?.days ?? "--"} days until launch</span>
        </div>

        {/* Waitlist Form */}
        {!submitted ? (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
            className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white placeholder-neutral-600 px-5 py-3.5 rounded-full focus:outline-none focus:border-violet-500/50 transition backdrop-blur-md"
            />
            <button
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-7 py-3.5 rounded-full transition shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
            >
              Join Waitlist <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="relative z-10 flex items-center space-x-3 bg-green-500/10 border border-green-500/30 rounded-full px-8 py-4 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-300 font-medium text-sm">You&apos;re on the list! We&apos;ll notify you at launch.</span>
          </div>
        )}

        <p className="text-neutral-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>

      {/* ─── PRODUCT SCREENSHOT ─── */}
      <div className="w-full px-6 pb-32">
        <div className="relative max-w-6xl mx-auto">
          {/* Browser chrome frame */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
            {/* Titlebar */}
            <div className="flex items-center px-5 py-3.5 border-b border-white/10 bg-[#0a0a0a]">
              <div className="flex space-x-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1 text-neutral-500 text-xs font-mono">
                  app.chapabiz.co
                </div>
              </div>
            </div>

            {/* Actual product screenshot */}
            <div className="relative w-full">
              <Image
                src="/chapabiz-product.png"
                alt="Chapabiz — Multi-Tenant Business Operating System"
                width={1280}
                height={720}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Bottom fade so it blends into the page */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            </div>
          </div>

          {/* "Preview Only" pill */}
          <div className="absolute top-14 right-6 bg-violet-600/80 backdrop-blur-md border border-violet-400/30 rounded-full px-4 py-1.5 text-white text-xs font-semibold uppercase tracking-widest shadow-xl">
            Preview Only
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}
