const isStringArray = (value, maxItems = 12) =>
  Array.isArray(value) && value.length <= maxItems && value.every((item) => typeof item === "string" && item.trim().length > 0);

const validateQuestion = (value) => Boolean(
  value &&
  typeof value.questionText === "string" &&
  value.questionText.trim().length >= 10 &&
  value.questionText.length <= 1000 &&
  typeof value.focus === "string" &&
  ["easy", "medium", "hard"].includes(value.difficulty) &&
  isStringArray(value.expectedSignals, 8)
);

const validateAnswerEvaluation = (value) => Boolean(
  value &&
  Number.isFinite(value.score) && value.score >= 0 && value.score <= 100 &&
  isStringArray(value.strengths) &&
  isStringArray(value.weaknesses) &&
  typeof value.feedback === "string" && value.feedback.length <= 3000 &&
  isStringArray(value.recommendedTopics)
);

const validateInterviewFeedback = (value) => Boolean(
  value &&
  Number.isFinite(value.overallScore) && value.overallScore >= 0 && value.overallScore <= 100 &&
  value.categoryScores &&
  ["technical", "communication", "problemSolving"].every((key) => Number.isFinite(value.categoryScores[key]) && value.categoryScores[key] >= 0 && value.categoryScores[key] <= 5) &&
  isStringArray(value.strengths) &&
  isStringArray(value.weaknesses) &&
  typeof value.summary === "string" && value.summary.length <= 5000 &&
  isStringArray(value.recommendedTopics)
);

module.exports = { validateQuestion, validateAnswerEvaluation, validateInterviewFeedback };