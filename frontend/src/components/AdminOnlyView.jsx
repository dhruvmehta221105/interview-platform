import { useNavigate } from "react-router-dom";
import Navbar from "./common/Navbar";

/**
 * AdminOnlyView - Shows access denied message for non-admin users
 */
const AdminOnlyView = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Icon */}
          <div style={styles.iconWrapper}>
            <svg 
              style={styles.icon}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>

          {/* Title */}
          <h1 style={styles.title}>Admin Access Only</h1>

          {/* Message */}
          <p style={styles.message}>
            This page is restricted to administrators only. If you believe this is an error, please contact your administrator.
          </p>

          {/* Badge */}
          <div style={styles.badge}>
            🔐 Administrator View
          </div>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button
              onClick={() => navigate("/")}
              style={styles.buttonPrimary}
            >
              ← Back to Home
            </button>
            <button
              onClick={() => navigate("/view-feedback")}
              style={styles.buttonSecondary}
            >
              View Feedback →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    background: "#f5f6fa",
    minHeight: "100vh",
    color: "#0f1117",
  },

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 64px)",
    padding: "24px",
  },

  card: {
    background: "#fff",
    border: "1.5px solid #e8e9f0",
    borderRadius: "12px",
    padding: "60px 40px",
    maxWidth: "480px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
  },

  iconWrapper: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c5af6 0%, #ff6b6b 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
  },

  icon: {
    width: "40px",
    height: "40px",
    color: "#fff",
  },

  title: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: "28px",
    fontWeight: 800,
    color: "#0f1117",
    marginBottom: "12px",
    letterSpacing: "-0.5px",
  },

  message: {
    fontSize: "15px",
    color: "#555f7a",
    lineHeight: "1.6",
    marginBottom: "24px",
  },

  badge: {
    display: "inline-block",
    background: "#f0f0ff",
    border: "1px solid #7c5af6",
    color: "#7c5af6",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "13px",
    fontWeight: 700,
    marginBottom: "32px",
  },

  buttonGroup: {
    display: "flex",
    gap: "12px",
    flexDirection: "column",
  },

  buttonPrimary: {
    background: "#7c5af6",
    border: "none",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      background: "#6b4de3",
    },
  },

  buttonSecondary: {
    background: "transparent",
    border: "1.5px solid #7c5af6",
    color: "#7c5af6",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      background: "#f0f0ff",
    },
  },
};

export default AdminOnlyView;
