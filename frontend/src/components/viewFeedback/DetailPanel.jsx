// components/viewFeedback/DetailPanel.jsx
import { scoreColor, recConfig, formatDateLong } from "../../utils/helpers";

export default function DetailPanel({ selected, onClose }) {
  if (!selected) return null;

  const rc = recConfig[selected.recommendation] || { color: "#888", bg: "#f5f5f5", icon: "—" };
  const sc = scoreColor(selected.totalScore);

  return (
    <div style={s.detailPanel}>
      <div style={s.detailHeader}>
        <div style={s.detailAvatar}>{selected.candidateName.charAt(0)}</div>
        <div style={{ flex: 1 }}>
          <div style={s.detailName}>{selected.candidateName}</div>
          <div style={s.detailEmail}>{selected.candidateEmail}</div>
          <div style={s.detailRole}>{selected.role}</div>
        </div>
        <button onClick={onClose} style={s.closeBtn}>✕</button>
      </div>

      {/* Score breakdown */}
      <div style={s.detailSection}>
        <div style={s.detailSectionTitle}>Score Breakdown</div>
        {[
          { label: "Technical", value: selected.technical, color: "#7c5af6" },
          { label: "Communication", value: selected.communication, color: "#4f8ef7" },
          { label: "Problem Solving", value: selected.problemSolving, color: "#22d3a4" },
        ].map(({ label, value, color }) => (
          <div key={label} style={s.scoreRow}>
            <span style={s.scoreRowLabel}>{label}</span>
            <div style={s.scoreTrack}>
              <div style={{ ...s.scoreFill, width: `${(parseInt(value) / 5) * 100}%`, background: color }} />
            </div>
            <span style={{ ...s.scoreRowVal, color }}>{value}/5</span>
          </div>
        ))}
        <div style={{ ...s.totalRow, color: sc }}>
          Overall: {parseFloat(selected.totalScore).toFixed(1)} / 5
        </div>
      </div>

      {/* Recommendation */}
      <div style={s.detailSection}>
        <div style={{ ...s.recBanner, background: rc.bg, borderColor: rc.color + "44" }}>
          <span style={{ fontSize: 20 }}>{rc.icon}</span>
          <div>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 2 }}>RECOMMENDATION</div>
            <div style={{ ...s.recBannerText, color: rc.color }}>{selected.recommendation}</div>
          </div>
        </div>
      </div>

      {/* Strengths / Improvements */}
      {selected.strengths && (
        <div style={s.detailSection}>
          <div style={s.detailSectionTitle}>💪 Strengths</div>
          <p style={s.detailText}>{selected.strengths}</p>
        </div>
      )}
      {selected.improvements && (
        <div style={s.detailSection}>
          <div style={s.detailSectionTitle}>🎯 Areas to Improve</div>
          <p style={s.detailText}>{selected.improvements}</p>
        </div>
      )}
      {selected.comments && (
        <div style={s.detailSection}>
          <div style={s.detailSectionTitle}>📝 Comments</div>
          <p style={s.detailText}>{selected.comments}</p>
        </div>
      )}
      <div style={s.detailFooter}>
        Reviewed on {formatDateLong(selected.date)}
      </div>
    </div>
  );
}

const s = {
  detailPanel: { width: 320, flexShrink: 0, background: "#fff", borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
  detailHeader: { background: "linear-gradient(135deg,#ede9ff,#dbeaff)", padding: "20px", display: "flex", gap: 12, alignItems: "flex-start", position: "relative" },
  detailAvatar: { width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#7c5af6,#4f8ef7)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, flexShrink: 0 },
  detailName: { fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 800, color: "#0f1117" },
  detailEmail: { fontSize: 12, color: "#7c5af6", marginTop: 2 },
  detailRole: { fontSize: 12, color: "#888", marginTop: 2, fontWeight: 500 },
  closeBtn: { position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.7)", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 13, color: "#555", display: "flex", alignItems: "center", justifyContent: "center" },

  detailSection: { padding: "16px 20px", borderBottom: "1px solid #f5f6fa" },
  detailSectionTitle: { fontSize: 12, fontWeight: 700, color: "#888", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 },
  detailText: { fontSize: 14, color: "#444", lineHeight: 1.6 },
  scoreRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  scoreRowLabel: { fontSize: 13, color: "#555", width: 120, fontWeight: 500, flexShrink: 0 },
  scoreTrack: { flex: 1, height: 6, background: "#f0f1f5", borderRadius: 99, overflow: "hidden" },
  scoreFill: { height: "100%", borderRadius: 99, transition: "width 0.5s ease" },
  scoreRowVal: { fontSize: 13, fontWeight: 700, width: 30, textAlign: "right", flexShrink: 0 },
  totalRow: { fontSize: 15, fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginTop: 10, textAlign: "right" },
  recBanner: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: "1.5px solid" },
  recBannerText: { fontSize: 15, fontWeight: 800, fontFamily: "'Manrope', sans-serif" },
  detailFooter: { padding: "12px 20px", fontSize: 12, color: "#aaa", textAlign: "center" },
};
