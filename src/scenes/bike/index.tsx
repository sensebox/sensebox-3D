import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Model } from "./model";

export default function BikeScene() {
  const controlsRef = useRef(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 50,
        position: [1, 1.9, -2],
        near: 200,
        far: 2000,
        focus: 500,
        zoom: 0.5, // das ist für das verkleinert des bildes wichtig
      }}
    >
      <Suspense fallback={null}>
        <Stage preset="portrait" intensity={0} environment="city">
          <Model />
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
