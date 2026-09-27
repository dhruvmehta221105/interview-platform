const { isValidEmail, isNonEmptyString } = require("./commonValidator");

const validateInterviewDetails = ({ candidateName, email, role, date, time, difficulty = "medium", jobDescription = "", questionCount = 5 }) =>
  isNonEmptyString(candidateName, 100) &&
  isValidEmail(email) &&
  isNonEmptyString(role, 100) &&
  isNonEmptyString(date, 30) &&
  isNonEmptyString(time, 30) &&
  ["easy", "medium", "hard"].includes(difficulty) &&
  typeof jobDescription === "string" && jobDescription.length <= 10000 &&
  Number.isInteger(Number(questionCount)) && Number(questionCount) >= 1 && Number(questionCount) <= 20;

const validateAnswer = ({ questionId, transcript }) =>
  isNonEmptyString(transcript, 20000) &&
  Number.isInteger(questionId) &&
  questionId >= 0;

module.exports = { validateInterviewDetails, validateAnswer };