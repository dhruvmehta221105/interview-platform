// backend/controller/FeedbackController.js
const Feedback = require("../models/Feedback");
const { isValidObjectId, isNonEmptyString } = require("../validators/commonValidator");

// Add Feedback
exports.addFeedback = async (req, res) => {
  try {
    const Interview = require("../models/Interview");
    const { interviewId, rating, technical, communication, problemSolving, strengths, improvements, recommendation, comments } = req.body;
    if (!isValidObjectId(interviewId) || !Number.isFinite(Number(rating)) || Number(rating) < 0 || Number(rating) > 5) {
      return res.status(400).json({ error: "Valid interview and rating are required" });
    }
    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    if (interview.status !== "completed") return res.status(409).json({ error: "Feedback requires a completed interview" });
    const feedback = await Feedback.create({
      interviewId,
      rating: Number(rating),
      technical,
      communication,
      problemSolving,
      strengths,
      improvements,
      recommendation: isNonEmptyString(recommendation, 40) ? recommendation.trim() : recommendation,
      comments,
      interviewerId: req.user.id
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Feedback by Interview
exports.getFeedback = async (req, res) => {
  try {
    const Interview = require("../models/Interview");
    const isAll = !req.params.id;
    if (isAll) {
      const feedback = await Feedback.find().populate("interviewId").sort({ createdAt: -1 });
      return res.json(feedback);
    }

    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    if (req.user.role !== "admin" && interview.userId?.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }
    const feedback = await Feedback.find({ interviewId: req.params.id }).populate("interviewId");

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};