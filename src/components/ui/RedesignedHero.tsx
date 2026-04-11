"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useGLTF, 
  Environment, 
  useVideoTexture, 
  ContactShadows, 
  SpotLight, 
  Float,
  MeshReflectorMaterial
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const MonitorModel = () => {
  const { scene } = useGLTF("/assets/ultrawide_monitor.glb");
  // @ts-ignore
  const videoTexture = useVideoTexture(encodeURI("/assets/intro vid.mp4"));
  const meshRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (node.material.name.toLowerCase().includes("screen")) {
          node.material.map = videoTexture;
          node.material.emissiveMap = videoTexture;
          node.material.emissiveIntensity = 2.5;
          node.material.needsUpdate = true;
        }
        // Enhance metalness for better reflections
        if (node.material instanceof THREE.MeshStandardMaterial) {
          node.material.metalness = 0.9;
          node.material.roughness = 0.1;
        }
      }
    });
  }, [scene, videoTexture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mouseX = state.mouse.x;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX * 0.4, 0.05);
  });

  return <primitive ref={meshRef} object={scene} scale={1.3} position={[0, -2.5, 0]} />;
};

const MonitorCanvas = () => {
  return (
    <Canvas 
      shadows 
      dpr={[1, 1.5]}
      camera={{ position: [0, 4, 35], fov: 30 }}
      gl={{ antialias: true, stencil: false, depth: true, toneMapping: THREE.ACESFilmicToneMapping, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 25, 60]} />

      <React.Suspense fallback={null}>
        
        {/* ── LIGHTING ── */}
        <ambientLight intensity={1.5} />
        
        {/* Main dramatic spotlight with shadow support */}
        {/* @ts-ignore */}
        <SpotLight
          position={[0, 30, 10]}
          angle={0.25}
          penumbra={1}
          intensity={150}
          castShadow
          color="#ffffff"
          attenuation={15}
          distance={100}
        />

        {/* Dynamic colored accent lights for vibe */}
        <pointLight position={[-15, 8, 10]} intensity={50} color="#8b5cf6" />
        <pointLight position={[15, 8, 10]} intensity={50} color="#ec4899" />
        <pointLight position={[0, -5, 15]} intensity={30} color="#3b82f6" />

        <MonitorModel />

        {/* ── FLOOR WITH REFLECTIONS ── */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.5, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.5}
            maxDepthThreshold={1.5}
            color="#070707"
            metalness={0.8}
            mirror={0}
          />
        </mesh>

        {/* Soft contact shadows beneath monitor */}
        <ContactShadows 
          position={[0, -5.45, 0]} 
          opacity={0.7} 
          scale={40} 
          blur={3} 
          far={15} 
          color="#000000"
        />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh position={[0, 5, -9]} scale={[10, 10, 1]}>
              <planeGeometry />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0, 5, -1]} scale={[10, 1, 1]}>
              <planeGeometry />
              <meshBasicMaterial color="white" />
            </mesh>
          </group>
        </Environment>

      </React.Suspense>
    </Canvas>
  );
};

/**
 * RedesignedHero - High Fidelity 3D Environment with balanced split and tools carousel.
 */
const TOOLS = ["Next.js", "React", "TypeScript", "Three.js", "Tailwind CSS", "Framer Motion", "Node.js", "WebGL", "GSAP"];

const RedesignedHero = () => {
  const toolsLoop = [...TOOLS, ...TOOLS, ...TOOLS];

  return (
    <section 
      className="relative w-full h-[90vh] bg-[#030303] overflow-hidden flex items-center select-none group/hero"
    >
      {/* Environmental Ambiance - Darkened */}

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full max-w-[1600px] mx-auto px-10 md:px-20 items-end pb-24 gap-10 relative z-20">
        
        {/* LEFT: Contextual Content & Tools */}
        <div className="flex flex-col space-y-8 z-20 mb-4">
          <div className="space-y-3 max-w-lg">
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-medium leading-snug tracking-tight">
              We help startups design and develop <span className="text-neutral-500 italic font-serif">identities</span>, websites & products that attract users & investors.
            </h2>
            <p className="text-white/60 text-sm md:text-base font-medium tracking-tight">
              Stunning work, lightning fast, flat fee of $35k.
            </p>
          </div>

          {/* Frameworks & Tools Carousel */}
          <div className="pt-6 overflow-hidden relative">
            <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mb-4 font-bold">Frameworks & Tools</p>
            <div className="relative flex overflow-hidden">
               <motion.div 
                 animate={{ x: [0, -1000] }}
                 transition={{ 
                   duration: 30, 
                   repeat: Infinity, 
                   ease: "linear" 
                 }}
                 className="flex space-x-12 whitespace-nowrap items-center"
               >
                 {toolsLoop.map((tool, i) => (
                   <span key={i} className="text-white/20 text-sm font-bold tracking-widest hover:text-white/60 transition-colors cursor-default uppercase">
                     {tool}
                   </span>
                 ))}
               </motion.div>
               {/* Mask for smooth fading edges */}
               <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030303] to-transparent z-10" />
               <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030303] to-transparent z-10" />
            </div>
          </div>

          {/* Trusted By Logos (Subtle) */}
          <div className="pt-8 flex flex-wrap items-center gap-x-10 gap-y-6 opacity-20 hover:opacity-100 transition-opacity duration-700">
             <span className="text-white text-lg font-bold tracking-tighter uppercase italic">MIXTILES</span>
             <span className="text-white text-lg font-serif tracking-tight">Inner Balance</span>
             <span className="text-white text-xl font-black italic tracking-tighter">Ūnder</span>
             <span className="text-white text-lg font-bold tracking-widest relative">NBA TRIPS</span>
          </div>
        </div>

        {/* RIGHT: 3D Scene */}
        <div className="relative w-full h-[500px] lg:h-full z-10 lg:-mr-20">
          <MonitorCanvas />
          {/* Subtle gradient edges to blend 3D canvas with the rest of the UI */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        </div>

      </div>
    </section>
  );
};


export default RedesignedHero;
