import { Edges, Outlines } from "@react-three/drei";
import { useState } from "react";
import ModuleGroupProps from "./types/module";

export function FanEnclosure({ nodes, materials, ...props }: ModuleGroupProps) {
  const [hovered, hover] = useState(false);

  return (
    <group
      name="Fan_Enclosure"
      position={[-33.925, 4.025, 37.7]}
      userData={{ name: "Fan Enclosure" }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <mesh
        name="Filter"
        castShadow
        receiveShadow
        geometry={nodes.Filter.geometry}
        material={materials["ABS_(White)_3"]}
        position={[33.925, -4.025, -37.7]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Filter" }}
      >
        <Outlines thickness={2} color={hovered ? "#ffff00" : "black"} />
      </mesh>
      <mesh
        name="TPU_Module_-_Lüfter_Ohne_Gitter"
        castShadow
        receiveShadow
        geometry={nodes["TPU_Module_-_Lüfter_Ohne_Gitter"].geometry}
        material={materials["Plastic_-_Glossy_(Black)"]}
        position={[33.925, -4.025, -37.7]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "TPU Module - Lüfter Ohne Gitter" }}
      >
        <Edges
          lineWidth={hovered ? 4 : 0}
          color={hovered ? "#ffff00" : "black"}
        />
      </mesh>
    </group>
  );
}
