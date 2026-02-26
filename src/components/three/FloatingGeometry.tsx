"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const diamonds = [
  { px: -3.8, py: 2.0, pz: -2, color: "#6c63ff", scale: 0.15, opacity: 0.2 },
  { px: 4.0, py: -1.5, pz: -3, color: "#00c6ff", scale: 0.12, opacity: 0.18 },
  { px: -2.5, py: -2.5, pz: -1, color: "#ff6b9d", scale: 0.1, opacity: 0.2 },
];

export function FloatingGeometry() {
  const globeRef = useRef<THREE.Group>(null);
  const diamondRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Single useFrame for ALL objects (was 6 separate hooks before)
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.08;
      globeRef.current.rotation.x = t * 0.02;
    }

    for (let i = 0; i < diamondRefs.current.length; i++) {
      const mesh = diamondRefs.current[i];
      if (mesh) {
        mesh.rotation.x = t * (0.3 + i * 0.1);
        mesh.rotation.z = t * (0.2 + i * 0.07);
        mesh.position.y =
          diamonds[i].py + Math.sin(t * (0.5 + i * 0.2)) * 0.3;
      }
    }
  });

  return (
    <group>
      {/* Wireframe globe — 16 segments (was 24) */}
      <group ref={globeRef} position={[0, 0, -1]}>
        <mesh>
          <sphereGeometry args={[2.2, 16, 16]} />
          <meshBasicMaterial
            color="#6c63ff"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.4, 0.008, 4, 48]} />
          <meshBasicMaterial color="#6c63ff" transparent opacity={0.15} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0.4, 0.2]}>
          <torusGeometry args={[2.5, 0.006, 4, 48]} />
          <meshBasicMaterial color="#00c6ff" transparent opacity={0.1} />
        </mesh>
      </group>

      {/* 3 diamonds — no Float wrapper (was 5 with Float) */}
      {diamonds.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => {
            diamondRefs.current[i] = el;
          }}
          position={[d.px, d.py, d.pz]}
          scale={d.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={d.color}
            wireframe
            transparent
            opacity={d.opacity}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#6c63ff" />
    </group>
  );
}
