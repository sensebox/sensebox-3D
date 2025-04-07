import { useState } from "react";
import BikeScene from "../src/scenes/bike";
import FloatingButton from "../src/components/FloatingButton";
import ARView from "../src/components/ar-viewer";

export default function Page() {
  const [showAR, setShowAR] = useState(false);

  // Handler, um AR zu starten
  const handleARButtonClick = () => {
    setShowAR(true);
  };

  // Handler, um AR wieder zu verlassen
  const handleExitAR = () => {
    setShowAR(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <BikeScene />

      {/* FloatingButton nur anzeigen, wenn AR noch nicht aktiv ist */}
      {!showAR && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <FloatingButton
            onClick={handleARButtonClick}
            label="In deinem Raum ansehen"
          />
        </div>
      )}

      {/* ARView einblenden, wenn showAR true ist */}
      {showAR && (
        <ARView
          modelPath="/gltf/bike/senseBox_bike.gltf"
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          scale={1}
          exitAR={handleExitAR}
        />
      )}
    </div>
  );
}
