import ModuleGroupProps from "./types/module";

export function Fan({ nodes, materials, ...props }: ModuleGroupProps) {
  return (
    <group
      name="Fan"
      position={[-33.15, 5, 37.586]}
      userData={{ name: "Fan" }}
      {...props}
    >
      <mesh
        name="Body1109"
        castShadow
        receiveShadow
        geometry={nodes.Body1109.geometry}
        material={materials["Opaque(26,26,26)"]}
        position={[33.15, -5, -37.586]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Body1:109" }}
      />
      <mesh
        name="Body1108"
        castShadow
        receiveShadow
        geometry={nodes.Body1108.geometry}
        material={materials["ABS_(White)_3"]}
        position={[33.15, -5, -37.586]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "Body1:108" }}
      />
    </group>
  );
}
