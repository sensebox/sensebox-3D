// import { useState } from "react";
// import BikeScene from "../src/scenes/bike";
// import FloatingButton from "../src/components/FloatingButton";
// import { ARViewer } from "../src/components/ar-viewer";

// function isMobileDevice() {
//   return /Mobi|Android/i.test(navigator.userAgent);
// }

// export default function Page() {
//   const [showAR, setShowAR] = useState(false);

//   // Handler, um AR zu starten
//   const handleARButtonClick = () => {
//     setShowAR(true);
//   };

//   // Handler, um AR wieder zu verlassen
//   const handleExitAR = () => {
//     setShowAR(false);
//   };

//   return (
//     <div
//       style={{
//         height: "100%",
//         position: "relative",
//       }}
//     >
//       <BikeScene />

//       {/* FloatingButton nur anzeigen, wenn AR noch nicht aktiv ist */}
//       {!showAR && isMobileDevice() && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: "20px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 10, // Sicherstellen, dass der Button über dem BikeScene ist
//           }}
//         >
//           <FloatingButton
//             onClick={handleARButtonClick}
//             label="In deinem Raum ansehen"
//           />
//         </div>
//       )}

//       {/* ARView einblenden, wenn showAR true ist */}
//       {showAR && (
//         <ARViewer
//           modelPath="/gltf/bike/senseBox_bike.gltf"
//           rotationX={0}
//           rotationY={0}
//           rotationZ={0}
//           scale={1}
//           exitAR={handleExitAR}
//         />
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import BikeScene from "../src/scenes/bike";
import FloatingButton from "../src/components/FloatingButton";
import { ARViewer } from "../src/components/ar-viewer";

// Erweiterte Geräteerkennung
function detectDevice() {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isMobile = isIOS || isAndroid || /Mobi/i.test(navigator.userAgent);

  let arCapability = "unsupported";
  if (isIOS) arCapability = "ios";
  else if ("xr" in navigator) arCapability = "webxr";

  return {
    isMobile,
    isIOS,
    isAndroid,
    arCapability,
  };
}

export default function Page() {
  const [showAR, setShowAR] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    arCapability: "unsupported",
  });

  // Geräteinformationen beim Laden ermitteln
  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

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
        height: "100%",
        position: "relative",
      }}
    >
      {/* 3D-Szene anzeigen, wenn AR nicht aktiv ist */}
      {!showAR && <BikeScene />}

      {/* FloatingButton nur anzeigen, wenn AR noch nicht aktiv ist und Gerät mobil ist */}
      {!showAR && deviceInfo.isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <FloatingButton
            onClick={handleARButtonClick}
            label={
              deviceInfo.isIOS
                ? "In AR ansehen (iOS)"
                : deviceInfo.isAndroid
                  ? "In deinem Raum ansehen"
                  : "In AR ansehen"
            }
          />
        </div>
      )}

      {/* ARView einblenden, wenn showAR true ist */}
      {showAR && (
        <ARViewer
          modelPath="/gltf/bike/senseBox_bike.gltf"
          iosSrc="/usdz/bike/BikeBox_Mini_S2_v101_v5.usdz" // Korrigierter Pfad zur USDZ-Datei
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          scale={1}
          exitAR={handleExitAR}
          backgroundColor="#FFFFFF"
        />
      )}
    </div>
  );
}
