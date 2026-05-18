import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  function isActive(path) {
    return location.pathname === path
  }

  const linkClass = (path) =>
    `text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-white"
        : "text-slate-400 hover:text-white"
    }`

  const mobileLinkClass = (path) =>
    `text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-white"
        : "text-slate-300 hover:text-white"
    }`

  return (
    <nav className="bg-slate-900 text-white px-4 sm:px-8 py-4 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
          <span className="text-blue-400">🏛️</span> CivicConnect
        </Link>

        {/* HAMBURGER (mobile) */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden sm:flex items-center gap-6">

          {/* Guest links */}
          {!user && (
            <div className="flex items-center gap-6">
              <a href="/#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="/#departments" className="text-sm text-slate-400 hover:text-white transition-colors">Departments</a>
              <Link to="/login" className="text-sm font-semibold text-slate-100 hover:text-white">Sign In</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">Get Started</Link>
            </div>
          )}

          {/* Citizen links */}
          {user?.role === "citizen" && (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
              <Link to="/submit" className={linkClass("/submit")}>Submit Complaint</Link>
              <Link to="/complaints" className={linkClass("/complaints")}>My Complaints</Link>
            </div>
          )}

          {/* Officer links */}
          {user?.role === "officer" && (
            <div className="flex items-center gap-6">
              <Link to="/officer" className={linkClass("/officer")}>Dashboard</Link>
              <Link to="/complaints" className={linkClass("/complaints")}>Complaints</Link>
            </div>
          )}

          {/* Admin links */}
          {user?.role === "admin" && (
            <div className="flex items-center gap-6">
              <Link to="/admin" className={linkClass("/admin")}>Dashboard</Link>
              <Link to="/complaints" className={linkClass("/complaints")}>Complaints</Link>
              <Link
                to="/users"
                className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ${
                  isActive("/users")
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                }`}
              >
                👥 User Management
              </Link>
            </div>
          )}

          {/* User badge + logout */}
          {user && (
            <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
              <div className="flex flex-col items-end">
                <p className="text-white text-sm font-semibold leading-tight">{user.name}</p>
                <span className="text-xs text-slate-400 capitalize">
                  {user.role === "officer" ? user.department : user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors border border-slate-700 hover:border-red-400 px-3 py-1.5 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 border-t border-slate-700 pt-4 max-w-7xl mx-auto">

          {!user && (
            <>
              <a href="/#features" className="text-slate-300 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="/#departments" className="text-slate-300 hover:text-white text-sm" onClick={() => setMenuOpen(false)}>Departments</a>
              <Link to="/login" className="text-slate-100 font-semibold text-sm" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold text-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}

          {user?.role === "citizen" && (
            <>
              <Link to="/dashboard" className={mobileLinkClass("/dashboard")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/submit" className={mobileLinkClass("/submit")} onClick={() => setMenuOpen(false)}>Submit Complaint</Link>
              <Link to="/complaints" className={mobileLinkClass("/complaints")} onClick={() => setMenuOpen(false)}>My Complaints</Link>
            </>
          )}

          {user?.role === "officer" && (
            <>
              <Link to="/officer" className={mobileLinkClass("/officer")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/complaints" className={mobileLinkClass("/complaints")} onClick={() => setMenuOpen(false)}>Complaints</Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin" className={mobileLinkClass("/admin")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/complaints" className={mobileLinkClass("/complaints")} onClick={() => setMenuOpen(false)}>Complaints</Link>
              <Link to="/users" className={mobileLinkClass("/users")} onClick={() => setMenuOpen(false)}>👥 User Management</Link>
            </>
          )}

          {user && (
            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-700">
              <div>
                <p className="text-white text-sm font-semibold">{user.name}</p>
                <p className="text-slate-400 text-xs capitalize">{user.role === "officer" ? user.department : user.role}</p>
              </div>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 text-sm">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
