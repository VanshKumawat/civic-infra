import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  if (!token) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their correct dashboard
    if (user.role === "admin") return <Navigate to="/admin" />
    if (user.role === "officer") return <Navigate to="/officer" />
    return <Navigate to="/complaints" />
  }

  return children
}

export default ProtectedRoute