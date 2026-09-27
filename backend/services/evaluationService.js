const getStoredEvaluation = (interview) => {
  const evaluation = {};

  if (interview.totalScore !== undefined) evaluation.totalScore = interview.totalScore;
  if (interview.feedback !== undefined) evaluation.feedback = interview.feedback;

  return evaluation;
};

const evaluateInterview = async (interview) => getStoredEvaluation(interview);

const fallbackAnswerEvaluation = () => ({
  score: 0,
  strengths: [],
  weaknesses: ["AI evaluation is temporarily unavailable."],
  feedback: "Answer recorded. Evaluation will be available when the AI service is configured.",
  recommendedTopics: []
});

const fallbackInterviewEvaluation = (interview) => ({
  overallScore: interview.totalScore || 0,
  categoryScores: interview.categoryScores || { technical: 0, communication: 0, problemSolving: 0 },
  strengths: interview.strengths || [],
  weaknesses: interview.weaknesses || ["AI evaluation is temporarily unavailable."],
  summary: interview.feedback || "Interview completed. Evaluation will be available when the AI service is configured.",
  recommendedTopics: interview.recommendedTopics || []
});

module.exports = { evaluateInterview, getStoredEvaluation, fallbackAnswerEvaluation, fallbackInterviewEvaluation };
