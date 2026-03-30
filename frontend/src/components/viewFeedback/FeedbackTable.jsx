// components/viewFeedback/FeedbackTable.jsx
import { scoreColor, recConfig, formatDate } from "../../utils/helpers";
import FeedbackCard from "./FeedbackCard";

export default function FeedbackTable({ filtered, selected, onSelect, onDelete }) {
  return (
    <div style={s.tableCard}>
      {filtered.length === 0 ? (
        <div style={s.empty}>
          <div style={s.emptyIcon}>🔍</div>
          <p style={s.emptyText}>No feedback found matching your filters.</p>
          <button onClick={() => window.location.reload()} style={s.btnSecondary}>Clear Filters</button>
        </div>
      ) : (
        <>
          <div style={s.tableHead}>
            {["Candidate", "Role", "Score", "Recommendation", "Date", ""].map((h) => (
              <div key={h} style={s.th}>{h}</div>
            ))}
          </div>
          {filtered.map((f) => (
            <FeedbackCard
              key={f.id}
              feedback={f}
              isActive={selected?.id === f.id}
              onSelect={() => onSelect(selected?.id === f.id ? null : f)}
              onDelete={() => onDelete(f.id)}
            />
          ))}
        </>
      )}
    </div>
  );
}

const s = {
  tableCard: { background: "#fff", borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden", transition: "flex 0.3s" },
  tableHead: { display: "grid", gridTemplateColumns: "2fr 1.5fr 0.8fr 1.4fr 1fr 0.4fr", gap: 0, padding: "12px 20px", background: "#f8f9fc", borderBottom: "1px solid #f0f1f5" },
  th: { fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 0.8, textTransform: "uppercase" },
  empty: { padding: "80px 40px", textAlign: "center" },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: "#888", fontSize: 15, marginBottom: 20 },
  btnSecondary: { background: "#fff", color: "#555", padding: "10px 22px", borderRadius: 100, fontSize: 14, fontWeight: 600, border: "1.5px solid #e0e1ea", cursor: "pointer" },
};
