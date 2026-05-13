import { useState } from "react"
import { useNavigate ,Link} from "react-router-dom"
import API from "../api/axios"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleLogin(e) {

    e.preventDefault()

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      )

      alert(response.data.message)

      console.log(response.data)

     localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      const role = response.data.user.role

        if (role === "admin") {
          window.location.href = "/admin"
        } else if (role === "officer") {
          window.location.href = "/officer"
        } else {
        window.location.href = "/complaints"   // citizen
        }
      
    }
    catch(error){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
       
       alert(error.response?.data?.message || "Login failed")

    }

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

          <Link
    to="/"
    className="absolute top-6 left-6 bg-white px-5 py-2 rounded-xl shadow hover:bg-gray-100 transition"
  >
    ← Home
  </Link>
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Welcome Back
        </h1>

          <p className="text-center text-gray-500 mb-8">
          Login to access your civic complaint dashboard
          </p>


        <form onSubmit={handleLogin} className="flex flex-col gap-5">

             <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email Address
            </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </div>

           <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>
            <input
            type="password"
            placeholder="Enter Password"
            className="border p-3 rounded-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            </div>

          <button type="submit" className="bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-900 font-semibold">
            Register
          </Link>
        </p>
      </div>

    </div>
  )
}

export default Login