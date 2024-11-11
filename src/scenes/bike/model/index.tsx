// import { useAnimations, useGLTF, Html } from "@react-three/drei";
// import { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { GLTF } from "three-stdlib";
// import { Battery } from "./battery";
// import { Ble } from "./ble";
// import { Enclosure } from "./enclosure";
// import { Fan } from "./fan";
// import { FanEnclosure } from "./fanEnclosure";
// import { Hdc1080 } from "./hdc1080";
// import { useToggleAnimation } from "./hooks/useToggleAnimation";
// import { LevelBooster } from "./levelBooster";
// import { Lid } from "./lid";
// import { LipoMeshBoard } from "./lipoMeshBoard";
// import { Mcu } from "./mcu";
// import { ToF } from "./tof";
// import { Materials } from "./types/materials";
// import { Nodes } from "./types/nodes";
// import { OutlineEffect } from "./utils/outline";

// type ActionName = "open lid" | "explode tof" | "explode hdc";
// interface GLTFAction extends THREE.AnimationClip {
//   name: ActionName;
// }

// type GLTFResult = GLTF & {
//   nodes: Nodes;
//   materials: Materials;
//   animations: GLTFAction[];
// };

// export function Model(props: JSX.IntrinsicElements["group"]) {
//   const group = useRef<THREE.Group>(null);
//   const { nodes, materials, animations } = useGLTF(
//     "/gltf/bike/senseBox_bike.gltf",
//   ) as GLTFResult;

//   const { actions } = useAnimations(animations, group);
//   const [myActions, setMyActions] = useState<typeof actions>();

//   useEffect(() => {
//     setMyActions(actions);
//   }, [actions]);

//   const toggleLidAnimation = useToggleAnimation(
//     myActions?.["open lid"] ?? null,
//   );
//   const toggleTofAnimation = useToggleAnimation(
//     myActions?.["explode tof"] ?? null,
//   );
//   const toggleHdcAnimation = useToggleAnimation(
//     myActions?.["explode hdc"] ?? null,
//   );

//   return (
//     <group
//       ref={group}
//       {...props}
//       dispose={null}
//       castShadow={false}
//       receiveShadow={false}
//     >
//       <group name="Project_Name">
//         <group
//           name="BikeBox+Mini+S2_(1)"
//           rotation={[-Math.PI, 0, 0]}
//           scale={0.001}
//           userData={{ name: "BikeBox+Mini+S2 (1)" }}
//         >
//           <Mcu
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//           />

//           {/* Hdc1080 Annotation */}
//           <OutlineEffect enabled={true} auraColor={0x00ff00}>
//             <group onClick={() => toggleHdcAnimation()}>
//               <Hdc1080
//                 nodes={nodes}
//                 materials={materials}
//                 castShadow={false}
//                 receiveShadow={false}
//               />
//               <Html position={[0, 0.15, 0]} distanceFactor={1} occlude>
//                 <div className="annotation">Hdc1080 Sensor</div>
//               </Html>
//               <Fan
//                 nodes={nodes}
//                 materials={materials}
//                 castShadow={false}
//                 receiveShadow={false}
//               />
//               <FanEnclosure
//                 nodes={nodes}
//                 materials={materials}
//                 castShadow={false}
//                 receiveShadow={false}
//               />
//             </group>
//           </OutlineEffect>

//           {/* ToF Annotation */}
//           <ToF
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//             onClick={() => toggleTofAnimation()}
//           />
//           <Html position={[0, 0.2, 0.1]} distanceFactor={1} occlude>
//             <div className="annotation">ToF Sensor</div>
//           </Html>

//           {/* Enclosure Annotation */}
//           <Enclosure
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//           />
//           <Html position={[0, -0.1, 0.2]} distanceFactor={1} occlude>
//             <div className="annotation">Enclosure</div>
//           </Html>

//           {/* Lid Annotation */}
//           <Lid
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//             onClick={() => toggleLidAnimation()}
//           />
//           <Html position={[0, 0.3, 0]} distanceFactor={1} occlude>
//             <div className="annotation">Lid</div>
//           </Html>

//           {/* Weitere Komponenten ohne Annotation */}
//           <Ble
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//           />
//           <Battery
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//           />
//           <LevelBooster
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//           />
//           <LipoMeshBoard
//             nodes={nodes}
//             materials={materials}
//             castShadow={false}
//             receiveShadow={false}
//           />
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/gltf/bike/senseBox_bike.gltf");
// Model.tsx oder index.tsx
import { useAnimations, useGLTF, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { Battery } from "./battery";
import { Ble } from "./ble";
import { Enclosure } from "./enclosure";
import { Fan } from "./fan";
import { FanEnclosure } from "./fanEnclosure";
import { Hdc1080 } from "./hdc1080";
import { LevelBooster } from "./levelBooster";
import { Lid } from "./lid";
import { LipoMeshBoard } from "./lipoMeshBoard";
import { Mcu } from "./mcu";
import { ToF } from "./tof";
import { OutlineEffect } from "./utils/outline";
import { Nodes } from "./types/nodes";
import { Materials } from "./types/materials";
import { useToggleAnimation } from "./hooks/useToggleAnimation";

type ActionName = "open lid" | "explode tof" | "explode hdc";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: Nodes;
  materials: Materials;
  animations: GLTFAction[];
};

type ModelProps = JSX.IntrinsicElements["group"] & {
  annotations?: { position: [number, number, number]; content: string }[];
};

export function Model({ annotations = [], ...props }: ModelProps) {
  console.log("Annotationen:", annotations);
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/gltf/bike/senseBox_bike.gltf",
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);
  const [myActions, setMyActions] = useState<typeof actions>();

  useEffect(() => {
    setMyActions(actions);
  }, [actions]);

  useEffect(() => {
    if (group.current) {
      const hdcWorldPosition = new THREE.Vector3();
      const tofWorldPosition = new THREE.Vector3();
      group.current.getWorldPosition(hdcWorldPosition);
      group.current.getWorldPosition(tofWorldPosition);
      console.log("HDC Weltposition:", hdcWorldPosition);
      console.log("ToF Weltposition:", tofWorldPosition);
    }
  }, []);

  const toggleLidAnimation = useToggleAnimation(
    myActions?.["open lid"] ?? null,
  );
  const toggleTofAnimation = useToggleAnimation(
    myActions?.["explode tof"] ?? null,
  );
  const toggleHdcAnimation = useToggleAnimation(
    myActions?.["explode hdc"] ?? null,
  );

  // Definieren Sie die Positionen für HDC und ToF Annotationen
  const hdcPosition: [number, number, number] = [0.0002, 0.0005, 0.0002];
  const tofPosition: [number, number, number] = [-0.0002, 0.0005, 0.0002];

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      castShadow={false}
      receiveShadow={false}
    >
      <group name="Project_Name">
        <group
          name="BikeBox+Mini+S2_(1)"
          rotation={[-Math.PI, 0, 0]}
          scale={0.001}
          userData={{ name: "BikeBox+Mini+S2 (1)" }}
        >
          <Mcu
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
          />

          {/* Hdc1080 Annotation */}
          <OutlineEffect enabled={true} auraColor={0x00ff00}>
            <group onClick={() => toggleHdcAnimation()}>
              <Hdc1080
                nodes={nodes}
                materials={materials}
                castShadow={false}
                receiveShadow={false}
              />
              <Fan
                nodes={nodes}
                materials={materials}
                castShadow={false}
                receiveShadow={false}
              />
              <FanEnclosure
                nodes={nodes}
                materials={materials}
                castShadow={false}
                receiveShadow={false}
              />
              <Html
                position={hdcPosition}
                distanceFactor={0.05}
                occlude
                transform
                sprite
              >
                <div
                  className="annotation"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Test Annotation
                </div>
              </Html>
            </group>
          </OutlineEffect>

          <ToF
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
            onClick={() => toggleTofAnimation()}
          />
          <Html
            position={tofPosition}
            distanceFactor={0.05}
            occlude
            transform
            sprite
          >
            <div className="annotation">ToF Sensor</div>
          </Html>

          <Enclosure
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
          />
          <Lid
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
            onClick={() => toggleLidAnimation()}
          />

          <Ble
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
          />
          <Battery
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
          />
          <LevelBooster
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
          />
          <LipoMeshBoard
            nodes={nodes}
            materials={materials}
            castShadow={false}
            receiveShadow={false}
          />

          {/* Zusätzliche dynamische Annotationen */}
          {annotations.map((annotation, index) => (
            <Html
              key={index}
              position={annotation.position}
              distanceFactor={0.05}
              occlude
              transform
              sprite
            >
              <div className="annotation">{annotation.content}</div>
            </Html>
          ))}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/gltf/bike/senseBox_bike.gltf");
