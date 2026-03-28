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

  return (
    <section style={g.hero}>
      <div style={g.blob1} />
      <div style={g.blob2} />

      {/* Hero text content */}
      <div style={g.heroContent}>
        <div style={g.heroBadge}>
          <span style={{ fontSize: 16 }}>🤖</span>
          Your #1 Platform for interview practice
        </div>

        <h1 style={g.heroTitle}>Showcase Your Mastery.</h1>

        <p style={g.heroSubBold}>
          Practice Interviews with AI and Real HR Experts
        </p>
        <p style={g.heroSub}>
          Create your profile, practice your interview, get hired!
        </p>

        {/* Search Bar */}
        <div style={g.searchBar}>
          <div style={g.searchField}>
            <span style={{ color: "#aaa", fontSize: 16 }}>🔍</span>
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

      {/* Profile Cards + Labels below */}
      <div style={g.photoStrip}>
        {profiles.map((p, i) => (
          <div key={i} style={g.photoWrapper}>
            {/* Image card */}
            <div style={{ ...g.photoCard, background: p.bg }}>
              <img
                src={p.img}
                alt={p.label}
                style={g.photoImg}
                onError={(e) => {
                  e.target.src = `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${40 + i}.jpg`;
                }}
              />
            </div>

            {/* Label BELOW the card */}
            <div style={g.photoLabel}>{p.label}</div>
          </div>
        ))}
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
    width: 680,
    height: 620,
    background:
      "radial-gradient(circle, rgba(100,75,220,0.52) 0%, rgba(120,90,240,0.18) 45%, transparent 70%)",
    top: -180,
    left: "50%",
    transform: "translateX(-50%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  blob2: {
    position: "absolute",
    width: 340,
    height: 340,
    background:
      "radial-gradient(circle, rgba(150,110,255,0.32) 0%, transparent 70%)",
    top: -10,
    right: 40,
    pointerEvents: "none",
    zIndex: 0,
  },

  heroContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
    paddingBottom: 44,
  },

  heroBadge: {
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.85)",
    borderRadius: 100,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  },

  heroTitle: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: 60,
    fontWeight: 900,
    color: "#0d0f1a",
    letterSpacing: "-2px",
    textAlign: "center",
    lineHeight: 1.08,
    margin: 0,
  },

  heroSubBold: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: "#0d0f1a",
    textAlign: "center",
    margin: 0,
  },

  heroSub: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    margin: 0,
  },

  searchBar: {
    background: "#fff",
    borderRadius: 100,
    padding: "7px 7px 7px 22px",
    display: "flex",
    alignItems: "center",
    gap: 0,
    maxWidth: 560,
    width: "90vw",
    boxShadow: "0 6px 28px rgba(0,0,0,0.13)",
    marginTop: 4,
  },

  searchField: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 0,
  },

  searchInput: {
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#0f1117",
    background: "transparent",
    flex: 1,
    minWidth: 0,
    fontFamily: "inherit",
  },

  searchDivider: {
    width: 1,
    height: 26,
    background: "#e0e0ea",
    margin: "0 10px",
    flexShrink: 0,
  },

  searchBtn: {
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: 100,
    padding: "11px 28px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    flexShrink: 0,
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(26,115,232,0.3)",
  },

  /* Strip wraps each card+label pair */
  photoStrip: {
    display: "flex",
    gap: 14,
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    zIndex: 1,
    width: "100%",
    paddingBottom: 28,
  },

  /* Each wrapper stacks card then label */
  photoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  photoCard: {
    width: 155,
    height: 210,
    borderRadius: 16,
    overflow: "hidden",
    flexShrink: 0,
    boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
  },

  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
    display: "block",
  },

  /* Dark pill label below each card */
  photoLabel: {
    background: "rgba(18, 20, 34, 0.80)",
    backdropFilter: "blur(4px)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 100,
    whiteSpace: "nowrap",
    letterSpacing: "0.1px",
  },
};