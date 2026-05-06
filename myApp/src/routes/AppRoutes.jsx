import { Routes, Route , Navigate } from "react-router-dom"

import ProtectedRoute from "../components/ProtectedRoute"

import ComplaintForm from "../pages/ComplaintForm"

import Complaints from "../pages/Complaints"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"


function AppRoutes() {

   const user = JSON.parse(localStorage.getItem("user") || "{}") 

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
      
      <Route path="/complaints" element={<Complaints />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/submit" element={ user?.role === "citizen" ? <ComplaintForm />: <Navigate to="/dashboard" /> }/>

    </Routes>
  )
}

export default AppRoutes