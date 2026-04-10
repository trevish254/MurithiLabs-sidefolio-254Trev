"use client";

import React from "react";
import { motion } from "framer-motion";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, Float, Environment, RenderTexture, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";



const PortraitModel = () => {
  const { scene } = useGLTF("/assets/Purple-Neon-Portrait_019d2bbc-b580-73c8-a5c7-62eeb4326081.glb");
  const meshRef = React.useRef<THREE.Group>(null);

  // Clone the scene — we own the clone so GLTF cache cannot reset materials
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone(true);

    const whiteMatte = new THREE.MeshStandardMaterial({
      color: "#e0e0e0",
      roughness: 0.9,
      metalness: 0.0,
      // DoubleSide fixes inverted normals from GLTF exports — renders both faces
      side: THREE.DoubleSide,
    });

    clone.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.material = whiteMatte;
        if (node.geometry) {
          const geo = node.geometry.clone();
          geo.deleteAttribute("color");
          // Recompute normals so lighting hits correctly regardless of original export
          geo.computeVertexNormals();
          node.geometry = geo;
        }
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x } = state.mouse;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = (time * 0.1) + (x * 0.2);
  });

  return (
    <group ref={meshRef}>
      {/* WHITE MATTE SCULPTURE — using cloned scene with overridden materials */}
      <primitive object={clonedScene} scale={2.8} position={[0, -0.2, 0]} />
      
      {/* YELLOW CUBE PEDESTAL */}
      <mesh position={[0, -4.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 4.2, 4.2]} />
        <meshStandardMaterial
          color="#F0A500"
          roughness={0.3}
          metalness={0.1}
        >
          {/* Live render of spinning neon toruses projected onto every face */}
          <RenderTexture attach="map" samples={4}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <color attach="background" args={["#0a0a0a"]} />
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 5]} intensity={10} />
            <InternalScene />
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};





const InternalScene = () => {
  const blueRef = React.useRef<THREE.Mesh>(null);
  const yellowRef = React.useRef<THREE.Mesh>(null);
  const greenRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (blueRef.current) {
      blueRef.current.rotation.x = t * 1.5;
      blueRef.current.rotation.y = t * 0.8;
      blueRef.current.position.y = Math.sin(t) * 0.5;
    }
    if (yellowRef.current) {
      yellowRef.current.rotation.x = t * -1.2;
      yellowRef.current.rotation.z = t * 1.1;
      yellowRef.current.position.y = Math.cos(t) * 0.3;
    }
    if (greenRef.current) {
      greenRef.current.rotation.y = t * 2.1;
      greenRef.current.rotation.z = t * -0.5;
      greenRef.current.position.x = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* BLUE TORUS */}
      <mesh ref={blueRef} position={[-1.2, 0, 0]}>
        <torusGeometry args={[0.5, 0.15, 32, 64]} />
        <meshBasicMaterial color="#3b82f6" toneMapped={false} />
      </mesh>
      
      {/* YELLOW TORUS */}
      <mesh ref={yellowRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.4, 0.12, 32, 64]} />
        <meshBasicMaterial color="#facc15" toneMapped={false} />
      </mesh>

      {/* GREEN TORUS */}
      <mesh ref={greenRef} position={[1.2, 0, 0]}>
        <torusGeometry args={[0.5, 0.15, 32, 64]} />
        <meshBasicMaterial color="#22c55e" toneMapped={false} />
      </mesh>
    </group>
  );
};













const VideoHero = () => {
  return (
    <section className="relative w-full h-screen min-h-[700px] bg-black overflow-hidden flex flex-col md:flex-row items-center">
      
      {/* ── LEFT COLUMN: VIDEO ── */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center bg-black">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-xl aspect-video relative overflow-hidden"
        >
          <video
            src="/assets/hero section video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5" />
        </motion.div>
      </div>

      {/* ── RIGHT COLUMN: 3D + TYPOGRAPHY ── */}
      <div className="relative w-full md:w-1/2 h-full flex flex-col items-center justify-center bg-black px-12">
        
        {/* Background Large Text (Reference Design) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
          <h1 className="text-[30vw] font-black text-white tracking-tighter leading-none">
            SCHUB
          </h1>
        </div>

        {/* 3D Portrait Model */}
        <div className="relative z-10 w-full h-[500px]">
          <Canvas 
            camera={{ position: [0, 0, 18], fov: 25 }} 
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} 
            dpr={[1, 1.5]}
            shadows
          >
            <React.Suspense fallback={null}>
              {/* ── STUDIO LIGHTING FOR 3D DEPTH ── */}
              <ambientLight intensity={0.4} />

              {/* KEY LIGHT — main light from top-left, casts shadows */}
              <directionalLight
                position={[-6, 10, 8]}
                intensity={1.2}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />

              {/* FILL LIGHT — soft from the right, lifts shadow areas */}
              <directionalLight
                position={[8, 4, 6]}
                intensity={0.5}
                color="#dceeff"
              />

              {/* RIM LIGHT — behind the model, separates it from background */}
              <directionalLight
                position={[0, 6, -10]}
                intensity={0.6}
                color="#ffffff"
              />

              {/* UNDER LIGHT — subtle bounce from the pedestal */}
              <pointLight position={[0, -3, 4]} intensity={0.2} color="#f0f0f0" />

              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <PortraitModel />
              </Float>

              <Environment resolution={512}>
                <group rotation={[-Math.PI / 4, 0, 0]}>
                  {/* Procedural 'studio' reflectors */}
                  <mesh position={[0, 10, -10]} scale={[25, 10, 1]}>
                    <planeGeometry />
                    <meshBasicMaterial color="white" />
                  </mesh>
                  <mesh position={[-15, 2, -5]} rotation={[0, Math.PI / 4, 0]} scale={[10, 20, 1]}>
                    <planeGeometry />
                    <meshBasicMaterial color="white" />
                  </mesh>
                  <mesh position={[15, 2, -5]} rotation={[0, -Math.PI / 4, 0]} scale={[10, 20, 1]}>
                    <planeGeometry />
                    <meshBasicMaterial color="white" />
                  </mesh>
                </group>
              </Environment>
            </React.Suspense>
          </Canvas>
        </div>

        {/* Branding Subtext */}
        <div className="relative z-20 mt-8 text-center md:text-left w-full max-w-md">
           <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight"
           >
              Your story builds<br />
              <span className="text-white/40">our history.</span>
           </motion.h2>
        </div>

      </div>

      {/* ── COMMON ELEMENTS ── */}
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent z-40 pointer-events-none" />
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/40 text-[9px] uppercase tracking-[0.5em] font-bold">Scroll to Explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent mt-1" />
      </motion.div>
    </section>


  );
};

export default VideoHero;
