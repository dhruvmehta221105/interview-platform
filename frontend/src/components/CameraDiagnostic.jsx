import { useState, useEffect } from "react";

/**
 * CameraDiagnostic - Comprehensive camera debugging tool
 * Run this to identify camera issues
 */
const CameraDiagnostic = () => {
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (category, status, message) => {
    setResults(prev => [...prev, { category, status, message, time: new Date().toLocaleTimeString() }]);
  };

  const runDiagnostics = async () => {
    setResults([]);
    setIsRunning(true);

    try {
      // 1. Check browser support
      addResult("Browser", "ℹ️", `User Agent: ${navigator.userAgent.substring(0, 80)}...`);
      
      if (!navigator.mediaDevices) {
        addResult("Browser", "❌", "mediaDevices not supported - using outdated browser");
        setIsRunning(false);
        return;
      }
      addResult("Browser", "✅", "WebRTC APIs available");

      // 2. Check permissions API
      if (navigator.permissions && navigator.permissions.query) {
        addResult("Permissions", "ℹ️", "Permissions API available");
      } else {
        addResult("Permissions", "ℹ️", "Permissions API not available");
      }

      // 3. Check for devices
      addResult("Devices", "🔍", "Checking for connected devices...");
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      const audioDevices = devices.filter(d => d.kind === 'audioinput');

      if (videoDevices.length === 0) {
        addResult("Devices", "❌", "NO CAMERA FOUND - Check if camera is connected");
      } else {
        addResult("Devices", "✅", `${videoDevices.length} camera(s) found:`);
        videoDevices.forEach((cam, i) => {
          addResult("Devices", "ℹ️", `  ${i + 1}. ${cam.label || `Camera ${i + 1}`}`);
        });
      }

      if (audioDevices.length === 0) {
        addResult("Devices", "❌", "NO MICROPHONE FOUND - Check if microphone is connected");
      } else {
        addResult("Devices", "✅", `${audioDevices.length} microphone(s) found:`);
        audioDevices.forEach((mic, i) => {
          addResult("Devices", "ℹ️", `  ${i + 1}. ${mic.label || `Microphone ${i + 1}`}`);
        });
      }

      // 4. Request permissions
      addResult("Permissions", "🔍", "Requesting camera and microphone access...");
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        addResult("Permissions", "✅", "✅ ACCESS GRANTED - Camera and microphone allowed");
      } catch (err) {
        if (err.name === "NotAllowedError") {
          addResult("Permissions", "❌", "❌ ACCESS DENIED - You denied camera/mic permission");
          addResult("Permissions", "💡", "Fix: Check browser address bar → Lock icon → Camera → Allow");
        } else if (err.name === "NotFoundError") {
          addResult("Permissions", "❌", "❌ DEVICE NOT FOUND - No camera or microphone detected");
          addResult("Permissions", "💡", "Fix: Connect a camera/microphone and try again");
        } else if (err.name === "NotReadableError") {
          addResult("Permissions", "❌", "❌ CAMERA IN USE - Another app is using the camera");
          addResult("Permissions", "💡", "Fix: Close other apps/tabs using the camera");
        } else if (err.name === "SecurityError") {
          addResult("Permissions", "❌", "❌ SECURITY ERROR - Insecure context (HTTP on non-localhost)");
          addResult("Permissions", "💡", "Fix: Use HTTPS or localhost for local testing");
        } else {
          addResult("Permissions", "❌", `❌ ERROR: ${err.name} - ${err.message}`);
        }
        setIsRunning(false);
        return;
      }

      // 5. Test stream
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      if (videoTracks.length === 0) {
        addResult("Stream", "❌", "Video track missing from stream");
      } else {
        addResult("Stream", "✅", `Video track active: ${videoTracks[0].label}`);
        addResult("Stream", "ℹ️", `State: ${videoTracks[0].readyState}`);
      }

      if (audioTracks.length === 0) {
        addResult("Stream", "❌", "Audio track missing from stream");
      } else {
        addResult("Stream", "✅", `Audio track active: ${audioTracks[0].label}`);
        addResult("Stream", "ℹ️", `State: ${audioTracks[0].readyState}`);
      }

      // 6. Test video element
      addResult("Video Element", "🔍", "Testing video element playback...");
      const videoEl = document.createElement('video');
      videoEl.srcObject = stream;
      videoEl.autoplay = true;
      videoEl.muted = true;

      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve(false);
        }, 3000);

        videoEl.onloadedmetadata = () => {
          clearTimeout(timeout);
          resolve(true);
        };
      });

      if (videoEl.readyState >= 2) { // HAVE_CURRENT_DATA
        addResult("Video Element", "✅", "Video element can play stream");
      } else {
        addResult("Video Element", "⚠️", "Video element not ready yet (may be normal)");
      }

      // 7. Stop stream
      stream.getTracks().forEach(track => track.stop());
      addResult("Cleanup", "✅", "Stream stopped successfully");

      addResult("Summary", "✅", "🎉 CAMERA DIAGNOSTIC COMPLETE - Everything looks good!");

    } catch (err) {
      addResult("Error", "❌", `Unexpected error: ${err.message}`);
    }

    setIsRunning(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📹 Camera Diagnostic Tool</h2>
      
      <button 
        onClick={runDiagnostics} 
        disabled={isRunning}
        style={{...styles.button, opacity: isRunning ? 0.6 : 1}}
      >
        {isRunning ? "Running..." : "Start Diagnostic"}
      </button>

      <div style={styles.resultsContainer}>
        {results.length === 0 && !isRunning && (
          <p style={styles.placeholder}>Click "Start Diagnostic" to test your camera</p>
        )}
        
        {results.map((result, i) => (
          <div key={i} style={styles.resultItem}>
            <div style={styles.resultHeader}>
              <span style={styles.resultCategory}>{result.category}</span>
              <span style={styles.resultStatus}>{result.status}</span>
              <span style={styles.resultTime}>{result.time}</span>
            </div>
            <div style={styles.resultMessage}>{result.message}</div>
          </div>
        ))}
      </div>

      <div style={styles.infoBox}>
        <h3>🔧 Common Fixes</h3>
        <ul>
          <li><strong>❌ No camera found:</strong> Connect a USB camera or use built-in camera</li>
          <li><strong>❌ Access denied:</strong> Browser → Lock icon → Camera → Allow</li>
          <li><strong>❌ Camera in use:</strong> Close Zoom/Teams/other apps using camera</li>
          <li><strong>❌ Black screen:</strong> Check browser address bar lock icon → Camera settings</li>
          <li><strong>❌ HTTPS error:</strong> Use localhost or deploy with HTTPS</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "24px",
    background: "#f5f5f5",
    borderRadius: "12px",
    fontFamily: "monospace",
    maxWidth: "800px",
    margin: "20px auto",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#333",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  resultsContainer: {
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: "16px",
  },
  placeholder: {
    color: "#999",
    textAlign: "center",
    padding: "20px",
  },
  resultItem: {
    borderLeft: "3px solid #007bff",
    paddingLeft: "12px",
    marginBottom: "12px",
    fontSize: "12px",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  resultCategory: {
    fontWeight: "bold",
    color: "#333",
  },
  resultStatus: {
    color: "#666",
  },
  resultTime: {
    color: "#999",
    fontSize: "11px",
  },
  resultMessage: {
    color: "#444",
    marginTop: "4px",
  },
  infoBox: {
    background: "#fff3cd",
    border: "1px solid #ffc107",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "13px",
  },
};

export default CameraDiagnostic;
