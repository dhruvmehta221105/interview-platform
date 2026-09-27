const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const requiredVariables = ["MONGO_URI", "JWT_SECRET"];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVariables.join(", ")}`);
}

module.exports = {
  frontendOrigins: (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  openRouterApiKey: process.env.OPENROUTER_API_KEY || "",
  openRouterUrl: process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1/chat/completions",
  openRouterModel: process.env.OPENROUTER_MODEL || "mistralai/mixtral-8x7b-instruct",
  transcriptionProvider: process.env.TRANSCRIPTION_PROVIDER || "whisper",
  transcriptionTimeoutMs: Number(process.env.TRANSCRIPTION_TIMEOUT_MS) || 120000,
  maxAudioFileSize: Number(process.env.MAX_AUDIO_FILE_SIZE) || 10 * 1024 * 1024,
  tempUploadDir: path.join(__dirname, "..", "uploads", "tmp"),
  audioStorageDir: path.join(__dirname, "..", "uploads", "audio"),
  port: Number(process.env.PORT) || 5000,
};
