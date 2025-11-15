import { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function detectARCapability() {
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  const isIOSSafari =
    isIOS && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const hasWebXR = "xr" in navigator;

  if (isIOSSafari) return "ios";
  if (hasWebXR) return "webxr";
  return "unsupported";
}

interface ARViewProps {
  modelPath: string;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  exitAR: () => void;
}

export default function ARView({
  modelPath,
  rotationX,
  rotationY,
  rotationZ,
  scale,
  exitAR,
}: ARViewProps) {
  const [arCapability, setARCapability] = useState<
    "ios" | "webxr" | "unsupported" | "checking"
  >("checking");

  useEffect(() => {
    setARCapability(detectARCapability());
  }, []);

  useEffect(() => {
    // Starte die AR-Session automatisch, wenn AR unterstützt wird.
    if (arCapability === "ios") {
      // AR Quick Look auf iOS (Achtung: muss oft über einen User-Click getriggert werden)
      const usdzModelUrl = "/BikeBox_Mini_S2_v101_v5.usdz";
      window.location.href = `${usdzModelUrl}#allowsContentScaling=20`;
    } else if (arCapability === "webxr") {
      startWebXRAR();
    }
    // Wenn AR nicht unterstützt wird, kannst du exitAR() aufrufen oder einfach nichts tun.
  }, [arCapability]);

  const startWebXRAR = async () => {
    if (!navigator.xr) {
      console.error("WebXR wird nicht unterstützt");
      return;
    }

    try {
      const isSupported = await navigator.xr.isSessionSupported("immersive-ar");
      if (!isSupported) {
        console.error("AR wird nicht unterstützt");
        return;
      }
      // Erstelle ein Overlay-Element, das für dom-overlay benötigt wird – ohne sichtbare Buttons/Meldungen.
      const overlayElement = document.createElement("div");
      overlayElement.style.width = "100%";
      overlayElement.style.height = "100%";
      overlayElement.style.position = "absolute";
      overlayElement.style.top = "0";
      overlayElement.style.left = "0";
      // Optional: overlayElement.style.display = "none"; wenn es unsichtbar sein soll.
      document.body.appendChild(overlayElement);

      const session: XRSession = await navigator.xr.requestSession(
        "immersive-ar",
        {
          requiredFeatures: ["hit-test"],
          optionalFeatures: ["dom-overlay"],
          domOverlay: { root: overlayElement },
        },
      );

      const canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      const gl =
        canvas.getContext("webgl2", { xrCompatible: true }) ||
        canvas.getContext("webgl", { xrCompatible: true });
      if (!gl) {
        console.error("WebGL wird nicht unterstützt");
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        context: gl as WebGLRenderingContext | WebGL2RenderingContext,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.xr.enabled = true;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // GLTF-Modell laden
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          if (model) {
            model.scale.set(scale, scale, scale);
            model.rotation.x = rotationX * (Math.PI / 180);
            model.rotation.y = rotationY * (Math.PI / 180);
            model.rotation.z = rotationZ * (Math.PI / 180);
            // Direkt sichtbar, da wir keine Platzierungslogik benötigen.
            model.visible = true;
            scene.add(model);
          }
        },
        undefined,
        (error) => {
          console.error("Fehler beim Laden des GLTF-Modells:", error);
        },
      );

      const referenceSpace: XRReferenceSpace =
        await session.requestReferenceSpace("local");

      await session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, gl),
      });

      if (!session.requestHitTestSource) {
        console.error("Hit Test Source wird nicht unterstützt");
      }

      const onXRFrame = (_time: number, frame: XRFrame) => {
        session.requestAnimationFrame(onXRFrame);
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
          const view = pose.views[0];
          const viewport = session.renderState.baseLayer?.getViewport(view);
          if (viewport) {
            renderer.setSize(viewport.width, viewport.height);
            camera.matrix.fromArray(view.transform.matrix);
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.updateMatrixWorld(true);
            renderer.render(scene, camera);
          }
        }
      };

      session.requestAnimationFrame(onXRFrame);
      session.addEventListener("end", () => {
        // Bereinige Canvas und Overlay, wenn die Session endet
        document.body.removeChild(overlayElement);
        document.body.removeChild(canvas);
        exitAR();
      });
    } catch (error) {
      console.error("Fehler beim Starten der AR-Session:", error);
    }
  };

  // Es wird kein UI gerendert, da die AR-Session direkt gestartet wird.
  return null;
}
