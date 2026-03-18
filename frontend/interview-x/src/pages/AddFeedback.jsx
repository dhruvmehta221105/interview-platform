import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFeedback() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    role: "",
    date: "",
    technical: "",
    communication: "",
    problemSolving: "",
    strengths: "",
    improvements: "",
    comments: "",
    recommendation: "",
  });

  const [totalScore, setTotalScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStars, setHoveredStars] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (
      name === "technical" ||
      name === "communication" ||
      name === "problemSolving"
    ) {
      const t = parseFloat(name === "technical" ? value : updated.technical) || 0;
      const c = parseFloat(name === "communication" ? value : updated.communication) || 0;
      const p = parseFloat(name === "problemSolving" ? value : updated.problemSolving) || 0;
      setTotalScore(((t + c + p) / 3).toFixed(1));
    }
  };

  const handleStarClick = (field, value) => {
    const e = { target: { name: field, value: String(value) } };
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    const newEntry = { ...formData, totalScore, id: Date.now() };
    localStorage.setItem("feedbacks", JSON.stringify([newEntry, ...existing]));
    setSubmitted(true);
    setTimeout(() => navigate("/view-feedback"), 1500);
  };

  const ScoreInput = ({ field, label }) => {
    const value = parseInt(formData[field]) || 0;
    const hovered = hoveredStars[field] || 0;
    const display = hovered || value;
    const colors = ["", "#f25f6a", "#f59e42", "#f5c842", "#4f8ef7", "#22d3a4"];

    return (
      <div style={s.field}>
        <label style={s.label}>
          {label} <span style={s.req}>*</span>
          {value > 0 && (
            <span style={{ ...s.scoreBadge, background: colors[value] + "22", color: colors[value] }}>
              {["", "Poor", "Fair", "Good", "Great", "Excellent"][value]}
            </span>
          )}
        </label>
        <div style={s.stars}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              style={{
                ...s.star,
                color: n <= display ? colors[display] || "#f5c842" : "#ddd",
                transform: n <= display ? "scale(1.15)" : "scale(1)",
              }}
              onClick={() => handleStarClick(field, n)}
              onMouseEnter={() => setHoveredStars((h) => ({ ...h, [field]: n }))}
              onMouseLeave={() => setHoveredStars((h) => ({ ...h, [field]: 0 }))}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <div style={s.root}>
        <Nav />
        <div style={s.successOverlay}>
          <div style={s.successCard}>
            <div style={s.successIcon}>✓</div>
            <h2 style={s.successTitle}>Feedback Submitted!</h2>
            <p style={s.successText}>Redirecting to feedback list...</p>
          </div>
        </div>
      </div>
    );
  }

  const scoreColor =
    totalScore >= 4 ? "#22d3a4" : totalScore >= 3 ? "#4f8ef7" : totalScore >= 2 ? "#f5c842" : "#f25f6a";

  return (
    <div style={s.root}>
      <Nav />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroBlob} />
        <div style={s.heroBlobRight} />
        <div style={s.heroInner}>
          <p style={s.breadcrumb}>📋 Feedback Portal</p>
          <h1 style={s.heroTitle}>Add Interview Feedback</h1>
          <p style={s.heroSub}>
            Evaluate candidate performance across technical, communication, and problem-solving dimensions.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div style={s.contentWrap}>
        <div style={s.stepsBar}>
          {["Candidate Info", "Score Evaluation", "Final Remarks"].map((step, i) => (
            <div key={i} style={s.stepGroup}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ ...s.stepDot, background: i === 0 ? "linear-gradient(135deg,#7c5af6,#4f8ef7)" : i < 0 ? "#22d3a4" : "#f0f1f5", color: i === 0 ? "#fff" : "#9aa0b4", boxShadow: i === 0 ? "0 4px 12px rgba(124,90,246,0.35)" : "none" }}>
                  {i + 1}
                </div>
                <span style={{ ...s.stepLabel, color: i === 0 ? "#0f1117" : "#aaa" }}>{step}</span>
              </div>
              {i < 2 && <div style={s.stepLine} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Candidate Info Card */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <div style={{ ...s.cardIcon, background: "#f0ecff" }}>👤</div>
              <div>
                <div style={s.cardTitle}>Candidate Information</div>
                <div style={s.cardSub}>Basic details about the interviewee</div>
              </div>
            </div>
            <div style={s.cardBody}>
              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>Full Name <span style={s.req}>*</span></label>
                  <input
                    style={s.input}
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleChange}
                    placeholder="e.g. Arjun Sharma"
                    required
                    onFocus={e => Object.assign(e.target.style, { borderColor: "#7c5af6", boxShadow: "0 0 0 3px rgba(124,90,246,0.12)" })}
                    onBlur={e => Object.assign(e.target.style, { borderColor: "#e8e9f0", boxShadow: "none" })}
                  />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Email Address <span style={s.req}>*</span></label>
                  <input
                    style={s.input}
                    name="candidateEmail"
                    type="email"
                    value={formData.candidateEmail}
                    onChange={handleChange}
                    placeholder="arjun@example.com"
                    required
                    onFocus={e => Object.assign(e.target.style, { borderColor: "#7c5af6", boxShadow: "0 0 0 3px rgba(124,90,246,0.12)" })}
                    onBlur={e => Object.assign(e.target.style, { borderColor: "#e8e9f0", boxShadow: "none" })}
                  />
                </div>
              </div>
              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>Role Applied For <span style={s.req}>*</span></label>
                  <div style={s.selectWrap}>
                    <select
                      style={s.select}
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select role...</option>
                      <option>Frontend Developer</option>
                      <option>Backend Developer</option>
                      <option>Full Stack Developer</option>
                      <option>Data Scientist</option>
                      <option>Product Manager</option>
                      <option>UX Designer</option>
                      <option>DevOps Engineer</option>
                    </select>
                  </div>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Interview Date <span style={s.req}>*</span></label>
                  <input
                    style={s.input}
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    onFocus={e => Object.assign(e.target.style, { borderColor: "#7c5af6", boxShadow: "0 0 0 3px rgba(124,90,246,0.12)" })}
                    onBlur={e => Object.assign(e.target.style, { borderColor: "#e8e9f0", boxShadow: "none" })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Score Card */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <div style={{ ...s.cardIcon, background: "#e8f2ff" }}>⭐</div>
              <div>
                <div style={s.cardTitle}>Performance Scores</div>
                <div style={s.cardSub}>Rate each dimension from 1 (Poor) to 5 (Excellent)</div>
              </div>
              {totalScore > 0 && (
                <div style={{ marginLeft: "auto", textAlign: "center" }}>
                  <div style={{ ...s.scoreCircle, borderColor: scoreColor, color: scoreColor }}>
                    {totalScore}
                  </div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Avg Score</div>
                </div>
              )}
            </div>
            <div style={s.cardBody}>
              <div style={s.scoreGrid}>
                <ScoreInput field="technical" label="Technical Skills" />
                <ScoreInput field="communication" label="Communication" />
                <ScoreInput field="problemSolving" label="Problem Solving" />
              </div>
              {totalScore > 0 && (
                <div style={s.scoreBar}>
                  <div style={s.scoreBarLabel}>Overall Score</div>
                  <div style={s.scoreBarTrack}>
                    <div style={{ ...s.scoreBarFill, width: `${(totalScore / 5) * 100}%`, background: scoreColor }} />
                  </div>
                  <div style={{ ...s.scoreBarValue, color: scoreColor }}>{totalScore}/5</div>
                </div>
              )}
            </div>
          </div>

          {/* Remarks Card */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <div style={{ ...s.cardIcon, background: "#e6faf5" }}>📝</div>
              <div>
                <div style={s.cardTitle}>Detailed Remarks</div>
                <div style={s.cardSub}>Provide qualitative feedback for the candidate</div>
              </div>
            </div>
            <div style={s.cardBody}>
              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>Key Strengths</label>
                  <textarea
                    style={s.textarea}
                    name="strengths"
                    value={formData.strengths}
                    onChange={handleChange}
                    placeholder="What did the candidate do well? e.g. Strong DSA knowledge, clear communication..."
                    onFocus={e => Object.assign(e.target.style, { borderColor: "#7c5af6", boxShadow: "0 0 0 3px rgba(124,90,246,0.12)" })}
                    onBlur={e => Object.assign(e.target.style, { borderColor: "#e8e9f0", boxShadow: "none" })}
                  />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Areas to Improve</label>
                  <textarea
                    style={s.textarea}
                    name="improvements"
                    value={formData.improvements}
                    onChange={handleChange}
                    placeholder="What should the candidate work on? e.g. System design, confidence..."
                    onFocus={e => Object.assign(e.target.style, { borderColor: "#7c5af6", boxShadow: "0 0 0 3px rgba(124,90,246,0.12)" })}
                    onBlur={e => Object.assign(e.target.style, { borderColor: "#e8e9f0", boxShadow: "none" })}
                  />
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Additional Comments</label>
                <textarea
                  style={{ ...s.textarea, minHeight: 80 }}
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Any other observations or notes..."
                  onFocus={e => Object.assign(e.target.style, { borderColor: "#7c5af6", boxShadow: "0 0 0 3px rgba(124,90,246,0.12)" })}
                  onBlur={e => Object.assign(e.target.style, { borderColor: "#e8e9f0", boxShadow: "none" })}
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>Recommendation <span style={s.req}>*</span></label>
                <div style={s.recOptions}>
                  {[
                    { value: "Strongly Hire", color: "#22d3a4", bg: "#e6faf5", icon: "🚀" },
                    { value: "Hire", color: "#4f8ef7", bg: "#e8f2ff", icon: "✅" },
                    { value: "Maybe", color: "#f5c842", bg: "#fffbe6", icon: "🤔" },
                    { value: "No Hire", color: "#f25f6a", bg: "#fff0f1", icon: "❌" },
                  ].map(({ value, color, bg, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData((f) => ({ ...f, recommendation: value }))}
                      style={{
                        ...s.recBtn,
                        borderColor: formData.recommendation === value ? color : "#e8e9f0",
                        background: formData.recommendation === value ? bg : "#fff",
                        color: formData.recommendation === value ? color : "#555",
                        fontWeight: formData.recommendation === value ? 700 : 500,
                        boxShadow: formData.recommendation === value ? `0 2px 12px ${color}33` : "none",
                      }}
                    >
                      <span>{icon}</span> {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={s.actions}>
            <button type="button" onClick={() => navigate("/view-feedback")} style={s.btnSecondary}>
              Cancel
            </button>
            <button type="submit" style={s.btnPrimary}>
              Submit Feedback →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Shared Nav ── */
function Nav() {
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

/* ── Styles ── */
const s = {
  root: { fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", background: "#f5f6fa", minHeight: "100vh", color: "#0f1117" },
  nav: { background: "#fff", borderBottom: "1px solid #ebebf0", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 0 #ebebf0" },
  logo: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" },
  navLinks: { display: "flex", gap: 32, listStyle: "none", padding: 0, margin: 0 },
  navLink: { textDecoration: "none", color: "#555", fontSize: 14, fontWeight: 500 },
  navCta: { background: "#0f1117", color: "#fff", padding: "9px 20px", borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: "none" },

  hero: { background: "linear-gradient(135deg, #ede9ff 0%, #dbeaff 50%, #e8f5ff 100%)", padding: "52px 40px 40px", position: "relative", overflow: "hidden" },
  heroBlob: { position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(124,92,246,0.18) 0%, transparent 70%)", top: -150, right: -100, pointerEvents: "none" },
  heroBlobRight: { position: "absolute", width: 300, height: 300, background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)", bottom: -100, left: 60, pointerEvents: "none" },
  heroInner: { position: "relative", zIndex: 1 },
  breadcrumb: { fontSize: 13, color: "#7c5af6", fontWeight: 700, marginBottom: 10, letterSpacing: 0.3 },
  heroTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 36, fontWeight: 800, color: "#0f1117", letterSpacing: -1, marginBottom: 8 },
  heroSub: { color: "#555f7a", fontSize: 15, maxWidth: 480 },

  contentWrap: { maxWidth: 860, margin: "0 auto", padding: "36px 24px 80px" },

  stepsBar: { background: "#fff", borderRadius: 14, padding: "18px 28px", marginBottom: 28, display: "flex", alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  stepGroup: { display: "flex", alignItems: "center", flex: 1 },
  stepDot: { width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 },
  stepLabel: { fontSize: 13, fontWeight: 600 },
  stepLine: { flex: 1, height: 2, background: "#e8e9f0", margin: "0 10px" },

  card: { background: "#fff", borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 20, overflow: "hidden" },
  cardHeader: { padding: "20px 28px", borderBottom: "1px solid #f0f1f5", display: "flex", alignItems: "center", gap: 12 },
  cardIcon: { width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  cardTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 700 },
  cardSub: { fontSize: 13, color: "#888", marginTop: 1 },
  cardBody: { padding: "24px 28px" },

  field: { marginBottom: 18 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 7, letterSpacing: 0.1 },
  req: { color: "#7c5af6", marginLeft: 2 },
  scoreBadge: { marginLeft: 8, padding: "2px 8px", borderRadius: 100, fontSize: 11, fontWeight: 700 },
  input: { width: "100%", padding: "11px 14px", border: "1.5px solid #e8e9f0", borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: "#0f1117", background: "#fff", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box" },
  selectWrap: { position: "relative" },
  select: { width: "100%", padding: "11px 14px", border: "1.5px solid #e8e9f0", borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: "#0f1117", background: "#fff", outline: "none", appearance: "none", cursor: "pointer", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "11px 14px", border: "1.5px solid #e8e9f0", borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: "#0f1117", background: "#fff", outline: "none", resize: "vertical", minHeight: 110, lineHeight: 1.6, boxSizing: "border-box" },

  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  scoreGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 },

  stars: { display: "flex", gap: 6, marginTop: 4 },
  star: { fontSize: 30, cursor: "pointer", transition: "transform 0.15s, color 0.15s", userSelect: "none" },

  scoreCircle: { width: 56, height: 56, borderRadius: "50%", border: "2.5px solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, fontFamily: "'Manrope', sans-serif" },
  scoreBar: { display: "flex", alignItems: "center", gap: 12, background: "#f8f9fc", borderRadius: 10, padding: "12px 16px" },
  scoreBarLabel: { fontSize: 13, fontWeight: 600, color: "#555", whiteSpace: "nowrap" },
  scoreBarTrack: { flex: 1, height: 8, background: "#e8e9f0", borderRadius: 99, overflow: "hidden" },
  scoreBarFill: { height: "100%", borderRadius: 99, transition: "width 0.4s ease, background 0.3s" },
  scoreBarValue: { fontSize: 15, fontWeight: 800, fontFamily: "'Manrope', sans-serif", whiteSpace: "nowrap" },

  recOptions: { display: "flex", gap: 10, flexWrap: "wrap" },
  recBtn: { display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, border: "1.5px solid", cursor: "pointer", fontSize: 14, transition: "all 0.18s", background: "#fff" },

  actions: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 8 },
  btnPrimary: { background: "linear-gradient(135deg, #7c5af6, #4f8ef7)", color: "#fff", padding: "12px 28px", borderRadius: 100, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(124,90,246,0.35)", letterSpacing: 0.2 },
  btnSecondary: { background: "#fff", color: "#555", padding: "12px 24px", borderRadius: 100, fontSize: 15, fontWeight: 600, border: "1.5px solid #e0e1ea", cursor: "pointer" },

  successOverlay: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 64px)" },
  successCard: { background: "#fff", borderRadius: 24, padding: "60px 80px", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" },
  successIcon: { width: 72, height: 72, background: "linear-gradient(135deg,#22d3a4,#4f8ef7)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, color: "#fff", margin: "0 auto 20px", fontWeight: 900 },
  successTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 8 },
  successText: { color: "#888", fontSize: 15 },
};

export default AddFeedback;