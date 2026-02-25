"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Central wireframe globe — inspired by holographic planet
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
      {/* Main sphere wireframe */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#6c63ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Inner sphere with more detail */}
      <mesh>
        <sphereGeometry args={[2.18, 48, 48]} />
        <meshBasicMaterial
          color="#00c6ff"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Horizontal ring — like latitude line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 100]} />
        <meshBasicMaterial color="#6c63ff" transparent opacity={0.15} />
      </mesh>

      {/* Tilted ring */}
      <mesh rotation={[Math.PI / 2.5, 0.4, 0.2]}>
        <torusGeometry args={[2.5, 0.006, 8, 100]} />
        <meshBasicMaterial color="#00c6ff" transparent opacity={0.1} />
      </mesh>

      {/* Vertical ring */}
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[2.3, 0.006, 8, 100]} />
        <meshBasicMaterial color="#ff6b9d" transparent opacity={0.08} />
      </mesh>

      {/* Glow core */}
      <mesh>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial
          color="#6c63ff"
          transparent
          opacity={0.015}
        />
      </mesh>
    </group>
  );
}

// Floating diamond (octahedron) shapes scattered around
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
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  );
}

// Tiny glowing star dot
function StarDot({
  position,
  color,
  size = 0.02,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed;
      meshRef.current.scale.setScalar(size * (0.6 + 0.4 * Math.sin(t * 2)));
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

export function FloatingGeometry() {
  return (
    <group>
      {/* Central wireframe globe */}
      <WireframeGlobe />

      {/* Floating diamonds scattered around */}
      <FloatingDiamond position={[-3.8, 2.0, -2]} color="#6c63ff" speed={1.0} rotationSpeed={0.4} scale={0.15} opacity={0.25} />
      <FloatingDiamond position={[4.0, -1.5, -3]} color="#00c6ff" speed={1.3} rotationSpeed={0.3} scale={0.12} opacity={0.2} />
      <FloatingDiamond position={[-2.5, -2.5, -1]} color="#ff6b9d" speed={1.1} rotationSpeed={0.5} scale={0.1} opacity={0.22} />
      <FloatingDiamond position={[3.2, 2.8, -4]} color="#6c63ff" speed={0.9} rotationSpeed={0.35} scale={0.18} opacity={0.15} />
      <FloatingDiamond position={[-4.5, -0.5, -3]} color="#00c6ff" speed={1.2} rotationSpeed={0.25} scale={0.1} opacity={0.18} />
      <FloatingDiamond position={[2.0, -3.0, -2]} color="#ff9a56" speed={0.8} rotationSpeed={0.45} scale={0.08} opacity={0.2} />
      <FloatingDiamond position={[-1.5, 3.2, -3]} color="#ff6b9d" speed={1.4} rotationSpeed={0.3} scale={0.11} opacity={0.18} />
      <FloatingDiamond position={[4.5, 0.5, -5]} color="#6c63ff" speed={1.0} rotationSpeed={0.2} scale={0.14} opacity={0.12} />

      {/* Star dots scattered across */}
      <StarDot position={[-5, 2.5, -3]} color="#6c63ff" size={0.025} speed={1.2} />
      <StarDot position={[5.5, 1, -4]} color="#00c6ff" size={0.02} speed={0.8} />
      <StarDot position={[-3, -3, -2]} color="#ff6b9d" size={0.018} speed={1.5} />
      <StarDot position={[2, 3.5, -5]} color="#6c63ff" size={0.022} speed={1.0} />
      <StarDot position={[-6, -1, -4]} color="#00c6ff" size={0.015} speed={1.3} />
      <StarDot position={[6, -2, -3]} color="#ff9a56" size={0.02} speed={0.9} />
      <StarDot position={[0, 4, -4]} color="#6c63ff" size={0.018} speed={1.1} />
      <StarDot position={[-4, 0, -5]} color="#ff6b9d" size={0.015} speed={1.4} />
      <StarDot position={[3, -4, -3]} color="#00c6ff" size={0.02} speed={0.7} />
      <StarDot position={[-1, -4.5, -4]} color="#6c63ff" size={0.016} speed={1.2} />
      <StarDot position={[5, 3, -5]} color="#ff6b9d" size={0.014} speed={1.6} />
      <StarDot position={[-5.5, 3.5, -5]} color="#00c6ff" size={0.018} speed={0.6} />

      {/* Soft ambient lighting for light theme */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#6c63ff" />
      <directionalLight position={[-5, -3, 5]} intensity={0.15} color="#00c6ff" />
      <pointLight position={[0, 0, 3]} intensity={0.2} color="#6c63ff" distance={10} />
    </group>
  );
}
