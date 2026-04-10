"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  ScrollControls, 
  Scroll, 
  useScroll,
  Float, 
  Text, 
  MeshDistortMaterial, 
  Sphere, 
  Stars,
  PerspectiveCamera,
  Line,
  Points,
  PointMaterial,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import { Github, Mail, ExternalLink, Code, Database, Cpu, Activity, Layout, Layers } from "lucide-react";
import { extend } from "@react-three/fiber";

// Register all THREE elements
extend(THREE);

// --- Components ---

function ParticleField() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, []);

  return (
    <Points positions={points}>
      <pointsMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function HolographicPanel({ position, title, subtitle, content, buttonText }: any) {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.4} />
      </mesh>
      <Line
        points={[[-3, 2, 0], [3, 2, 0], [3, -2, 0], [-3, -2, 0], [-3, 2, 0]]}
        color="#ffffff"
        lineWidth={2}
      />
      
      <Text
        position={[0, 1, 0.1]}
        fontSize={0.4}
        color="#ffffff"
        font="/fonts/Inter-Bold.ttf"
      >
        {title}
      </Text>
      
      <Text
        position={[0, 0.4, 0.1]}
        fontSize={0.2}
        color="#cccccc"
        maxWidth={5}
        textAlign="center"
      >
        {subtitle}
      </Text>

      <Text
        position={[0, -0.4, 0.1]}
        fontSize={0.15}
        color="#ffffff"
        maxWidth={5}
        textAlign="center"
      >
        {content}
      </Text>

      {buttonText && (
        <mesh position={[0, -1.2, 0.1]}>
          <planeGeometry args={[2, 0.6]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.15}
            color="#ffffff"
          >
            {buttonText}
          </Text>
        </mesh>
      )}
    </group>
  );
}

function FloatingObject({ position, color, icon: Icon }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={2} />
      </mesh>
      <Html distanceFactor={10}>
        <div className="text-neutral-300 opacity-50">
          <Icon size={20} />
        </div>
      </Html>
    </group>
  );
}

function ProjectCard({ position, title, description, color, index }: any) {
  const [hovered, setHovered] = React.useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const targetScale = hovered ? 1.1 : 1;
    const targetRotateY = hovered ? 0.2 : 0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotateY, 0.15);
  });
  
  return (
    <group 
      position={position} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial 
          color={hovered ? "#1a1a1a" : "#050505"} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
      
      <Line
        points={[[-1.5, 2, 0], [1.5, 2, 0], [1.5, -2, 0], [-1.5, -2, 0], [-1.5, 2, 0]]}
        color={hovered ? color : "#ffffff"}
        lineWidth={2}
      />

      <Text
        position={[0, 1.2, 0.1]}
        fontSize={0.25}
        color="#ffffff"
        maxWidth={2.5}
        textAlign="center"
      >
        {title}
      </Text>

      <Text
        position={[0, 0, 0.1]}
        fontSize={0.12}
        color="#cccccc"
        maxWidth={2.5}
        textAlign="left"
      >
        {description}
      </Text>

      {hovered && (
        <Text
          position={[0, -1.5, 0.1]}
          fontSize={0.15}
          color={color}
        >
          VIEW PROJECT
        </Text>
      )}
    </group>
  );
}

function SkillNode({ position, title, color }: any) {
  return (
    <group position={position}>
      <Sphere args={[0.2, 32, 32]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </Sphere>
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.15}
        color="#ffffff"
      >
        {title}
      </Text>
      <Line
        points={[[0, 0, 0], [Math.random() - 0.5, Math.random() - 0.5, -2]]}
        color={color}
        opacity={0.2}
        transparent
      />
    </group>
  );
}

// --- Main Scene ---

function LabEnvironment() {
  return (
    <group>
      {/* Grid Floor */}
      <gridHelper args={[100, 50, "#ffffff", "#050505"]} position={[0, -10, 0]} />
      
      {/* Structural Elements */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i} position={[(i - 5) * 15, 0, -20]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.2, 50, 0.2]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[7.5, 10, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.2, 15, 0.2]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Floating Wires/Lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Line
          key={`line-${i}`}
          points={[
            [Math.random() * 40 - 20, Math.random() * 40 - 20, -10],
            [Math.random() * 40 - 20, Math.random() * 40 - 20, -30]
          ]}
          color="#ffffff"
          opacity={0.1}
          transparent
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function Scene() {
  const { viewport } = useThree();
  const scroll = useScroll();
  const cameraRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const offset = scroll.offset;
    // Smooth camera movement through sections
    state.camera.position.y = -offset * viewport.height * 5;
    state.camera.lookAt(0, -offset * viewport.height * 5, -10);
  });
  
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 30]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -5, 5]} intensity={1} color="#ffffff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ParticleField />
      <LabEnvironment />

      <group>
        {/* Section 0: Hero */}
        <group position={[0, 0, 0]}>
          <HolographicPanel 
            title="TREVOR"
            subtitle="Systems Builder & Digital Innovator"
            content="I build systems, platforms, and tools that help people work smarter."
            buttonText="Explore My Work"
          />
          
          <FloatingObject position={[-5, 3, -3]} color="#ffffff" icon={Code} />
          <FloatingObject position={[5, -3, -3]} color="#ffffff" icon={Activity} />
          <FloatingObject position={[4, 4, -4]} color="#ffffff" icon={Database} />
          <FloatingObject position={[-4, -4, -5]} color="#ffffff" icon={Cpu} />
        </group>

        {/* Section 1: Projects */}
        <group position={[0, -viewport.height * 1, -2]}>
          <Text position={[0, 6, -2]} fontSize={0.6} color="#ffffff" font="/fonts/Inter-Bold.ttf">PROJECTS</Text>
          
          <ProjectCard 
            position={[-4.5, 1, 0]} 
            title="Chapabiz" 
            description="Business Operating System Platform. Streamlining operations for local businesses."
            color="#ffffff"
          />
          <ProjectCard 
            position={[4.5, 1, 0]} 
            title="Nyeridocs" 
            description="Advanced document architecture for the Nyeri National Polytechnic."
            color="#ffffff"
          />
          <ProjectCard 
            position={[-4.5, -3.5, 0]} 
            title="AI Agri Assistant" 
            description="Intelligent system for modernizing agricultural data and decision making."
            color="#ffffff"
          />
          <ProjectCard 
            position={[4.5, -3.5, 0]} 
            title="Local POS Tools" 
            description="Custom point-of-sale systems tailored for small business efficiency."
            color="#ffffff"
          />
        </group>

        {/* Section 2: Skills */}
        <group position={[0, -viewport.height * 2, -2]}>
          <Text position={[0, 5, -2]} fontSize={0.6} color="#ffffff" font="/fonts/Inter-Bold.ttf">POWER STACK</Text>
          
          <group position={[0, 0, 0]}>
            <SkillNode position={[-3, 2, 0]} title="Next.js" color="#ffffff" />
            <SkillNode position={[-1, 2.5, -1]} title="Astro" color="#ffffff" />
            <SkillNode position={[2, 2, 0]} title="Tailwind" color="#ffffff" />
            
            <SkillNode position={[-2.5, -1, 1]} title="Supabase" color="#ffffff" />
            <SkillNode position={[0, -1.5, 0]} title="Node.js" color="#ffffff" />
            <SkillNode position={[2.5, -1, 1]} title="PostgreSQL" color="#ffffff" />
            
            <SkillNode position={[0, 0.5, -2]} title="AI Design" color="#ffffff" />
          </group>
        </group>

        {/* Section 3: Experiments */}
        <group position={[0, -viewport.height * 3, -2]}>
          <Text position={[0, 5, -2]} fontSize={0.6} color="#ffffff" font="/fonts/Inter-Bold.ttf">LAB EXPERIMENTS</Text>
          
          <mesh position={[-4, 0, 0]}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <MeshDistortMaterial
              color="#ffffff"
              speed={5}
              distort={0.4}
              radius={1}
            />
          </mesh>
          
          <group position={[3, 0, 0]}>
            <Text position={[0, 1.5, 0]} fontSize={0.3} color="#ffffff" maxWidth={5}>Curiosity-Driven Dev</Text>
            <Text position={[0, 0, 0]} fontSize={0.18} color="#ffffff" maxWidth={6} textAlign="left">
               • WiFi Motion Detection Experiments{"\n"}
               • Edge AI Implementation{"\n"}
               • Hardware Automation Interfaces{"\n"}
               • System Architecture Thinking
            </Text>
          </group>
        </group>

        {/* Section 4: Vision */}
        <group position={[0, -viewport.height * 4, -2]}>
          <Text position={[0, 5, -2]} fontSize={0.6} color="#ffffff" font="/fonts/Inter-Bold.ttf">THE VISION</Text>
          
          <Points>
            <PointMaterial color="#ffffff" size={0.02} />
            <sphereGeometry args={[3, 32, 32]} />
          </Points>
          
          <Text position={[0, 0, 1]} fontSize={0.3} maxWidth={8} textAlign="center" color="#ffffff">
            "My goal is to build platforms that help businesses grow and operate intelligently through connected digital ecosystems."
          </Text>
        </group>

        {/* Section 5: Connect */}
        <group position={[0, -viewport.height * 5, 0]}>
           <HolographicPanel 
            title="LET&apos;S BUILD"
            subtitle="Secure Terminal Hub"
            content="Always open for collaboration on systems that matter."
            buttonText="Initiate Contact"
          />
          
          <group position={[0, -2.5, 0]}>
             <Html center>
               <div className="flex space-x-8 text-neutral-300 bg-black/50 p-6 rounded-full border border-white/10 backdrop-blur-xl">
                  <a href="https://github.com/trevor" target="_blank" className="hover:text-white hover:scale-125 transition-all text-neutral-400">
                    <Github size={32} />
                  </a>
                  <a href="mailto:trevor@example.com" className="hover:text-white hover:scale-125 transition-all text-neutral-400">
                    <Mail size={32} />
                  </a>
                  <a href="#" className="hover:text-white hover:scale-125 transition-all text-neutral-400">
                    <Layers size={32} />
                  </a>
               </div>
             </Html>
          </group>
        </group>
      </group>
    </>
  );
}

export default function Experience() {
  return (
    <div className="w-full h-screen bg-black fixed inset-0">
      <Suspense fallback={
        <div className="text-neutral-400 flex flex-col items-center justify-center h-full gap-4 font-mono">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <div className="animate-pulse">BOOTING INNOVATION LAB...</div>
        </div>
      }>
        <Canvas 
          flat 
          shadows={false} 
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 2]}
        >
           <ScrollControls pages={6} damping={0.1}>
              <Scene />
           </ScrollControls>
        </Canvas>
      </Suspense>

      {/* Overlay UI elements */}
      <div className="fixed top-8 left-8 z-10 pointer-events-none hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-white rounded-full animate-ping" />
          <h1 className="text-neutral-300 font-mono text-sm tracking-widest uppercase opacity-70">Lab_Status: Active</h1>
        </div>
        <div className="mt-4 text-[10px] font-mono text-neutral-400/40 leading-tight">
          SCANNING PORTFOLIO DATA...<br />
          IDENTIFYING SKILLS NODES...<br />
          MAPPING VISION NETWORK...
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-10 pointer-events-none">
        <div className="text-neutral-300 font-mono text-xs opacity-50 text-right">
          COORD_X: TREVOR<br />
          VERSION: 3.0.0-PRO<br />
          UPTIME: 100%
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none md:block hidden">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="text-[10px] font-mono text-neutral-300">SCROLL TO EXPLORE</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </div>
    </div>
  );
}
