import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

function InterviewResult() {
  const { id: interviewId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [interview, setInterview] = useState(location.state?.interview || null);
  const [loading, setLoading] = useState(!interview);
  const [error, setError] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!interview) {
      const fetchInterview = async () => {
        try {
          const res = await API.get(`/interviews/${interviewId}`);
          setInterview(res.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching interview:", err);
          setError("Failed to load interview results");
          setLoading(false);
        }
      };
      fetchInterview();
    }
  }, [interviewId, interview]);

  const formatDuration = (seconds) => {
    if (!seconds) return "0 min";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading Results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
          <button
            style={styles.backBtn}
            onClick={() => navigate("/interviews")}
          >
            ← Back to Interviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/interviews")}
        >
          ← Back to Interviews
        </button>
        <h1 style={styles.title}>Interview Complete</h1>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Summary Card */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryHeader}>
            <div>
              <h2 style={styles.candidateName}>{interview?.candidateName}</h2>
              <p style={styles.role}>{interview?.role}</p>
            </div>
            <div style={styles.completionBadge}>
              <span style={styles.checkmark}>✓</span>
              <span>COMPLETED</span>
            </div>
          </div>

          <div style={styles.summaryStats}>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Interview Date</span>
              <span style={styles.statValue}>{interview?.date}</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Interview Time</span>
              <span style={styles.statValue}>{interview?.time}</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Duration</span>
              <span style={styles.statValue}>
                {formatDuration(interview?.duration)}
              </span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statLabel}>Questions Asked</span>
              <span style={styles.statValue}>
                {interview?.questions?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Questions & Answers */}
        <div style={styles.qaSection}>
          <h3 style={styles.sectionTitle}>Questions & Answers</h3>

          {interview?.questions && interview.questions.length > 0 ? (
            <div style={styles.qaList}>
              {interview.questions.map((q, idx) => (
                <div key={idx} style={styles.qaCard}>
                  <div style={styles.qaHeader}>
                    <h4 style={styles.qaNumber}>Question {idx + 1}</h4>
                    <span style={styles.answerBadge}>Answer Recorded</span>
                  </div>

                  <div style={styles.qaContent}>
                    <div style={styles.qaItem}>
                      <label style={styles.label}>Question:</label>
                      <p style={styles.questionText}>{q.questionText}</p>
                    </div>

                    <div style={styles.qaItem}>
                      <label style={styles.label}>Your Answer:</label>
                      {selectedAnswer === idx ? (
                        <div style={styles.transcriptBox}>
                          <p style={styles.transcriptText}>
                            {q.transcript}
                          </p>
                          <button
                            style={styles.collapseBtn}
                            onClick={() => setSelectedAnswer(null)}
                          >
                            ▲ Hide Transcript
                          </button>
                        </div>
                      ) : (
                        <button
                          style={styles.expandBtn}
                          onClick={() => setSelectedAnswer(idx)}
                        >
                          ▼ View Transcript
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p>No answers recorded for this interview.</p>
            </div>
          )}
        </div>

        {/* Feedback Section (Optional) */}
        {interview?.feedback && (
          <div style={styles.feedbackSection}>
            <h3 style={styles.sectionTitle}>AI Feedback</h3>
            <div style={styles.feedbackCard}>
              <p style={styles.feedbackText}>{interview.feedback}</p>
            </div>
          </div>
        )}

        {/* Score Section (Optional) */}
        {interview?.totalScore && (
          <div style={styles.scoreSection}>
            <h3 style={styles.sectionTitle}>Overall Score</h3>
            <div style={styles.scoreCard}>
              <div style={styles.scoreDisplay}>
                <span style={styles.scoreValue}>{interview.totalScore}</span>
                <span style={styles.scoreMax}>/ 100</span>
              </div>
              <div style={styles.scoreBar}>
                <div
                  style={{
                    ...styles.scoreBarFill,
                    width: `${interview.totalScore}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={styles.actions}>
          <button
            style={styles.downloadBtn}
            onClick={() => alert("Download feature coming soon!")}
          >
            📥 Download Report
          </button>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/interviews")}
          >
            Back to Interviews
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f8f9fe",
    minHeight: "100vh",
    fontFamily: "'Manrope', sans-serif",
    paddingBottom: "40px"
  },

  loadingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px"
  },

  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #ddd",
    borderTop: "4px solid #7c5af6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },

  errorContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px"
  },

  errorText: {
    color: "#c33",
    fontSize: "16px"
  },

  header: {
    padding: "24px 40px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    borderBottom: "1px solid #e0e0e0",
    background: "#fff"
  },

  backBtn: {
    background: "transparent",
    border: "none",
    color: "#7c5af6",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer"
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 800,
    color: "#1a1a1a"
  },

  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "0 20px"
  },

  summaryCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1.5px solid #f0f1f7"
  },

  summaryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "40px"
  },

  candidateName: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 800,
    color: "#1a1a1a"
  },

  role: {
    margin: "8px 0 0 0",
    fontSize: "14px",
    color: "#7c5af6",
    fontWeight: 600
  },

  completionBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#e8f8f5",
    color: "#27ae60",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "14px"
  },

  checkmark: {
    fontSize: "18px"
  },

  summaryStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  statLabel: {
    fontSize: "12px",
    color: "#888",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  statValue: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1a1a1a"
  },

  sectionTitle: {
    margin: "0 0 24px 0",
    fontSize: "20px",
    fontWeight: 800,
    color: "#1a1a1a"
  },

  qaSection: {
    marginBottom: "40px"
  },

  qaList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  qaCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1.5px solid #f0f1f7"
  },

  qaHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },

  qaNumber: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
    color: "#1a1a1a"
  },

  answerBadge: {
    background: "#e3f2fd",
    color: "#1976d2",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600
  },

  qaContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  qaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1a1a1a",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  questionText: {
    margin: 0,
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.6",
    background: "#f8f9fe",
    padding: "12px 16px",
    borderRadius: "8px"
  },

  transcriptBox: {
    background: "#f8f9fe",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e0e1ea"
  },

  transcriptText: {
    margin: "0 0 12px 0",
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6"
  },

  expandBtn: {
    background: "transparent",
    border: "1.5px solid #7c5af6",
    color: "#7c5af6",
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "13px"
  },

  collapseBtn: {
    background: "#7c5af6",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "13px"
  },

  emptyState: {
    textAlign: "center",
    padding: "40px",
    background: "#fff",
    borderRadius: "16px",
    border: "1.5px solid #f0f1f7",
    color: "#888"
  },

  feedbackSection: {
    marginBottom: "40px"
  },

  feedbackCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1.5px solid #f0f1f7"
  },

  feedbackText: {
    margin: 0,
    fontSize: "15px",
    color: "#555",
    lineHeight: "1.8"
  },

  scoreSection: {
    marginBottom: "40px"
  },

  scoreCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1.5px solid #f0f1f7",
    textAlign: "center"
  },

  scoreDisplay: {
    marginBottom: "24px"
  },

  scoreValue: {
    fontSize: "48px",
    fontWeight: 800,
    color: "#7c5af6"
  },

  scoreMax: {
    fontSize: "24px",
    color: "#888",
    fontWeight: 600
  },

  scoreBar: {
    width: "100%",
    height: "12px",
    background: "#e0e1ea",
    borderRadius: "100px",
    overflow: "hidden"
  },

  scoreBarFill: {
    height: "100%",
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    transition: "width 0.5s ease"
  },

  actions: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    marginTop: "40px"
  },

  downloadBtn: {
    padding: "14px 32px",
    background: "transparent",
    border: "1.5px solid #7c5af6",
    color: "#7c5af6",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px"
  },

  primaryBtn: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default InterviewResult;
