const Interview = require("../models/Interview");
const ServiceError = require("./serviceError");
const evaluationService = require("./evaluationService");
const storageService = require("./storageService");
const { validateAnswer, validateInterviewDetails } = require("../validators/interviewValidator");

const QUESTION_BANK = {
  "Frontend Developer": [
    "Tell me about your experience with React. What projects have you built?",
    "How do you handle state management in large React applications?",
    "Explain the difference between controlled and uncontrolled components.",
    "What is your experience with CSS? How do you organize your styles?",
    "Describe your experience with REST APIs and how you consume them in frontend applications."
  ],
  "Backend Developer": [
    "Tell me about your experience with Node.js and Express.",
    "How do you design database schemas for scalability?",
    "Explain your approach to API security and authentication.",
    "What is your experience with microservices architecture?",
    "How do you handle database transactions and data consistency?"
  ],
  "Full Stack Developer": [
    "Walk me through your typical tech stack and why you chose it.",
    "How do you ensure security across your full stack applications?",
    "Tell me about your experience deploying and maintaining applications.",
    "How do you optimize application performance?",
    "Describe your experience with cloud platforms like AWS or Azure."
  ]
};

const getQuestions = (role) => QUESTION_BANK[role] || QUESTION_BANK["Frontend Developer"];

const canAccess = (interview, user) =>
  user.role === "admin" || interview.userId?.toString() === user.id;

const getOwnedInterview = async (interviewId, user) => {
  const interview = await Interview.findById(interviewId);
  if (!interview) throw new ServiceError("Interview not found", 404);
  if (!canAccess(interview, user)) throw new ServiceError("Access denied", 403);
  return interview;
};

const createInterview = async (details, userId) => {
  if (!validateInterviewDetails(details)) {
    throw new ServiceError("Candidate, email, role, date, and time are required", 400);
  }

  return Interview.create({
    candidateName: details.candidateName.trim(),
    email: details.email.trim().toLowerCase(),
    role: details.role.trim(),
    date: details.date.trim(),
    time: details.time.trim(),
    status: "scheduled",
    userId
  });
};

const listInterviews = (user) => {
  const filter = user.role === "admin" ? {} : { userId: user.id };
  return Interview.find(filter).sort({ createdAt: -1 });
};

const getInterview = (interviewId, user) => getOwnedInterview(interviewId, user);

const updateInterview = async (interviewId, details, user) => {
  const interview = await getOwnedInterview(interviewId, user);
  const nextDetails = {
    candidateName: details.candidateName ?? interview.candidateName,
    email: details.email ?? interview.email,
    role: details.role ?? interview.role,
    date: details.date ?? interview.date,
    time: details.time ?? interview.time
  };

  if (!validateInterviewDetails(nextDetails)) {
    throw new ServiceError("Invalid interview details", 400);
  }

  Object.assign(interview, {
    candidateName: nextDetails.candidateName.trim(),
    email: nextDetails.email.trim().toLowerCase(),
    role: nextDetails.role.trim(),
    date: nextDetails.date.trim(),
    time: nextDetails.time.trim()
  });

  return interview.save();
};

const deleteInterview = async (interviewId, user) => {
  const interview = await getOwnedInterview(interviewId, user);
  await interview.deleteOne();
};

const prepareInterview = async (interviewId, user) => {
  const interview = await getOwnedInterview(interviewId, user);
  if (interview.status === "ready") return interview;
  if (interview.status !== "scheduled") {
    throw new ServiceError(`Cannot prepare an interview in ${interview.status} state`, 409);
  }

  interview.status = "ready";
  return interview.save();
};

const startInterview = async (interviewId, user) => {
  const interview = await getOwnedInterview(interviewId, user);

  if (interview.status === "in-progress") {
    if (!interview.startTime) throw new ServiceError("Interview is missing its start time", 409);
    return interview;
  }

  if (interview.status === "scheduled") interview.status = "ready";
  if (!["ready", "paused"].includes(interview.status)) {
    throw new ServiceError(`Cannot start an interview in ${interview.status} state`, 409);
  }

  interview.status = "in-progress";
  if (!interview.startTime) interview.startTime = new Date();
  return interview.save();
};

const pauseInterview = async (interviewId, user) => {
  const interview = await getOwnedInterview(interviewId, user);
  if (interview.status === "paused") return interview;
  if (interview.status !== "in-progress") {
    throw new ServiceError(`Cannot pause an interview in ${interview.status} state`, 409);
  }
  if (!interview.startTime) throw new ServiceError("Interview is missing its start time", 409);

  interview.status = "paused";
  return interview.save();
};

const resumeInterview = (interviewId, user) => startInterview(interviewId, user);

const getQuestion = async (interviewId, user) => {
  const interview = await getOwnedInterview(interviewId, user);
  if (interview.status !== "in-progress") {
    throw new ServiceError(`Interview is ${interview.status}`, 409);
  }
  if (!interview.startTime) throw new ServiceError("Interview is missing its start time", 409);

  const questions = getQuestions(interview.role);
  const currentIndex = interview.currentQuestionIndex;
  if (currentIndex >= questions.length) {
    return {
      questionId: currentIndex,
      questionText: "Thank you for your responses. This concludes the interview.",
      isLastQuestion: true
    };
  }

  return {
    questionId: currentIndex,
    questionText: questions[currentIndex],
    isLastQuestion: currentIndex === questions.length - 1
  };
};

const submitAnswer = async (interviewId, answer, user) => {
  if (!validateAnswer(answer)) throw new ServiceError("Transcript is required", 400);

  const interview = await getOwnedInterview(interviewId, user);
  if (interview.status !== "in-progress") {
    throw new ServiceError(`Interview is ${interview.status}`, 409);
  }
  if (!interview.startTime) throw new ServiceError("Interview is missing its start time", 409);
  if (answer.questionId !== interview.currentQuestionIndex) {
    throw new ServiceError("Unexpected question", 409);
  }

  const questions = getQuestions(interview.role);
  if (answer.questionId >= questions.length) {
    throw new ServiceError("No answer is expected for this question", 409);
  }

  const audio = answer.audio
    ? await storageService.validateAudioReference(answer.audio)
    : undefined;
  const questionAnswer = {
    questionId: answer.questionId,
    questionText: questions[answer.questionId],
    transcript: answer.transcript
  };
  if (audio) questionAnswer.audio = audio;

  const updated = await Interview.findOneAndUpdate(
    {
      _id: interviewId,
      status: "in-progress",
      currentQuestionIndex: answer.questionId,
      "questions.questionId": { $ne: answer.questionId }
    },
    {
      $push: {
          questions: questionAnswer
      },
      $inc: { currentQuestionIndex: 1 },
      $set: { status: "processing" }
    },
    { new: true }
  );

  if (!updated) {
    throw new ServiceError("Answer was already submitted or interview state changed", 409);
  }

  try {
    const processed = await Interview.findOneAndUpdate(
      { _id: interviewId, status: "processing", currentQuestionIndex: answer.questionId + 1 },
      { $set: { status: "in-progress" } },
      { new: true }
    );
    if (!processed) {
      await Interview.updateOne(
        { _id: interviewId, status: "processing", currentQuestionIndex: answer.questionId + 1 },
        { $set: { status: "in-progress" } }
      );
      throw new ServiceError("Interview processing state changed", 409);
    }
  } catch (error) {
    await Interview.updateOne(
      { _id: interviewId, status: "processing", currentQuestionIndex: answer.questionId + 1 },
      { $set: { status: "in-progress" } }
    );
    throw error;
  }

  return {
    success: true,
    nextQuestionIndex: answer.questionId + 1,
    message: "Answer recorded successfully"
  };
};

const endInterview = async (interviewId, user) => {
  const interview = await getOwnedInterview(interviewId, user);
  if (interview.status === "completed") return interview;
  if (interview.status !== "in-progress") {
    throw new ServiceError(`Cannot complete an interview in ${interview.status} state`, 409);
  }
  if (!interview.startTime) throw new ServiceError("Interview is missing its start time", 409);

  const endTime = new Date();
  const duration = Math.round((endTime - interview.startTime) / 1000);
  const evaluation = await evaluationService.evaluateInterview(interview);
  return Interview.findByIdAndUpdate(
    interviewId,
    { status: "completed", endTime, duration, ...evaluation },
    { new: true }
  );
};

module.exports = {
  createInterview,
  listInterviews,
  getInterview,
  updateInterview,
  deleteInterview,
  prepareInterview,
  startInterview,
  pauseInterview,
  resumeInterview,
  getQuestion,
  submitAnswer,
  endInterview,
  getQuestions
};
