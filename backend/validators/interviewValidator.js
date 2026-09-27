const { isValidEmail, isNonEmptyString } = require("./commonValidator");

const validateInterviewDetails = ({ candidateName, email, role, date, time }) =>
  isNonEmptyString(candidateName, 100) &&
  isValidEmail(email) &&
  isNonEmptyString(role, 100) &&
  isNonEmptyString(date, 30) &&
  isNonEmptyString(time, 30);

const validateAnswer = ({ questionId, transcript }) =>
  isNonEmptyString(transcript, 20000) &&
  Number.isInteger(questionId) &&
  questionId >= 0;

module.exports = { validateInterviewDetails, validateAnswer };