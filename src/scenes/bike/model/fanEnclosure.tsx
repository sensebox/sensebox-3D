import ModuleGroupProps from "./types/module";

export function FanEnclosure({ nodes, materials, ...props }: ModuleGroupProps) {
  return (
    <group
      name="Fan_Enclosure"
      position={[-33.925, 4.025, 37.7]}
      userData={{ name: "Fan Enclosure" }}
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
      />
      <mesh
        name="TPU_Module_-_Lüfter_Ohne_Gitter"
        castShadow
        receiveShadow
        geometry={nodes["TPU_Module_-_Lüfter_Ohne_Gitter"].geometry}
        material={materials["Plastic_-_Glossy_(Black)"]}
        position={[33.925, -4.025, -37.7]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "TPU Module - Lüfter Ohne Gitter" }}
      />
    </group>
  );
}
