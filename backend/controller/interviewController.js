// backend/controller/InterviewController.js
const Interview = require("../models/Interview");

const canAccess = (interview, user) =>
  user.role === "admin" || interview.userId?.toString() === user.id;

// Create Interview
exports.createInterview = async (req, res) => {
  try {
    const interview = await Interview.create({ ...req.body, userId: req.user.id });
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Interviews
exports.getInterviews = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { userId: req.user.id };
    const interviews = await Interview.find(filter).sort({ createdAt: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Interview
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    if (!canAccess(interview, req.user)) return res.status(403).json({ error: "Access denied" });
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Interview Status
exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    if (!canAccess(interview, req.user)) return res.status(403).json({ error: "Access denied" });
    Object.assign(interview, req.body);
    await interview.save();
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Interview
exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    if (!canAccess(interview, req.user)) return res.status(403).json({ error: "Access denied" });
    await interview.deleteOne();
    res.json({ message: "Interview deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============= NEW INTERVIEW FLOW ENDPOINTS =============

// Start Interview - Mark as in-progress
exports.startInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const existing = await Interview.findById(interviewId);
    if (!existing) return res.status(404).json({ error: "Interview not found" });
    if (!canAccess(existing, req.user)) return res.status(403).json({ error: "Access denied" });
    existing.status = "in-progress";
    existing.startTime = new Date();
    existing.currentQuestionIndex = 0;
    const interview = await existing.save();
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get AI Question - Return next question
exports.getQuestion = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    if (!canAccess(interview, req.user)) return res.status(403).json({ error: "Access denied" });

    // Mock AI questions based on role
    const questionBank = {
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

    const role = interview.role;
    const questions = questionBank[role] || questionBank["Frontend Developer"];
    const currentIndex = interview.currentQuestionIndex;

    if (currentIndex >= questions.length) {
      return res.json({
        questionId: currentIndex,
        questionText: "Thank you for your responses. This concludes the interview.",
        isLastQuestion: true
      });
    }

    res.json({
      questionId: currentIndex,
      questionText: questions[currentIndex],
      isLastQuestion: currentIndex === questions.length - 1
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit Answer - Store transcript
exports.submitAnswer = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { questionId, transcript, audioBlob } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    if (!canAccess(interview, req.user)) return res.status(403).json({ error: "Access denied" });

    // Get the question text from the question bank
    const questionBank = {
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

    const role = interview.role;
    const questions = questionBank[role] || questionBank["Frontend Developer"];
    const questionText = questions[questionId] || "Interview Question";

    // Add answer to questions array
    interview.questions.push({
      questionId,
      questionText: questionText, // ✅ Now includes the question text
      transcript,
      audioBlob: audioBlob || ""
    });

    // Increment question index
    interview.currentQuestionIndex += 1;

    await interview.save();

    res.json({
      success: true,
      nextQuestionIndex: interview.currentQuestionIndex,
      message: "Answer recorded successfully"
    });
  } catch (error) {
    console.error("[submitAnswer] Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// End Interview - Mark as completed
exports.endInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    if (!canAccess(interview, req.user)) return res.status(403).json({ error: "Access denied" });

    const endTime = new Date();
    const duration = Math.round(
      (endTime - interview.startTime) / 1000
    );

    const updated = await Interview.findByIdAndUpdate(
      interviewId,
      {
        status: "completed",
        endTime: endTime,
        duration: duration
      },
      { returnDocument: 'after' }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};