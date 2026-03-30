import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Scheduled:", form);

    // redirect after submit
    navigate("/interviews");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Schedule Interview</h1>
          <p style={styles.subtitle}>
            Create a new interview session for a candidate
          </p>
        </div>

        {/* Form */}
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

          {/* Buttons */}
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
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f8f9fe",
    minHeight: "100vh",
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

  header: {
    marginBottom: "30px"
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    margin: 0
  },

  subtitle: {
    color: "#666",
    marginTop: "5px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  row: {
    display: "flex",
    gap: "20px"
  },

  inputGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  label: {
    fontSize: "14px",
    fontWeight: "600"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px"
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px"
  },

  cancel: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer"
  },

  submit: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#7c5af6",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default ScheduleInterview;