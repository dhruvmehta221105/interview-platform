// components/home/Testimonials.jsx
const TESTIMONIALS = [
  { name: "Manuel Rikob", title: "CEO of Intel", text: "Working with Master in me has been an incredibly painless experience.", dark: true },
  { name: "Sarah Chen", title: "CTO of Stripe", text: "The AI feedback helped me ace my interviews. Got hired at my dream company.", dark: false },
];

export default function Testimonials() {
  return (
    <section style={{ ...g.section, paddingTop: 40 }}>
      <h2 style={{ ...g.sectionTitle, textAlign: "left", maxWidth: 1100, margin: "0 auto 24px" }}>What our clients say</h2>
      <div style={g.testimGrid}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{ ...g.testimCard, background: t.dark ? "#1a1d2e" : "#f5f6fa" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.dark ? "#aaa" : "#888", marginBottom: 12 }}>
              {t.name} <span style={{ color: "#4f84f7" }}>• {t.title}</span>
            </div>
            <p style={{ fontSize: 20, fontWeight: 700, color: t.dark ? "#fff" : "#0f1117", lineHeight: 1.4, fontStyle: "italic" }}>
              "{t.text}"
            </p>
            <div style={g.stars}>{"★★★★★"}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const g = {
  section: { padding: "80px 40px", maxWidth: "100%", overflow: "hidden" },
  sectionTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 40, fontWeight: 800, color: "#0f1117", letterSpacing: "-1px", marginBottom: 12 },
  testimGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 1100, margin: "0 auto" },
  testimCard: { borderRadius: 20, padding: "28px 30px" },
  stars: { marginTop: 16, color: "#f59e0b", fontSize: 20, letterSpacing: 2 },
};
