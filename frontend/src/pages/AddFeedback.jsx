import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import FeedbackForm from "../components/feedback/FeedbackForm";

function AddFeedback() {
  const navigate = useNavigate();
  const location = useLocation();
  const interviewData = location.state || {};

  return (
    <div style={s.root}>
      <Navbar />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <p style={s.breadcrumb}>Feedback Portal</p>
          <h1 style={s.heroTitle}>Add Interview Feedback</h1>
          <p style={s.heroSub}>
            Evaluate candidate performance across technical, communication, and problem-solving dimensions.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={s.contentWrap}>
        <FeedbackForm initialData={interviewData} />
      </div>
    </div>
  );
}

/* ── Styles ── */
const s = {
  root: { fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", background: "#f5f6fa", minHeight: "100vh", color: "#0f1117" },

  hero: { background: "#f8f9fc", padding: "52px 40px 40px", position: "relative", overflow: "hidden", borderBottom: "1px solid #e8e9f0" },
  heroInner: { position: "relative", zIndex: 1 },
  breadcrumb: { fontSize: 13, color: "#888", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 },
  heroTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 36, fontWeight: 800, color: "#0f1117", letterSpacing: -1, marginBottom: 8 },
  heroSub: { color: "#555f7a", fontSize: 15, maxWidth: 480 },

  contentWrap: { maxWidth: 860, margin: "0 auto", padding: "36px 24px 80px" },
};

export default AddFeedback;