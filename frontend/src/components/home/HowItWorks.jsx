// components/home/HowItWorks.jsx
const HOW_STEPS = [
  { n: "01", icon: "↩", color: "#e8f0ff", title: "Sign Up and create Account", desc: "Fill out your details and showcase your skills." },
  { n: "02", icon: "⬆", color: "#fff3e0", title: "Upload Your Portfolio", desc: "Add your resume, videos, and more." },
  { n: "03", icon: "⊕", color: "#f3e8ff", title: "Get Discovered", desc: "Let employers find and contact you." },
];

export default function HowItWorks() {
  return (
    <section style={g.section}>
      <div style={g.howLayout}>
        <div style={{ flex: "0 0 420px" }}>
          <h2 style={{ ...g.sectionTitle, textAlign: "left", marginBottom: 32 }}>How It Works</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="how-step" style={{ ...g.howStep, transition: "all 0.25s" }}>
                <div style={{ ...g.howNum, color: i === 0 ? "#c8d8ff" : i === 1 ? "#ffd8a8" : "#e8c8ff" }}>{step.n}</div>
                <div style={{ ...g.howIcon, background: step.color }}>{step.icon}</div>
                <div>
                  <div style={g.howTitle}>{step.title}</div>
                  <div style={g.howDesc}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={g.howImages}>
          <div style={g.howImg1}>
            <div style={g.howImgPlaceholder1}>
              <div style={g.avatarLg}>👨‍💻</div>
              <div style={{ fontSize: 13, color: "#fff", marginTop: 8, fontWeight: 500 }}>Practicing interview</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={g.howImg2}>
              <div style={g.howImgPlaceholder2}>
                <div style={g.avatarLg}>👩‍💼</div>
                <div style={{ fontSize: 13, color: "#fff", marginTop: 8, fontWeight: 500 }}>HR Expert feedback</div>
              </div>
            </div>
            <div style={g.howBadge}>
              <span style={{ fontWeight: 800, fontSize: 15, color: "#1a73e8" }}>10K +</span>
              <span style={{ fontSize: 12, color: "#888" }}>Job Seekers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const g = {
  section: { padding: "80px 40px", maxWidth: "100%", overflow: "hidden",background: "#f5f6fa" },
  sectionTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 40, fontWeight: 800, color: "#0f1117", letterSpacing: "-1px", marginBottom: 12 },
  howLayout: { display: "flex", gap: 60, alignItems: "flex-start", maxWidth: 1000, margin: "0 auto" },
  howStep: { background: "#fff", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "default" },
  howNum: { fontFamily: "'Manrope', sans-serif", fontSize: 36, fontWeight: 900, lineHeight: 1, flexShrink: 0, minWidth: 50 },
  howIcon: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  howTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 15, fontWeight: 700, color: "#0f1117" },
  howDesc: { fontSize: 12, color: "#888", marginTop: 3 },
  howImages: { display: "flex", gap: 12, flex: 1 },
  howImg1: { width: 200, height: 280, borderRadius: 16, overflow: "hidden", flexShrink: 0 },
  howImg2: { width: 180, height: 200, borderRadius: 16, overflow: "hidden" },
  howImgPlaceholder1: { width: "100%", height: "100%", background: "linear-gradient(135deg, #4a6fa5, #2d4a7a)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  howImgPlaceholder2: { width: "100%", height: "100%", background: "linear-gradient(135deg, #6a8a5a, #4a6a3a)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  avatarLg: { fontSize: 40 },
  howBadge: { background: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
};
