import React, { useEffect, useState, useRef } from "react";

interface ModelViewerARProps {
  modelPath: string;
  iosSrc?: string;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scale?: number;
  backgroundColor?: string;
  posterPath?: string;
  isDevelopment?: boolean;
}

export const ModelViewerAR: React.FC<ModelViewerARProps> = ({
  modelPath = "/gltf/bike/senseBox_bike.gltf",
  iosSrc = "",
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  scale = 1,
  backgroundColor = "#FFFFFF",
  posterPath = "/assets/ar-placeholder.png",
  isDevelopment = false,
}) => {
  const [arCapability, setARCapability] = useState<"ios" | "webxr" | "unsupported" | "checking">("checking");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showDevelopmentWarning, setShowDevelopmentWarning] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scriptLoadedRef = useRef(false);

  // Schnelles Laden des Model Viewer Scripts
  useEffect(() => {
    // Prüfen, ob das Script bereits geladen ist
    if (document.querySelector('script[src*="model-viewer"]')) {
      setIsScriptLoaded(true);
      scriptLoadedRef.current = true;
      return;
    }

    // Script laden
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer@^2.1.1/dist/model-viewer.min.js';
    script.onload = () => {
      setIsScriptLoaded(true);
      scriptLoadedRef.current = true;
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // AR-Fähigkeiten erkennen und Modell vorladen
  useEffect(() => {
    if (!scriptLoadedRef.current) return;

    // AR-Fähigkeiten erkennen
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window);
    const isIOSSafari = isIOS && /^((?!chrome|android).)*safari/i.test(userAgent);
    const hasWebXR = "xr" in navigator;
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    // Verbesserte Geräteerkennung
    const isSamsung = /Samsung/i.test(userAgent) || 
                     /SM-/i.test(userAgent) || // Samsung Modellnummern
                     /GT-/i.test(userAgent) || // Ältere Samsung Modellnummern
                     /Galaxy/i.test(userAgent);
    
    const isChrome = /Chrome/i.test(userAgent);
    const isSamsungInternet = /SamsungBrowser/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent) || 
                     /Linux/i.test(userAgent) && /Mobile/i.test(userAgent);
    
    // Zusätzliche Erkennung für mobile Geräte
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent) || 
                    (window.innerWidth <= 768 && /Chrome/i.test(userAgent));
    
    // Diagnoseinformationen sammeln
    const diagnostics: string[] = [];
    diagnostics.push(`Browser: ${userAgent}`);
    diagnostics.push(`WebXR verfügbar: ${hasWebXR ? "Ja" : "Nein"}`);
    diagnostics.push(`Samsung Gerät: ${isSamsung ? "Ja" : "Nein"}`);
    diagnostics.push(`Chrome: ${isChrome ? "Ja" : "Nein"}`);
    diagnostics.push(`Samsung Internet: ${isSamsungInternet ? "Ja" : "Nein"}`);
    diagnostics.push(`Android: ${isAndroid ? "Ja" : "Nein"}`);
    diagnostics.push(`Mobilgerät: ${isMobile ? "Ja" : "Nein"}`);
    diagnostics.push(`Localhost: ${isLocalhost ? "Ja" : "Nein"}`);
    diagnostics.push(`Bildschirmbreite: ${window.innerWidth}px`);
    
    setDiagnosticInfo(diagnostics);

    if (isLocalhost && !isDevelopment) {
      setShowDevelopmentWarning(true);
    }

    // Spezielle Behandlung für Samsung-Geräte und mobile Chrome
    if ((isSamsung || isMobile) && isChrome) {
      // Mobile Chrome kann WebXR unterstützen, auch wenn es nicht erkannt wird
      setARCapability("webxr");
      diagnostics.push("Mobile Chrome erkannt - WebXR aktiviert");
    } else if (isIOSSafari) {
      setARCapability("ios");
      // Für iOS: Modell vorladen und AR-Button sofort anzeigen
      preloadModel(modelPath);
    } else if (hasWebXR) {
      setARCapability("webxr");
      // Für WebXR: Modell vorladen
      preloadModel(modelPath);
    } else {
      setARCapability("unsupported");
      if (isMobile) {
        diagnostics.push("Mobilgerät erkannt, aber WebXR nicht verfügbar");
      }
    }

    // Modell vorladen
    function preloadModel(url: string) {
      // Erstelle ein verstecktes model-viewer Element zum Vorladen
      const preloadViewer = document.createElement('model-viewer');
      preloadViewer.setAttribute('src', url);
      preloadViewer.style.display = 'none';
      document.body.appendChild(preloadViewer);
      
      // Entferne das Element nach dem Laden
      preloadViewer.addEventListener('load', () => {
        setIsLoading(false);
        if (preloadViewer.parentNode) {
          preloadViewer.parentNode.removeChild(preloadViewer);
        }
      });
    }
  }, [isDevelopment, modelPath]);

  // Für iOS verwenden wir Quick Look
  if (arCapability === "ios") {
    const usdzPath = iosSrc || "/usdz/bike/BikeBox_Mini_S2_v101_v5.usdz";
    
    // Direkt zu Quick Look weiterleiten
    window.location.href = `${usdzPath}#allowsContentScaling=${scale * 10}`;
    return null;
  }

  // Für WebXR-fähige Geräte verwenden wir Model Viewer
  return (
    <div style={{ width: "100%", height: "500px", position: "relative", backgroundColor }}>
      {isScriptLoaded ? (
        <model-viewer
          src={modelPath}
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
          ar-modes={isDevelopment ? "webxr" : "webxr scene-viewer quick-look"}
          poster={posterPath}
          camera-orbit={`${rotationX}deg ${rotationY}deg ${rotationZ}deg`}
          scale={scale.toString()}
          style={{ width: "100%", height: "100%" }}
          onLoad={() => setIsLoading(false)}
        >
          <button slot="ar-button" style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "normal",
            letterSpacing: "0.025em"
          }}>
            In deinem Raum ansehen
          </button>
        </model-viewer>
      ) : (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}>
          <span style={{ fontSize: "24px", color: "#666" }}>
            Lade 3D-Modell...
          </span>
        </div>
      )}

      {isLoading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          zIndex: 1000
        }}>
          Lade AR-Funktionalität...
        </div>
      )}

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
            maxWidth: "80%",
          }}
        >
          <strong>AR wird auf diesem Gerät nicht unterstützt</strong>
          <div style={{ marginTop: "10px", fontSize: "12px" }}>
            <button 
              onClick={() => {
                const infoDiv = document.getElementById("diagnostic-info");
                if (infoDiv) {
                  infoDiv.style.display = infoDiv.style.display === "none" ? "block" : "none";
                }
              }}
              style={{
                backgroundColor: "transparent",
                border: "1px solid white",
                color: "white",
                padding: "5px 10px",
                borderRadius: "3px",
                cursor: "pointer"
              }}
            >
              Diagnose anzeigen
            </button>
            <div 
              id="diagnostic-info" 
              style={{ 
                display: "none", 
                marginTop: "10px", 
                textAlign: "left",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "10px",
                borderRadius: "5px"
              }}
            >
              {diagnosticInfo.map((info, index) => (
                <div key={index} style={{ marginBottom: "5px" }}>{info}</div>
              ))}
              <div style={{ marginTop: "10px" }}>
                <strong>Tipps:</strong>
                <ul style={{ margin: "5px 0 0 0", paddingLeft: "20px" }}>
                  <li>Verwenden Sie Chrome oder Samsung Internet</li>
                  <li>Stellen Sie sicher, dass ARCore installiert ist</li>
                  <li>Testen Sie auf einer öffentlichen URL mit HTTPS</li>
                  <li>Aktivieren Sie den Entwicklungsmodus auf dieser Seite</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDevelopmentWarning && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "15px 20px",
            backgroundColor: "#ffc107",
            color: "#212529",
            border: "none",
            borderRadius: "5px",
            maxWidth: "90%",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <strong>Entwicklungsumgebung erkannt</strong>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
            AR-Funktionen funktionieren möglicherweise nicht auf localhost. 
            Verwenden Sie eine öffentliche URL mit HTTPS für vollständige AR-Funktionalität.
          </p>
        </div>
      )}
    </div>
  );
}; 