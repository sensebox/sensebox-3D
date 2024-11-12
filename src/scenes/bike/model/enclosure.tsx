import ModuleGroupProps from "./types/module";

export function Enclosure({ nodes, materials, ...props }: ModuleGroupProps) {
  return (
    <group name="Enclosure" position={[0, 0, 0]} {...props}>
      <mesh
        name="PC_CF_-_PowerSchalter_-_Hebel"
        castShadow
        receiveShadow
        geometry={nodes["PC_CF_-_PowerSchalter_-_Hebel"].geometry}
        material={materials["Plastic_-_Matte_(Black)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "PC CF - PowerSchalter - Hebel" }}
      />
      <mesh
        name="PC_CF_-_PowerSchalter_-_Klammer"
        castShadow
        receiveShadow
        geometry={nodes["PC_CF_-_PowerSchalter_-_Klammer"].geometry}
        material={materials["Steel_-_Satin"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "PC CF - PowerSchalter - Klammer" }}
      />
      <mesh
        name="TPU_-_Boden"
        castShadow
        receiveShadow
        geometry={nodes["TPU_-_Boden"].geometry}
        material={materials["ABS_(White)_1"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "TPU - Boden" }}
      />
      <mesh
        name="PP_GF_-_Schale"
        castShadow
        receiveShadow
        geometry={nodes["PP_GF_-_Schale"].geometry}
        material={materials["ABS_(White)_2"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "PP GF - Schale" }}
      />
      <mesh
        name="TPU_Module_-_SD_Karte"
        castShadow
        receiveShadow
        geometry={nodes["TPU_Module_-_SD_Karte"].geometry}
        material={materials["Plastic_-_Glossy_(Black)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "TPU Module - SD Karte" }}
      />
      <mesh
        name="TPU_Module_-_USB_C"
        castShadow
        receiveShadow
        geometry={nodes["TPU_Module_-_USB_C"].geometry}
        material={materials["Plastic_-_Glossy_(Black)"]}
        rotation={[Math.PI / 2, 0, 0]}
        userData={{ name: "TPU Module - USB C" }}
      />
    </group>
  );
}
