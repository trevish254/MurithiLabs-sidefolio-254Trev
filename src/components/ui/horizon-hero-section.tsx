"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

gsap.registerPlugin(ScrollTrigger);

// Sidebar width comes from the CSS custom property --sidebar-w (set by Sidebar.tsx)
const getSidebarW = () => {
  if (typeof window === "undefined") return 280;
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sidebar-w")) || 280;
};

export const HorizonHero: React.FC = () => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const menuRef     = useRef<HTMLDivElement>(null);

  const smoothCam   = useRef({ x: 0, y: 30, z: 100 });
  const [prog, setProg]           = useState(0);
  const [section, setSection]     = useState(0);
  const [ready, setReady]         = useState(false);
  const TOTAL = 2;

  const R = useRef<any>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animId: null,
    locations: [],
    tx: 0, ty: 30, tz: 100,
  });

  // ── Three.js init ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = R.current;

    // Canvas size = content area (full window minus sidebar)
    const W = () => window.innerWidth - getSidebarW();
    const H = () => window.innerHeight;

    r.scene = new THREE.Scene();
    r.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    r.camera = new THREE.PerspectiveCamera(75, W() / H(), 0.1, 2000);
    r.camera.position.set(0, 20, 100);

    r.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    r.renderer.setSize(W(), H());
    r.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    r.renderer.toneMappingExposure = 0.5;

    // Post-processing with fallback
    try {
      r.composer = new EffectComposer(r.renderer);
      r.composer.addPass(new RenderPass(r.scene, r.camera));
      r.composer.addPass(new UnrealBloomPass(new THREE.Vector2(W(), H()), 1.2, 0.5, 0.75));
    } catch (e) {
      console.warn("Bloom failed, using fallback renderer", e);
      r.composer = null;
    }

    // ── Stars ────────────────────────────────────────────────────────────────
    for (let layer = 0; layer < 3; layer++) {
      const N = 5000;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const sz  = new Float32Array(N);
      for (let j = 0; j < N; j++) {
        const rad   = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(Math.random() * 2 - 1);
        pos[j*3]   = rad * Math.sin(phi) * Math.cos(theta);
        pos[j*3+1] = rad * Math.sin(phi) * Math.sin(theta);
        pos[j*3+2] = rad * Math.cos(phi);
        const c = new THREE.Color();
        const rnd = Math.random();
        if (rnd < 0.7)      c.setHSL(0,    0,   0.8 + Math.random() * 0.2);
        else if (rnd < 0.9) c.setHSL(0.08, 0.5, 0.8);
        else                c.setHSL(0.6,  0.5, 0.8);
        col[j*3] = c.r; col[j*3+1] = c.g; col[j*3+2] = c.b;
        sz[j] = Math.random() * 2 + 0.5;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
      geo.setAttribute("size",     new THREE.BufferAttribute(sz,  1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor;
          uniform float time; uniform float depth;
          void main() {
            vColor = color; vec3 p = position;
            float a = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(a),-sin(a),sin(a),cos(a));
            p.xy = rot * p.xy;
            vec4 mv = modelViewMatrix * vec4(p,1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if(d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0,0.5,d));
          }`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      r.scene.add(pts); r.stars.push(pts);
    }

    // ── Nebula ───────────────────────────────────────────────────────────────
    const nebGeo = new THREE.PlaneGeometry(8000, 4000, 80, 80);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time:    { value: 0 },
        color1:  { value: new THREE.Color(0x000022) },
        color2:  { value: new THREE.Color(0x000000) },
        opacity: { value: 0.35 },
      },
      vertexShader: `
        varying vec2 vUv; varying float vEl; uniform float time;
        void main() {
          vUv = uv; vec3 p = position;
          float el = sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0;
          p.z += el; vEl = el;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
        }`,
      fragmentShader: `
        uniform vec3 color1,color2; uniform float opacity,time;
        varying vec2 vUv; varying float vEl;
        void main() {
          float mf = sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);
          vec3 c = mix(color1,color2,mf*0.5+0.5);
          float a = opacity*(1.0-length(vUv-0.5)*2.0);
          gl_FragColor = vec4(c, max(a,0.0));
        }`,
      transparent: true, blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide, depthWrite: false,
    });
    r.nebula = new THREE.Mesh(nebGeo, nebMat);
    r.nebula.position.z = -1050;
    r.scene.add(r.nebula);

    // ── Mountains ────────────────────────────────────────────────────────────
    [
      { z: -50,  h: 60,  color: 0x1a1a2e, op: 1.0 },
      { z: -100, h: 80,  color: 0x16213e, op: 0.8 },
      { z: -150, h: 100, color: 0x0f3460, op: 0.6 },
      { z: -200, h: 120, color: 0x0a4668, op: 0.4 },
    ].forEach((lyr, idx) => {
      const pts: THREE.Vector2[] = [];
      for (let i = 0; i <= 50; i++) {
        const x = (i / 50 - 0.5) * 1000;
        const y = Math.sin(i*0.1)*lyr.h + Math.sin(i*0.05)*lyr.h*0.5
                + Math.random()*lyr.h*0.2 - 100;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300));
      const geo = new THREE.ShapeGeometry(new THREE.Shape(pts));
      const mat = new THREE.MeshBasicMaterial({
        color: lyr.color, transparent: true, opacity: lyr.op, side: THREE.DoubleSide,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(0, lyr.z, lyr.z);
      m.userData = { baseZ: lyr.z, idx };
      r.scene.add(m); r.mountains.push(m);
    });
    r.locations = r.mountains.map((m: THREE.Mesh) => m.position.z);

    // ── Atmosphere ───────────────────────────────────────────────────────────
    r.scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(600, 32, 32),
      new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader:   `varying vec3 vN; void main(){ vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `varying vec3 vN; uniform float time; void main(){ float i=pow(0.7-dot(vN,vec3(0,0,1)),2.0); vec3 a=vec3(0.3,0.6,1.0)*i*(sin(time*2.0)*0.1+0.9); gl_FragColor=vec4(a,i*0.25); }`,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
      })
    ));

    // ── Animate ──────────────────────────────────────────────────────────────
    const animate = () => {
      r.animId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      r.stars.forEach((s: THREE.Points) => {
        const u = (s.material as THREE.ShaderMaterial).uniforms;
        if (u) u.time.value = t;
      });
      if (r.nebula?.material?.uniforms) r.nebula.material.uniforms.time.value = t * 0.5;
      // Smooth camera
      smoothCam.current.x += (r.tx - smoothCam.current.x) * 0.05;
      smoothCam.current.y += (r.ty - smoothCam.current.y) * 0.05;
      smoothCam.current.z += (r.tz - smoothCam.current.z) * 0.05;
      r.camera.position.set(
        smoothCam.current.x + Math.sin(t*0.1)*2,
        smoothCam.current.y + Math.cos(t*0.15),
        smoothCam.current.z,
      );
      r.camera.lookAt(0, 10, -600);
      // Mountain parallax
      r.mountains.forEach((m: THREE.Mesh, i: number) => {
        m.position.x = Math.sin(t*0.1)*2*(1+i*0.5);
        m.position.y = 50 + Math.cos(t*0.15)*(1+i*0.5);
      });
      // Render
      if (r.composer) r.composer.render();
      else r.renderer.render(r.scene, r.camera);
    };
    animate();
    setReady(true);

    // ── Resize ───────────────────────────────────────────────────────────────
    const onResize = () => {
      r.camera.aspect = W() / H();
      r.camera.updateProjectionMatrix();
      r.renderer.setSize(W(), H());
      r.composer?.setSize(W(), H());
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(r.animId);
      window.removeEventListener("resize", onResize);
      r.stars.forEach((s: THREE.Points) => { s.geometry.dispose(); (s.material as any).dispose(); });
      r.mountains.forEach((m: THREE.Mesh) => { m.geometry.dispose(); (m.material as any).dispose(); });
      r.nebula?.geometry.dispose(); (r.nebula?.material as any)?.dispose();
      r.renderer?.dispose();
    };
  }, []);

  // ── GSAP entrance ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const tl = gsap.timeline();
    if (menuRef.current)    tl.from(menuRef.current,    { x: -80, opacity: 0, duration: 1, ease: "power3.out" });
    if (titleRef.current)   tl.from(titleRef.current,   { y: 80,  opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.5");
    if (subtitleRef.current) tl.from(subtitleRef.current.querySelectorAll(".sub-line"), { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.8");
    if (scrollRef.current)  tl.from(scrollRef.current,  { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, "-=0.5");
    return () => { tl.kill(); };
  }, [ready]);

  // ── Scroll — target the known scroll container by ID ──────────────────────
  useEffect(() => {
    // layout.tsx gives the overflow-y-auto div id="main-scroll"
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;

    const onScroll = () => {
      const scrollY = scrollEl.scrollTop;
      const totalH  = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (!totalH) return;
      const p   = Math.min(scrollY / totalH, 1);
      const sec = Math.floor(p * TOTAL);
      setProg(p); setSection(sec);
      const r = R.current;
      const cams = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];
      const sp  = (p * TOTAL) % 1;
      const cur = cams[sec] ?? cams[0];
      const nxt = cams[sec + 1] ?? cur;
      r.tx = cur.x + (nxt.x - cur.x) * sp;
      r.ty = cur.y + (nxt.y - cur.y) * sp;
      r.tz = cur.z + (nxt.z - cur.z) * sp;
      r.mountains.forEach((m: THREE.Mesh, i: number) => {
        m.position.z = p > 0.7 ? 600000 : r.locations[i];
      });
      if (r.nebula && r.mountains[3]) r.nebula.position.z = r.mountains[3].position.z;
    };
    scrollEl.addEventListener("scroll", onScroll);
    onScroll();
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Outer wrapper — position:relative so fixed children anchor correctly
    <div style={{ position: "relative", background: "#000" }}>
      {/* In-flow spacer — this is what actually creates the scrollable height */}
      <div style={{ height: "300vh", width: "1px", pointerEvents: "none" }} aria-hidden />

      {/* Three.js canvas — fixed, offset by sidebar */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", top: 0, left: "var(--sidebar-w)",
          width: "calc(100vw - var(--sidebar-w))", height: "100vh",
          zIndex: 1, display: "block",
        }}
      />

      {/* Side menu */}
      <div
        ref={menuRef}
        style={{
          position: "fixed", top: "40%", left: "calc(var(--sidebar-w) + 24px)",
          zIndex: 6, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 12,
        }}
      >
        <div>
          {[0,1,2].map(i => (
            <span key={i} style={{ display:"block", width:22, height:1, background:"rgba(255,255,255,0.6)", margin:"5px 0" }} />
          ))}
        </div>
        <div style={{ writingMode:"vertical-lr", fontSize:"0.6rem", letterSpacing:"0.28em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase" }}>
          SPACE
        </div>
      </div>

      {/* Hero text overlay */}
      <div style={{
        position: "fixed", top: 0, left: "var(--sidebar-w)",
        width: "calc(100vw - var(--sidebar-w))", height: "100vh",
        zIndex: 5, pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      }}>
        <h1
          ref={titleRef}
          style={{
            fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 900,
            letterSpacing: "-0.02em", color: "#ff2222",
            textAlign: "center", textShadow: "0 0 60px rgba(255,30,30,0.5)",
            lineHeight: 1, margin: 0,
          }}
        >
          HORIZON
        </h1>
        <div ref={subtitleRef} style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <span className="sub-line" style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:"clamp(0.85rem,1.8vw,1.1rem)", lineHeight:1.8 }}>
            Where vision meets reality,
          </span>
          <span className="sub-line" style={{ display:"block", color:"rgba(255,255,255,0.65)", fontSize:"clamp(0.85rem,1.8vw,1.1rem)", lineHeight:1.8 }}>
            we shape the future of tomorrow
          </span>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "fixed", bottom: "1.8rem",
          left: "calc(var(--sidebar-w) + 50%)", transform: "translateX(-50%)",
          zIndex: 6, display: "flex", alignItems: "center", gap: 14,
        }}
      >
        <span style={{ fontSize:"0.58rem", letterSpacing:"0.32em", color:"rgba(255,255,255,0.4)", textTransform:"uppercase" }}>SCROLL</span>
        <div style={{ width:120, height:1, background:"rgba(255,255,255,0.15)", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${prog * 100}%`, background:"rgba(255,255,255,0.7)", transition:"width 0.15s linear" }} />
        </div>
        <span style={{ fontSize:"0.58rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.4)" }}>
          {String(section).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}
        </span>
      </div>
    </div>
  );
};
