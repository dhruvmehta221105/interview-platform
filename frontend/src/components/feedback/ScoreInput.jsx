// components/feedback/ScoreInput.jsx
export default function ScoreInput({ field, label, value, hoveredStars, onStarClick, onMouseEnter, onMouseLeave }) {
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
            onClick={() => onStarClick(field, n)}
            onMouseEnter={() => onMouseEnter(field, n)}
            onMouseLeave={() => onMouseLeave(field, 0)}
          >
            ◆
          </span>
        ))}
      </div>
    </div>
  );
}

const s = {
  field: { marginBottom: 18 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 7, letterSpacing: 0.1 },
  req: { color: "#7c5af6", marginLeft: 2 },
  scoreBadge: { marginLeft: 8, padding: "2px 8px", borderRadius: 100, fontSize: 11, fontWeight: 700 },
  stars: { display: "flex", gap: 6, marginTop: 4 },
  star: { fontSize: 30, cursor: "pointer", transition: "transform 0.15s, color 0.15s", userSelect: "none" },
};
