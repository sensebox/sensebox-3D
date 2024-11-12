import ModuleGroupProps from "./types/module";

export function Battery({ nodes, materials, ...props }: ModuleGroupProps) {
  return (
    <group
      name="Battery"
      position={[0, 11.009, -34]}
      userData={{ name: "Battery" }}
      {...props}
    >
      <mesh
        name="Body1111"
        castShadow
        receiveShadow
        geometry={nodes.Body1111.geometry}
        material={materials["Opaque(247,224,153)"]}
        position={[0, -11.009, 34]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Body1:111" }}
      />
      <mesh
        name="Body1112"
        castShadow
        receiveShadow
        geometry={nodes.Body1112.geometry}
        material={materials["Urban Charm"]}
        position={[0, -11.009, 34]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Body1:112" }}
      />
      <group
        name="18650"
        position={[0, -11.009, 34]}
        userData={{ name: "18650" }}
      >
        <mesh
          name="Buffer_Object_212"
          castShadow
          receiveShadow
          geometry={nodes.Buffer_Object_212.geometry}
          material={materials["Paint_-_Enamel_Glossy_(Green)"]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Buffer Object" }}
        />
        <mesh
          name="Buffer_Object_213"
          castShadow
          receiveShadow
          geometry={nodes.Buffer_Object_213.geometry}
          material={materials["Steel_-_Satin"]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Buffer Object" }}
        />
      </group>
      <mesh
        name="Board1"
        castShadow
        receiveShadow
        geometry={nodes.Board1.geometry}
        material={materials["Opaque(0,128,0)"]}
        position={[0, -11.009, 34]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Board:1" }}
      />
      <mesh
        name="Body1113"
        castShadow
        receiveShadow
        geometry={nodes.Body1113.geometry}
        material={materials["Steel_-_Satin"]}
        position={[0, -11.009, 34]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Body1:113" }}
      />
      <mesh
        name="Body1110"
        castShadow
        receiveShadow
        geometry={nodes.Body1110.geometry}
        material={materials["Opaque(26,26,26)"]}
        position={[0, -11.009, 34]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Body1:110" }}
      />
    </group>
  );
}
