import { useEffect, useState } from "react";

function ViewFeedback() {
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("feedback");
    if (data) {
      setFeedback(JSON.parse(data));
    }
  }, []);

  if (!feedback) {
    return (
      <div className="container">
        <div className="card">
          <h2>No Feedback Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Interview Feedback Summary</h2>

        <p><strong>Technical Score:</strong> {feedback.technical}</p>
        <p><strong>Communication Score:</strong> {feedback.communication}</p>
        <p><strong>Problem Solving Score:</strong> {feedback.problemSolving}</p>

        <div style={{ marginTop: "20px" }}>
          <strong>Comments:</strong>
          <p style={{ marginTop: "10px", color: "#4b5563" }}>
            {feedback.comments}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewFeedback;