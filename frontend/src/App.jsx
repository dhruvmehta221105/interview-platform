import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/HomePage";
import Interviews from "./pages/Interviews";
import ScheduleInterview from "./pages/ScheduleInterview";
import InterviewRoom from "./pages/InterviewRoom";
import InterviewResult from "./pages/InterviewResult";
import AddFeedback from "./pages/AddFeedback";
import ViewFeedback from "./pages/ViewFeedback";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Homepage />} />
        {/* AI CHATBOT */}
        <Route path="/chatbot" element={<Chatbot />} />

        {/* INTERVIEW MODULE */}
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/schedule-interview" element={<ScheduleInterview />} />
        <Route path="/interview/:id" element={<InterviewRoom />} />
        <Route path="/interview-result/:id" element={<InterviewResult />} />

        {/* FEEDBACK */}
        <Route path="/add-feedback" element={<AddFeedback />} />
        <Route path="/add-feedback/:id" element={<AddFeedback />} />
        <Route path="/view-feedback" element={<ViewFeedback />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;