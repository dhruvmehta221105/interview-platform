import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFeedback() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    role: "",
    date: "",
    technical: "",
    communication: "",
    problemSolving: "",
    strengths: "",
    improvements: "",
    comments: "",
    recommendation: ""
  });

  const [totalScore, setTotalScore] = useState(0);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Auto calculate total score
    if (
      name === "technical" ||
      name === "communication" ||
      name === "problemSolving"
    ) {
      const updatedData = {
        ...formData,
        [name]: value
      };

      const total =
        Number(updatedData.technical || 0) +
        Number(updatedData.communication || 0) +
        Number(updatedData.problemSolving || 0);

      setTotalScore(total);
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const feedbackData = {
      ...formData,
      totalScore
    };

    localStorage.setItem("feedback", JSON.stringify(feedbackData));

    navigate("/view-feedback");
  };

  return (
    <div className="container">
      <div className="card">

        <h2 className="title">Interview Feedback Form</h2>

        <form onSubmit={handleSubmit}>

          {/* Candidate Information */}

          <h3>Candidate Information</h3>

          <div className="input-group">
            <input
              type="text"
              name="candidateName"
              placeholder="Candidate Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="candidateEmail"
              placeholder="Candidate Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="role"
              placeholder="Role Applied"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="date"
              name="date"
              onChange={handleChange}
              required
            />
          </div>


          {/* Scores */}

          <h3>Evaluation Scores</h3>

          <div className="input-group">
            <input
              type="number"
              name="technical"
              placeholder="Technical Skills (1-10)"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              name="communication"
              placeholder="Communication (1-10)"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              name="problemSolving"
              placeholder="Problem Solving (1-10)"
              onChange={handleChange}
              required
            />
          </div>

          <h3>Total Score: {totalScore} / 30</h3>


          {/* Strengths */}

          <h3>Strengths</h3>

          <div className="input-group">
            <textarea
              name="strengths"
              placeholder="Strengths of the candidate..."
              rows="3"
              onChange={handleChange}
            />
          </div>


          {/* Improvements */}

          <h3>Areas of Improvement</h3>

          <div className="input-group">
            <textarea
              name="improvements"
              placeholder="Areas where candidate can improve..."
              rows="3"
              onChange={handleChange}
            />
          </div>


          {/* Comments */}

          <h3>Additional Comments</h3>

          <div className="input-group">
            <textarea
              name="comments"
              placeholder="Write your feedback comments..."
              rows="4"
              onChange={handleChange}
            />
          </div>


          {/* Recommendation */}

          <h3>Recommendation</h3>

          <div className="input-group">

            <label>
              <input
                type="radio"
                name="recommendation"
                value="Hire"
                onChange={handleChange}
              /> Hire
            </label>

            <label>
              <input
                type="radio"
                name="recommendation"
                value="Maybe"
                onChange={handleChange}
              /> Maybe
            </label>

            <label>
              <input
                type="radio"
                name="recommendation"
                value="Reject"
                onChange={handleChange}
              /> Reject
            </label>

          </div>


          <button type="submit">
            Submit Feedback
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddFeedback;