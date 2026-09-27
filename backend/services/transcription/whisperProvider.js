const { execFile } = require("child_process");
const path = require("path");
const { promisify } = require("util");
const config = require("../../config/env");
const ServiceError = require("../serviceError");

const execFileAsync = promisify(execFile);
const scriptPath = path.join(__dirname, "..", "..", "transcribe.py");

const transcribe = async (filePath) => {
  try {
    const { stdout } = await execFileAsync("py", [scriptPath, filePath], {
      cwd: path.dirname(scriptPath),
      timeout: config.transcriptionTimeoutMs,
      killSignal: "SIGKILL",
      maxBuffer: 1024 * 1024
    });
    const text = stdout.trim();
    if (!text) throw new ServiceError("Transcription provider returned no text", 502);
    return text;
  } catch (error) {
    if (error.killed || error.code === "ETIMEDOUT") {
      throw new ServiceError("Transcription timed out", 504);
    }
    if (error instanceof ServiceError) throw error;
    throw new ServiceError("Transcription provider failed", 502);
  }
};

module.exports = { transcribe };