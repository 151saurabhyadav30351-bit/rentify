import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // ⭐ If admin trying to access user dashboard → redirect
    if (payload.isAdmin && location.pathname.startsWith("/dashboard")) {
      return <Navigate to="/admin" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/auth" replace />;
  }
}