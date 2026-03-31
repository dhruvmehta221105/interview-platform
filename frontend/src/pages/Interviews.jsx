import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import API from "../api"; // ✅ connect to backend

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch interviews from backend
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await API.get("/interviews");
        setInterviews(res.data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

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

        <div style={styles.grid}>
          {/* ✅ Empty state */}
          {interviews.length === 0 ? (
            <p>No interviews scheduled yet</p>
          ) : (
            interviews.map((int) => (
              <div
                key={int._id} // ✅ MongoDB id
                style={styles.card}
                onClick={() => navigate(`/interview/${int._id}`)}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>
                    {int.candidateName?.[0] || "?"}
                  </div>

                  <div>
                    <h2 style={styles.candidateName}>
                      {int.candidateName}
                    </h2>
                    <p style={styles.roleBadge}>{int.role}</p>
                  </div>
                </div>

                <div style={styles.cardBody}>
                  <div style={styles.infoRow}>
                    <span>📅 {int.date}</span>
                    <span>⏰ {int.time}</span>
                  </div>
                </div>

                <button style={styles.btnStart}>
                  Enter Room
                </button>
              </div>
            ))
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
    cursor: "pointer",
    border: "1.5px solid #f0f1f7"
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
    fontWeight: 800
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
    border: "1.5px solid #e0e1ea",
    background: "transparent",
    fontWeight: 600,
    color: "#555",
    cursor: "pointer"
  }
};

export default Interviews;