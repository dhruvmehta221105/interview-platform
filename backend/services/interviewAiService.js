const { generateStructured } = require("./aiService");
const ServiceError = require("./serviceError");
const {
  validateQuestion,
  validateAnswerEvaluation,
  validateInterviewFeedback
} = require("../validators/aiValidator");

const contextFor = (interview) => ({
  role: interview.role,
  difficulty: interview.difficulty || "medium",
  jobDescription: interview.jobDescription || "Not provided",
  previousQuestions: (interview.questions || []).map((question) => question.questionText),
  previousAnswers: (interview.questions || []).map((question) => question.transcript),
  previousEvaluations: (interview.questions || []).map((question) => question.evaluation || null)
});

const questionSystem = `You are an expert technical interviewer. Return JSON only. Generate one interview question that is relevant, non-duplicative, and appropriately challenging. The JSON shape is exactly: {"questionText": string, "focus": string, "difficulty": "easy"|"medium"|"hard", "expectedSignals": string[]}. Do not include markdown.`;

const evaluationSystem = `You are an expert interview evaluator. Return JSON only. Evaluate the candidate answer against the question and context. The JSON shape is exactly: {"score": number 0-100, "strengths": string[], "weaknesses": string[], "feedback": string, "recommendedTopics": string[]}. Be specific and evidence-based. Do not include markdown.`;

const feedbackSystem = `You are an expert interview coach. Return JSON only. Summarize the complete interview. The JSON shape is exactly: {"overallScore": number 0-100, "categoryScores": {"technical": number 0-5, "communication": number 0-5, "problemSolving": number 0-5}, "strengths": string[], "weaknesses": string[], "summary": string, "recommendedTopics": string[]}. Do not include markdown.`;

const generateQuestion = async (interview) => {
  const result = await generateStructured(questionSystem, JSON.stringify(contextFor(interview)), "question");
  if (!validateQuestion(result)) throw new ServiceError("AI returned an invalid question", 502);
  return result;
};

const evaluateAnswer = async (interview, question, transcript) => {
  const result = await generateStructured(evaluationSystem, JSON.stringify({
    ...contextFor(interview),
    currentQuestion: question.questionText,
    answer: transcript
  }), "answer evaluation");
  if (!validateAnswerEvaluation(result)) throw new ServiceError("AI returned an invalid answer evaluation", 502);
  return result;
};

const evaluateInterview = async (interview) => {
  const result = await generateStructured(feedbackSystem, JSON.stringify({
    ...contextFor(interview),
    answers: (interview.questions || []).map((question) => ({
      question: question.questionText,
      answer: question.transcript,
      evaluation: question.evaluation
    }))
  }), "interview feedback");
  if (!validateInterviewFeedback(result)) throw new ServiceError("AI returned invalid interview feedback", 502);
  return result;
};

module.exports = { generateQuestion, evaluateAnswer, evaluateInterview };