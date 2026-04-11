"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import {
    Clock, PerspectiveCamera, Scene, WebGLRenderer, SRGBColorSpace, MathUtils,
    Vector2, Vector3, MeshPhysicalMaterial, Color, Object3D, InstancedMesh,
    PMREMGenerator, SphereGeometry, AmbientLight, PointLight, ACESFilmicToneMapping,
    Raycaster, Plane,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "next-themes";
import { Mail, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// --- Three.js Boilerplate Class (X) ---
class X {
    _config: any;
    _resizeObserver?: ResizeObserver;
    _intersectionObserver?: IntersectionObserver;
    _resizeTimer?: number;
    _animationFrameId: number = 0;
    _clock: Clock = new Clock();
    _animationState = { elapsed: 0, delta: 0 };
    _isAnimating: boolean = false;
    _isVisible: boolean = false;
    canvas: HTMLCanvasElement;
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    size: any = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
    onBeforeRender: (state: { elapsed: number; delta: number }) => void = () => {};
    onAfterResize: (size: any) => void = () => {};

    constructor(config: any) {
        this._config = config;
        this.canvas = this._config.canvas;
        this.camera = new PerspectiveCamera(50, 1, 0.1, 100);
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            powerPreference: "high-performance",
            alpha: true,
            antialias: true,
        });
        this.renderer.outputColorSpace = SRGBColorSpace;
        this.canvas.style.display = "block";
        this._initObservers();
        this.resize();
    }
    _initObservers() {
        const parentEl = this._config.size === "parent" ? this.canvas.parentNode as Element : null;
        if (parentEl) {
            this._resizeObserver = new ResizeObserver(this._onResize.bind(this));
            this._resizeObserver.observe(parentEl);
        } else {
            window.addEventListener("resize", this._onResize.bind(this));
        }
        this._intersectionObserver = new IntersectionObserver(this._onIntersection.bind(this), { threshold: 0 });
        this._intersectionObserver.observe(this.canvas);
        document.addEventListener("visibilitychange", this._onVisibilityChange.bind(this));
    }
    _onResize() {
        if (this._resizeTimer) clearTimeout(this._resizeTimer);
        this._resizeTimer = window.setTimeout(this.resize.bind(this), 100);
    }
    resize() {
        const parentEl = this._config.size === "parent" ? this.canvas.parentNode as HTMLElement : null;
        const w = parentEl ? parentEl.offsetWidth : window.innerWidth;
        const h = parentEl ? parentEl.offsetHeight : window.innerHeight;
        this.size.width = w; this.size.height = h; this.size.ratio = w / h;
        this.camera.aspect = this.size.ratio; this.camera.updateProjectionMatrix();
        const fovRad = (this.camera.fov * Math.PI) / 180;
        this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.z;
        this.size.wWidth = this.size.wHeight * this.camera.aspect;
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.onAfterResize(this.size);
    }
    _onIntersection(e: any) {
        this._isAnimating = e[0].isIntersecting;
        this._isAnimating ? this._startAnimation() : this._stopAnimation();
    }
    _onVisibilityChange() {
        if (this._isAnimating) document.hidden ? this._stopAnimation() : this._startAnimation();
    }
    _startAnimation() {
        if (this._isVisible) return;
        this._isVisible = true;
        this._clock.start();
        const f = () => {
            this._animationFrameId = requestAnimationFrame(f);
            this._animationState.delta = this._clock.getDelta();
            this._animationState.elapsed += this._animationState.delta;
            this.onBeforeRender(this._animationState);
            this.renderer.render(this.scene, this.camera);
        };
        f();
    }
    _stopAnimation() {
        if (this._isVisible) {
            cancelAnimationFrame(this._animationFrameId);
            this._isVisible = false;
            this._clock.stop();
        }
    }
    dispose() {
        this._stopAnimation();
        this._resizeObserver?.disconnect();
        this._intersectionObserver?.disconnect();
        window.removeEventListener("resize", this._onResize.bind(this));
        document.removeEventListener("visibilitychange", this._onVisibilityChange.bind(this));
        this.scene.clear();
        this.renderer.dispose();
    }
}

// --- Physics Engine Class (W) ---
class W {
    config: any;
    positionData: Float32Array;
    velocityData: Float32Array;
    sizeData: Float32Array;
    center: Vector3 = new Vector3();

    constructor(config: any) {
        this.config = config;
        this.positionData = new Float32Array(3 * config.count);
        this.velocityData = new Float32Array(3 * config.count);
        this.sizeData = new Float32Array(config.count);
        this._initializePositions();
        this.setSizes();
    }
    _initializePositions() {
        const { count, maxX, maxY, maxZ } = this.config;
        this.center.toArray(this.positionData, 0);
        for (let i = 1; i < count; i++) {
            const idx = 3 * i;
            this.positionData[idx]     = MathUtils.randFloatSpread(2 * maxX);
            this.positionData[idx + 1] = MathUtils.randFloatSpread(2 * maxY);
            this.positionData[idx + 2] = MathUtils.randFloatSpread(2 * maxZ);
        }
    }
    setSizes() {
        const { count, size0, minSize, maxSize } = this.config;
        this.sizeData[0] = size0;
        for (let i = 1; i < count; i++) this.sizeData[i] = MathUtils.randFloat(minSize, maxSize);
    }
    update(deltaInfo: { delta: number }) {
        const { config, center, positionData, sizeData, velocityData } = this;
        const startIdx = config.controlSphere0 ? 1 : 0;
        if (config.controlSphere0) {
            new Vector3().fromArray(positionData, 0).lerp(center, 0.1).toArray(positionData, 0);
            new Vector3(0, 0, 0).toArray(velocityData, 0);
        }
        for (let i = startIdx; i < config.count; i++) {
            const base = 3 * i;
            const pos = new Vector3().fromArray(positionData, base);
            const vel = new Vector3().fromArray(velocityData, base);
            vel.y -= deltaInfo.delta * config.gravity * sizeData[i];
            vel.multiplyScalar(config.friction);
            vel.clampLength(0, config.maxVelocity);
            pos.add(vel);
            for (let j = i + 1; j < config.count; j++) {
                const otherBase = 3 * j;
                const otherPos = new Vector3().fromArray(positionData, otherBase);
                const diff = new Vector3().subVectors(otherPos, pos);
                const dist = diff.length();
                const sumRadius = sizeData[i] + sizeData[j];
                if (dist < sumRadius) {
                    const overlap = (sumRadius - dist) * 0.5;
                    diff.normalize();
                    pos.addScaledVector(diff, -overlap);
                    otherPos.addScaledVector(diff, overlap);
                    pos.toArray(positionData, base);
                    otherPos.toArray(positionData, otherBase);
                }
            }
            // Walls: bounce and settle — NO wrapping/looping
            if (Math.abs(pos.x) + sizeData[i] > config.maxX) { pos.x = Math.sign(pos.x) * (config.maxX - sizeData[i]); vel.x *= -config.wallBounce; }
            if (pos.y - sizeData[i] < -config.maxY)            { pos.y = -config.maxY + sizeData[i];                     vel.y *= -config.wallBounce; }
            if (Math.abs(pos.z) + sizeData[i] > config.maxZ) { pos.z = Math.sign(pos.z) * (config.maxZ - sizeData[i]); vel.z *= -config.wallBounce; }
            pos.toArray(positionData, base);
            vel.toArray(velocityData, base);
        }
    }
}

// --- Instanced Spheres Class (Z) ---
const U = new Object3D();
class Z extends InstancedMesh {
    config: any;
    physics: W;
    ambientLight: AmbientLight;
    light: PointLight;
    constructor(renderer: WebGLRenderer, params: any) {
        const pmrem = new PMREMGenerator(renderer);
        const envTexture = pmrem.fromScene(new RoomEnvironment()).texture;
        pmrem.dispose();
        const geometry = new SphereGeometry(1, 24, 24);
        const material = new MeshPhysicalMaterial({ envMap: envTexture, ...params.materialParams });
        super(geometry, material, params.count);
        this.config = params;
        this.physics = new W(this.config);
        this.ambientLight = new AmbientLight(0xffffff, params.ambientIntensity);
        this.add(this.ambientLight);
        this.light = new PointLight(0xffffff, params.lightIntensity, 100, 1);
        this.add(this.light);
        this.setColors(this.config.colors);
    }
    setColors(colors: (string | Color)[]) {
        if (!Array.isArray(colors) || !colors.length) return;
        const colorObjs = colors.map(c => c instanceof Color ? c : new Color(c));
        for (let i = 0; i < this.count; i++) this.setColorAt(i, colorObjs[i % colorObjs.length]);
        if (this.instanceColor) this.instanceColor.needsUpdate = true;
    }
    update(deltaInfo: { delta: number }) {
        this.physics.update(deltaInfo);
        for (let i = 0; i < this.count; i++) {
            U.position.fromArray(this.physics.positionData, 3 * i);
            U.scale.setScalar(this.physics.sizeData[i]);
            U.updateMatrix();
            this.setMatrixAt(i, U.matrix);
        }
        this.instanceMatrix.needsUpdate = true;
        if (this.config.controlSphere0) this.light.position.fromArray(this.physics.positionData, 0);
    }
}

// --- Pointer Logic ---
const pointer = new Vector2();
function onPointerMove(e: PointerEvent) {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
}

// --- Default Props ---
const defaultBallpitConfig = {
    count: 200,
    materialParams: { metalness: 0.7, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.2 },
    minSize: 0.3, maxSize: 0.8, size0: 1.0,
    gravity: 0.4, friction: 0.995, wallBounce: 0.2, maxVelocity: 0.1,
    maxX: 10, maxY: 10, maxZ: 10,
    controlSphere0: true, followCursor: true,
    lightIntensity: 3, ambientIntensity: 1.5,
};

const darkColors = ["#3b0764", "#1e1b4b", "#0f172a", "#1a1a1a", "#0d0d0d"];

type BallpitProps = Partial<typeof defaultBallpitConfig & { colors: (string | Color)[] }>;

interface InteractiveHeroProps {
    title?: React.ReactNode;
    subtitle?: string;
    description?: string;
    emailPlaceholder?: string;
    className?: string;
    ballpitConfig?: BallpitProps;
}

// --- Main React Component ---
export const InteractiveHero: React.FC<InteractiveHeroProps> = ({
    title,
    subtitle,
    description,
    emailPlaceholder = "your@email.com",
    className,
    ballpitConfig = {},
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const [email, setEmail] = useState('');

    const config = useMemo(() => ({
        ...defaultBallpitConfig,
        ...ballpitConfig,
        colors: (ballpitConfig as any).colors ?? darkColors,
    }), [ballpitConfig]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const three = new X({ canvas, size: "parent" });
        three.renderer.toneMapping = ACESFilmicToneMapping;
        three.camera.position.set(0, 0, 20);

        const spheres = new Z(three.renderer, config);
        three.scene.add(spheres);

        const raycaster = new Raycaster();
        const plane = new Plane(new Vector3(0, 0, 1), 0);
        const intersectionPoint = new Vector3();

        if (config.followCursor) window.addEventListener("pointermove", onPointerMove);

        three.onBeforeRender = (deltaInfo) => {
            if (config.followCursor) {
                raycaster.setFromCamera(pointer, three.camera);
                if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
                    spheres.physics.center.copy(intersectionPoint);
                }
            }
            spheres.update(deltaInfo);
        };

        three.onAfterResize = (size) => {
            spheres.physics.config.maxX = size.wWidth / 2;
            spheres.physics.config.maxY = size.wHeight / 2;
            spheres.physics.config.maxZ = size.wWidth / 4;
        };

        return () => {
            if (config.followCursor) window.removeEventListener("pointermove", onPointerMove);
            three.dispose();
        };
    }, [config]);

    return (
        <div className={cn("relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center", className)}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

            {/* Dark overlay — heavier at top so title pops */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
            {/* Bottom gradient — blends hero into the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

            {/* Hero content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
                {title}
                {subtitle && (
                    <p className="text-neutral-300 text-2xl md:text-3xl font-light mb-4 tracking-tight">{subtitle}</p>
                )}
                {description && (
                    <p className="text-neutral-500 text-base md:text-lg max-w-2xl leading-relaxed mb-10">{description}</p>
                )}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
                >
                    <div className="relative w-full">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <input
                            type="email"
                            placeholder={emailPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 text-white placeholder-neutral-600 pl-11 pr-4 py-3 rounded-full focus:outline-none focus:border-white/30 transition backdrop-blur-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 bg-white text-black font-semibold px-7 py-3 rounded-full hover:bg-neutral-200 transition"
                    >
                        Notify Me <ArrowRight className="h-4 w-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};

// Also export as BallpitHero alias so the Chapabiz page import keeps working
export const BallpitHero = InteractiveHero;
