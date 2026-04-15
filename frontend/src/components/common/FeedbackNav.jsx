// components/common/FeedbackNav.jsx
import { useNavigate } from "react-router-dom";

export default function FeedbackNav() {
  const navigate = useNavigate();

  return (
    <nav style={s.nav}>
      <div style={s.navContainer}>

        <span style={s.logo} onClick={() => navigate("/")}>
          InterviewX
        </span>

        <ul style={s.navLinks}>
          {[
            { name: "Home", path: "/" },
            { name: "Start Interview", path: "/" },
            { name: "AI Chatbot", path: "/" },
            { name: "Recordings", path: "/" },
            { name: "Feedback", path: "/view-feedback" }
          ].map((item) => (
            <li key={item.name}>
              <span onClick={() => navigate(item.path)} style={s.navLink}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        <button style={s.navCta}>
          Login / Sign Up <span style={s.navCtaIcon}>↗</span>
        </button>

      </div>
    </nav>
  );
}

const s = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.97)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #ebebf0",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  navContainer: {
    width: "100%",
    maxWidth: 1400,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 60px",
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
    margin: 0
  },

  navLink: {
    color: "#555",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "color 0.2s",
    paddingBottom: "4px",
    borderBottom: "2px solid transparent"
  },

  navCta: {
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

  navCtaIcon: {
    fontSize: 14,
    fontWeight: 800
  }
};