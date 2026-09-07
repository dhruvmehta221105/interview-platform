import { useAuth } from "../context/useAuth";
import AdminOnlyView from "./AdminOnlyView";
import { Navigate } from "react-router-dom";

/**
 * AdminRoute - Shows access denied message if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") {
    return <AdminOnlyView />;
  }

  return children;
};

export default AdminRoute;
