"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function OrganicShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1.5, 32]} />
        <MeshDistortMaterial
          color="#4ade80" // theme accent
          attach="material"
          distort={0.4} // amount of distortion (asymmetric)
          speed={1.5} // speed of distortion
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function HeroAnimation() {
  return (
    <div className="h-full w-full relative min-h-[400px] flex items-center justify-center overflow-hidden rounded-sm border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--panel)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrganicShape />
      </Canvas>
      <div className="absolute bottom-4 left-4 font-mono-label text-[10px] uppercase tracking-wider text-muted">
        AI Pipeline Model // Abstract Representation
      </div>
    </div>
  );
}
