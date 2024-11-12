import { GroupProps } from "@react-three/fiber";
import { Materials } from "./materials";
import { Nodes } from "./nodes";

export default interface ModuleGroupProps extends GroupProps {
  nodes: Nodes;
  materials: Materials;
}
