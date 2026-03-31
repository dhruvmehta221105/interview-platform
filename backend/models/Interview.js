// backend/models/Interview.js
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["scheduled", "completed"],
      default: "scheduled"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);