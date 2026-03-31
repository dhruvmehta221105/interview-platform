// backend/routes/FeedbackRoutes.js
const express = require("express");
const router = express.Router();

const {
  addFeedback,
  getFeedback
} = require("../controller/feedbackController");

// Routes
router.post("/", addFeedback);
router.get("/:id", getFeedback);

module.exports = router;