import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

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
        {/* 🟢 PUBLIC PAGES - Anyone can access */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔴 PROTECTED PAGES - Only logged-in users */}
        <Route 
          path="/chatbot" 
          element={<ProtectedRoute><Chatbot /></ProtectedRoute>} 
        />
        <Route 
          path="/interviews" 
          element={<ProtectedRoute><Interviews /></ProtectedRoute>} 
        />
        <Route 
          path="/schedule-interview" 
          element={<ProtectedRoute><ScheduleInterview /></ProtectedRoute>} 
        />
        <Route 
          path="/interview/:id" 
          element={<ProtectedRoute><InterviewRoom /></ProtectedRoute>} 
        />
        <Route 
          path="/interview-result/:id" 
          element={<ProtectedRoute><InterviewResult /></ProtectedRoute>} 
        />
        <Route 
          path="/add-feedback" 
          element={<ProtectedRoute><AddFeedback /></ProtectedRoute>} 
        />
        <Route 
          path="/add-feedback/:id" 
          element={<ProtectedRoute><AddFeedback /></ProtectedRoute>} 
        />
        <Route 
          path="/view-feedback" 
          element={<ProtectedRoute><ViewFeedback /></ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute><Profile /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;