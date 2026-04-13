/**
 * Interview Audio Utilities
 * Handles audio processing and mock transcription
 */

/**
 * Convert audio blob to base64
 */
export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Mock transcription - In production, this would call backend Whisper API
 * Backend should have: POST /api/interviews/:id/transcribe endpoint
 */
export const mockTranscribe = async (audioBlob, questionText) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response based on audio duration
  const duration = audioBlob.size / 16000; // rough estimate

  const mockResponses = {
    short: "Yes, I have experience with React and have built several projects using it.",
    medium:
      "I have about 3 years of experience with React. I've built several projects including e-commerce platforms and real-time applications. I'm comfortable with hooks, context API, and state management libraries like Redux.",
    long: "I have approximately 3 years of professional experience with React. During this time, I've built several significant projects including an e-commerce platform with Redux state management, a real-time collaboration tool with WebSocket integration, and multiple component libraries. I'm particularly strong with React hooks, the context API, and performance optimization techniques. I've also worked with Next.js for SSR applications and have hands-on experience with testing frameworks like Jest and React Testing Library."
  };

  let response;
  if (duration < 30) {
    response = mockResponses.short;
  } else if (duration < 60) {
    response = mockResponses.medium;
  } else {
    response = mockResponses.long;
  }

  return {
    transcript: response,
    confidence: 0.87 + Math.random() * 0.1, // 0.87-0.97
    duration: Math.round(duration),
    language: "en-US"
  };
};

/**
 * Real transcription function - calls backend Whisper API
 * This will be implemented in production
 */
export const transcribeAudio = async (audioBlob, interviewId, questionId) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "answer.webm");
    formData.append("questionId", questionId);

    // This would be the actual endpoint in production
    // const response = await fetch(`/api/interviews/${interviewId}/transcribe`, {
    //   method: "POST",
    //   body: formData
    // });
    // return response.json();

    // For now, use mock
    return mockTranscribe(audioBlob, "");
  } catch (error) {
    console.error("Transcription error:", error);
    throw error;
  }
};

/**
 * Get permissions for media devices
 */
export const requestMediaPermissions = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
    return stream;
  } catch (error) {
    if (error.name === "NotAllowedError") {
      throw new Error(
        "Camera/Microphone permission denied. Please allow access to continue."
      );
    } else if (error.name === "NotFoundError") {
      throw new Error("No camera or microphone found on this device.");
    } else {
      throw new Error("Failed to access camera/microphone: " + error.message);
    }
  }
};

/**
 * Stop all media tracks
 */
export const stopAllMediaTracks = (stream) => {
  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
};

/**
 * Format interview duration
 */
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

/**
 * Format time for display (HH:MM:SS)
 */
export const formatTimeDisplay = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num) => String(num).padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }
  return `${pad(minutes)}:${pad(secs)}`;
};
