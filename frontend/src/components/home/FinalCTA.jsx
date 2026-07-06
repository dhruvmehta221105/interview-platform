import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPromptModal from "../LoginPromptModal";

export default function FinalCTA() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleStart = () => {
    if (user) navigate("/interviews");
    else setShowModal(true);
  };

  return (
    <>
      <section style={{
        padding: "120px 60px",
        background: "#0b0b0f",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 9999, padding: "6px 16px", marginBottom: 32,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
              animation: "pulse-dot 2s ease-in-out infinite",
            }} />
            Free to start · No card required
          </div>

          <h2 style={{
            fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.05,
            marginBottom: 24,
          }}>
            Ready to ace your<br />next interview?
          </h2>

          <p style={{
            fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
            maxWidth: 480, margin: "0 auto 48px",
          }}>
            Join thousands of professionals who practice smarter and land offers at top companies.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={handleStart}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#fff", color: "#0a0a0a",
                fontSize: 15, fontWeight: 700,
                padding: "15px 32px", borderRadius: 9999,
                border: "none", cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,255,255,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Start Interview Free
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              onClick={() => navigate("/login")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent", color: "rgba(255,255,255,0.7)",
                fontSize: 15, fontWeight: 600,
                padding: "14px 28px", borderRadius: 9999,
                border: "1.5px solid rgba(255,255,255,0.12)",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              Sign In
            </button>
          </div>

          {/* Social proof strip */}
          <div style={{ marginTop: 52, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ display: "flex" }}>
              {["D", "P", "A", "S", "R"].map((letter, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#1a1a2e",
                  border: "2px solid #0b0b0f",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)",
                  marginLeft: i === 0 ? 0 : -10,
                }}>
                  {letter}
                </div>
              ))}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                Join 10,000+ candidates
              </div>
              <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "#f59e0b", fontSize: 11 }}>★</span>
                ))}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>4.9 rating</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
      </section>

      <LoginPromptModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
