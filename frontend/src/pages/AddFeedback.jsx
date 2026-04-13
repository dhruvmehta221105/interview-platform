import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FeedbackForm from "../components/feedback/FeedbackForm";

function AddFeedback() {
  const navigate = useNavigate();

  return (
    <div style={s.root}>
      <Navbar />

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

      {/* Form */}
      <div style={s.contentWrap}>
        <FeedbackForm />
      </div>
    </div>
  );
}

/* ── Styles ── */
const s = {
  root: { fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", background: "#f5f6fa", minHeight: "100vh", color: "#0f1117" },

  hero: { background: "linear-gradient(135deg, #ede9ff 0%, #dbeaff 50%, #e8f5ff 100%)", padding: "52px 40px 40px", position: "relative", overflow: "hidden" },
  heroBlob: { position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(124,92,246,0.18) 0%, transparent 70%)", top: -150, right: -100, pointerEvents: "none" },
  heroBlobRight: { position: "absolute", width: 300, height: 300, background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)", bottom: -100, left: 60, pointerEvents: "none" },
  heroInner: { position: "relative", zIndex: 1 },
  breadcrumb: { fontSize: 13, color: "#7c5af6", fontWeight: 700, marginBottom: 10, letterSpacing: 0.3 },
  heroTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 36, fontWeight: 800, color: "#0f1117", letterSpacing: -1, marginBottom: 8 },
  heroSub: { color: "#555f7a", fontSize: 15, maxWidth: 480 },

  contentWrap: { maxWidth: 860, margin: "0 auto", padding: "36px 24px 80px" },
};

export default AddFeedback;