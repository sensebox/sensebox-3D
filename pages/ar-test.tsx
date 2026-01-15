import React, { useState } from 'react';
import { ModelViewerAR } from '../src/components/model-viewer-ar';

const ARTestPage: React.FC = () => {
  const [isDevelopment, setIsDevelopment] = useState(false);
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        AR-Test mit Google Model Viewer
      </h1>
      
      {isLocalhost && (
        <div style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#e9ecef',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <strong>Entwicklungsumgebung erkannt</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
              AR-Funktionen funktionieren möglicherweise nicht auf localhost. 
              Aktivieren Sie den Entwicklungsmodus, um nur WebXR zu verwenden.
            </p>
          </div>
          <button 
            onClick={() => setIsDevelopment(!isDevelopment)}
            style={{
              padding: '8px 16px',
              backgroundColor: isDevelopment ? '#28a745' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {isDevelopment ? 'Entwicklungsmodus deaktivieren' : 'Entwicklungsmodus aktivieren'}
          </button>
        </div>
      )}
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Test 1: Standardeinstellungen</h2>
        <ModelViewerAR 
          modelPath="/gltf/bike/senseBox_bike.gltf"
          isDevelopment={isDevelopment}
        />
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Test 2: Angepasste Rotation und Skalierung</h2>
        <ModelViewerAR 
          modelPath="/gltf/bike/senseBox_bike.gltf"
          rotationY={45}
          scale={1.5}
          backgroundColor="#f5f5f5"
          isDevelopment={isDevelopment}
        />
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Test 3: Mit Platzhalterbild</h2>
        <ModelViewerAR 
          modelPath="/gltf/bike/senseBox_bike.gltf"
          posterPath="/assets/ar-placeholder.png"
          backgroundColor="#e9ecef"
          isDevelopment={isDevelopment}
        />
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#e9ecef', 
        borderRadius: '8px',
        marginTop: '30px'
      }}>
        <h3>Hinweise zum Testen:</h3>
        <ul>
          <li>Auf iOS-Geräten wird Quick Look aktiviert</li>
          <li>Auf Android-Geräten mit WebXR-Unterstützung wird der AR-Button angezeigt</li>
          <li>Auf nicht unterstützten Geräten wird eine Warnung angezeigt</li>
          <li>Die Komponente erkennt automatisch die AR-Fähigkeiten des Geräts</li>
          {isLocalhost && (
            <li>
              <strong>Entwicklungsmodus:</strong> Wenn aktiviert, wird nur WebXR verwendet, 
              was auf einigen Geräten besser funktionieren kann, aber weniger AR-Optionen bietet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ARTestPage; 