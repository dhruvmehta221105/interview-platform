// components/home/Hero.jsx
export default function Hero({ searchRole, setSearchRole, searchCompany, setSearchCompany }) {
  return (
    <section style={g.hero}>
      {/* blobs */}
      <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle, rgba(100,80,220,0.55) 0%, transparent 65%)", top: -120, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 300, height: 300, background: "radial-gradient(circle, rgba(140,100,255,0.4) 0%, transparent 70%)", top: 20, right: 80, pointerEvents: "none" }} />

      <div className="hero-content" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Badge */}
        <div style={g.heroBadge}>
          <span style={{ fontSize: 16 }}>🤖</span>
          Your #1 Platform for interview practice
        </div>

        {/* Headline */}
        <h1 style={g.heroTitle}>Showcase Your Mastery.</h1>

        <p style={g.heroSubBold}>Practice Interviews with AI and Real HR Experts</p>
        <p style={g.heroSub}>Create your profile, practice your interview, get hired!</p>

        {/* Search bar */}
        <div style={g.searchBar}>
          <div style={g.searchField}>
            <span style={{ color: "#aaa", fontSize: 15 }}>🔍</span>
            <input
              className="search-input"
              style={g.searchInputEl}
              placeholder="e.g. UX Designer"
              value={searchRole}
              onChange={e => setSearchRole(e.target.value)}
            />
          </div>
          <div style={g.searchDivider} />
          <div style={g.searchField}>
            <input
              className="search-input"
              style={g.searchInputEl}
              placeholder="e.g. Google / Amazon"
              value={searchCompany}
              onChange={e => setSearchCompany(e.target.value)}
            />
          </div>
          <button style={g.searchBtn}>Search</button>
        </div>
      </div>

      {/* Candidate photos strip */}
      <div style={g.photoStrip}>
        {[
          { bg: "#c8d8b0", initials: "AK", label: "" },
          { bg: "#d4c4a0", initials: "RS", label: "" },
          { bg: "#b8cce0", initials: "PM", label: "" },
          { bg: "#d0c8b8", initials: "SK", label: "" },
          { bg: "#c0d0c0", initials: "NV", label: "" },
          { bg: "#d8b8a8", initials: "AM", label: "" },
        ].map((p, i) => (
          <div key={i} style={{ ...g.photoCard, background: p.bg, animationDelay: `${i * 0.1}s` }}>
            <div style={g.photoAvatar}>{p.initials}</div>
            {i === 2 && <div style={g.photoLabel}>HR Expert</div>}
            {i === 4 && <div style={g.photoLabel}>Tech Lead</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

const g = {
  hero: { background: "linear-gradient(180deg, #c8b8f0 0%, #b8c8f8 30%, #e8eeff 65%, #f5f6fa 100%)", minHeight: 680, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60, position: "relative", overflow: "hidden" },
  heroBadge: { background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 100, padding: "8px 18px", fontSize: 13, fontWeight: 600, color: "#444", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(8px)" },
  heroTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 58, fontWeight: 900, color: "#0f1117", letterSpacing: "-2px", textAlign: "center", lineHeight: 1.1 },
  heroSubBold: { fontFamily: "'Manrope', sans-serif", fontSize: 22, fontWeight: 700, color: "#0f1117", textAlign: "center" },
  heroSub: { fontSize: 14, color: "#555", textAlign: "center" },
  searchBar: { background: "#fff", borderRadius: 100, padding: "6px 6px 6px 20px", display: "flex", alignItems: "center", gap: 0, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", maxWidth: 540, width: "100%" },
  searchField: { display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "4px 0" },
  searchInputEl: { border: "none", outline: "none", fontSize: 14, color: "#0f1117", background: "transparent", width: "100%" },
  searchDivider: { width: 1, height: 24, background: "#e8e9f0", margin: "0 8px", flexShrink: 0 },
  searchBtn: { background: "#1a73e8", color: "#fff", border: "none", borderRadius: 100, padding: "10px 24px", fontSize: 14, fontWeight: 700, flexShrink: 0 },
  photoStrip: { display: "flex", gap: 12, marginTop: 48, paddingBottom: 0, width: "100%", justifyContent: "center" },
  photoCard: { width: 160, height: 200, borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 0 12px", overflow: "hidden", position: "relative", flexShrink: 0 },
  photoAvatar: { width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 40 },
  photoLabel: { position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap" },
};
