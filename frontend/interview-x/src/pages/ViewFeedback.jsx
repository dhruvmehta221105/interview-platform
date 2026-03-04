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

        {/* Candidate Info */}

        <h3>Candidate Information</h3>

        <p><strong>Name:</strong> {feedback.candidateName}</p>
        <p><strong>Email:</strong> {feedback.candidateEmail}</p>
        <p><strong>Role Applied:</strong> {feedback.role}</p>
        <p><strong>Interview Date:</strong> {feedback.date}</p>

        <hr />

        {/* Scores */}

        <h3>Evaluation Scores</h3>

        <p><strong>Technical Skills:</strong> {feedback.technical}/10</p>
        <p><strong>Communication:</strong> {feedback.communication}/10</p>
        <p><strong>Problem Solving:</strong> {feedback.problemSolving}/10</p>

        <h3>Total Score: {feedback.totalScore} / 30</h3>

        <hr />

        {/* Strengths */}

        <h3>Strengths</h3>
        <p>{feedback.strengths}</p>

        <hr />

        {/* Improvements */}

        <h3>Areas of Improvement</h3>
        <p>{feedback.improvements}</p>

        <hr />

        {/* Comments */}

        <h3>Additional Comments</h3>
        <p>{feedback.comments}</p>

        <hr />

        {/* Recommendation */}

        <h3>Recommendation</h3>
        <p><strong>{feedback.recommendation}</strong></p>

      </div>
    </div>
  );
}

export default ViewFeedback;