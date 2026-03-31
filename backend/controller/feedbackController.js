// backend/controller/FeedbackController.js
const Feedback = require("../models/Feedback");

// Add Feedback
exports.addFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Feedback by Interview
exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      interviewId: req.params.id
    }).populate("interviewId");

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};