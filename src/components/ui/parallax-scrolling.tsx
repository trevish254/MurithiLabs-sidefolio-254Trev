'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    const scroller = document.getElementById('main-scroll');

    if (triggerElement && scroller) {
      // Set ScrollTrigger default scroller to our custom container
      ScrollTrigger.defaults({ scroller: scroller });

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

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('div') as HTMLElement, // Target the inner content wrapper
        lerp: 0.1,
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
        if (triggerElement) gsap.killTweensOf(triggerElement);
        lenis.destroy();
        // Reset defaults on cleanup to avoid affecting other pages
        ScrollTrigger.defaults({ scroller: window });
      };
    }

  }, []);

  return (
    <div className="parallax -mt-16" ref={parallaxRef}>

      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img src="/night-sky.jpg" loading="eager" width="800" data-parallax-layer="1" alt="" className="parallax__layer-img" />
            
            <div data-parallax-layer="2" className="parallax__layer-title">
              <h2 className="parallax__title">MURITHI</h2>
            </div>
            
            <img src="/mid-mountain.png" loading="eager" width="800" data-parallax-layer="3" alt="" className="parallax__layer-img" />




            
            <img src="/astro-character.png" loading="eager" width="800" data-parallax-layer="4" alt="" className="parallax__layer-img" />









          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      <section className="parallax__content">
        <div className="parallax__story">
          <div className="parallax__story-content">
            <span className="parallax__about-label">/ THE STORY</span>
            <h1 className="parallax__story-text" style={{ marginTop: '2rem' }}>
              Murithi Labs is an independent design and development practice focused on building strong digital presence for ambitious brands.
              <br /><br />
              <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.8, maxWidth: '80%', display: 'block', lineHeight: 1.6 }}>
                By combining design and code, each creation is shaped to balance beauty with function, crafted to fit you and your brand.
              </span>
            </h1>
          </div>
          <div className="parallax__story-image-card">
            <img src="/trevor-real.png" alt="Murithi Labs Story" className="parallax__story-img" />
          </div>

        </div>

        <div className="parallax__about-grid">

          <div className="parallax__about-item">
            <span className="parallax__about-label">/ DIGITAL</span>
            <p className="parallax__about-text">
              Starting with user-centered thinking, our team provides a knowledgebase and understanding of how to move people in the digital landscape. No matter the channel, we define the story.
            </p>
          </div>
          
          <div className="parallax__about-item">
            <span className="parallax__about-label">/ GROWTH MARKETING</span>
            <p className="parallax__about-text">
              Growth marketing got watered down by LinkedIn gurus. Our team delivers meaningful revenue by learning your business, your audience, and your margins. Just sustainable growth.
            </p>
          </div>

          <div className="parallax__about-item">
            <span className="parallax__about-label">/ SOCIAL</span>
            <p className="parallax__about-text">
              Social is the proving ground. Customers use it to validate your brand before they ever convert. We integrate with a social team that drives audiences seamlessly from TikTok to your site.
            </p>
          </div>

          <div className="parallax__about-item">
            <span className="parallax__about-label">/ PRODUCTION</span>
            <p className="parallax__about-text">
              Production can make or break digital projects. That&apos;s why we built it in-house: 3D, motion, video, and a fully lit cyc wall studio. Few can match the scale and speed we deliver.
            </p>
          </div>
        </div>

        <div className="parallax__experience">
          <span className="parallax__about-label">/ EXPERIENCE</span>
          <div className="parallax__experience-logos">
            <div className="parallax__exp-logo">MURITHI.LABS</div>
            <div className="parallax__exp-logo">CHAPA.BIZ</div>
            <div className="parallax__exp-logo">NYERIDOCS</div>
            <div className="parallax__exp-logo">MICHELIN</div>
            <div className="parallax__exp-logo">LAMBORGHINI</div>
            <div className="parallax__exp-logo">SHETZ</div>
            <div className="parallax__exp-logo">NUFABRX</div>
          </div>
        </div>
      </section>

    </div>
  );
}



