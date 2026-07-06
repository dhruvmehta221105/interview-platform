import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = [
  { id: 1, name: "Software Engineering", count: "450+ Questions", icon: "⬡" },
  { id: 2, name: "Frontend Development", count: "280+ Questions", icon: "◧" },
  { id: 3, name: "Backend Engineering", count: "310+ Questions", icon: "⊞" },
  { id: 4, name: "Full Stack", count: "380+ Questions", icon: "⊟" },
  { id: 5, name: "Machine Learning", count: "220+ Questions", icon: "◈" },
  { id: 6, name: "AI Engineering", count: "190+ Questions", icon: "✦" },
  { id: 7, name: "Data Science", count: "260+ Questions", icon: "≋" },
  { id: 8, name: "Cyber Security", count: "175+ Questions", icon: "◉" },
  { id: 9, name: "Cloud & DevOps", count: "200+ Questions", icon: "⬟" },
  { id: 10, name: "Product Management", count: "240+ Questions", icon: "⊕" },
  { id: 11, name: "Finance", count: "210+ Questions", icon: "◎" },
  { id: 12, name: "Marketing", count: "185+ Questions", icon: "⊙" },
  { id: 13, name: "Consulting", count: "195+ Questions", icon: "⌬" },
  { id: 14, name: "Healthcare", count: "160+ Questions", icon: "⬢" },
  { id: 15, name: "Sales", count: "145+ Questions", icon: "∞" },
  { id: 16, name: "HR & Leadership", count: "130+ Questions", icon: "⬡" },
];

export default function Categories() {
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (user) navigate("/schedule-interview");
    else navigate("/login");
  };

  return (
    <section style={{
      padding: "120px 60px",
      background: "#0b0b0f",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 9999, padding: "6px 16px", marginBottom: 24,
          }}>
            50+ Categories
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h2 style={{
              fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800,
              letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1,
              maxWidth: 480,
            }}>
              Practice for Any Role
            </h2>
            <button
              onClick={handleClick}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#fff", color: "#0a0a0a",
                fontSize: 14, fontWeight: 600,
                padding: "12px 24px", borderRadius: 9999,
                border: "none", cursor: "pointer",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Browse All Categories
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={handleClick}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: "20px 22px",
                borderRadius: 16,
                background: hoveredId === cat.id ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${hoveredId === cat.id ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)"}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
                transform: hoveredId === cat.id ? "translateY(-2px)" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {hoveredId === cat.id && (
                <div style={{
                  position: "absolute", top: -30, right: -30,
                  width: 80, height: 80,
                  background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }} />
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)" }}>{cat.icon}</span>
                <svg
                  width="14" height="14"
                  fill="none" stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2" viewBox="0 0 24 24"
                  style={{
                    transform: hoveredId === cat.id ? "translate(3px, -3px)" : "none",
                    transition: "transform 0.2s",
                    stroke: hoveredId === cat.id ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                  }}
                >
                  <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div style={{
                fontSize: 14, fontWeight: 700,
                color: hoveredId === cat.id ? "#fff" : "rgba(255,255,255,0.75)",
                letterSpacing: "-0.01em", marginBottom: 4,
                transition: "color 0.2s",
              }}>
                {cat.name}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
                {cat.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
