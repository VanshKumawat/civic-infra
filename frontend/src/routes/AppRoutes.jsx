import { Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "../components/ProtectedRoute"

import ComplaintForm from "../pages/ComplaintForm"
import Complaints from "../pages/Complaints"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import CitizenDashboard from "../pages/CitizenDashBoard"
import AdminDashboard from "../pages/AdminDashboard"
import OfficerDashboard from "../pages/OfficerDashboard"
import PublicDashboard from "../pages/PublicDashboard"
import UserManagement from "../pages/UserManagement"

function AppRoutes() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={["citizen"]}>
          <CitizenDashboard />
        </ProtectedRoute>
      } />

      {/* Complaint form - citizen only */}
      <Route path="/submit" element={
        user?.role === "citizen"
          ? <ComplaintForm />
          : <Navigate to="/officer" />
      } />

      {/* Shared complaints view */}
      <Route path="/complaints" element={
        <ProtectedRoute allowedRoles={["citizen", "officer", "admin"]}>
          <Complaints />
        </ProtectedRoute>
      } />

      {/* Officer dashboard */}
      <Route path="/officer" element={
        <ProtectedRoute allowedRoles={["officer"]}>
          <OfficerDashboard />
        </ProtectedRoute>
      } />

      {/* Admin dashboard (overview) */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Admin - user management */}
      <Route path="/users" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <UserManagement />
        </ProtectedRoute>
      } />

      <Route path="/public-dashboard" element={<PublicDashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
