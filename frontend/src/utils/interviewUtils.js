/**
 * Interview Audio Utilities
 */

/**
 * Stop all media tracks (camera, microphone) and clean up resources
 */
export const stopAllMediaTracks = (stream) => {
  if (!stream) {
    console.warn("[stopAllMediaTracks] No stream provided");
    return;
  }

  try {
    const tracks = stream.getTracks();
    console.log(`[stopAllMediaTracks] Stopping ${tracks.length} tracks...`);
    
    tracks.forEach((track) => {
      console.log(`[stopAllMediaTracks] Stopping track: ${track.kind} (${track.label})`);
      track.enabled = false;
      track.stop();
      console.log(`[stopAllMediaTracks] ✅ ${track.kind} track stopped`);
    });
    
    console.log(`[stopAllMediaTracks] ✅ All ${tracks.length} tracks stopped successfully`);
  } catch (err) {
    console.error("[stopAllMediaTracks] Error stopping tracks:", err);
  }
};

