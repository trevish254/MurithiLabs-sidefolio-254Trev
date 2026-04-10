'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function StorySectionTwo() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
    const scroller = document.getElementById('main-scroll');

    if (scroller) {
      ScrollTrigger.defaults({ scroller: scroller });

      // ── PARALLAX HEADER TIMELINE ──
      if (triggerElement) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "0% 0%",
            end: "100% 0%",
            scrub: 0
          }
        });

        const layers = [
          { layer: "1", yPercent: 70 },
          { layer: "2", yPercent: 40 },
          { layer: "3", yPercent: 20 },
          { layer: "4", yPercent: 10 }
        ];

        layers.forEach((layerObj, idx) => {
          tl.to(
            triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
            {
              yPercent: layerObj.yPercent,
              ease: "none"
            },
            idx === 0 ? undefined : "<"
          );
        });
      }

      // ── PINNED CONTENT TIMELINE ──
      if (contentContainerRef.current && rightSideRef.current) {
        const ctx = gsap.context(() => {
          const rightContentHeight = rightSideRef.current!.offsetHeight;
          const windowHeight = window.innerHeight;
          const scrollDistance = Math.max(0, rightContentHeight - (windowHeight * 0.4));

          ScrollTrigger.create({
            trigger: contentContainerRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: true,
            pinSpacing: true,
            animation: gsap.to(rightSideRef.current, {
              y: -scrollDistance,
              ease: "none",
            }),
          });
        }, contentContainerRef);
      }

      const lenis = new Lenis({
        wrapper: scroller as HTMLElement,
        content: (scroller as HTMLElement).querySelector('div') as HTMLElement, 
        lerp: 0.1,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
        lenis.destroy();
        ScrollTrigger.defaults({ scroller: window });
      };
    }
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img src="/yellow-backdrop.png" loading="eager" data-parallax-layer="1" alt="" className="parallax__layer-img" style={{ zIndex: 0 }} />
            
            <div data-parallax-layer="2" className="parallax__layer-title" style={{ zIndex: 1, position: 'absolute', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh' }}>
              <h2 className="parallax__title" style={{ fontSize: 'clamp(2.5rem, 8.5vw, 6.5rem)', letterSpacing: '0.02em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>WEB DESIGN</h2>
            </div>
            
            <img src="/Web design mid mountain.png" loading="eager" data-parallax-layer="3" alt="" className="parallax__layer-img" style={{ zIndex: 2, top: '8%' }} />
            
            <img src="/webdesign.png" loading="eager" data-parallax-layer="4" alt="" className="parallax__layer-img" style={{ zIndex: 3, height: '80%', width: 'auto', objectFit: 'contain', bottom: '0', top: 'auto', left: '50%', transform: 'translateX(-50%)' }} />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>

      {/* ── PINNED NARRATIVE SECTION ── */}
      <section 
        ref={contentContainerRef}
        className="relative w-full h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col md:flex-row px-6 md:px-16 lg:px-24 z-10"
      >
        {/* LEFT SIDE: INDICATION */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[45%] flex items-center justify-center select-none pointer-events-none z-0">
          <h1 className="text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] leading-[0.8] text-white/[0.08] font-black tracking-tighter">
            02
          </h1>
        </div>

        {/* RIGHT SIDE: SCROLLING CONTENT */}
        <div className="relative z-10 w-full h-full ml-auto md:w-[45%] flex flex-col items-start pt-[35vh] md:pt-[50vh]">
          <div ref={rightSideRef} className="w-full max-w-lg space-y-12 pb-20">
            
            {/* THE CHAPTER */}
            <div className="space-y-6">
              <span className="text-neutral-600 text-[10px] uppercase tracking-[0.4em] font-black border-b border-neutral-800 pb-1">/ THE CHAPTER</span>
              <h1 className="text-xl md:text-3xl lg:text-4xl font-black uppercase leading-[1.2] tracking-tight">
                Digital architecture is more than just code; it&apos;s the rhythm of human interaction.
              </h1>
              <p className="text-neutral-500 text-xs md:text-sm font-normal leading-relaxed max-w-md">
                Every pixel is weighted by purpose. We craft environments that don&apos;t just display information, but invite discovery through motion and depth.
              </p>
            </div>

            {/* ART CARD */}
            <div className="pt-4">
              <div className="h-64 md:h-80 w-full bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <img src="/trevor-real.png" alt="Process" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>

            {/* CAPABILITIES / GRID */}
            <div className="space-y-8 pt-4">
              <div className="grid grid-cols-1 gap-10">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-600">/ CONCEPT</span>
                  <p className="text-neutral-400 text-sm leading-relaxed">We begin with the core essence of the brand, identifying the unique frequencies that resonate within the market.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-600">/ STRATEGY</span>
                  <p className="text-neutral-400 text-sm leading-relaxed">Execution is everything. We map out the technical trajectory required to transform vision into a reality.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-600">/ DESIGN</span>
                  <p className="text-neutral-400 text-sm leading-relaxed">Aesthetics meet utility. Every element is designed to serve a purpose while elevating the emotional response.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-600">/ SYSTEMS</span>
                  <p className="text-neutral-400 text-sm leading-relaxed">We build for scale. Robust architectures that support growth without compromising integrity.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
