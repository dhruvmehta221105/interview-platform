// components/feedback/RecommendationButtons.jsx
export default function RecommendationButtons({ recommendation, onSelect }) {
  const recommendations = [
    { value: "Strongly Hire", color: "#22d3a4", bg: "#e6faf5", icon: "🚀" },
    { value: "Hire", color: "#4f8ef7", bg: "#e8f2ff", icon: "✅" },
    { value: "Maybe", color: "#f5c842", bg: "#fffbe6", icon: "🤔" },
    { value: "No Hire", color: "#f25f6a", bg: "#fff0f1", icon: "❌" },
  ];

  return (
    <div style={s.recOptions}>
      {recommendations.map(({ value, color, bg, icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelect(value)}
          style={{
            ...s.recBtn,
            borderColor: recommendation === value ? color : "#e8e9f0",
            background: recommendation === value ? bg : "#fff",
            color: recommendation === value ? color : "#555",
            fontWeight: recommendation === value ? 700 : 500,
            boxShadow: recommendation === value ? `0 2px 12px ${color}33` : "none",
          }}
        >
          <span>{icon}</span> {value}
        </button>
      ))}
    </div>
  );
}

const s = {
  recOptions: { display: "flex", gap: 10, flexWrap: "wrap" },
  recBtn: { display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10, border: "1.5px solid", cursor: "pointer", fontSize: 14, transition: "all 0.18s", background: "#fff" },
};
