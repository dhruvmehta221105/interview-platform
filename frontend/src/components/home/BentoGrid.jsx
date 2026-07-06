import { useState } from "react";

const FEATURES = [
  {
    id: 1,
    title: "AI Interview Practice",
    desc: "Simulate real interview scenarios with our advanced AI that adapts to your role and experience level.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" strokeLinecap="round"/>
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    size: "large",
    preview: (
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { q: "Tell me about yourself", status: "done" },
          { q: "Why do you want this role?", status: "active" },
          { q: "Describe a challenge you overcame", status: "pending" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px", borderRadius: 10,
            background: item.status === "active" ? "#0a0a0a" : item.status === "done" ? "#f8f9fb" : "transparent",
            border: `1px solid ${item.status === "active" ? "transparent" : "#f0f0f5"}`,
            transition: "all 0.2s",
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: item.status === "done" ? "#22c55e" : item.status === "active" ? "#fff" : "#e8e8f0",
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: 13, fontWeight: 500,
              color: item.status === "active" ? "#fff" : "#4a4a5a",
            }}>{item.q}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 2,
    title: "Resume Analyzer",
    desc: "Get a detailed breakdown of your resume's ATS score and keyword match for any job description.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round"/>
      </svg>
    ),
    size: "small",
    preview: (
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a" }}>87%</div>
        <div style={{ fontSize: 11, color: "#8a8a9a", fontWeight: 500 }}>ATS Match Score</div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Real-Time AI Feedback",
    desc: "Receive instant, detailed feedback on every answer — tone, vocabulary, content, and delivery.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    size: "small",
    preview: (
      <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Clarity ✓", "Tone ✓", "Structure ✓", "Keywords ✓"].map((tag, i) => (
          <span key={i} style={{
            fontSize: 11, fontWeight: 600, color: "#0a0a0a",
            background: "#f0f0f5", padding: "4px 10px", borderRadius: 9999,
          }}>{tag}</span>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    title: "Technical Interview",
    desc: "Master system design, DSA, and coding challenges with role-specific technical assessment tracks.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    size: "medium",
    preview: (
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "Data Structures", val: 92 },
          { label: "System Design", val: 78 },
          { label: "Algorithms", val: 85 },
        ].map((item) => (
          <div key={item.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: "#8a8a9a", fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#0a0a0a" }}>{item.val}%</span>
            </div>
            <div style={{ height: 4, background: "#f0f0f5", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${item.val}%`, background: "#0a0a0a", borderRadius: 9999 }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 5,
    title: "Speech Analysis",
    desc: "AI analyzes your speaking pace, filler words, vocabulary richness, and vocal confidence.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round"/>
        <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round"/>
      </svg>
    ),
    size: "small",
    preview: (
      <div style={{ marginTop: 16, display: "flex", alignItems: "flex-end", gap: 3, height: 36 }}>
        {[6, 14, 9, 20, 12, 24, 16, 10, 22, 8, 18, 14].map((h, i) => (
          <div key={i} className="ix-wave-bar" style={{
            height: `${h}px`, background: "#0a0a0a",
            animationDelay: `${i * 0.07}s`,
          }} />
        ))}
      </div>
    ),
  },
  {
    id: 6,
    title: "Performance Analytics",
    desc: "Track your progress over time with detailed charts, heatmaps, and personalized improvement plans.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round"/>
        <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round"/>
        <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round"/>
      </svg>
    ),
    size: "large",
    preview: (
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Interviews", val: "48" },
            { label: "Avg Score", val: "89%" },
            { label: "Improved", val: "+32%" },
          ].map((stat) => (
            <div key={stat.label} style={{
              flex: 1, background: "#f8f9fb", borderRadius: 12, padding: "12px 10px", textAlign: "center",
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: "#0a0a0a" }}>{stat.val}</div>
              <div style={{ fontSize: 10, color: "#8a8a9a", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Mini chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 40, padding: "0 4px" }}>
          {[60, 65, 72, 70, 78, 82, 79, 85, 88, 90, 89, 92].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${(h / 100) * 40}px`,
              background: i === 11 ? "#0a0a0a" : "#e8e8f0",
              borderRadius: "4px 4px 0 0",
              transition: "height 0.3s",
            }} />
          ))}
        </div>
      </div>
    ),
  },
];

const sizeConfig = {
  large: { gridColumn: "span 2", gridRow: "span 2" },
  medium: { gridColumn: "span 2", gridRow: "span 1" },
  small: { gridColumn: "span 1", gridRow: "span 1" },
};

export default function BentoGrid() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="features" style={{
      padding: "120px 60px",
      background: "#f8f9fb",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#8a8a9a",
            background: "#fff", border: "1px solid #e8e8f0",
            borderRadius: 9999, padding: "6px 16px", marginBottom: 24,
          }}>
            Everything you need
          </div>
          <h2 style={{
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 800, letterSpacing: "-0.03em",
            color: "#0a0a0a", lineHeight: 1.1,
            marginBottom: 16, maxWidth: 560,
          }}>
            Why InterviewX?
          </h2>
          <p style={{
            fontSize: 18, color: "#5a5a6a", lineHeight: 1.7,
            maxWidth: 520,
          }}>
            A complete AI-powered interview preparation platform built for serious candidates.
          </p>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto",
          gap: 16,
        }}>
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              style={{
                ...sizeConfig[feature.size],
                background: "#fff",
                border: `1px solid ${hoveredId === feature.id ? "#c8c8d8" : "#e8e8f0"}`,
                borderRadius: 20,
                padding: 28,
                cursor: "default",
                transition: "all 0.25s ease",
                transform: hoveredId === feature.id ? "translateY(-3px)" : "none",
                boxShadow: hoveredId === feature.id
                  ? "0 12px 40px rgba(0,0,0,0.1)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHoveredId(feature.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Subtle glow on hover */}
              {hoveredId === feature.id && (
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 120, height: 120,
                  background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }} />
              )}

              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "#f8f9fb", border: "1px solid #e8e8f0",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0a0a0a", marginBottom: 16,
              }}>
                {feature.icon}
              </div>

              <div style={{
                fontSize: 16, fontWeight: 700, color: "#0a0a0a",
                letterSpacing: "-0.01em", marginBottom: 8,
              }}>
                {feature.title}
              </div>

              <p style={{
                fontSize: 14, color: "#6a6a7a", lineHeight: 1.6,
              }}>
                {feature.desc}
              </p>

              {feature.preview}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
