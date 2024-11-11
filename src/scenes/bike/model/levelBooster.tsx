import ModuleGroupProps from "./types/module";

export function LevelBooster({ nodes, materials, ...props }: ModuleGroupProps) {
  return (
    <group name="Level_Booster" userData={{ name: "Level Booster" }} {...props}>
      <mesh
        name="Buffer_Object_219"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_219.geometry}
        material={materials["Steel_-_Satin"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
      <mesh
        name="Buffer_Object_220"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_220.geometry}
        material={materials["Opaque(0,128,0)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
      <mesh
        name="Buffer_Object_221"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_221.geometry}
        material={materials["Opaque(255,210,127)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
    </group>
  );
}
