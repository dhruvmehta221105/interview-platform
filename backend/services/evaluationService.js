const getStoredEvaluation = (interview) => {
  const evaluation = {};

  if (interview.totalScore !== undefined) evaluation.totalScore = interview.totalScore;
  if (interview.feedback !== undefined) evaluation.feedback = interview.feedback;

  return evaluation;
};

const evaluateInterview = async (interview) => getStoredEvaluation(interview);

module.exports = { evaluateInterview, getStoredEvaluation };
