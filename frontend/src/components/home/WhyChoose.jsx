// components/home/WhyChoose.jsx
export default function WhyChoose() {
  return (
    <section style={g.section}>
      <div style={g.sectionCenter}>
        <h2 style={g.sectionTitle}>Why Choose us?</h2>
        <p style={g.sectionSub}>Unlock your true potential and discover a world of opportunities<br />that align with your skills, interests, and aspirations</p>
      </div>

      <div style={g.whyLayout}>
        {/* Left cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: "0 0 240px" }}>
          <div className="feature-card float-card" style={g.featureCard}>
            <div style={g.featureIcon}>🖥️</div>
            <div style={g.featureTitle}>Showcase Work</div>
            <div style={g.featureSub}>Showcase your project to stand out among all</div>
            <button style={g.featureBtn}>Add Work</button>
          </div>
          <div style={{ ...g.featureCard, flexDirection: "row", alignItems: "center", gap: 12, padding: "16px 18px" }}>
            <span style={{ fontSize: 22 }}>🌐</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f1117" }}>100K +</div>
              <div style={{ fontSize: 12, color: "#888" }}>Worldwide Active Users</div>
            </div>
          </div>
        </div>

        {/* Center video card */}
        <div style={g.hrCard}>
          <div style={g.hrCardInner}>
            <div style={g.hrCardLabel}>HR Interview</div>
          </div>
          {/* orbit ring */}
          <div style={g.orbitRing} />
        </div>

        {/* Right cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: "0 0 240px" }}>
          <div className="feature-card float-card2" style={g.featureCard}>
            <div style={g.featureIcon}>💬</div>
            <div style={g.featureTitle}>Networking Opportunities</div>
          </div>
          <div className="feature-card" style={g.featureCard}>
            <div style={g.featureIcon}>📄</div>
            <div style={g.featureTitle}>Showcase Resume</div>
            <div style={g.featureSub}>Create a professional resume using our built-in resume builder.</div>
            <button style={g.featureBtn}>Build Resume</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const g = {
  section: { padding: "80px 40px", maxWidth: "100%", overflow: "hidden",background: "#f5f6fa" },
  sectionCenter: { textAlign: "center", marginBottom: 48 },
  sectionTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 40, fontWeight: 800, color: "#0f1117", letterSpacing: "-1px", marginBottom: 12 },
  sectionSub: { color: "#666", fontSize: 15, lineHeight: 1.6 },
  whyLayout: { display: "flex", justifyContent: "center", alignItems: "center", gap: 32, maxWidth: 900, margin: "0 auto" },
  featureCard: { background: "#fff", borderRadius: 16, padding: "22px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 8, transition: "all 0.25s" },
  featureIcon: { fontSize: 24, marginBottom: 4 },
  featureTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 15, fontWeight: 700, color: "#0f1117" },
  featureSub: { fontSize: 12, color: "#888", lineHeight: 1.5 },
  featureBtn: { background: "#1a73e8", color: "#fff", border: "none", borderRadius: 100, padding: "7px 18px", fontSize: 12, fontWeight: 700, alignSelf: "flex-start", marginTop: 4 },
  hrCard: { width: 220, height: 320, borderRadius: 20, background: "linear-gradient(180deg, #d4a882 0%, #c8956c 100%)", position: "relative", flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "visible" },
  hrCardInner: { width: "100%", padding: "0 0 14px" },
  hrCardLabel: { textAlign: "center", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 13, fontWeight: 700, padding: "6px 16px", borderRadius: 100, margin: "0 auto", width: "fit-content" },
  orbitRing: { position: "absolute", width: 340, height: 340, border: "2px solid #dbeaff", borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: -1 },
};
