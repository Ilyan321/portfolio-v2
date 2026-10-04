"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

const LAYER_COUNT = 7;

function ScanStack({ panelColor, accentColor }: { panelColor: string; accentColor: string }) {
  const activeRef = useRef(0);
  const groupRef = useRef<THREE.Group>(null);
  const planeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    activeRef.current += delta * 0.6;
    const cycle = (Math.sin(activeRef.current) + 1) / 2;
    const activeIndex = cycle * (LAYER_COUNT - 1);

    planeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const distance = Math.abs(i - activeIndex);
      const intensity = Math.max(0, 1 - distance);
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = intensity * 1.2;
      material.opacity = 0.35 + intensity * 0.5;
    });
  });

  const layers = useMemo(
    () =>
      Array.from({ length: LAYER_COUNT }, (_, i) => ({
        y: (i - (LAYER_COUNT - 1) / 2) * 0.5,
        key: `layer-${i}`,
      })),
    []
  );

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={groupRef}>
        {layers.map((layer, i) => (
          <mesh
            key={layer.key}
            position={[0, layer.y, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            ref={(el) => {
              planeRefs.current[i] = el;
            }}
          >
            <planeGeometry args={[2.4, 2.4]} />
            <meshStandardMaterial
              color={panelColor}
              emissive={accentColor}
              emissiveIntensity={0.2}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              roughness={0.6}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function resolveCssVar(name: string, fallbackHex: string) {
  if (typeof window === "undefined") return fallbackHex;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallbackHex;
}

export default function Scene3D() {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState({ panel: "#0B2B26", accent: "#8EB69B" });
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColors({
      panel: resolveCssVar("--panel", "#0B2B26"),
      accent: resolveCssVar("--accent", "#8EB69B"),
    });
  }, [resolvedTheme]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);

    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [3, 1.5, 3], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={0.9} />
        <ScanStack panelColor={colors.panel} accentColor={colors.accent} />
      </Canvas>
    </div>
  );
}
