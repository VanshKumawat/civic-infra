import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

      window.location.href = "/complaints" 
      
    }
    catch(error){
      localStorage.removeItem("token")
       alert(
      error.response.data.message
       )
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-400px">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            className="border p-3 rounded-lg outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="border p-3 rounded-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login