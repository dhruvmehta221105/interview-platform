const express = require("express");
const { transcribeAudio } = require("../controller/whisperController");
const auth = require("../middleware/auth");
const { audioUpload, handleUploadError } = require("../middleware/upload");

const router = express.Router();

router.post("/transcribe", auth, audioUpload.single("audio"), handleUploadError, transcribeAudio);

module.exports = router;