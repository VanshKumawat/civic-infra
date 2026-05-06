import { useEffect, useState } from "react"
import API from "../api/axios"

function Dashboard() {

  const [stats, setStats] = useState({})
  const user = JSON.parse(localStorage.getItem("user"))

  async function fetchStats() {
    try {
      const res = await API.get("/complaints/stats")
      setStats(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Dashboard
      </h1>

      
    {(user?.role === "officer" || user?.role === "admin") ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Total</h2>
          <p className="text-3xl mt-2">{stats.total || 0}</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Pending</h2>
          <p className="text-3xl mt-2">{stats.pending || 0}</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">In Progress</h2>
          <p className="text-3xl mt-2">{stats.inProgress || 0}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Resolved</h2>
          <p className="text-3xl mt-2">{stats.resolved || 0}</p>
        </div>

      </div>

     ) : (
          <div className="text-center mt-10 text-lg">
        You can track your complaints from the complaints page.
      </div>
      
       )
}
    </div>
  )
}

export default Dashboard