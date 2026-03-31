// backend/controller/InterviewController.js
const Interview = require("../models/Interview");

// Create Interview
exports.createInterview = async (req, res) => {
  try {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Interviews
exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Interview
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Interview Status
exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Interview
exports.deleteInterview = async (req, res) => {
  try {
    await Interview.findByIdAndDelete(req.params.id);
    res.json({ message: "Interview deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};