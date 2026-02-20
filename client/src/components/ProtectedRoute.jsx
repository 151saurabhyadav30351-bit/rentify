import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // 🚫 Not logged in → redirect
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
