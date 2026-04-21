// backend/routes/FeedbackRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");

const {
  addFeedback,
  getFeedback
} = require("../controller/feedbackController");

// Routes
// ✅ Only admins can add feedback
router.post("/", auth, checkAdmin, addFeedback);
// ✅ Any logged-in user can view feedback
router.get("/:id", auth, getFeedback);

module.exports = router;