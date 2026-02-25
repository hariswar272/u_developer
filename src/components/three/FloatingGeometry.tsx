"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  geometry,
  color,
  speed,
  rotationSpeed,
  scale = 0.5,
  opacity = 0.15,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "torus" | "dodecahedron";
  color: string;
  speed: number;
  rotationSpeed: number;
  scale?: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.2;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.15;
    }
  });

  const geometryNode = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[0.8, 0.25, 16, 48]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometryNode}
        <MeshDistortMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
          distort={0.15}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export function FloatingGeometry() {
  return (
    <group>
      <FloatingShape
        position={[-3.5, 1.5, -2]}
        geometry="icosahedron"
        color="#6c63ff"
        speed={1.2}
        rotationSpeed={0.3}
        scale={0.7}
        opacity={0.12}
      />
      <FloatingShape
        position={[3.5, -1, -3]}
        geometry="octahedron"
        color="#00c6ff"
        speed={1.5}
        rotationSpeed={0.25}
        scale={0.55}
        opacity={0.1}
      />
      <FloatingShape
        position={[-2, -2, -1.5]}
        geometry="torus"
        color="#ff6b9d"
        speed={1.3}
        rotationSpeed={0.35}
        scale={0.5}
        opacity={0.1}
      />
      <FloatingShape
        position={[2.5, 2.5, -4]}
        geometry="dodecahedron"
        color="#00c6ff"
        speed={1}
        rotationSpeed={0.2}
        scale={0.6}
        opacity={0.08}
      />
      <FloatingShape
        position={[0, 0.5, -5]}
        geometry="icosahedron"
        color="#6c63ff"
        speed={0.8}
        rotationSpeed={0.15}
        scale={0.9}
        opacity={0.06}
      />
      <FloatingShape
        position={[-4, -0.5, -4]}
        geometry="dodecahedron"
        color="#ff9a56"
        speed={1.1}
        rotationSpeed={0.2}
        scale={0.4}
        opacity={0.08}
      />

      {/* Soft lighting for light theme */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#6c63ff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.2} color="#00c6ff" />
    </group>
  );
}
