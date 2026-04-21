import CameraDiagnostic from "../components/CameraDiagnostic";
import Navbar from "../components/common/Navbar";

/**
 * CameraTest - Page to test and diagnose camera issues
 */
function CameraTest() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px 20px", background: "#f5f6fa", minHeight: "100vh" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
            🎥 Camera & Microphone Diagnostic
          </h1>
          <p style={{ marginBottom: "24px", color: "#555" }}>
            Having camera issues? Use this tool to diagnose the problem.
          </p>
          
          <CameraDiagnostic />
          
          <div style={{ marginTop: "32px", background: "white", padding: "24px", borderRadius: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>📋 Checklist</h2>
            <ul style={{ color: "#555", lineHeight: "1.8" }}>
              <li>✅ Camera is physically connected to your computer</li>
              <li>✅ No other app (Zoom, Teams, etc.) is using the camera</li>
              <li>✅ Browser has permission to access camera (check address bar 🔒)</li>
              <li>✅ You're using a modern browser (Chrome, Firefox, Safari, Edge)</li>
              <li>✅ You're on localhost or HTTPS (not plain HTTP)</li>
              <li>✅ No antivirus software is blocking camera access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraTest;
