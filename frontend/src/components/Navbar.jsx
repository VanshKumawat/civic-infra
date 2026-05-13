import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <nav className="bg-slate-900 text-white px-4 sm:px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-xl sm:text-2xl font-bold">
          CivicConnect
        </Link>

        {/* HAMBURGER (mobile only) */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-8">
            {!user && (
              <>
                <a href="#features" className="text-slate-100 hover:text-blue-600">Features</a>
                <a href="#departments" className="text-slate-100 hover:text-blue-600">Departments</a>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="font-semibold text-slate-100 hover:text-blue-600">Sign In</Link>
                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">Get Started</Link>
              </>
            )}
          </div>

          {user?.role === "citizen" && (
            <>
              <Link to="/submit" className="hover:text-gray-300">Submit Complaint</Link>
              <Link to="/complaints" className="hover:text-gray-300">My Complaints</Link>
            </>
          )}

          {user?.role === "officer" && (
            <>
              <Link to="/complaints" className="hover:text-gray-300">Manage Complaints</Link>
              <Link to="/officer" className="hover:text-gray-300">Officer Dashboard</Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/complaints" className="hover:text-gray-300">Manage Complaints</Link>
              <Link to="/admin" className="hover:text-gray-300">Admin Dashboard</Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <div className="bg-white text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
                {user.role === "officer" ? user.department : user.role}
              </div>
              <p className="text-white font-medium">{user.name}</p>
            </div>
          )}

          {user && (
            <button onClick={handleLogout} className="text-red-300 hover:text-red-100">Logout</button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-4 border-t border-slate-700 pt-4">
          {!user && (
            <>
              <a href="#features" className="text-slate-100 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#departments" className="text-slate-100 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Departments</a>
              <Link to="/login" className="font-semibold text-slate-100 hover:text-blue-400" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition text-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}

          {user?.role === "citizen" && (
            <>
              <Link to="/submit" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Submit Complaint</Link>
              <Link to="/complaints" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>My Complaints</Link>
            </>
          )}

          {user?.role === "officer" && (
            <>
              <Link to="/complaints" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Manage Complaints</Link>
              <Link to="/officer" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Officer Dashboard</Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/complaints" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Manage Complaints</Link>
              <Link to="/admin" className="hover:text-gray-300" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3 mt-2">
              <div className="bg-white text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
                {user.role === "officer" ? user.department : user.role}
              </div>
              <p className="text-white font-medium">{user.name}</p>
            </div>
          )}

          {user && (
            <button onClick={handleLogout} className="text-red-300 hover:text-red-100 text-left">Logout</button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
