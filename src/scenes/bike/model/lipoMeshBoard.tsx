import ModuleGroupProps from "./types/module";

export function LipoMeshBoard({
  nodes,
  materials,
  ...props
}: ModuleGroupProps) {
  return (
    <group
      name="LiPo_Mess_Board"
      userData={{ name: "LiPo Mess Board" }}
      {...props}
    >
      <mesh
        name="Buffer_Object_222"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_222.geometry}
        material={materials["Opaque(255,221,135)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
      <mesh
        name="Buffer_Object_223"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_223.geometry}
        material={materials["Steel_-_Satin"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
      <mesh
        name="Buffer_Object_224"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_224.geometry}
        material={materials["Opaque(0,128,0)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
      <mesh
        name="Buffer_Object_225"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_225.geometry}
        material={materials["Opaque(255,210,127)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
    </group>
  );
}
