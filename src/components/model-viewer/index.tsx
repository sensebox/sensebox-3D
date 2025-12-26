import "@google/model-viewer";

export default function ModelViewer() {
  const modelPath = "/gltf/bike/senseBox_bike.gltf";

  return (
    <model-viewer
      src={modelPath}
      auto-rotate
      camera-controls
      style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
      shadow-intensity="1"
      ar
      touch-action="pan-y"
      alt="A 3D model carousel"
      exposure={0.7}
      environment-image="/environment/neutral.hdr"
    ></model-viewer>
  );
}
