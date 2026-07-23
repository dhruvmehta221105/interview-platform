// ===== SCORE & COLOR HELPERS =====
export const scoreColor = (score) => {
  const n = parseFloat(score);
  if (n >= 4.5) return "#22d3a4";
  if (n >= 3.5) return "#4f8ef7";
  if (n >= 2.5) return "#f5c842";
  return "#f25f6a";
};

// ===== FORMATTING HELPERS =====
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatDateLong = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", { dateStyle: "long" });
};

// ===== CALCULATION HELPERS =====
export const calculateAverageScore = (t, c, p) => {
  return ((parseFloat(t) + parseFloat(c) + parseFloat(p)) / 3).toFixed(1);
};

// ===== DATA FILTERING & SORTING HELPERS =====
export const filterFeedbacks = (feedback, search, filterRec, filterRole) => {
  // Handle single feedback item filter (for use with .filter())
  if (!feedback || typeof feedback !== 'object') return false;
  
  const q = search.toLowerCase();
  return (
    (!q ||
      (feedback.candidateName && feedback.candidateName.toLowerCase().includes(q)) ||
      (feedback.role && feedback.role.toLowerCase().includes(q)) ||
      (feedback.candidateEmail && feedback.candidateEmail.toLowerCase().includes(q))) &&
    (filterRec === "All" || feedback.recommendation === filterRec) &&
    (filterRole === "All" || feedback.role === filterRole)
  );
};

export const sortFeedbacks = (a, b, sortBy) => {
  // Handle individual item comparison (for use with .sort())
  if (!a || !b) return 0;
  
  if (sortBy === "date") {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB - dateA;
  }
  if (sortBy === "score") {
    return parseFloat(b.totalScore || 0) - parseFloat(a.totalScore || 0);
  }
  if (sortBy === "name") {
    return (a.candidateName || "").localeCompare(b.candidateName || "");
  }
  return 0;
};

// ===== RECOMMENDATION CONFIG =====
export const recConfig = {
  "Strongly Hire": { color: "#22d3a4", bg: "#e6faf5", icon: "🚀" },
  Hire: { color: "#4f8ef7", bg: "#e8f2ff", icon: "✅" },
  Maybe: { color: "#f5c842", bg: "#fffbe6", icon: "🤔" },
  "No Hire": { color: "#f25f6a", bg: "#fff0f1", icon: "❌" },
};
