"use client";

import { Canvas } from "@react-three/fiber";
import { FloatingGeometry } from "./FloatingGeometry";

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      gl={{
        alpha: true,
        antialias: false, // Disable for performance — wireframes don't need it
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      dpr={[1, 1.5]} // Cap pixel ratio to 1.5x instead of device max
      frameloop="always"
    >
      <FloatingGeometry />
    </Canvas>
  );
}
