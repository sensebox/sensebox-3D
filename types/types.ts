export interface ModelData {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
  modelPath: string;
  description: string;
  features: string[];
}
export interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onClick?: () => void;
}
