// components/common/FeedbackNav.jsx
export default function FeedbackNav() {
  return (
    <nav style={s.nav}>
      <span style={s.logo}>InterviewX</span>
      <ul style={s.navLinks}>
        {["Start Interview", "AI Chatbot", "Recordings", "Feedback"].map((l) => (
          <li key={l}><a href="#" style={s.navLink}>{l}</a></li>
        ))}
      </ul>
      <a href="#" style={s.navCta}>Login / Sign Up ↗</a>
    </nav>
  );
}

const s = {
  nav: { background: "#fff", borderBottom: "1px solid #ebebf0", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 0 #ebebf0" },
  logo: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" },
  navLinks: { display: "flex", gap: 32, listStyle: "none", padding: 0, margin: 0 },
  navLink: { textDecoration: "none", color: "#555", fontSize: 14, fontWeight: 500 },
  navCta: { background: "#0f1117", color: "#fff", padding: "9px 20px", borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: "none" },
};
