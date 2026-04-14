const express = require("express");
const upload = require("../middleware/upload.js");
const { transcribeAudio } = require("../controller/whisperController.js");

const router = express.Router();

router.post("/transcribe", upload.single("audio"), transcribeAudio);

module.exports = router;