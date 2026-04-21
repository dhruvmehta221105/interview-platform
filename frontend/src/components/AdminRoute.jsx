import { useAuth } from "../context/AuthContext";
import AdminOnlyView from "./AdminOnlyView";

/**
 * AdminRoute - Shows access denied message if user is not an admin
 */
const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <AdminOnlyView />;
  }

  if (user.role !== "admin") {
    return <AdminOnlyView />;
  }

  return children;
};

export default AdminRoute;
