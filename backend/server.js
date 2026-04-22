const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// 🟢 Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created uploads directory");
}

// 🟢 CORS
app.use(cors());

// 🟢 Body parser
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 🟢 Routes
const interviewRoutes = require("./routes/InterviewRoutes");
const feedbackRoutes = require("./routes/FeedbackRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");
const whisperRoutes = require("./routes/whisperRoutes"); // ✅ added
const chatRoutes = require("./routes/chatRoutes"); // ✅ added
const subscriberRoutes = require("./routes/subscriberRoutes");

app.use("/api/interviews", interviewRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/whisper", whisperRoutes); // ✅ important
app.use("/api/chat", chatRoutes); // ✅ important
app.use("/api/subscribe", subscriberRoutes);

// 🟢 Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🟢 Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});