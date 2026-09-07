// backend/routes/FeedbackRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");

const {
  addFeedback,
  getFeedback,
  deleteFeedback
} = require("../controller/feedbackController");

// Admins manage the feedback queue; candidates can read feedback for their own interview.
router.post("/", auth, checkAdmin, addFeedback);
router.get("/", auth, checkAdmin, getFeedback);
router.delete("/:id", auth, checkAdmin, deleteFeedback);
router.get("/:id", auth, getFeedback);

module.exports = router;