const express = require("express");
const multer = require("multer");
const { transcribeAudio } = require("../controller/whisperController");

const router = express.Router();

// upload config
const upload = multer({ dest: "uploads/" });

// route
router.post("/transcribe", upload.single("audio"), transcribeAudio);

module.exports = router;