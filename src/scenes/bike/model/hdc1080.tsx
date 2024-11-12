import ModuleGroupProps from "./types/module";

export function Hdc1080({ nodes, materials, ...props }: ModuleGroupProps) {
  return (
    <group name="HDC1080" userData={{ name: "HDC1080" }} {...props}>
      <mesh
        name="Buffer_Object_192"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_192.geometry}
        material={materials["Opaque(0,128,0)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
      <mesh
        name="Buffer_Object_193"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_193.geometry}
        material={materials["ABS_(White)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
      <mesh
        name="Buffer_Object_194"
        castShadow
        receiveShadow
        geometry={nodes.Buffer_Object_194.geometry}
        material={materials["Paint_-_Enamel_Glossy_(Grey)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Buffer Object" }}
      />
    </group>
  );
}
