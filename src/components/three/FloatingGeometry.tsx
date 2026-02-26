"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Central wireframe globe — optimized polygon count
function WireframeGlobe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Main sphere — reduced from 32 to 24 segments */}
      <mesh>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshBasicMaterial color="#6c63ff" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Horizontal ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 4, 64]} />
        <meshBasicMaterial color="#6c63ff" transparent opacity={0.15} />
      </mesh>

      {/* Tilted ring */}
      <mesh rotation={[Math.PI / 2.5, 0.4, 0.2]}>
        <torusGeometry args={[2.5, 0.006, 4, 64]} />
        <meshBasicMaterial color="#00c6ff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

// Floating diamonds — reduced count
function FloatingDiamond({
  position,
  color,
  speed,
  rotationSpeed,
  scale = 0.12,
  opacity = 0.2,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  rotationSpeed: number;
  scale?: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.z += delta * rotationSpeed * 0.7;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
      </mesh>
    </Float>
  );
}

export function FloatingGeometry() {
  return (
    <group>
      <WireframeGlobe />

      {/* Reduced from 8 to 5 diamonds */}
      <FloatingDiamond position={[-3.8, 2.0, -2]} color="#6c63ff" speed={1.0} rotationSpeed={0.4} scale={0.15} opacity={0.2} />
      <FloatingDiamond position={[4.0, -1.5, -3]} color="#00c6ff" speed={1.3} rotationSpeed={0.3} scale={0.12} opacity={0.18} />
      <FloatingDiamond position={[-2.5, -2.5, -1]} color="#ff6b9d" speed={1.1} rotationSpeed={0.5} scale={0.1} opacity={0.2} />
      <FloatingDiamond position={[3.2, 2.8, -4]} color="#6c63ff" speed={0.9} rotationSpeed={0.35} scale={0.16} opacity={0.15} />
      <FloatingDiamond position={[-1.5, 3.2, -3]} color="#ff6b9d" speed={1.4} rotationSpeed={0.3} scale={0.11} opacity={0.16} />

      {/* Simplified lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#6c63ff" />
    </group>
  );
}
