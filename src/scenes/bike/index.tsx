import { Html, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { BarLoader } from "react-spinners";
import { Model } from "./model";

export default function BikeScene() {
  const controlsRef = useRef(null);

  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        position: [1, 2, -2],
        zoom: 2,
      }}
    >
      <Suspense
        fallback={
          <Html>
            <BarLoader />
          </Html>
        }
      >
        <Stage intensity={0} adjustCamera={false}>
          <Model />
        </Stage>
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        autoRotate={false}
        minDistance={0.2}
        maxDistance={0.5}
        enableDamping={true}
      />
    </Canvas>
  );
}
