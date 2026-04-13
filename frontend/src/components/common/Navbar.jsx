// components/common/Navbar.jsx
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items for all pages
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Interviews", path: "/interviews" },
    { name: "Schedule", path: "/schedule-interview" },
    { name: "AI Chat", path: "/chatbot" },
    { name: "Feedback", path: "/view-feedback" }
  ];

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        {/* Logo */}
        <span
          style={styles.logo}
          onClick={() => navigate("/")}
          title="Go to Home"
        >
          InterviewX
        </span>

        {/* Navigation Links */}
        <ul style={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.name}>
              <span
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.navLink,
                  ...(isActive(item.path)
                    ? styles.navLinkActive
                    : {})
                }}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Right Side Buttons */}
        <div style={styles.navActions}>
          <button
            onClick={() => navigate("/view-feedback")}
            style={styles.navBtn}
            title="View Interview Feedback"
          >
            📋 Feedback
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{...styles.navBtn, ...styles.navBtnPrimary}}
            title="Login or Sign Up"
          >
            Login
            <span style={styles.navCtaIcon}>↗</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255, 255, 255, 0.97)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #ebebf0",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
  },

  navContainer: {
    width: "100%",
    maxWidth: 1400,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px"
  },

  logo: {
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 900,
    fontSize: 20,
    letterSpacing: "-0.5px",
    color: "#0f1117",
    cursor: "pointer",
    transition: "color 0.2s",
    userSelect: "none"
  },

  navLinks: {
    display: "flex",
    gap: 32,
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: "center"
  },

  navLink: {
    fontSize: 14,
    fontWeight: 500,
    color: "#555",
    cursor: "pointer",
    transition: "color 0.2s",
    paddingBottom: "4px",
    borderBottom: "2px solid transparent"
  },

  navLinkActive: {
    color: "#7c5af6",
    borderBottomColor: "#7c5af6",
    fontWeight: 600
  },

  navActions: {
    display: "flex",
    gap: 12,
    alignItems: "center"
  },

  navBtn: {
    background: "#fff",
    border: "1.5px solid #0f1117",
    color: "#0f1117",
    padding: "8px 16px",
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    transition: "all 0.2s"
  },

  navBtnPrimary: {
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    border: "none",
    color: "#fff"
  },

  navCtaIcon: {
    fontSize: 14,
    fontWeight: 800
  }
};
