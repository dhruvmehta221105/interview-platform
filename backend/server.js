const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ FIXED CORS (allow all origins for now)
app.use(cors());

// ✅ Body parser
app.use(express.json());

// Routes
const interviewRoutes = require("./routes/InterviewRoutes");
const feedbackRoutes = require("./routes/FeedbackRoutes");
const userRoutes = require("./routes/UserRoutes");

app.use("/api/interviews", interviewRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});