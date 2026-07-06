import { useState, useEffect, useRef } from "react";

const TRANSCRIPT_LINES = [
  "Tell me about your experience with React and state management.",
  "I have 3 years of experience with React, primarily using Redux and more recently Zustand for state management...",
  "Can you describe a challenging technical problem you solved recently?",
  "Sure! At my last role, we had a performance bottleneck in our data pipeline...",
];

const METRICS = [
  { label: "Confidence", value: 87, color: "#0a0a0a" },
  { label: "Speech Speed", value: 72, color: "#0a0a0a" },
  { label: "Technical Accuracy", value: 94, color: "#0a0a0a" },
  { label: "Communication", value: 81, color: "#0a0a0a" },
];

const QUESTIONS = [
  { id: 1, label: "Introduction", done: true },
  { id: 2, label: "Technical", done: true },
  { id: 3, label: "Problem Solving", active: true },
  { id: 4, label: "Behavioral", done: false },
  { id: 5, label: "Wrap-up", done: false },
];

export default function InteractiveDemo() {
  const [activeTranscript, setActiveTranscript] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTranscript((prev) => (prev + 1) % TRANSCRIPT_LINES.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section id="demo" style={{
      padding: "120px 60px",
      background: "#fff",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#8a8a9a",
            background: "#f8f9fb", border: "1px solid #e8e8f0",
            borderRadius: 9999, padding: "6px 16px", marginBottom: 24,
          }}>
            Live AI Interview
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Experience It Live
          </h2>
          <p style={{ fontSize: 18, color: "#5a5a6a", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            A real-time preview of what your AI interview session looks like.
          </p>
        </div>

        {/* Demo Interface */}
        <div style={{
          background: "#0b0b0f",
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
        }}>
          {/* Top Bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 24px",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
                InterviewX — Live Session
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>00:14:23</span>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#e84040", borderRadius: 9999, padding: "4px 12px",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "blink-cursor 1s ease-in-out infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>REC</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {/* Left — Candidate Camera */}
            <div style={{
              padding: 24,
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}>
              {/* Camera Feed */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "4/3",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: 16,
              }}>
                {/* Simulated camera placeholder */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column",
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.7)",
                    marginBottom: 12,
                    border: "2px solid rgba(255,255,255,0.1)",
                  }}>
                    D
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                    Candidate
                  </div>
                </div>

                {/* Eye contact indicator */}
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                  borderRadius: 10, padding: "6px 12px",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>Eye Contact: 91%</span>
                </div>

                {/* Waveform at bottom */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: 44, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                  display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, paddingBottom: 10,
                }}>
                  {[5, 12, 8, 18, 10, 22, 14, 8, 20, 6, 16, 12, 4, 18, 10, 14].map((h, i) => (
                    <div key={i} className="ix-wave-bar" style={{
                      height: `${h}px`,
                      background: "#22c55e",
                      animationDelay: `${i * 0.06}s`,
                      opacity: 0.9,
                    }} />
                  ))}
                </div>
              </div>

              {/* Live Metrics */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {METRICS.map((metric) => (
                  <div key={metric.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                        {metric.label}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                        {metric.value}%
                      </span>
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 9999, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", width: `${metric.value}%`,
                        background: metric.value >= 85 ? "#22c55e" : metric.value >= 70 ? "#f59e0b" : "#e84040",
                        borderRadius: 9999,
                        transition: "width 1s ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — AI Interviewer */}
            <div style={{ padding: 24 }}>
              {/* AI Camera */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "4/3",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: 16,
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, #0f1f0f 0%, #0a0a1a 100%)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  {/* AI avatar */}
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "2px solid rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, marginBottom: 12,
                  }}>
                    ⬡
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                    AI Interviewer
                  </div>
                </div>
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                  borderRadius: 10, padding: "5px 12px",
                }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>InterviewX AI</span>
                </div>
              </div>

              {/* Live Transcript */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: 16, marginBottom: 12,
                minHeight: 72,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Live Transcript
                </div>
                <p style={{
                  fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, fontWeight: 400,
                  transition: "opacity 0.4s",
                }}>
                  {TRANSCRIPT_LINES[activeTranscript]}
                </p>
              </div>

              {/* Question Timeline */}
              <div style={{ display: "flex", gap: 8 }}>
                {QUESTIONS.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      flex: 1, padding: "8px 6px", textAlign: "center",
                      borderRadius: 8,
                      background: q.active ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${q.active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <div style={{
                      fontSize: 10, color: q.done ? "#22c55e" : q.active ? "#fff" : "rgba(255,255,255,0.25)",
                      fontWeight: 600,
                    }}>
                      {q.done ? "✓" : q.id}
                    </div>
                    <div style={{
                      fontSize: 9, color: q.active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
                      fontWeight: 500, marginTop: 2,
                    }}>
                      {q.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
