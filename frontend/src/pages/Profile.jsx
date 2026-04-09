import { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Settings,
  TrendingUp,
  CheckCircle,
  Star,
  XCircle,
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <div style={loading}>Loading...</div>;

  return (
    <div style={container}>
      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={logo}>InterviewAI</h2>

        <div style={menu}>
          <Menu icon={<User size={18} />} text="Profile" active />
          <Menu icon={<LayoutDashboard size={18} />} text="Dashboard" />
          <Menu icon={<Briefcase size={18} />} text="Interviews" />
          <Menu icon={<Settings size={18} />} text="Settings" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={main}>
        {/* HEADER */}
        <div style={header}>
          <div>
            <h2 style={{ margin: 0 }}>
              Welcome back, {user.name} 👋
            </h2>
            <p style={{ color: "#6B7280" }}>
              Track your interview performance
            </p>
          </div>

          <div style={userBox}>
            <span style={{ color: "#6B7280" }}>{user.email}</span>
            <div style={avatar}>{user.name.charAt(0)}</div>
          </div>
        </div>

        {/* STATS */}
        <div style={stats}>
          <Stat
            icon={<TrendingUp size={20} color="#4F46E5" />}
            title="Total Interviews"
            value={user.totalInterviews || 0}
          />

          <Stat
            icon={<Star size={20} color="#F59E0B" />}
            title="Average Score"
            value={user.avgScore || 0}
          />

          <Stat
            icon={<CheckCircle size={20} color="#10B981" />}
            title="Selected"
            value={user.selected || 0}
          />
        </div>

        {/* ACTIVITY */}
        <div style={card}>
          <h3 style={{ marginBottom: 15 }}>Recent Activity</h3>

          <table style={table}>
            <thead>
              <tr style={thead}>
                <th>Role</th>
                <th>Score</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {user.activities?.map((a, i) => (
                <tr key={i} style={row}>
                  <td>{a.role}</td>
                  <td>{a.score}</td>

                  <td style={{ display: "flex", gap: 6 }}>
                    {a.status === "Selected" ? (
                      <CheckCircle size={16} color="#10B981" />
                    ) : (
                      <XCircle size={16} color="#EF4444" />
                    )}
                    <span
                      style={{
                        color:
                          a.status === "Selected"
                            ? "#10B981"
                            : "#EF4444",
                        fontWeight: "600",
                      }}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td>{new Date(a.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {user.activities?.length === 0 && (
            <p style={{ color: "#9CA3AF" }}>No activity yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

const Menu = ({ icon, text, active }) => (
  <div
    style={{
      display: "flex",
      gap: 10,
      padding: "10px 12px",
      borderRadius: "8px",
      background: active ? "rgba(255,255,255,0.2)" : "transparent",
      color: "white",
      opacity: active ? 1 : 0.8,
    }}
  >
    {icon}
    {text}
  </div>
);

const Stat = ({ icon, title, value }) => (
  <div style={statCard}>
    <div style={statTop}>
      <div style={iconBox}>{icon}</div>
      <span>{title}</span>
    </div>
    <h2 style={statValue}>{value}</h2>
  </div>
);

/* STYLES */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "#F9FAFB",
  fontFamily: "Inter, sans-serif",
};

const sidebar = {
  width: "230px",
  background: "linear-gradient(180deg, #4F46E5, #6366F1)",
  padding: "25px",
  color: "white",
};

const logo = { marginBottom: "30px" };

const menu = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const main = {
  flex: 1,
  padding: "30px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "25px",
};

const userBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const avatar = {
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  background: "#4F46E5",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "20px",
};

const statCard = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
};

const statTop = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#6B7280",
  marginBottom: "10px",
};

const iconBox = {
  background: "#EEF2FF",
  padding: "6px",
  borderRadius: "8px",
};

const statValue = {
  margin: 0,
  color: "#111827",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
};

const table = { width: "100%", marginTop: "10px" };

const thead = { textAlign: "left", color: "#6B7280" };

const row = { borderTop: "1px solid #E5E7EB" };

const loading = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};