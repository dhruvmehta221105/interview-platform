// backend/models/Interview.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  _id: false,
  questionId: Number,
  questionText: String,
  audioBlob: String, // base64 encoded audio
  transcript: String,
  createdAt: { type: Date, default: Date.now }
});

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
      enum: ["scheduled", "in-progress", "completed"],
      default: "scheduled"
    },
    startTime: Date,
    endTime: Date,
    duration: Number, // in seconds
    currentQuestionIndex: {
      type: Number,
      default: 0
    },
    questions: [questionSchema], // array of Q&A
    totalScore: Number,
    feedback: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);