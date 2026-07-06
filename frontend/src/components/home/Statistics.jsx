import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const STATS = [
  { value: 100000, suffix: "+", label: "Mock Interviews", prefix: "", decimals: 0 },
  { value: 95, suffix: "%", label: "User Satisfaction", prefix: "", decimals: 0 },
  { value: 250000, suffix: "+", label: "AI Feedback Reports", prefix: "", decimals: 0 },
  { value: 50, suffix: "+", label: "Interview Categories", prefix: "", decimals: 0 },
  { value: 24, suffix: "/7", label: "AI Always Available", prefix: "", decimals: 0 },
];

function formatValue(value) {
  if (value >= 1000) return (value / 1000).toFixed(0) + "K";
  return value;
}

export default function Statistics() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: "100px 60px",
      background: "#f8f9fb",
      borderTop: "1px solid #f0f0f5",
      borderBottom: "1px solid #f0f0f5",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", color: "#0a0a0a", marginBottom: 16,
          }}>
            Trusted by Thousands
          </h2>
          <p style={{ fontSize: 18, color: "#5a5a6a" }}>
            Real numbers from real candidates getting real results.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 0,
        }}>
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "40px 24px",
                borderRight: index < STATS.length - 1 ? "1px solid #e8e8f0" : "none",
              }}
            >
              <div style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#0a0a0a",
                lineHeight: 1,
                marginBottom: 10,
                fontVariantNumeric: "tabular-nums",
              }}>
                {started ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                    formattingFn={
                      stat.value >= 1000
                        ? (val) => `${Math.round(val / 1000)}K${stat.suffix}`
                        : undefined
                    }
                    useEasing={true}
                  />
                ) : (
                  <span>—</span>
                )}
              </div>
              <div style={{
                fontSize: 14, fontWeight: 600, color: "#8a8a9a", letterSpacing: "0.01em",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
