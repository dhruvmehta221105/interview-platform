import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // ✅ If NOT logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in, show the page
  return children;
}
