const fs = require("fs");
const client = require("../config/openai.js");

const transcribeAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    console.log("Transcribing file:", filePath);

    const response = await client.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1"
    });

    console.log("Transcription successful:", response.text);

    // Delete file after processing (important)
    fs.unlinkSync(filePath);

    return res.status(200).json({
      text: response.text,
    });

  } catch (error) {
    console.error("Whisper Error:", error.message);
    // Don't delete file if transcription failed (for debugging)
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ message: error.message || "Transcription failed" });
  }
};

module.exports = {
  transcribeAudio,
};