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
          { image: "https://plus.unsplash.com/premium_photo-1727976369393-820b783227af?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Software Engineer" },
          { image: "https://plus.unsplash.com/premium_photo-1683121727064-e151bd584a54?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Product Manager" },
          { image: "https://plus.unsplash.com/premium_photo-1664478244612-d4b3238abd81?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ", label: "UX Designer" },
          { image: "https://imgs.search.brave.com/wzUfu4DO7LNrJIsPxhFckiqX_avx7FKP-mUpjIvbn74/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE4/MjA2ODc2MC9waG90/by9pbmRpYW4tYmVh/cmRlZC1tYWxlLWJ1/c2luZXNzbWFuLWNl/bGVicmF0aW5nLXN1/Y2Nlc3Mtd2l0aC10/aHVtYnMtdXAtb3It/cmFpc2luZy1maXN0/LXdoaWxlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1kd1c5/UGZrTmVaWkJ1TlZw/eVRST0dyTDNzcGx5/Tno4Q0VkbUQzUnJt/ZkxzPQ", label: "HR Expert" },
          { image: "https://imgs.search.brave.com/hfovEBKvR5U27GuQ9QoWMTlEquKMFfV0a-8HMrnNKuQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTk4/NzY1MzI3OS9waG90/by9zbWlsaW5nLXlv/dW5nLWJ1c2luZXNz/d29tYW4td2l0aC1h/LWxhcHRvcC1zdGFu/ZGluZy1pbi10aGUt/Y29ycmlkb3Itb2Yt/YW4tb2ZmaWNlLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1X/cHRmd2NYX0dqLV9o/U3RBdHRwSHZsbE1K/VkRrTV90WU9vbjlh/MTJqNmVRPQ", label: "Backend Engineer" },
          { image: "https://plus.unsplash.com/premium_photo-1770447611992-de6a1d090367?q=80&w=1098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", label: "Data Scientist" },
        ].map((p, i) => (
          <div key={i} style={{ ...g.photoCard, animationDelay: `${i * 0.2}s` }}>
            <img 
              src={p.image} 
              alt={p.label}
              style={g.profileImage}
            />
            <div style={g.photoLabel}>{p.label}</div>
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
  photoStrip: { display: "flex", gap: 12, marginTop: 48, paddingBottom: 0, width: "100%", justifyContent: "center", flexWrap: "wrap" },
  photoCard: { width: 160, height: 240, borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 0 12px", overflow: "hidden", position: "relative", flexShrink: 0 },
  profileImage: { width: "100%", height: "85%", objectFit: "cover", objectPosition: "center", borderRadius: "16px 16px 0 0" },
  photoLabel: { position: "absolute", bottom: 1, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 100, whiteSpace: "nowrap", textAlign: "center", maxWidth: "95%" },
};
