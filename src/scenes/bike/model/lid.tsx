import ModuleGroupProps from "./types/module";

export function Lid({ nodes, materials, ...props }: ModuleGroupProps) {
  return (
    <group
      name="Lid_with_modules"
      position={[0.25, -16.25, -40.75]}
      userData={{ name: "Lid with modules" }}
      {...props}
    >
      <mesh
        name="DustSensor"
        castShadow
        receiveShadow
        geometry={nodes.DustSensor.geometry}
        material={materials["Paint_-_Enamel_Glossy_(Green)"]}
        position={[-0.25, 16.25, 40.75]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "DustSensor" }}
      />
      <group
        name="Display"
        position={[-0.25, 16.25, 40.75]}
        userData={{ name: "Display" }}
      >
        <mesh
          name="Buffer_Object_214"
          castShadow
          receiveShadow
          geometry={nodes.Buffer_Object_214.geometry}
          material={materials["Opaque(255,207,128)"]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Buffer Object" }}
        />
        <mesh
          name="Buffer_Object_215"
          castShadow
          receiveShadow
          geometry={nodes.Buffer_Object_215.geometry}
          material={materials["Opaque(0,128,0)"]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Buffer Object" }}
        />
        <mesh
          name="Buffer_Object_216"
          castShadow
          receiveShadow
          geometry={nodes.Buffer_Object_216.geometry}
          material={materials["Steel_-_Satin"]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Buffer Object" }}
        />
        <mesh
          name="Buffer_Object_217"
          castShadow
          receiveShadow
          geometry={nodes.Buffer_Object_217.geometry}
          material={materials["Opaque(87,173,113)"]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Buffer Object" }}
        />
        <mesh
          name="Buffer_Object_218"
          castShadow
          receiveShadow
          geometry={nodes.Buffer_Object_218.geometry}
          material={materials["Opaque(10,10,10)"]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Buffer Object" }}
        />
      </group>
      <group name="Lid" userData={{ name: "Lid" }}>
        <mesh
          name="RGB_LED_Pin"
          castShadow
          receiveShadow
          geometry={nodes.RGB_LED_Pin.geometry}
          material={materials["Acrylic_(Clear)"]}
          position={[-0.25, 16.25, 40.75]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "RGB LED Pin" }}
        />
        <mesh
          name="TPU_-_Puffer_Display"
          castShadow
          receiveShadow
          geometry={nodes["TPU_-_Puffer_Display"].geometry}
          material={materials["Plastic_-_Matte_(Black)"]}
          position={[-0.25, 16.25, 40.75]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "TPU - Puffer Display" }}
        />
        <mesh
          name="PC_CF_-_DustSensor_Halter"
          castShadow
          receiveShadow
          geometry={nodes["PC_CF_-_DustSensor_Halter"].geometry}
          material={materials["ABS_(White)_3"]}
          position={[-0.25, 16.25, 40.75]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "PC CF - DustSensor Halter" }}
        />
        <mesh
          name="Acryl_-_Display_Glas"
          castShadow
          receiveShadow
          geometry={nodes["Acryl_-_Display_Glas"].geometry}
          material={materials["Acrylic_(Clear)"]}
          position={[-0.25, 16.25, 40.75]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Acryl - Display Glas" }}
        />
        <mesh
          name="Filter1"
          castShadow
          receiveShadow
          geometry={nodes.Filter1.geometry}
          material={materials["ABS_(White)_3"]}
          position={[-0.25, 16.25, 40.75]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "Filter:1" }}
        />
        <mesh
          name="TPU_-_Deckel_mit_Display"
          castShadow
          receiveShadow
          geometry={nodes["TPU_-_Deckel_mit_Display"].geometry}
          material={materials["ABS_(White)_1"]}
          position={[-0.25, 16.25, 40.75]}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "TPU - Deckel mit Display" }}
        />
      </group>
    </group>
  );
}
