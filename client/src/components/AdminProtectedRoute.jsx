import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload?.isAdmin) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Admin route error:", err);
    return <Navigate to="/auth" replace />;
  }
}