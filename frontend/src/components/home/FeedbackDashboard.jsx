const SKILL_SCORES = [
  { label: "Communication", score: 88, icon: "◎" },
  { label: "Confidence", score: 85, icon: "✦" },
  { label: "Vocabulary", score: 82, icon: "∞" },
  { label: "Technical", score: 94, icon: "⌬" },
  { label: "Problem Solving", score: 90, icon: "◈" },
  { label: "Eye Contact", score: 91, icon: "◉" },
  { label: "Speech Clarity", score: 86, icon: "⬡" },
  { label: "Grammar", score: 88, icon: "≋" },
];

const RADAR_POINTS = [
  { label: "Technical", angle: -90, r: 94 },
  { label: "Communication", angle: -30, r: 88 },
  { label: "Confidence", angle: 30, r: 85 },
  { label: "Eye Contact", angle: 90, r: 91 },
  { label: "Grammar", angle: 150, r: 88 },
  { label: "Problem Solving", angle: 210, r: 90 },
];

function polarToXY(angle, radius, cx, cy, scale) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + (radius / 100) * scale * Math.cos(rad),
    y: cy + (radius / 100) * scale * Math.sin(rad),
  };
}

function RadarChart() {
  const cx = 110, cy = 110, scale = 85;

  const points = RADAR_POINTS.map((p) => polarToXY(p.angle, p.r, cx, cy, scale));
  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const gridLevels = [25, 50, 75, 100];

  return (
    <svg width="220" height="220" viewBox="0 0 220 220">
      {/* Grid circles */}
      {gridLevels.map((level) => {
        const ps = RADAR_POINTS.map((p) => polarToXY(p.angle, level, cx, cy, scale));
        const poly = ps.map((p) => `${p.x},${p.y}`).join(" ");
        return (
          <polygon
            key={level}
            points={poly}
            fill="none"
            stroke="#e8e8f0"
            strokeWidth="1"
          />
        );
      })}

      {/* Axes */}
      {RADAR_POINTS.map((p, i) => {
        const end = polarToXY(p.angle, 100, cx, cy, scale);
        return (
          <line
            key={i}
            x1={cx} y1={cy} x2={end.x} y2={end.y}
            stroke="#e8e8f0" strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={polyPoints}
        fill="rgba(10,10,10,0.08)"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0a0a0a" />
      ))}

      {/* Labels */}
      {RADAR_POINTS.map((p, i) => {
        const labelPos = polarToXY(p.angle, 118, cx, cy, scale);
        return (
          <text
            key={i}
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="600"
            fill="#8a8a9a"
            fontFamily="Inter, sans-serif"
          >
            {p.label}
          </text>
        );
      })}
    </svg>
  );
}

function CircularScore({ score }) {
  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: 120, height: 120 }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="44" fill="none" stroke="#f0f0f5" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="44" fill="none"
          stroke="#0a0a0a" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1.5s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a", lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 10, color: "#8a8a9a", fontWeight: 600 }}>/100</div>
      </div>
    </div>
  );
}

export default function FeedbackDashboard() {
  return (
    <section id="feedback" style={{
      padding: "120px 60px",
      background: "#f8f9fb",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#8a8a9a",
            background: "#fff", border: "1px solid #e8e8f0",
            borderRadius: 9999, padding: "6px 16px", marginBottom: 24,
          }}>
            Detailed Insights
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1.1, marginBottom: 16,
          }}>
            Your AI Feedback Dashboard
          </h2>
          <p style={{ fontSize: 18, color: "#5a5a6a", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Every interview generates a comprehensive performance report with actionable insights.
          </p>
        </div>

        {/* Dashboard Card */}
        <div style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid #e8e8f0",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          {/* Dashboard Top Bar */}
          <div style={{
            padding: "20px 32px",
            borderBottom: "1px solid #f0f0f5",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: "#0a0a0a",
              }}>
                Interview Report
              </div>
              <div style={{
                fontSize: 12, color: "#8a8a9a", background: "#f8f9fb",
                border: "1px solid #e8e8f0", borderRadius: 9999, padding: "4px 12px",
              }}>
                Software Engineer — Technical Round
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#8a8a9a" }}>July 6, 2026 · 45 min</div>
          </div>

          {/* Dashboard Body */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
            {/* Left — Overall Score */}
            <div style={{
              padding: 32,
              borderRight: "1px solid #f0f0f5",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 20,
            }}>
              <CircularScore score={91} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.01em" }}>
                  Excellent Performance
                </div>
                <div style={{ fontSize: 13, color: "#8a8a9a", marginTop: 4 }}>
                  Top 8% of candidates
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {["Strong Communicator", "Technical Expert"].map((badge) => (
                  <span key={badge} style={{
                    fontSize: 11, fontWeight: 600, color: "#0a0a0a",
                    background: "#f0f0f5", padding: "5px 12px", borderRadius: 9999,
                    border: "1px solid #e8e8f0",
                  }}>{badge}</span>
                ))}
              </div>
            </div>

            {/* Center — Radar Chart */}
            <div style={{
              padding: 32,
              borderRight: "1px solid #f0f0f5",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8a8a9a", marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Skill Radar
              </div>
              <RadarChart />
            </div>

            {/* Right — Skill Bars */}
            <div style={{ padding: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8a8a9a", marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Score Breakdown
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {SKILL_SCORES.map((skill) => (
                  <div key={skill.label}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, color: "#c4c4d4" }}>{skill.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#4a4a5a" }}>{skill.label}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a" }}>{skill.score}%</span>
                    </div>
                    <div style={{ height: 5, background: "#f0f0f5", borderRadius: 9999, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${skill.score}%`,
                        background: skill.score >= 90 ? "#0a0a0a" : skill.score >= 80 ? "#1a1a2e" : "#4a4a6a",
                        borderRadius: 9999,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
