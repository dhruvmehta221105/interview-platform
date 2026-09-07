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
  startInterview,
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
router.post("/:interviewId/start", auth, startInterview);
router.get("/:interviewId/question", auth, getQuestion);
router.post("/:interviewId/answer", auth, submitAnswer);
router.post("/:interviewId/end", auth, endInterview);

module.exports = router;