// backend/models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    technical: Number,
    communication: Number,
    problemSolving: Number,
    strengths: String,
    improvements: String,
    recommendation: String,
    comments: {
      type: String
    },
    interviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);