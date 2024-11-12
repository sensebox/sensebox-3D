import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";

const moduleAnnotationMapping: Record<string, string> = {
  Display: "Display",
  "RGB LED Pin": "RGB LED Pin",
  "TPU Module - Distanz Sensor ToF V3": "ToF Distanz Sensor",
  Battery: "Batterie",
};

export default function Annotations() {
  const { scene } = useThree();

  const [annotations, setAnnotations] = useState<React.ReactNode[]>([]);

  //   useEffect(() => {
  //     scene.traverse((o) => {
  //       console.log(o.userData.name);
  //     });
  //   }, [scene]);

  useFrame(() => {
    setAnnotations([]);
    scene.traverse((o) => {
      if (
        o.userData.name &&
        Object.keys(moduleAnnotationMapping).includes(o.userData.name)
      ) {
        const position = new Vector3();
        o.parent?.getWorldPosition(position);
        console.log(position);

        setAnnotations((prev) => [
          ...prev,
          <Html
            key={o.uuid}
            position={position.multiply(new Vector3(1000, -1000, -500))}
          >
            <div className="annotation">
              {moduleAnnotationMapping[o.userData.name]}
            </div>
          </Html>,
        ]);
      }
    });
  });

  return <group>{annotations}</group>;
}
