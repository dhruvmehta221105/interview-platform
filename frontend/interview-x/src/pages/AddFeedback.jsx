import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFeedback() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    technical: "",
    communication: "",
    problemSolving: "",
    comments: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("feedback", JSON.stringify(formData));
    navigate("/view-feedback");
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Submit Interview Feedback</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="number"
              name="technical"
              placeholder="Technical Score (1-10)"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              name="communication"
              placeholder="Communication Score (1-10)"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              name="problemSolving"
              placeholder="Problem Solving Score (1-10)"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <textarea
              name="comments"
              placeholder="Write your feedback comments..."
              rows="4"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default AddFeedback;