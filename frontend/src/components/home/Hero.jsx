import { useEffect, useState } from "react";

export default function Hero({ searchRole, setSearchRole, searchCompany, setSearchCompany }) {
  const profiles = [
    {
      bg: "#ddd8c4",
      img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&h=500&fit=crop&crop=faces",
      label: "Software Engineer"
    },
    {
      bg: "#d4cfc0",
      img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=500&fit=crop&crop=faces",
      label: "Product Manager"
    },
    {
      bg: "#e8e0d0",
      img: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=400&h=500&fit=crop&crop=faces",
      label: "UX Designer"
    },
    {
      bg: "#d8d4c8",
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=faces",
      label: "HR Expert"
    },
    {
      bg: "#cdd4c8",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=500&fit=crop&crop=faces",
      label: "Backend Engineer"
    },
    {
      bg: "#c8cdd4",
      img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=500&fit=crop&crop=faces",
      label: "Data Scientist"
    }
  ];

  const isSearching = searchRole.trim() !== "";

const filteredProfiles = isSearching
  ? profiles.filter(p => p.label.toLowerCase().includes(searchRole.toLowerCase()))
  : profiles;

const loopProfiles = [...profiles, ...profiles];
  // 🔥 Scroll logic (auto sliding)
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
  if (isSearching) return;
  const interval = setInterval(() => {
    setScroll((prev) => (prev >= 1000 ? 0 : prev + 1));
  }, 20);
  return () => clearInterval(interval);
}, [isSearching]);
  return (
    <section style={g.hero}>
      <div style={g.blob1} />
      <div style={g.blob2} />

      {/* Content */}
      <div style={g.heroContent}>
        <div style={g.heroBadge}>
          🤖 Your #1 Platform for interview practice
        </div>

        <h1 style={g.heroTitle}>Showcase Your Mastery</h1>

        <p style={g.heroSubBold}>
          Practice Interviews with AI and Real HR Experts
        </p>
        <p style={g.heroSub}>
          Create your profile, practice your interview, get hired!
        </p>

        {/* Search */}
        <div style={g.searchBar}>
          <div style={g.searchField}>
            🔍
            <input
              style={g.searchInput}
              placeholder="e.g. UX Designer"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
          </div>

          <div style={g.searchDivider} />

          <div style={g.searchField}>
            <input
              style={g.searchInput}
              placeholder="e.g. Google / Amazon"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
            />
          </div>

          <button style={g.searchBtn}>Search</button>
        </div>
      </div>

      {/* 🔥 Sliding Cards */}
<div style={{ width: "100%", marginTop: 40, overflow: "hidden" }}>

  {/* No results */}
  {isSearching && filteredProfiles.length === 0 && (
    <p style={{ textAlign: "center", color: "#888", fontSize: 14, padding: "20px 0" }}>
      No profiles found for "{searchRole}"
    </p>
  )}

  {/* Search result — static, no scroll */}
  {isSearching && filteredProfiles.length > 0 && (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, padding: "0 40px" }}>
      {filteredProfiles.map((p, i) => (
        <div key={i} style={g.photoWrapper}>
          <div style={{ ...g.photoCard, background: p.bg }}>
            <img src={p.img} alt={p.label} style={g.photoImg} />
          </div>
          <div style={g.photoLabel}>{p.label}</div>
        </div>
      ))}
    </div>
  )}

  {/* Default — auto scrolling */}
  {!isSearching && (
    <div style={{ display: "flex", gap: 16, transform: `translateX(-${scroll}px)`, transition: "transform 0.03s linear" }}>
      {loopProfiles.map((p, i) => (
        <div key={i} style={g.photoWrapper}>
          <div style={{ ...g.photoCard, background: p.bg }}>
            <img src={p.img} alt={p.label} style={g.photoImg} />
          </div>
          <div style={g.photoLabel}>{p.label}</div>
        </div>
      ))}
    </div>
  )}

</div>
    </section>
  );
}

const g = {
  hero: {
    background:
      "linear-gradient(180deg, #c0b0ee 0%, #c8bcf4 12%, #d8d0fa 26%, #e4e0ff 42%, #eeeeff 60%, #f0f2fa 80%, #f5f6fa 100%)",
    minHeight: 700,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 56,
    position: "relative",
    overflow: "hidden",
  },

  blob1: {
    position: "absolute",
    width: 600,
    height: 600,
    background: "radial-gradient(circle, rgba(100,80,220,0.5) 0%, transparent 65%)",
    top: -120,
    left: "50%",
    transform: "translateX(-50%)",
  },

  blob2: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "radial-gradient(circle, rgba(140,100,255,0.3) 0%, transparent 70%)",
    top: 20,
    right: 80,
  },

  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    zIndex: 1,
  },

  heroBadge: {
    background: "#fff",
    borderRadius: 100,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 600,
  },

  heroTitle: {
    fontSize: 65,
    fontWeight: 900,
    textAlign: "center",
  },

  heroSubBold: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
  },

  heroSub: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },

  searchBar: {
    background: "#fff",
    borderRadius: 100,
    padding: "6px 20px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  searchField: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  searchInput: {
    border: "none",
    outline: "none",
  },

  searchDivider: {
    width: 1,
    height: 20,
    background: "#ddd",
  },

  searchBtn: {
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: 100,
    padding: "8px 16px",
  },

  photoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  photoCard: {
    width: 160,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },

  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  photoLabel: {
    background: "#111",
    color: "#fff",
    fontSize: 12,
    padding: "4px 12px",
    borderRadius: 100,
  },
};