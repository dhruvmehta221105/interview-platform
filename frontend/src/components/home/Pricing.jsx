import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Perfect to get started and explore the platform.",
    cta: "Get Started Free",
    features: [
      "5 AI interviews / month",
      "Basic AI feedback report",
      "1 interview category",
      "Text transcript",
      "Community support",
    ],
    missing: [
      "Speech & voice analysis",
      "Eye contact detection",
      "Resume analyzer",
      "Unlimited interviews",
    ],
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499",
    period: "per month",
    desc: "Everything you need to land your dream role fast.",
    cta: "Start Pro Trial",
    features: [
      "Unlimited AI interviews",
      "Full AI feedback + radar chart",
      "All 50+ interview categories",
      "Speech & voice analysis",
      "Eye contact detection",
      "Resume analyzer (ATS score)",
      "Interview recording & replay",
      "Priority AI processing",
      "Email support",
    ],
    missing: [],
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "tailored plan",
    desc: "For teams, bootcamps, and universities at scale.",
    cta: "Contact Sales",
    features: [
      "Everything in Pro",
      "Multi-seat team accounts",
      "Custom interview templates",
      "Bulk candidate management",
      "Advanced analytics dashboard",
      "API access",
      "Dedicated account manager",
      "SLA & custom contracts",
    ],
    missing: [],
    featured: false,
  },
];

export default function Pricing() {
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  return (
    <section id="pricing" style={{ padding: "120px 60px", background: "#f8f9fb" }}>
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
            Simple Pricing
          </div>
          <h2 style={{
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800,
            letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1.1, marginBottom: 16,
          }}>
            Invest in Your Career
          </h2>
          <p style={{ fontSize: 18, color: "#5a5a6a", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>
            Start free, upgrade when you're ready. No hidden fees.
          </p>
        </div>

        {/* Plans Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, alignItems: "start" }}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredId(plan.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: plan.featured ? "#0b0b0f" : "#fff",
                border: `1px solid ${plan.featured ? "transparent" : hoveredId === plan.id ? "#c8c8d8" : "#e8e8f0"}`,
                borderRadius: 24,
                padding: "36px 32px",
                position: "relative",
                transition: "all 0.25s ease",
                transform: plan.featured || hoveredId === plan.id ? "translateY(-4px)" : "none",
                boxShadow: plan.featured
                  ? "0 24px 60px rgba(0,0,0,0.2)"
                  : hoveredId === plan.id
                    ? "0 12px 40px rgba(0,0,0,0.1)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: "absolute", top: -14, left: "50%",
                  transform: "translateX(-50%)",
                  background: "#fff", color: "#0a0a0a",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                  padding: "5px 16px", borderRadius: 9999,
                  border: "1px solid #e8e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  whiteSpace: "nowrap",
                }}>
                  ★ {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{
                fontSize: 13, fontWeight: 700, letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: plan.featured ? "rgba(255,255,255,0.5)" : "#8a8a9a",
                marginBottom: 16,
              }}>
                {plan.name}
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span style={{
                  fontSize: 44, fontWeight: 800, letterSpacing: "-0.04em",
                  color: plan.featured ? "#fff" : "#0a0a0a", lineHeight: 1,
                }}>
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span style={{ fontSize: 14, color: plan.featured ? "rgba(255,255,255,0.4)" : "#8a8a9a" }}>
                    /{plan.period}
                  </span>
                )}
              </div>
              {plan.price === "Custom" && (
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>{plan.period}</div>
              )}

              <p style={{
                fontSize: 14, lineHeight: 1.6, marginBottom: 28,
                color: plan.featured ? "rgba(255,255,255,0.55)" : "#6a6a7a",
              }}>
                {plan.desc}
              </p>

              {/* CTA Button */}
              <button
                onClick={() => navigate("/signup")}
                style={{
                  width: "100%", padding: "13px",
                  borderRadius: 12,
                  background: plan.featured ? "#fff" : "#0a0a0a",
                  color: plan.featured ? "#0a0a0a" : "#fff",
                  fontSize: 14, fontWeight: 700,
                  border: "none", cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: "-0.01em",
                  marginBottom: 28,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
              >
                {plan.cta}
              </button>

              {/* Divider */}
              <div style={{ height: 1, background: plan.featured ? "rgba(255,255,255,0.07)" : "#f0f0f5", marginBottom: 24 }} />

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: plan.featured ? "rgba(255,255,255,0.1)" : "#f0f0f5",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <svg width="10" height="10" fill="none" stroke={plan.featured ? "#22c55e" : "#0a0a0a"} strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: plan.featured ? "rgba(255,255,255,0.75)" : "#4a4a5a", lineHeight: 1.4 }}>
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.missing.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 10, opacity: 0.4 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", background: "#f0f0f5",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
                    }}>
                      <svg width="10" height="10" fill="none" stroke="#8a8a9a" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: "#8a8a9a", lineHeight: 1.4 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#8a8a9a", marginTop: 40 }}>
          All plans include a 7-day free trial on Pro. No credit card required for Free plan.
        </p>
      </div>
    </section>
  );
}
