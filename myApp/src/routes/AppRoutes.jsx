import { Routes, Route } from "react-router-dom"

import ProtectedRoute from "../components/ProtectedRoute"

import ComplaintForm from "../pages/ComplaintForm"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"


function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
                                        <ProtectedRoute>
                                        <Dashboard />
                                        </ProtectedRoute>
                                      }/>

      <Route path="/complaint" element={<ComplaintForm />} />

    </Routes>
  )
}

export default AppRoutes