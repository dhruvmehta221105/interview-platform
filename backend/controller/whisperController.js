const transcriptionService = require("../services/transcriptionService");

exports.transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await transcriptionService.transcribeAudio(req.file);
    return res.json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || "Transcription failed" });
  }
};