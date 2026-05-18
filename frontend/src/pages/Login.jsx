import { useState } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const response = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      const role = response.data.user.role
      if (role === "admin") {
        window.location.href = "/admin"
      } else if (role === "officer") {
        window.location.href = "/officer"
      } else {
        window.location.href = "/dashboard"
      }
    } catch (error) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setError(error.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 py-12">

      <Link
        to="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white px-4 py-2 rounded-xl shadow border border-gray-100 hover:bg-gray-50 transition text-sm text-gray-600 font-medium"
      >
        ← Home
      </Link>

      <div className="bg-white w-full max-w-md p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🏛️</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to your CivicConnect account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
