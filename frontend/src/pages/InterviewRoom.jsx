import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import API from "../api";
import { mockTranscribe, stopAllMediaTracks } from "../utils/interviewUtils";

function InterviewRoom() {
  // ============ STATE ============
  const { id: interviewId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [interview, setInterview] = useState(null);
  const [role] = useState(location.state?.role || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Media State
  const [videoStream, setVideoStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const videoRef = useRef(null);

  // Interview Flow State
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer State
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerIntervalRef = useRef(null);

  // ============ INITIALIZATION ============
  useEffect(() => {
    const initializeInterview = async () => {
      try {
        setLoading(true);

        // 1. Fetch interview details
        const interviewRes = await API.get(`/interviews/${interviewId}`);
        setInterview(interviewRes.data);

        // 2. Request camera and microphone permissions
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true
          }
        });

        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // 3. Set up media recorder (no need for AudioContext)
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
            setRecordedChunks(chunks);
          }
        };

        setMediaRecorder(recorder);

        // 4. Fetch first question
        const questionRes = await API.get(`/interviews/${interviewId}/question`);
        setCurrentQuestion(questionRes.data);

        // 6. Start timer
        const startTime = Date.now();
        timerIntervalRef.current = setInterval(() => {
          setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        // 6. Start recording immediately
        recorder.start();
        setIsRecording(true);

        setLoading(false);
      } catch (err) {
        console.error("Initialization error:", err);
        setError(
          err.response?.data?.error ||
          err.message ||
          "Failed to initialize interview room"
        );
        setLoading(false);
      }
    };

    initializeInterview();

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [interviewId]);

  // ============ KEYBOARD SHORTCUTS ============
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "KeyM") toggleMicrophone();
      if (e.code === "KeyV") toggleCamera();
      if (e.code === "Enter") submitAnswer();
      if (e.code === "Escape") endInterview();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRecording]);

  // ============ MEDIA CONTROLS ============
  const toggleCamera = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMicrophone = () => {
    if (videoStream) {
      videoStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(!isMicOn);
    }
  };

  // ============ SUBMIT ANSWER ============
  const submitAnswer = async () => {
    try {
      if (!mediaRecorder) {
        setError("Recording not initialized");
        return;
      }

      if (recordedChunks.length === 0) {
        setError("No audio recorded. Please try again.");
        return;
      }

      setIsSubmitting(true);

      // Stop recording
      mediaRecorder.stop();
      setIsRecording(false);

      // Wait for data to be available
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Create blob from recorded chunks
      const audioBlob = new Blob(recordedChunks, { type: "audio/webm" });

      // Get transcription from mock or backend
      let transcript = "";
      try {
        const transcriptionResult = await mockTranscribe(
          audioBlob,
          currentQuestion?.questionText || ""
        );
        transcript = transcriptionResult.transcript;
      } catch (transcribeErr) {
        console.error("Transcription error:", transcribeErr);
        transcript = "Unable to transcribe. Recording saved.";
      }

      // Submit answer to backend
      const response = await API.post(`/interviews/${interviewId}/answer`, {
        questionId: currentQuestion.questionId,
        transcript,
        audioBlob: audioBlob.size
      });

      // Clear recorded chunks
      setRecordedChunks([]);

      // Fetch next question
      const nextQuestionRes = await API.get(
        `/interviews/${interviewId}/question`
      );

      if (nextQuestionRes.data.isLastQuestion) {
        // Interview complete
        endInterview();
      } else {
        setCurrentQuestion(nextQuestionRes.data);

        // Start recording new answer
        if (videoStream) {
          const newRecorder = new MediaRecorder(videoStream);
          const newChunks = [];

          newRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              newChunks.push(e.data);
              setRecordedChunks(newChunks);
            }
          };

          setMediaRecorder(newRecorder);
          newRecorder.start();
          setIsRecording(true);
        }
      }

      setError("");
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError(
        err.response?.data?.error || "Failed to submit answer. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============ END INTERVIEW ============
  const endInterview = async () => {
    try {
      // Stop media
      if (videoStream) {
        stopAllMediaTracks(videoStream);
      }
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Call backend to mark as completed
      const response = await API.post(`/interviews/${interviewId}/end`);

      // Redirect to results page
      navigate(`/interview-result/${interviewId}`, {
        state: { interview: response.data }
      });
    } catch (err) {
      console.error("Error ending interview:", err);
      setError("Failed to end interview");
    }
  };

  // ============ TIMER FORMATTER ============
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // ============ RENDER ============
  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Initializing Interview Room...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.topBarLeft}>
          <div style={styles.logo}>IX</div>
          <div>
            <h3 style={styles.interviewTitle}>{interview?.candidateName}</h3>
            <p style={styles.roleText}>{interview?.role}</p>
          </div>
        </div>
        <div style={styles.timer}>{formatTime(timeElapsed)}</div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left: Video & Question */}
        <div style={styles.leftPanel}>
          {/* Video Section */}
          <div style={styles.videoContainer}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={styles.video}
            />
            <div style={styles.videoOverlay}>
              {!isCameraOn && (
                <div style={styles.cameraOffBadge}>Camera Off</div>
              )}
              {isCameraOn && <div style={styles.liveBadge}>● LIVE</div>}
            </div>
          </div>

          {/* Question Display */}
          {currentQuestion && !error && (
            <div style={styles.questionBox}>
              <h4 style={styles.questionLabel}>
                Question {currentQuestion.questionId + 1}
              </h4>
              <p style={styles.questionText}>{currentQuestion.questionText}</p>
              <div style={styles.recordingStatus}>
                {isRecording ? (
                  <span style={styles.recordingBadge}>● Recording...</span>
                ) : (
                  <span style={styles.recordingBadgePaused}>
                    ○ Recording Paused
                  </span>
                )}
              </div>
            </div>
          )}

          {error && <div style={styles.errorBox}>{error}</div>}
        </div>

        {/* Right: Info & Instructions */}
        <div style={styles.rightPanel}>
          <div style={styles.infoCard}>
            <h4 style={styles.cardTitle}>Instructions</h4>
            <ul style={styles.instructions}>
              <li>Listen carefully to each question</li>
              <li>Click "Submit & Next" to record your response</li>
              <li>Speak clearly and concisely</li>
              <li>Answer within 2-3 minutes</li>
              <li>Total interview time: ~20 minutes</li>
            </ul>
          </div>

          <div style={styles.statsCard}>
            <h4 style={styles.cardTitle}>Interview Info</h4>
            <div style={styles.statRow}>
              <span>Candidate:</span>
              <strong>{interview?.candidateName}</strong>
            </div>
            <div style={styles.statRow}>
              <span>Role:</span>
              <strong>{interview?.role}</strong>
            </div>
            <div style={styles.statRow}>
              <span>Status:</span>
              <strong style={{ color: "#f57c00" }}>In Progress</strong>
            </div>
          </div>

          <div style={styles.shortcutsCard}>
            <h4 style={styles.cardTitle}>Keyboard Shortcuts</h4>
            <div style={styles.shortcut}>
              <kbd style={styles.key}>M</kbd>
              <span>Mute/Unmute</span>
            </div>
            <div style={styles.shortcut}>
              <kbd style={styles.key}>V</kbd>
              <span>Camera On/Off</span>
            </div>
            <div style={styles.shortcut}>
              <kbd style={styles.key}>Enter</kbd>
              <span>Submit Answer</span>
            </div>
            <div style={styles.shortcut}>
              <kbd style={styles.key}>Esc</kbd>
              <span>End Interview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div style={styles.bottomBar}>
        <div style={styles.controlsLeft}>
          {/* Microphone Toggle */}
          <button
            style={{
              ...styles.controlBtn,
              ...(isMicOn
                ? styles.controlBtnActive
                : styles.controlBtnInactive)
            }}
            onClick={toggleMicrophone}
            title={isMicOn ? "Mute (M)" : "Unmute (M)"}
          >
            {isMicOn ? "🎤" : "🔇"}
          </button>

          {/* Camera Toggle */}
          <button
            style={{
              ...styles.controlBtn,
              ...(isCameraOn
                ? styles.controlBtnActive
                : styles.controlBtnInactive)
            }}
            onClick={toggleCamera}
            title={isCameraOn ? "Turn Off Camera (V)" : "Turn On Camera (V)"}
          >
            {isCameraOn ? "📹" : "🚫"}
          </button>
        </div>

        <div style={styles.controlsCenter}>
          {/* Submit Answer */}
          <button
            style={{
              ...styles.submitBtn,
              opacity:
                isSubmitting || !isRecording ? 0.6 : 1
            }}
            onClick={submitAnswer}
            disabled={isSubmitting || !isRecording}
            title="Submit Your Response (Enter)"
          >
            {isSubmitting ? "Submitting..." : "✓ Submit & Next"}
          </button>
        </div>

        <div style={styles.controlsRight}>
          {/* End Interview */}
          <button
            style={styles.endBtn}
            onClick={endInterview}
            title="End Interview (ESC)"
            disabled={isSubmitting}
          >
            ⊗ End Interview
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    backgroundColor: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Manrope', sans-serif",
    overflow: "hidden"
  },

  loadingContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px"
  },

  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #334155",
    borderTop: "4px solid #7c5af6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },

  topBar: {
    height: "70px",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #1e293b",
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)"
  },

  topBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },

  logo: {
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    padding: "8px 12px",
    borderRadius: "8px",
    fontWeight: 800,
    fontSize: "14px"
  },

  interviewTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600
  },

  roleText: {
    margin: 0,
    fontSize: "12px",
    color: "#94a3b8"
  },

  timer: {
    background: "#1e293b",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#f8fafc",
    fontFamily: "'Courier New', monospace"
  },

  mainContent: {
    flex: 1,
    display: "flex",
    gap: "16px",
    padding: "16px",
    overflow: "hidden"
  },

  leftPanel: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: 0
  },

  videoContainer: {
    flex: 1,
    background: "#1e293b",
    borderRadius: "16px",
    border: "1px solid #334155",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  videoOverlay: {
    position: "absolute",
    top: "16px",
    right: "16px",
    display: "flex",
    gap: "8px"
  },

  cameraOffBadge: {
    background: "rgba(241, 65, 108, 0.9)",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600
  },

  liveBadge: {
    background: "rgba(76, 175, 80, 0.9)",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    animation: "pulse 2s infinite"
  },

  questionBox: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155"
  },

  questionLabel: {
    margin: "0 0 12px 0",
    fontSize: "12px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  questionText: {
    margin: "0 0 16px 0",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "1.5",
    color: "#f1f5f9"
  },

  recordingStatus: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  recordingBadge: {
    color: "#ff4444",
    fontSize: "14px",
    fontWeight: 600
  },

  recordingBadgePaused: {
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: 600
  },

  errorBox: {
    background: "#7f1d1d",
    color: "#fca5a5",
    padding: "16px",
    borderRadius: "8px",
    fontSize: "14px",
    border: "1px solid #dc2626"
  },

  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    minWidth: "280px",
    overflow: "auto"
  },

  infoCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155"
  },

  statsCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155"
  },

  shortcutsCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155"
  },

  cardTitle: {
    margin: "0 0 16px 0",
    fontSize: "14px",
    fontWeight: 700,
    color: "#f1f5f9",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  instructions: {
    margin: 0,
    paddingLeft: "20px",
    color: "#cbd5e1",
    fontSize: "13px",
    lineHeight: "1.8"
  },

  statRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "13px",
    color: "#cbd5e1"
  },

  shortcut: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
    fontSize: "12px",
    color: "#cbd5e1"
  },

  key: {
    background: "#334155",
    padding: "4px 8px",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "11px",
    border: "1px solid #475569",
    fontWeight: 600,
    color: "#f1f5f9"
  },

  bottomBar: {
    height: "80px",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid #1e293b",
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)"
  },

  controlsLeft: {
    display: "flex",
    gap: "12px"
  },

  controlsCenter: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },

  controlsRight: {
    display: "flex",
    justifyContent: "flex-end"
  },

  controlBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  },

  controlBtnActive: {
    background: "rgba(76, 175, 80, 0.2)",
    border: "2px solid #4ade80"
  },

  controlBtnInactive: {
    background: "rgba(241, 65, 108, 0.2)",
    border: "2px solid #f14170"
  },

  submitBtn: {
    padding: "12px 32px",
    background: "linear-gradient(135deg, #7c5af6, #4f8ef7)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    transition: "opacity 0.2s"
  },

  endBtn: {
    padding: "12px 32px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s"
  }
};

export default InterviewRoom;