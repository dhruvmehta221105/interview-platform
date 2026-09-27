const config = require("../config/env");
const ServiceError = require("./serviceError");
const storageService = require("./storageService");
const providers = {
  whisper: require("./transcription/whisperProvider")
};

const transcribeAudio = async (file) => {
  let storedAudio;
  try {
    storedAudio = await storageService.storeAudio(file);
    const provider = providers[config.transcriptionProvider];
    if (!provider) throw new ServiceError("Transcription provider is not configured", 503);

    const text = await provider.transcribe(storageService.getObjectPath(storedAudio.storageKey));
    return { text, audio: storedAudio };
  } catch (error) {
    if (storedAudio) await storageService.removeAudio(storedAudio.storageKey);
    if (error instanceof ServiceError) throw error;
    throw new ServiceError("Transcription failed", 502);
  }
};

module.exports = { transcribeAudio };
