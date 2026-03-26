import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackNav from "../components/common/FeedbackNav";
import FeedbackTable from "../components/viewFeedback/FeedbackTable";
import DetailPanel from "../components/viewFeedback/DetailPanel";
import { filterFeedbacks, sortFeedbacks } from "../utils/helpers";

const DEMO = [
  { id: 1, candidateName: "Arjun Sharma", candidateEmail: "arjun@example.com", role: "Frontend Developer", date: "2025-03-14", technical: "4", communication: "5", problemSolving: "4", strengths: "Excellent React knowledge, clean code structure, great with CSS animations.", improvements: "Could improve on system design concepts and backend awareness.", comments: "Very promising candidate. Would be a great addition to the team.", recommendation: "Strongly Hire", totalScore: "4.3" },
  { id: 2, candidateName: "Priya Mehta", candidateEmail: "priya@example.com", role: "Data Scientist", date: "2025-03-12", technical: "5", communication: "3", problemSolving: "5", strengths: "Outstanding ML knowledge, strong problem-solving, excellent Python skills.", improvements: "Needs to work on communication and explaining complex ideas simply.", comments: "Technically exceptional, communication needs some polish.", recommendation: "Hire", totalScore: "4.3" },
  { id: 3, candidateName: "Rahul Verma", candidateEmail: "rahul@example.com", role: "Backend Developer", date: "2025-03-10", technical: "3", communication: "4", problemSolving: "2", strengths: "Good communication, understands REST APIs.", improvements: "Needs significant improvement in DSA and system design.", comments: "Not ready for a senior role. Could revisit after 3-6 months.", recommendation: "No Hire", totalScore: "3.0" },
  { id: 4, candidateName: "Sneha Kapoor", candidateEmail: "sneha@example.com", role: "UX Designer", date: "2025-03-08", technical: "3", communication: "5", problemSolving: "4", strengths: "Superb portfolio, user empathy, great at presenting ideas.", improvements: "Needs to improve on prototyping speed and accessibility knowledge.", comments: "Would fit well with the design team.", recommendation: "Hire", totalScore: "4.0" },
];

function ViewFeedback() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRec, setFilterRec] = useState("All");
  const [filterRole, setFilterRole] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("feedbacks") || "[]");
      const data = Array.isArray(stored) && stored.length ? stored : DEMO;
      setFeedbacks(Array.isArray(data) ? data : DEMO);
    } catch (error) {
      console.error("Error parsing feedbacks from localStorage:", error);
      setFeedbacks(DEMO);
    }
  }, []);

  // Ensure feedbacks is always an array
  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];
  const roles = ["All", ...new Set(safeFeedbacks.map((f) => f?.role).filter(Boolean))];

  const filtered = safeFeedbacks
    .filter((f) => filterFeedbacks(f, search, filterRec, filterRole))
    .sort((a, b) => sortFeedbacks(a, b, sortBy));

  const handleDelete = (id) => {
    const updated = safeFeedbacks.filter((f) => f?.id !== id);
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
    setDeleteId(null);
    if (selected?.id === id) setSelected(null);
  };

  const stats = {
    total: safeFeedbacks.length,
    hire: safeFeedbacks.filter((f) => f?.recommendation === "Strongly Hire" || f?.recommendation === "Hire").length,
    avg: safeFeedbacks.length ? (safeFeedbacks.reduce((a, b) => a + parseFloat(b?.totalScore || 0), 0) / safeFeedbacks.length).toFixed(1) : "—",
    noHire: safeFeedbacks.filter((f) => f?.recommendation === "No Hire").length,
  };

  return (
    <div style={s.root}>
      <FeedbackNav />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroBlob} />
        <div style={s.heroInner}>
          <p style={s.breadcrumb}>📊 Feedback Portal</p>
          <h1 style={s.heroTitle}>Interview Feedback</h1>
          <p style={s.heroSub}>Review, filter, and manage all candidate evaluations in one place.</p>
        </div>
        <button onClick={() => navigate("/add-feedback")} style={s.heroBtn}>
          + Add New Feedback
        </button>
      </div>

      <div style={s.contentWrap}>
        {/* Stat Cards */}
        <div style={s.statsRow}>
          {[
            { label: "Total Reviews", value: stats.total, icon: "📋", color: "#7c5af6", bg: "#f0ecff" },
            { label: "Recommended", value: stats.hire, icon: "✅", color: "#22d3a4", bg: "#e6faf5" },
            { label: "Avg Score", value: stats.avg + "/5", icon: "⭐", color: "#f5c842", bg: "#fffbe6" },
            { label: "Rejected", value: stats.noHire, icon: "❌", color: "#f25f6a", bg: "#fff0f1" },
          ].map(({ label, value, icon, color, bg }) => (
            <div key={label} style={s.statCard}>
              <div style={{ ...s.statIcon, background: bg }}>{icon}</div>
              <div>
                <div style={{ ...s.statValue, color }}>{value}</div>
                <div style={s.statLabel}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Row */}
        <div style={s.filtersBar}>
          <div style={s.searchWrap}>
            <span style={s.searchIcon}>🔍</span>
            <input
              style={s.searchInput}
              placeholder="Search by name, role, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button onClick={() => setSearch("")} style={s.clearBtn}>✕</button>}
          </div>
          <div style={s.filterGroup}>
            <select style={s.filterSelect} value={filterRec} onChange={(e) => setFilterRec(e.target.value)}>
              {["All", "Strongly Hire", "Hire", "Maybe", "No Hire"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <select style={s.filterSelect} value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              {roles.map((r) => <option key={r}>{r}</option>)}
            </select>
            <select style={s.filterSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Sort: Latest</option>
              <option value="score">Sort: Score</option>
              <option value="name">Sort: Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div style={s.resultsInfo}>
          Showing <strong>{filtered.length}</strong> of {safeFeedbacks.length} candidates
        </div>

        {/* Main layout: table + detail */}
        <div style={s.mainLayout}>
          {/* Table */}
          <div style={{ ...s.tableCard, flex: selected ? "0 0 56%" : 1 }}>
            {filtered.length === 0 ? (
              <div style={s.empty}>
                <div style={s.emptyIcon}>🔍</div>
                <p style={s.emptyText}>No feedback found matching your filters.</p>
                <button onClick={() => { setSearch(""); setFilterRec("All"); setFilterRole("All"); }} style={s.btnSecondary}>Clear Filters</button>
              </div>
            ) : (
              <FeedbackTable
                filtered={filtered}
                selected={selected}
                onSelect={setSelected}
                onDelete={(id) => setDeleteId(id)}
              />
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <DetailPanel
              selected={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div style={s.modalOverlay} onClick={() => setDeleteId(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalIcon}>🗑️</div>
            <h3 style={s.modalTitle}>Delete Feedback?</h3>
            <p style={s.modalText}>This action cannot be undone.</p>
            <div style={s.modalActions}>
              <button onClick={() => setDeleteId(null)} style={s.btnSecondary}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={s.btnDanger}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  root: { fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", background: "#f5f6fa", minHeight: "100vh", color: "#0f1117" },

  hero: { background: "linear-gradient(135deg, #ede9ff 0%, #dbeaff 50%, #e8f5ff 100%)", padding: "52px 40px 40px", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  heroBlob: { position: "absolute", width: 500, height: 500, background: "radial-gradient(circle, rgba(124,92,246,0.18) 0%, transparent 70%)", top: -150, right: -100, pointerEvents: "none" },
  heroInner: { position: "relative", zIndex: 1 },
  breadcrumb: { fontSize: 13, color: "#7c5af6", fontWeight: 700, marginBottom: 10 },
  heroTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 8 },
  heroSub: { color: "#555f7a", fontSize: 15, maxWidth: 440 },
  heroBtn: { position: "relative", zIndex: 1, background: "linear-gradient(135deg,#7c5af6,#4f8ef7)", color: "#fff", padding: "13px 24px", borderRadius: 100, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(124,90,246,0.35)", whiteSpace: "nowrap", alignSelf: "center", marginTop: 20 },

  contentWrap: { maxWidth: 1100, margin: "0 auto", padding: "36px 24px 80px" },

  statsRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 },
  statCard: { background: "#fff", borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" },
  statIcon: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 },
  statValue: { fontFamily: "'Manrope', sans-serif", fontSize: 24, fontWeight: 800, lineHeight: 1 },
  statLabel: { fontSize: 12, color: "#888", fontWeight: 500, marginTop: 3 },

  filtersBar: { background: "#fff", borderRadius: 14, padding: "14px 20px", marginBottom: 16, display: "flex", gap: 12, alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", flexWrap: "wrap" },
  searchWrap: { flex: 1, display: "flex", alignItems: "center", border: "1.5px solid #e8e9f0", borderRadius: 10, padding: "8px 12px", gap: 8, minWidth: 200 },
  searchIcon: { fontSize: 14, color: "#888" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "inherit", color: "#0f1117", background: "transparent" },
  clearBtn: { background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 14, padding: "0 2px" },
  filterGroup: { display: "flex", gap: 10 },
  filterSelect: { padding: "8px 12px", border: "1.5px solid #e8e9f0", borderRadius: 10, fontSize: 13, fontFamily: "inherit", color: "#444", background: "#fff", outline: "none", cursor: "pointer", fontWeight: 500 },

  resultsInfo: { fontSize: 13, color: "#888", marginBottom: 14, paddingLeft: 2 },

  mainLayout: { display: "flex", gap: 20, alignItems: "flex-start" },

  tableCard: { background: "#fff", borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden", transition: "flex 0.3s" },
  tableHead: { display: "grid", gridTemplateColumns: "2fr 1.5fr 0.8fr 1.4fr 1fr 0.4fr", gap: 0, padding: "12px 20px", background: "#f8f9fc", borderBottom: "1px solid #f0f1f5" },
  th: { fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: 0.8, textTransform: "uppercase" },
  tableRow: { display: "grid", gridTemplateColumns: "2fr 1.5fr 0.8fr 1.4fr 1fr 0.4fr", gap: 0, padding: "14px 20px", borderBottom: "1px solid #f5f6fa", cursor: "pointer", transition: "background 0.15s, border-left 0.15s", alignItems: "center" },
  td: { display: "flex", alignItems: "center", gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#7c5af6,#4f8ef7)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 },
  candidateName: { fontSize: 14, fontWeight: 600, color: "#0f1117" },
  candidateEmail: { fontSize: 12, color: "#aaa", marginTop: 1 },
  roleTag: { fontSize: 12, fontWeight: 600, color: "#7c5af6", background: "#f0ecff", padding: "4px 10px", borderRadius: 100 },
  scoreChip: { fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: 8 },
  recChip: { fontSize: 12, fontWeight: 700, padding: "5px 10px", borderRadius: 100, display: "flex", alignItems: "center", gap: 4 },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#ccc", padding: "4px", borderRadius: 6, transition: "color 0.15s" },

  empty: { padding: "80px 40px", textAlign: "center" },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: "#888", fontSize: 15, marginBottom: 20 },

  // Detail panel
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

  // Modal
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 },
  modal: { background: "#fff", borderRadius: 20, padding: "36px 40px", textAlign: "center", maxWidth: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" },
  modalIcon: { fontSize: 40, marginBottom: 12 },
  modalTitle: { fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8 },
  modalText: { color: "#888", fontSize: 14, marginBottom: 24 },
  modalActions: { display: "flex", gap: 12, justifyContent: "center" },

  btnSecondary: { background: "#fff", color: "#555", padding: "10px 22px", borderRadius: 100, fontSize: 14, fontWeight: 600, border: "1.5px solid #e0e1ea", cursor: "pointer" },
  btnDanger: { background: "#f25f6a", color: "#fff", padding: "10px 22px", borderRadius: 100, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(242,95,106,0.3)" },
};

export default ViewFeedback;