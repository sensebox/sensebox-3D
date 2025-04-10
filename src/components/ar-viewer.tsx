import React, { useEffect, useRef, useState } from "react";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/OBJ";

// XR-Features für AR
import "@babylonjs/core/XR/features/WebXRHitTest";

// Funktion zur Erkennung der AR-Fähigkeiten
function detectARCapability() {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  const isIOSSafari =
    isIOS && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const hasWebXR = "xr" in navigator;

  if (isIOSSafari) return "ios";
  if (hasWebXR) return "webxr";
  if (isAndroid) return "android";
  return "unsupported";
}

interface ARViewerProps {
  modelPath?: string;
  iosSrc?: string; // Pfad zur USDZ-Datei für iOS
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scale?: number;
  backgroundColor?: string;
  exitAR?: () => void;
}

export const ARViewer: React.FC<ARViewerProps> = ({
  modelPath = "/gltf/bike/senseBox_bike.gltf",
  iosSrc = "", // Falls eine USDZ-Datei vorhanden ist
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  scale = 1,
  backgroundColor = "#FFFFFF",
  exitAR = () => {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BABYLON.Engine | null>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);
  const [arCapability, setARCapability] = useState<
    "ios" | "webxr" | "android" | "unsupported" | "checking"
  >("checking");
  // Removed unused arActive state
  const modelRef = useRef<BABYLON.AbstractMesh | null>(null);

  // Erkenne AR-Fähigkeiten beim Laden
  useEffect(() => {
    const capability = detectARCapability();
    setARCapability(capability);

    // Spezielle Behandlung für Android
    if (capability === "android") {
      checkAndroidARSupport();
    }
  }, []);

  // Szene initialisieren
  useEffect(() => {
    if (!canvasRef.current || arCapability === "ios") return; // Kein Canvas für iOS

    // Engine und Szene erstellen
    const engine = new BABYLON.Engine(canvasRef.current, true, {
      stencil: true,
    });
    engineRef.current = engine;

    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;

    // Kamera erstellen
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      10,
      new BABYLON.Vector3(0, 0, 0),
      scene,
    );
    camera.attachControl(canvasRef.current, true);
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 20;

    // Lichtquellen für bessere Visualisierung
    const hemisphericLight = new BABYLON.HemisphericLight(
      "hemisphericLight",
      new BABYLON.Vector3(0, 1, 0),
      scene,
    );
    hemisphericLight.intensity = 0.7;

    const directionalLight = new BABYLON.DirectionalLight(
      "directionalLight",
      new BABYLON.Vector3(0, -1, 1),
      scene,
    );
    directionalLight.intensity = 0.5;

    // Hintergrundfarbe setzen
    scene.clearColor = BABYLON.Color4.FromHexString(backgroundColor);

    // GLTF-Modell laden
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      modelPath.substring(0, modelPath.lastIndexOf("/") + 1),
      modelPath.substring(modelPath.lastIndexOf("/") + 1),
      scene,
    )
      .then((result) => {
        if (result.meshes.length > 0) {
          const rootMesh = result.meshes[0];
          modelRef.current = rootMesh;

          // Rotation anwenden (Umrechnung von Grad zu Radiant)
          rootMesh.rotation = new BABYLON.Vector3(
            rotationX * (Math.PI / 180),
            rotationY * (Math.PI / 180),
            rotationZ * (Math.PI / 180),
          );

          // Skalierung anwenden
          rootMesh.scaling = new BABYLON.Vector3(scale, scale, scale);

          // Modell zentrieren
          const boundingInfo = rootMesh.getHierarchyBoundingVectors();
          const dimensions = boundingInfo.max.subtract(boundingInfo.min);
          const center = boundingInfo.min.add(dimensions.scale(0.5));

          rootMesh.position = new BABYLON.Vector3(
            -center.x,
            -center.y,
            -center.z,
          );

          // Kamera auf das Modell ausrichten
          camera.setTarget(BABYLON.Vector3.Zero());
          camera.alpha = Math.PI;
          camera.radius = dimensions.length() * 1.5;
        }
      })
      .catch((error) => {
        console.error("Fehler beim Laden des Modells:", error);
      });

    // Prüfen, ob WebXR AR unterstützt wird (nur für WebXR-fähige Geräte)
    if (arCapability === "webxr") {
      checkARSupport();
    }

    // Render-Loop starten
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize-Handler
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine.dispose();
    };
  }, [
    modelPath,
    rotationX,
    rotationY,
    rotationZ,
    scale,
    backgroundColor,
    arCapability,
  ]);

  // Prüfen, ob WebXR AR unterstützt wird
  const checkARSupport = async () => {
    try {
      const xrSupported =
        await BABYLON.WebXRSessionManager.IsSessionSupportedAsync(
          "immersive-ar",
        );
      setARCapability(xrSupported ? "webxr" : "unsupported");
    } catch (error) {
      console.error("AR wird nicht unterstützt:", error);
      setARCapability("unsupported");
    }
  };

  // Android AR-Support prüfen
  const checkAndroidARSupport = async () => {
    try {
      // Prüfen, ob ARCore verfügbar ist
      if (window.isSecureContext) {
        // Für Android-Geräte mit Chrome
        const xrSupported =
          await BABYLON.WebXRSessionManager.IsSessionSupportedAsync(
            "immersive-ar",
          );
        setARCapability(xrSupported ? "webxr" : "unsupported");
      } else {
        // Nicht-HTTPS-Umgebungen unterstützen keine WebXR
        setARCapability("unsupported");
      }
    } catch (error) {
      console.error("Android AR wird nicht unterstützt:", error);
      setARCapability("unsupported");
    }
  };

  // WebXR AR-Session starten
  const startWebXRAR = React.useCallback(async () => {
    if (!sceneRef.current || arCapability !== "webxr") return;

    try {
      const scene = sceneRef.current;

      // XR Experience Helper erstellen
      const xrHelper = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
          sessionMode: "immersive-ar",
          referenceSpaceType: "local-floor",
        },
        optionalFeatures: true,
      });

      // Hit-Test-Feature für Platzierung auf Oberflächen
      const hitTest = xrHelper.baseExperience.featuresManager.enableFeature(
        BABYLON.WebXRHitTest,
        "latest",
        { enableSelectionMesh: true },
      ) as BABYLON.WebXRHitTest;

      // Event-Listener für Hit-Test-Treffer
      let placed = false;
      hitTest.onHitTestResultObservable.add((results) => {
        if (results.length > 0 && !placed && modelRef.current) {
          placed = true;
          const hitPoint = results[0].position;
          modelRef.current.position = hitPoint;
        }
      });

      // Session-Ende-Handler
      xrHelper.baseExperience.onStateChangedObservable.add((state) => {
        if (state === BABYLON.WebXRState.NOT_IN_XR) {
          // Removed setARActive call
          placed = false;
          if (exitAR) exitAR();
        } else if (state === BABYLON.WebXRState.IN_XR) {
          // Removed setARActive call
        }
      });
    } catch (error) {
      console.error("Fehler beim Starten der AR-Session:", error);
    }
  };

  // iOS Quick Look AR starten
  const startIOSAR = React.useCallback(() => {
    // Verwende die USDZ-Datei, wenn angegeben, sonst Standard
    const usdzPath = iosSrc || "/usdz/bike/BikeBox_Mini_S2_v101_v5.usdz"; // Standardpfad
    window.location.href = `${usdzPath}#allowsContentScaling=${scale * 10}`;
    // Hinweis: Wir können nicht zuverlässig erkennen, wenn der Benutzer AR verlässt in iOS
    // Daher müssen wir uns darauf verlassen, dass der Benutzer zurücknavigiert
  };

  // AR starten basierend auf Gerättyp
  // Removed unused startAR function

  // Direkt AR starten, wenn unterstützt
  useEffect(() => {
    if (arCapability === "ios") {
      startIOSAR();
    } else if (arCapability === "webxr" || arCapability === "android") {
      startWebXRAR();
    }
  }, [arCapability, startIOSAR, startWebXRAR]);

  // Minimale UI ohne Vorschau und Buttons
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      />

      {arCapability === "unsupported" && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          AR wird auf diesem Gerät nicht unterstützt
        </div>
      )}
    </div>
  );
};
