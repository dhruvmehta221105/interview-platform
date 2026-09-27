// backend/routes/InterviewRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  prepareInterview,
  startInterview,
  pauseInterview,
  resumeInterview,
  getQuestion,
  submitAnswer,
  endInterview
} = require("../controller/interviewController");

// CRUD Routes
router.post("/", auth, createInterview);
router.get("/", auth, getInterviews);
router.get("/:id", auth, getInterviewById);
router.put("/:id", auth, updateInterview);
router.delete("/:id", auth, deleteInterview);

// Interview Flow Routes
router.post("/:interviewId/ready", auth, prepareInterview);
router.post("/:interviewId/start", auth, startInterview);
router.post("/:interviewId/pause", auth, pauseInterview);
router.post("/:interviewId/resume", auth, resumeInterview);
router.get("/:interviewId/question", auth, getQuestion);
router.post("/:interviewId/answer", auth, submitAnswer);
router.post("/:interviewId/end", auth, endInterview);

module.exports = router;