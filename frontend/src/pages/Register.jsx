import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/axios"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const response = await API.post("/auth/register", { name, email, password })
      alert(response.data.message)
      setName("")
      setEmail("")
      setPassword("")
      navigate("/login")
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-12">

      <Link
        to="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white px-4 sm:px-5 py-2 rounded-xl shadow hover:bg-gray-100 transition z-50 text-sm sm:text-base"
      >
        ← Home
      </Link>

      <div className="bg-white w-full max-w-md p-6 sm:p-10 rounded-2xl shadow-xl">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
          Register to report and track civic complaints
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
