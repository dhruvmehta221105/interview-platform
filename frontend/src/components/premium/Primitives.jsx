import { ArrowRight } from "lucide-react";

export function PageWrap({ children, narrow = false, style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: narrow ? 1240 : 1440,
        margin: "0 auto",
        padding: "0 var(--page-gutter)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
      <div style={{ maxWidth: 760 }}>
        {eyebrow && <div className="premium-eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-0.04em", lineHeight: 1.02, margin: 0 }}>
          {title}
        </h2>
        {description && <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 720 }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Surface({ children, style = {}, className = "" }) {
  return (
    <div className={`premium-panel ${className}`.trim()} style={{ padding: 24, ...style }}>
      {children}
    </div>
  );
}

export function MetricCard({ value, label, hint, icon }) {
  return (
    <div className="premium-panel" style={{ padding: 22 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>{label}</div>
          {hint && <div style={{ marginTop: 6, fontSize: 12, color: "var(--text-soft)" }}>{hint}</div>}
        </div>
        {icon && (
          <div style={{ width: 42, height: 42, borderRadius: 14, display: "grid", placeItems: "center", background: "var(--accent-soft)", color: "var(--accent)" }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function FeatureCard({ icon: Icon, title, description, meta }) {
  return (
    <div className="premium-panel premium-hover" style={{ padding: 24, height: "100%" }}>
      <div style={{ width: 48, height: 48, borderRadius: 16, border: "1px solid var(--border)", background: "#fbfbfa", display: "grid", placeItems: "center", marginBottom: 18 }}>
        {Icon ? <Icon size={20} /> : <ArrowRight size={20} />}
      </div>
      <h3 style={{ margin: 0, fontFamily: "Manrope, sans-serif", fontSize: 20, letterSpacing: "-0.03em" }}>{title}</h3>
      <p style={{ margin: "12px 0 0", color: "var(--text-muted)", lineHeight: 1.7, fontSize: 14 }}>{description}</p>
      {meta && <div style={{ marginTop: 18, fontSize: 12, color: "var(--text-soft)", fontWeight: 600 }}>{meta}</div>}
    </div>
  );
}

export function TimelineCard({ step, title, description, accent = "#111111" }) {
  return (
    <div className="premium-panel" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: accent, color: "#fff", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>
          {step}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-soft)" }}>Step {step}</div>
      </div>
      <h3 style={{ margin: 0, fontFamily: "Manrope, sans-serif", fontSize: 20, letterSpacing: "-0.03em" }}>{title}</h3>
      <p style={{ margin: "12px 0 0", color: "var(--text-muted)", lineHeight: 1.75, fontSize: 14 }}>{description}</p>
    </div>
  );
}
