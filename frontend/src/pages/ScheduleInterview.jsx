import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import API from "../api"; // ✅ ADD THIS

function ScheduleInterview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    candidate: "",
    email: "",
    role: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/interviews", {
        candidateName: form.candidate, // ✅ mapping fixed
        email: form.email,
        role: form.role,
        date: form.date,
        time: form.time,
        status: "scheduled"
      });

      // Reset form
      setForm({
        candidate: "",
        email: "",
        role: "",
        date: "",
        time: ""
      });

      // Navigate to interviews list with success state
      navigate("/interviews", { 
        state: { 
          success: true, 
          message: "Interview scheduled successfully!" 
        } 
      });

    } catch (error) {
      console.error("Error scheduling interview:", error);
      setError(error.response?.data?.error || "Failed to schedule interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.contentWrapper}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>Schedule Interview</h1>
            <p style={styles.subtitle}>
              Create a new interview session for a candidate
            </p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Candidate Name</label>
                <input
                  name="candidate"
                  placeholder="John Doe"
                  style={styles.input}
                  onChange={handleChange}
                  value={form.candidate}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@email.com"
                  style={styles.input}
                  onChange={handleChange}
                  value={form.email}
                  required
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <select
                  name="role"
                  style={styles.input}
                  onChange={handleChange}
                  value={form.role}
                  required
                >
                  <option value="">Select a role...</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Date</label>
                <input
                  name="date"
                  type="date"
                  style={styles.input}
                  onChange={handleChange}
                  value={form.date}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Time</label>
              <input
                name="time"
                type="time"
                style={styles.input}
                onChange={handleChange}
                value={form.time}
                required
              />
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={styles.cancel}
                onClick={() => navigate("/interviews")}
              >
                Cancel
              </button>

              <button 
                type="submit" 
                style={{...styles.submit, opacity: loading ? 0.7 : 1}}
                disabled={loading}
              >
                {loading ? "Scheduling..." : "Create Interview"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f8f9fe",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Manrope', sans-serif"
  },
  contentWrapper: {
    padding: "40px",
    background: "#f8f9fe",
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  container: {
    width: "100%",
    maxWidth: "800px",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
  },
  header: { marginBottom: "30px" },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    margin: 0,
    color: "#1a1a1a"
  },
  subtitle: {
    fontSize: "15px",
    color: "#666",
    marginTop: "8px"
  },
  errorBox: {
    background: "#fee",
    color: "#c33",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #fcc",
    fontSize: "14px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a"
  },
  input: {
    padding: "12px 16px",
    border: "1.5px solid #e0e1ea",
    borderRadius: "12px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "border-color 0.2s"
  },
  actions: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
    marginTop: "30px"
  },
  cancel: {
    padding: "12px 32px",
    border: "1.5px solid #e0e1ea",
    background: "transparent",
    color: "#555",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer"
  },
  submit: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default ScheduleInterview;