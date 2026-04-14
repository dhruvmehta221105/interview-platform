const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();

const app = express();

// 🟢 CORS (you can restrict later)
app.use(cors());

// 🟢 Body parser
app.use(express.json());

// 🟢 Routes
const interviewRoutes = require("./routes/InterviewRoutes");
const feedbackRoutes = require("./routes/FeedbackRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes"); // 🟢 cleaner import

app.use("/api/interviews", interviewRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/profile", profileRoutes); // ✅ already correct

// 🟢 Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🟢 Global error handler (VERY USEFUL)
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});