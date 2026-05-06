import { Link } from "react-router-dom"

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  return (
    <nav className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-bold">
        Civic System
      </h1>

      <div className="flex gap-6 text-lg">
        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>


        {(user?.role === "officer" || user?.role === "admin") && (
        <Link to="/dashboard">Dashboard</Link>
        )}

        {user?.role === "citizen" && (
        <Link to="/complaint">Complaint</Link>
         )}
        

        <Link to="/complaints">Complaints</Link>

        
      </div>

    </nav>
  )
}

export default Navbar