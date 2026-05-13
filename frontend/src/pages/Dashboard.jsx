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
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-8 sm:py-10">

      <h1 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center">
        Dashboard
      </h1>

      {(user?.role === "officer" || user?.role === "admin") ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center">
            <h2 className="text-base sm:text-xl font-semibold">Total</h2>
            <p className="text-2xl sm:text-3xl mt-2">{stats.total || 0}</p>
          </div>

          <div className="bg-red-500 text-white p-4 sm:p-6 rounded-xl shadow text-center">
            <h2 className="text-base sm:text-xl font-semibold">Pending</h2>
            <p className="text-2xl sm:text-3xl mt-2">{stats.pending || 0}</p>
          </div>

          <div className="bg-blue-500 text-white p-4 sm:p-6 rounded-xl shadow text-center">
            <h2 className="text-base sm:text-xl font-semibold">In Progress</h2>
            <p className="text-2xl sm:text-3xl mt-2">{stats.inProgress || 0}</p>
          </div>

          <div className="bg-green-500 text-white p-4 sm:p-6 rounded-xl shadow text-center">
            <h2 className="text-base sm:text-xl font-semibold">Resolved</h2>
            <p className="text-2xl sm:text-3xl mt-2">{stats.resolved || 0}</p>
          </div>

        </div>
      ) : (
        <div className="text-center mt-10 text-base sm:text-lg">
          You can track your complaints from the complaints page.
        </div>
      )}
    </div>
  )
}

export default Dashboard
