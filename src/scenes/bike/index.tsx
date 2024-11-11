import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Model } from "./model";
import "../../index.css";

export default function BikeScene() {
  const controlsRef = useRef(null);

  const annotations = [
    {
      position: [0.1, 0.5, 0] as [number, number, number],
      content: "HDC1080 Sensor",
    },
    {
      position: [-0.3, 0.2, 0.1] as [number, number, number],
      content: "ToF Sensor",
    },
  ];

  return (
    <Canvas
      shadows={false}
      dpr={[1, 2]}
      camera={{
        fov: 50,
        position: [1, 1.9, -2],
        near: 200,
        far: 2000,
        focus: 500,
        zoom: 0.5,
      }}
    >
      <Suspense fallback={null}>
        <Stage preset="portrait" intensity={0.5} environment="city">
          <Model annotations={annotations} />
        </Stage>
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        autoRotate={false}
        minDistance={0.1}
        maxDistance={9}
        enableDamping={true}
        dampingFactor={0.1}
      />
    </Canvas>
  );
}
