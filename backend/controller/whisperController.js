const { exec } = require("child_process");
const fs = require("fs");

exports.transcribeAudio = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    exec(
  `py transcribe.py "${filePath}"`,
  { cwd: __dirname + "/.." }, // ensures backend folder
  (err, stdout, stderr) => {
      console.log("==== WHISPER DEBUG ====");
      console.log("FILE:", filePath);
      console.log("STDOUT:", stdout);
      console.log("STDERR:", stderr);
      console.log("ERROR:", err);
      console.log("=======================");

      if (err) {
        return res.status(500).json({
          message: "Transcription failed",
          error: stderr || err.message,
        });
      }

      fs.unlinkSync(filePath);

      return res.json({ text: stdout.trim() });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};