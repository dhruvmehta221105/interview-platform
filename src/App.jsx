import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import Interviews from "./pages/Interviews";
import ScheduleInterview from "./pages/ScheduleInterview";
import InterviewRoom from "./pages/InterviewRoom";
import AddFeedback from "./pages/AddFeedback";
import ViewFeedback from "./pages/ViewFeedback";

// A small Sidebar component to navigate the app easily
const Sidebar = () => {
  const location = useLocation();
  
  // Don't show sidebar in the Interview Room to keep it full-screen
  if (location.pathname.includes("/interview/")) return null;

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoSection}>
        <div style={styles.logoIcon}>IX</div>
        <span style={styles.logoText}>InterviewX</span>
      </div>
      
      <nav style={styles.navLinks}>
        <Link to="/" style={{...styles.link, ...(location.pathname === "/" ? styles.activeLink : {})}}>
          📅 Interviews
        </Link>
        <Link to="/view-feedback" style={{...styles.link, ...(location.pathname === "/view-feedback" ? styles.activeLink : {})}}>
          📊 View Feedback
        </Link>
        <Link to="/schedule-interview" style={{...styles.link, ...(location.pathname === "/schedule-interview" ? styles.activeLink : {})}}>
          ➕ Schedule
        </Link>
      </nav>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div style={styles.appLayout}>
        <Sidebar />
        
        <main style={styles.mainContent}>
          <Routes>
            {/* HOME PAGE */}
            <Route path="/" element={<Interviews />} />

            {/* INTERVIEW MODULE */}
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/schedule-interview" element={<ScheduleInterview />} />
            <Route path="/interview/:id" element={<InterviewRoom />} />

            {/* FEEDBACK MODULE */}
            <Route path="/add-feedback" element={<AddFeedback />} />
            <Route path="/add-feedback/:id" element={<AddFeedback />} />
            <Route path="/view-feedback" element={<ViewFeedback />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  appLayout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fe",
    fontFamily: "'Manrope', sans-serif",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#fff",
    borderRight: "1px solid #eef0f7",
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
    paddingLeft: "10px",
  },
  logoIcon: {
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "10px",
    fontWeight: 800,
    fontSize: "18px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  navLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  link: {
    textDecoration: "none",
    color: "#64748b",
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  activeLink: {
    backgroundColor: "#eeeafc",
    color: "#7c5af6",
  },
mainContent: {
  flex: 1,
  padding: "40px",
  width: "100%",
  minHeight: "100vh",
  boxSizing: "border-box"
}
};

export default App;