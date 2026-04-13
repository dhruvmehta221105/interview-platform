// backend/routes/InterviewRoutes.js
const express = require("express");
const router = express.Router();

const {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  startInterview,
  getQuestion,
  submitAnswer,
  endInterview
} = require("../controller/interviewController");

// CRUD Routes
router.post("/", createInterview);
router.get("/", getInterviews);
router.get("/:id", getInterviewById);
router.put("/:id", updateInterview);
router.delete("/:id", deleteInterview);

// Interview Flow Routes
router.post("/:interviewId/start", startInterview);
router.get("/:interviewId/question", getQuestion);
router.post("/:interviewId/answer", submitAnswer);
router.post("/:interviewId/end", endInterview);

module.exports = router;