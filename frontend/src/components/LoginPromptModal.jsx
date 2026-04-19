import { useNavigate } from "react-router-dom";

export default function LoginPromptModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleSignup = () => {
    onClose();
    navigate("/signup");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={styles.backdrop}
        onClick={onClose}
      />

      {/* Modal */}
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          {/* Close Button */}
          <button style={styles.closeBtn} onClick={onClose}>
            ✕
          </button>

          {/* Icon */}
          <div style={styles.icon}>🔐</div>

          {/* Title */}
          <h2 style={styles.title}>Sign In Required</h2>

          {/* Description */}
          <p style={styles.description}>
            You need to sign in to access this feature. Please log in or create an account to continue.
          </p>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button style={styles.loginBtn} onClick={handleLogin}>
              Login
            </button>
            <button style={styles.signupBtn} onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },

  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    width: "90%",
    maxWidth: 400,
  },

  modalContent: {
    background: "#fff",
    borderRadius: 16,
    padding: 32,
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    position: "relative",
  },

  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    color: "#999",
    padding: 0,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s",
  },

  icon: {
    fontSize: 48,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0f1117",
    margin: "0 0 12px 0",
  },

  description: {
    fontSize: 14,
    color: "#666",
    margin: "0 0 24px 0",
    lineHeight: 1.6,
  },

  buttonGroup: {
    display: "flex",
    gap: 12,
    width: "100%",
  },

  loginBtn: {
    flex: 1,
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    border: "none",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },

  signupBtn: {
    flex: 1,
    background: "#f0f0f0",
    border: "1.5px solid #ddd",
    color: "#0f1117",
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};
