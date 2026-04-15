// components/viewFeedback/FeedbackCard.jsx
import { scoreColor, recConfig, formatDate } from "../../utils/helpers";

export default function FeedbackCard({ feedback, isActive, onSelect, onDelete }) {
  const rc = recConfig[feedback.recommendation] || { color: "#888", bg: "#f5f5f5", icon: "—" };
  const sc = scoreColor(feedback.totalScore);

  return (
    <div
      style={{ ...s.tableRow, background: isActive ? "#f8f6ff" : "#fff", borderLeft: isActive ? "3px solid #7c5af6" : "3px solid transparent" }}
      onClick={onSelect}
    >
      <div style={s.td}>
        <div style={s.avatar}>{feedback.candidateName.charAt(0)}</div>
        <div>
          <div style={s.candidateName}>{feedback.candidateName}</div>
          <div style={s.candidateEmail}>{feedback.candidateEmail}</div>
        </div>
      </div>
      <div style={s.td}>
        <span style={s.roleTag}>{feedback.role}</span>
      </div>
      <div style={s.td}>
        <div style={{ ...s.scoreChip, background: sc + "18", color: sc }}>
          {parseFloat(feedback.totalScore).toFixed(1)}
        </div>
      </div>
      <div style={s.td}>
        <span style={{ ...s.recChip, background: rc.bg, color: rc.color }}>
          {rc.icon} {feedback.recommendation}
        </span>
      </div>
      <div style={{ ...s.td, color: "#888", fontSize: 13 }}>
        {formatDate(feedback.date)}
      </div>
      <div style={s.td} onClick={(e) => e.stopPropagation()}>
        <button
          style={s.deleteBtn}
          onClick={onDelete}
          title="Delete"
        >×</button>
      </div>
    </div>
  );
}

const s = {
  tableRow: { display: "grid", gridTemplateColumns: "2fr 1.5fr 0.8fr 1.4fr 1fr 0.4fr", gap: 0, padding: "14px 20px", borderBottom: "1px solid #f5f6fa", cursor: "pointer", transition: "background 0.15s, border-left 0.15s", alignItems: "center" },
  td: { display: "flex", alignItems: "center", gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#7c5af6,#4f8ef7)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 },
  candidateName: { fontSize: 14, fontWeight: 600, color: "#0f1117" },
  candidateEmail: { fontSize: 12, color: "#aaa", marginTop: 1 },
  roleTag: { fontSize: 12, fontWeight: 600, color: "#7c5af6", background: "#f0ecff", padding: "4px 10px", borderRadius: 100 },
  scoreChip: { fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: 8 },
  recChip: { fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 100, display: "flex", alignItems: "center", gap: 4 },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#ccc", padding: "4px", borderRadius: 6, transition: "color 0.15s" },
};
