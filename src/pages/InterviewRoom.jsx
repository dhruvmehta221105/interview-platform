import { useParams, useNavigate } from "react-router-dom";

function InterviewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const endInterview = () => {
    // Redirect to the feedback page with the specific ID
    navigate(`/add-feedback/${id}`);
  };

  return (
    <div style={styles.page}>
      {/* Top Header Bar */}
      <nav style={styles.nav}>
        <div style={styles.logoGroup}>
          <div style={styles.logoIcon}>IX</div>
          <span style={styles.sessionTitle}>Live Interview Session #{id}</span>
        </div>
        <div style={styles.timer}>00:45:12</div>
      </nav>

      <div style={styles.mainLayout}>
        {/* Left Side: Video Feeds */}
        <div style={styles.videoSection}>
          <div style={styles.mainVideoStage}>
            <div style={styles.videoOverlay}>
              <span style={styles.userName}>Candidate: Arjun Sharma</span>
            </div>
            {/* Placeholder for Video Feed */}
            <div style={styles.videoPlaceholder}>
              <div style={styles.pulseRing}></div>
              <p style={styles.placeholderText}>Connecting to Candidate...</p>
            </div>
          </div>

          {/* User's own small preview */}
          <div style={styles.selfPreview}>
            <span style={styles.userNameSmall}>You (Interviewer)</span>
          </div>
        </div>

        {/* Right Side: Quick Notes / Info Panel */}
        <div style={styles.sidePanel}>
          <h3 style={styles.sideTitle}>Interview Guide</h3>
          <div style={styles.guideCard}>
            <p style={styles.guideLabel}>Role</p>
            <p style={styles.guideValue}>Senior Frontend Developer</p>
          </div>
          
          <div style={styles.notesArea}>
            <label style={styles.label}>Quick Notes</label>
            <textarea 
              style={styles.textarea} 
              placeholder="Jot down quick thoughts during the interview... these won't be saved until the feedback form."
            ></textarea>
          </div>

          <button onClick={endInterview} style={styles.btnEnd}>
            End & Write Feedback
          </button>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div style={styles.controlBar}>
        <div style={styles.controlsGroup}>
          <button style={styles.iconBtn}>🎤</button>
          <button style={styles.iconBtn}>📹</button>
          <button style={styles.iconBtn}>🖥️</button>
          <button style={styles.iconBtn}>💬</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { height: "100vh", backgroundColor: "#0f172a", color: "#fff", display: "flex", flexDirection: "column", fontFamily: "'Manrope', sans-serif" },
  nav: { height: "64px", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1e293b" },
  logoGroup: { display: "flex", alignItems: "center", gap: "12px" },
  logoIcon: { background: "linear-gradient(135deg, #7c5af6, #4f8ef7)", padding: "6px 10px", borderRadius: "8px", fontWeight: 800, fontSize: "14px" },
  sessionTitle: { fontSize: "16px", fontWeight: 600, color: "#94a3b8" },
  timer: { background: "#1e293b", padding: "6px 16px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, color: "#f8fafc" },
  
  mainLayout: { flex: 1, display: "flex", padding: "20px", gap: "20px", overflow: "hidden" },
  
  videoSection: { flex: 3, position: "relative", display: "flex", flexDirection: "column", gap: "10px" },
  mainVideoStage: { flex: 1, background: "#1e293b", borderRadius: "24px", position: "relative", overflow: "hidden", border: "1px solid #334155" },
  videoPlaceholder: { height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  placeholderText: { color: "#64748b", fontSize: "14px" },
  pulseRing: { width: "12px", height: "12px", background: "#4ade80", borderRadius: "50%", marginBottom: "12px", boxShadow: "0 0 10px #4ade80" },
  videoOverlay: { position: "absolute", bottom: "20px", left: "20px", zIndex: 10 },
  userName: { background: "rgba(0,0,0,0.5)", padding: "6px 12px", borderRadius: "8px", fontSize: "14px", fontWeight: 600 },
  
  selfPreview: { position: "absolute", top: "20px", right: "20px", width: "180px", height: "120px", background: "#334155", borderRadius: "16px", border: "2px solid #4f8ef7", display: "flex", alignItems: "flex-end", padding: "10px" },
  userNameSmall: { fontSize: "11px", fontWeight: 600, color: "#cbd5e1" },

  sidePanel: { flex: 1, background: "#1e293b", borderRadius: "24px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px", border: "1px solid #334155" },
  sideTitle: { fontSize: "18px", fontWeight: 700, margin: 0 },
  guideCard: { background: "#0f172a", padding: "16px", borderRadius: "16px" },
  guideLabel: { fontSize: "12px", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" },
  guideValue: { fontSize: "15px", fontWeight: 600 },
  
  notesArea: { flex: 1, display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "13px", fontWeight: 600, color: "#94a3b8" },
  textarea: { flex: 1, background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", padding: "12px", color: "#fff", resize: "none", fontSize: "14px", outline: "none" },
  
  btnEnd: { background: "#ef4444", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: 700, cursor: "pointer", transition: "opacity 0.2s" },

  controlBar: { height: "80px", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "1px solid #1e293b" },
  controlsGroup: { display: "flex", gap: "16px" },
  iconBtn: { width: "48px", height: "48px", borderRadius: "50%", border: "1px solid #334155", background: "#1e293b", color: "#fff", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }
};

export default InterviewRoom;