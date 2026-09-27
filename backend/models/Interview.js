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
  focus: String,
  difficulty: String,
  expectedSignals: [String],
  audio: audioReferenceSchema,
  transcript: String,
  evaluation: {
    score: Number,
    strengths: [String],
    weaknesses: [String],
    feedback: String,
    recommendedTopics: [String]
  },
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
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    },
    jobDescription: {
      type: String,
      default: "",
      maxlength: 10000
    },
    questionCount: {
      type: Number,
      min: 1,
      max: 20,
      default: 5
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
    activeQuestion: {
      questionId: Number,
      questionText: String,
      focus: String,
      difficulty: String,
      expectedSignals: [String]
    },
    questions: [questionSchema], // array of Q&A
    totalScore: Number,
    feedback: String,
    categoryScores: {
      technical: Number,
      communication: Number,
      problemSolving: Number
    },
    strengths: [String],
    weaknesses: [String],
    recommendedTopics: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);