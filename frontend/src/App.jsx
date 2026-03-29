import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import AddFeedback from "./pages/AddFeedback";
import ViewFeedback from "./pages/ViewFeedback";
import Login   from './pages/Login';
import Signup  from './pages/Signup';
import Profile from './pages/Profile';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/add-feedback" element={<AddFeedback />} />
      <Route path="/view-feedback" element={<ViewFeedback />} />
       <Route path="/login"   element={<Login />} />
        <Route path="/signup"  element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}

export default App;