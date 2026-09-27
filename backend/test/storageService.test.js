const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const config = require("../config/env");
const storageService = require("../services/storageService");

test("audio storage moves files and validates references", async () => {
  await fs.promises.mkdir(config.tempUploadDir, { recursive: true });
  const sourcePath = path.join(config.tempUploadDir, `${crypto.randomUUID()}.webm`);
  const content = Buffer.from("audio-test");
  await fs.promises.writeFile(sourcePath, content);

  const reference = await storageService.storeAudio({
    path: sourcePath,
    mimetype: "audio/webm",
    size: content.length,
    originalname: "recording.webm"
  });

  try {
    assert.equal(await fs.promises.stat(sourcePath).catch(() => null), null);
    assert.equal((await storageService.validateAudioReference(reference)).size, content.length);
    await assert.rejects(
      storageService.validateAudioReference({ ...reference, size: content.length + 1 }),
      /metadata does not match/
    );
  } finally {
    await storageService.removeAudio(reference.storageKey);
  }

  assert.equal(await fs.promises.stat(path.join(config.audioStorageDir, reference.storageKey.slice("audio/".length))).catch(() => null), null);
});