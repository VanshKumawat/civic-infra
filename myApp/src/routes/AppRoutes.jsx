import { Routes, Route , Navigate } from "react-router-dom"

import ProtectedRoute from "../components/ProtectedRoute"

import ComplaintForm from "../pages/ComplaintForm"

import Complaints from "../pages/Complaints"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import AdminDashboard from "../pages/AdminDashboard"
import OfficerDashboard from "../pages/OfficerDashboard"
import PublicDashboard from "../pages/PublicDashboard"


function AppRoutes() {

   const user = JSON.parse(localStorage.getItem("user") || "{}") 

   return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen routes
      <Route path="/complaints" element={
        <ProtectedRoute allowedRoles={["citizen"]}>
          <Complaints />
        </ProtectedRoute>
      } /> */}
     <Route path="/complaints" element={
      <ProtectedRoute allowedRoles={["citizen", "officer", "admin"]}>
      <Complaints />
      </ProtectedRoute>
      } />

      <Route
      path="/submit"
      element={
      user?.role === "citizen"
      ? <ComplaintForm />
      : <Navigate to="/dashboard" />
      }
      />

      {/* Officer route */}
      <Route path="/officer" element={
        <ProtectedRoute allowedRoles={["officer"]}>
          <OfficerDashboard />
        </ProtectedRoute>
      } />

      {/* Admin route */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={["admin", "officer", "citizen"]}>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/public-dashboard" element={<PublicDashboard />} />
    </Routes>
  )
}

export default AppRoutes