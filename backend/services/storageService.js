const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const config = require("../config/env");
const ServiceError = require("./serviceError");

const allowedContentTypes = new Set([
  "audio/webm",
  "audio/ogg",
  "audio/wav",
  "audio/x-wav",
  "audio/mpeg",
  "audio/mp4"
]);

const extensionByType = {
  "audio/webm": ".webm",
  "audio/ogg": ".ogg",
  "audio/wav": ".wav",
  "audio/x-wav": ".wav",
  "audio/mpeg": ".mp3",
  "audio/mp4": ".mp4"
};

const keyPattern = /^audio\/[a-f0-9-]+\.(webm|ogg|wav|mp3|mp4)$/i;

const getObjectPath = (storageKey) => {
  if (typeof storageKey !== "string" || !keyPattern.test(storageKey)) {
    throw new ServiceError("Invalid audio reference", 400);
  }
  return path.join(config.audioStorageDir, storageKey.slice("audio/".length));
};

const storeAudio = async (file) => {
  try {
    const extension = extensionByType[file.mimetype];
    if (!extension) throw new ServiceError("Unsupported audio file type", 400);

    const storageKey = `audio/${crypto.randomUUID()}${extension}`;
    const destination = getObjectPath(storageKey);
    await fs.promises.mkdir(config.audioStorageDir, { recursive: true });
    await fs.promises.rename(file.path, destination);

    return {
      storageKey,
      contentType: file.mimetype,
      size: file.size,
      originalName: path.basename(file.originalname)
    };
  } catch (error) {
    await fs.promises.unlink(file.path).catch(() => undefined);
    if (error instanceof ServiceError) throw error;
    throw new ServiceError("Unable to store audio file", 500);
  }
};

const removeAudio = async (storageKey) => {
  const objectPath = getObjectPath(storageKey);
  await fs.promises.unlink(objectPath).catch(() => undefined);
};

const validateAudioReference = async (reference) => {
  if (!reference || !allowedContentTypes.has(reference.contentType) || !Number.isInteger(reference.size)) {
    throw new ServiceError("Invalid audio metadata", 400);
  }
  if (reference.size <= 0 || reference.size > config.maxAudioFileSize) {
    throw new ServiceError("Invalid audio size", 400);
  }

  const objectPath = getObjectPath(reference?.storageKey);
  const stats = await fs.promises.stat(objectPath).catch(() => null);
  if (!stats || !stats.isFile()) throw new ServiceError("Audio reference is unavailable", 400);
  if (reference.size !== stats.size) throw new ServiceError("Audio metadata does not match stored file", 400);

  return {
    storageKey: reference.storageKey,
    contentType: reference.contentType,
    size: stats.size,
    originalName: path.basename(reference.originalName || "recording")
  };
};

module.exports = { storeAudio, removeAudio, validateAudioReference, getObjectPath };