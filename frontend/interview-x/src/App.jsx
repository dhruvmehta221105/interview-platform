import { Routes, Route } from "react-router-dom";
import AddFeedback from "./pages/AddFeedback";
import ViewFeedback from "./pages/ViewFeedback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddFeedback />} />
      <Route path="/add-feedback" element={<AddFeedback />} />
      <Route path="/view-feedback" element={<ViewFeedback />} />
    </Routes>
  );
}

export default App;