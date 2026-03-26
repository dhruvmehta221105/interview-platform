// components/common/Navbar.jsx
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={s.nav}>
      <span style={s.logo}>InterviewX</span>
      <ul style={s.navLinks}>
        {["Start Interview", "AI Chatbot", "Recordings", "Contact Us"].map(l => (
          <li key={l}><a href="#" className="nav-link" style={s.navLink}>{l}</a></li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={() => navigate("/view-feedback")} style={s.feedbackBtn}>Feedback</button>
        <button style={s.navCta}>Login/Sign Up <span style={s.navCtaIcon}>↗</span></button>
      </div>
    </nav>
  );
}

const s = {
  nav: { position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid #ebebf0", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" },
  logo: { fontFamily: "'Manrope', sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: "-0.5px", color: "#0f1117" },
  navLinks: { display: "flex", gap: 32, listStyle: "none", padding: 0 },
  navLink: { fontSize: 14, fontWeight: 500, color: "#555", textDecoration: "none", transition: "color 0.2s" },
  feedbackBtn: { background: "#f0ecff", color: "#7c5af6", border: "none", padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: "pointer" },
  navCta: { background: "#fff", border: "1.5px solid #0f1117", color: "#0f1117", padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 },
  navCtaIcon: { background: "#0f1117", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 },
};
