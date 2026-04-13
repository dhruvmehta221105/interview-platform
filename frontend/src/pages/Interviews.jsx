import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import API from "../api"; // connect to backend

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState(location.state?.message || "");

  // ✅ Fetch interviews from backend
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const res = await API.get("/interviews");
        setInterviews(res.data);
        
        // Clear success message after 5 seconds
        if (successMsg) {
          setTimeout(() => setSuccessMsg(""), 5000);
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleStartInterview = async (interviewId, role) => {
    try {
      // Mark interview as in-progress
      await API.post(`/interviews/${interviewId}/start`);
      
      // Navigate to interview room with state
      navigate(`/interview/${interviewId}`, { 
        state: { interviewId, role } 
      });
    } catch (error) {
      console.error("Error starting interview:", error);
      alert("Failed to start interview");
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      scheduled: { background: "#e3f2fd", color: "#1976d2", label: "Scheduled" },
      "in-progress": { background: "#fff3e0", color: "#f57c00", label: "In Progress" },
      completed: { background: "#e8f8f5", color: "#27ae60", label: "Completed" }
    };
    return statusStyles[status] || statusStyles.scheduled;
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Upcoming Interviews</h1>
            <p style={styles.subtitle}>
              Manage your scheduled candidate evaluations
            </p>
          </div>

          <button
            style={styles.btnPrimary}
            onClick={() => navigate("/schedule-interview")}
          >
            + Schedule New
          </button>
        </header>

        {successMsg && <div style={styles.successBox}>{successMsg}</div>}

        <div style={styles.grid}>
          {/* ✅ Empty state */}
          {loading ? (
            <p style={{gridColumn: "1/-1", textAlign: "center", color: "#888"}}>
              Loading interviews...
            </p>
          ) : interviews.length === 0 ? (
            <p style={{gridColumn: "1/-1", textAlign: "center", color: "#888"}}>
              No interviews scheduled yet. Create one to get started!
            </p>
          ) : (
            interviews.map((int) => {
              const statusInfo = getStatusBadge(int.status);
              return (
                <div key={int._id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={styles.avatar}>
                      {int.candidateName?.[0] || "?"}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h2 style={styles.candidateName}>
                        {int.candidateName}
                      </h2>
                      <p style={styles.roleBadge}>{int.role}</p>
                    </div>

                    <div style={{...styles.statusBadge, ...statusInfo}}>
                      {statusInfo.label}
                    </div>
                  </div>

                  <div style={styles.cardBody}>
                    <div style={styles.infoRow}>
                      <span>📅 {int.date}</span>
                      <span>⏰ {int.time}</span>
                    </div>
                    {int.email && (
                      <div style={{...styles.infoRow, marginTop: "8px"}}>
                        <span style={{fontSize: "12px", color: "#888"}}>
                          📧 {int.email}
                        </span>
                      </div>
                    )}
                  </div>

                  <button 
                    style={{
                      ...styles.btnStart,
                      ...(int.status === "completed" ? styles.btnDisabled : {}),
                      ...(int.status === "in-progress" ? styles.btnWarning : {})
                    }}
                    onClick={() => handleStartInterview(int._id, int.role)}
                    disabled={int.status === "completed"}
                  >
                    {int.status === "completed" 
                      ? "Completed" 
                      : int.status === "in-progress" 
                        ? "Resume Interview" 
                        : "Start Interview"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f8f9fe",
    minHeight: "100vh",
    fontFamily: "'Manrope', sans-serif"
  },

  container: {
    padding: "40px",
    backgroundColor: "#f8f9fe",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px"
  },

  title: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#1a1a1a",
    margin: 0
  },

  subtitle: {
    color: "#888",
    marginTop: "4px"
  },

  successBox: {
    background: "#e8f8f5",
    color: "#27ae60",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #c8e6c9",
    fontSize: "14px"
  },

  btnPrimary: {
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(124, 90, 246, 0.3)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px"
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    border: "1.5px solid #f0f1f7",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  cardHeader: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginBottom: "20px"
  },

  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#eeeafc",
    color: "#7c5af6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    flexShrink: 0
  },

  candidateName: {
    fontSize: "18px",
    fontWeight: 700,
    margin: 0
  },

  roleBadge: {
    fontSize: "13px",
    color: "#7c5af6",
    fontWeight: 600,
    margin: 0
  },

  statusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    flexShrink: 0
  },

  cardBody: {
    marginBottom: "16px"
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#666"
  },

  btnStart: {
    width: "100%",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    border: "1.5px solid #7c5af6",
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
    transition: "opacity 0.2s"
  },

  btnWarning: {
    background: "#f57c00",
    border: "1.5px solid #f57c00"
  },

  btnDisabled: {
    background: "#ccc",
    border: "1.5px solid #ccc",
    cursor: "not-allowed",
    color: "#666"
  }
};

export default Interviews;