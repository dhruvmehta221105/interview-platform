// backend/models/Interview.js
const mongoose = require("mongoose");

const audioReferenceSchema = new mongoose.Schema({
  storageKey: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  originalName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  _id: false,
  questionId: Number,
  questionText: String,
  audio: audioReferenceSchema,
  transcript: String,
  createdAt: { type: Date, default: Date.now }
});

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
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
      enum: ["scheduled", "ready", "in-progress", "paused", "processing", "completed"],
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