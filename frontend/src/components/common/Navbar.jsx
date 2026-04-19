// components/common/Navbar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPromptModal from "../LoginPromptModal";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Interviews", path: "/interviews", protected: true },
    { name: "Schedule", path: "/schedule-interview", protected: true },
    { name: "AI Chat", path: "/chatbot", protected: true },
    { name: "Feedback", path: "/view-feedback", protected: true }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = (path, isProtected) => {
    if (isProtected && !user) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.navContainer}>

          {/* Logo */}
          <span style={styles.logo} onClick={() => navigate("/")}>
            InterviewX
          </span>

          {/* Navigation Links */}
          <ul style={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item.name}>
                <span
                  onClick={() => handleNavClick(item.path, item.protected)}
                  style={{
                    ...styles.navLink,
                    ...(isActive(item.path) ? styles.navLinkActive : {}),
                  }}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div style={styles.navActions}>
            <button
              onClick={() =>
                user ? navigate("/interviews") : setShowLoginModal(true)
              }
              style={styles.navBtn}
            >
              🎤 Start Interview
            </button>

            {user ? (
              <div style={styles.userSection}>
                <div style={styles.userBox}>
                  <div style={styles.avatar}>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span style={styles.userName}>
                    {user?.name || "User"}
                  </span>
                </div>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  style={styles.logoutBtn}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                style={{ ...styles.navBtn, ...styles.navBtnPrimary }}
              >
                Login ↗
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* Modal */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}