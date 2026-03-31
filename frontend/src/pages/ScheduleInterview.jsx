import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import API from "../api"; // ✅ ADD THIS

function ScheduleInterview() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    candidate: "",
    email: "",
    role: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/interviews", {
        candidateName: form.candidate, // ✅ mapping fixed
        email: form.email,
        role: form.role,
        date: form.date,
        time: form.time
      });

      alert("Interview Scheduled Successfully");

      navigate("/interviews"); // go to list page

    } catch (error) {
      console.error("Error scheduling interview:", error);
      alert("Failed to schedule interview");
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

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Candidate Name</label>
                <input
                  name="candidate"
                  placeholder="John Doe"
                  style={styles.input}
                  onChange={handleChange}
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
                  required
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <input
                  name="role"
                  placeholder="Frontend Developer"
                  style={styles.input}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Date</label>
                <input
                  name="date"
                  type="date"
                  style={styles.input}
                  onChange={handleChange}
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

              <button type="submit" style={styles.submit}>
                Create Interview
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
    fontFamily: "inherit"
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