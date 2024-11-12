// path: src/scenes/bike/model/index.tsx
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useToggleAnimation } from "../../../hooks/useToggleAnimation";
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
import { Materials } from "./types/materials";
import { Nodes } from "./types/nodes";

type ActionName = "open lid" | "explode tof" | "explode hdc";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: Nodes;
  materials: Materials;
  animations: GLTFAction[];
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/gltf/bike/senseBox_bike.gltf",
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);
  const [myActions, setMyActions] = useState<typeof actions>();

  useEffect(() => {
    setMyActions(actions);
  }, [actions]);

  const toggleLidAnimation = useToggleAnimation(
    myActions?.["open lid"] ?? null,
  );
  const toggleTofAnimation = useToggleAnimation(
    myActions?.["explode tof"] ?? null,
  );
  const toggleHdcAnimation = useToggleAnimation(
    myActions?.["explode hdc"] ?? null,
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Project_Name">
        <group
          name="BikeBox+Mini+S2_(1)"
          rotation={[-Math.PI, 0, 0]}
          scale={0.001}
          userData={{ name: "BikeBox+Mini+S2 (1)" }}
        >
          <Mcu nodes={nodes} materials={materials} />
          <group onClick={() => toggleHdcAnimation()}>
            <Hdc1080 nodes={nodes} materials={materials} />
            <Fan nodes={nodes} materials={materials} />
            <FanEnclosure nodes={nodes} materials={materials} />
          </group>

          <Ble nodes={nodes} materials={materials} />

          <Battery nodes={nodes} materials={materials} />

          <LevelBooster nodes={nodes} materials={materials} />
          <LipoMeshBoard nodes={nodes} materials={materials} />
          <ToF
            nodes={nodes}
            materials={materials}
            onClick={() => toggleTofAnimation()}
          />
          <Enclosure nodes={nodes} materials={materials} />

          <Lid
            nodes={nodes}
            materials={materials}
            onClick={() => toggleLidAnimation()}
          />
          {props.children}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/gltf/bike/senseBox_bike.gltf");
