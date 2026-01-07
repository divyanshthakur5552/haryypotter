// src/components/ModelViewer.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function Model({ path }) {
  const { scene } = useGLTF(path);
  const ref = useRef();

  // Auto-rotate
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  return <primitive ref={ref} object={scene} />;
}

export default function ModelViewer() {
  return (
    <Canvas
      gl={{ alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Stage environment={null} intensity={0.6}>
        <Model path="/models/Harry.glb" />
      </Stage>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
