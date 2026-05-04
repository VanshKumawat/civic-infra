import { useState } from "react"
import API from "../api/axios"

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e) {

    e.preventDefault()

    try {

      const response = await API.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      )

      alert(response.data.message)

      setName("")
      setEmail("")
      setPassword("")

    }
    catch(error){
      console.log(error)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-400px">

        <h1 className="text-3xl font-bold text-center mb-8">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5"
        >

          <input
            type="text"
            placeholder="Enter Name"
            className="border p-3 rounded-lg outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            className="bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  )
}

export default Register