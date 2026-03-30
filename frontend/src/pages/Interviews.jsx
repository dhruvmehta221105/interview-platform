import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mock = [
      { id: 1, candidate: "John Doe", role: "SDE", date: "2026-03-30", time: "10:00 AM" },
      { id: 2, candidate: "Jane Smith", role: "Frontend", date: "2026-04-01", time: "2:30 PM" },
    ];
    setInterviews(mock);
  }, []);

  return (
    <div style={styles.page}>
      <Navbar />
      
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Upcoming Interviews</h1>
            <p style={styles.subtitle}>Manage your scheduled candidate evaluations</p>
          </div>
          <button 
            style={styles.btnPrimary}
            onClick={() => navigate("/schedule-interview")}
          >
            + Schedule New
          </button>
        </header>

        <div style={styles.grid}>
          {interviews.map((int) => (
            <div 
              key={int.id} 
              style={styles.card}
              onClick={() => navigate(`/interview/${int.id}`)}
            >
              <div style={styles.cardHeader}>
                <div style={styles.avatar}>{int.candidate[0]}</div>
                <div>
                  <h2 style={styles.candidateName}>{int.candidate}</h2>
                  <p style={styles.roleBadge}>{int.role}</p>
                </div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <span>📅 {int.date}</span>
                  <span>⏰ {int.time}</span>
                </div>
              </div>
              <button style={styles.btnStart}>Enter Room</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f8f9fe", minHeight: "100vh", fontFamily: "'Manrope', sans-serif" },
  container: { padding: "40px", backgroundColor: "#f8f9fe", minHeight: "100vh" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" },
  title: { fontSize: "28px", fontWeight: 800, color: "#1a1a1a", margin: 0 },
  subtitle: { color: "#888", marginTop: "4px" },
  btnPrimary: { 
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)", 
    color: "#fff", border: "none", padding: "12px 24px", 
    borderRadius: "12px", fontWeight: 700, cursor: "pointer",
    boxShadow: "0 4px 15px rgba(124, 90, 246, 0.3)",
    transition: "transform 0.2s ease"
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" },
  card: { 
    background: "#fff", borderRadius: "20px", padding: "24px", 
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)", cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease", border: "1.5px solid #f0f1f7"
  },
  cardHeader: { display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px" },
  avatar: { 
    width: "48px", height: "48px", borderRadius: "12px", 
    background: "#eeeafc", color: "#7c5af6", display: "flex", 
    alignItems: "center", justifyContent: "center", fontWeight: 800 
  },
  candidateName: { fontSize: "18px", fontWeight: 700, margin: 0 },
  roleBadge: { fontSize: "13px", color: "#7c5af6", fontWeight: 600, margin: 0 },
  cardBody: { marginBottom: "16px" },
  infoRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666" },
  btnStart: { 
    width: "100%", marginTop: "20px", padding: "10px", 
    borderRadius: "10px", border: "1.5px solid #e0e1ea", 
    background: "transparent", fontWeight: 600, color: "#555", cursor: "pointer",
    transition: "all 0.2s ease"
  }
};

export default Interviews;