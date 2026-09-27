const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const config = require("../config/env");

const allowedAudioTypes = new Set([
  "audio/webm",
  "audio/ogg",
  "audio/wav",
  "audio/x-wav",
  "audio/mpeg",
  "audio/mp4"
]);

const audioUpload = multer({
  storage: multer.diskStorage({
    destination: config.tempUploadDir,
    filename: (req, file, callback) => callback(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
  }),
  limits: { fileSize: config.maxAudioFileSize },
  fileFilter(req, file, callback) {
    if (!allowedAudioTypes.has(file.mimetype)) {
      return callback(new Error("Unsupported audio file type"));
    }
    return callback(null, true);
  }
});

const handleUploadError = (error, req, res, next) => {
  if (!error) return next();
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "Audio file is too large" });
  }
  return res.status(400).json({ message: error.message || "Invalid audio upload" });
};

module.exports = { audioUpload, handleUploadError, allowedAudioTypes };
