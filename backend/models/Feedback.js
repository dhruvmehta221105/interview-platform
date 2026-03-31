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
    comments: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);