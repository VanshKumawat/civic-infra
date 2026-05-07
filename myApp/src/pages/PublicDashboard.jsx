import { useEffect, useState } from "react"
import API from "../api/axios"

function PublicDashboard() {

  const [stats, setStats] = useState({})

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {

    try {

      const res = await API.get("/complaints/public-stats")

      setStats(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-12">
        Public Complaint Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-5xl font-bold text-blue-600">
            {stats.total || 0}
          </h2>

          <p className="mt-3 text-gray-600">
            Total Complaints
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-5xl font-bold text-red-500">
            {stats.pending || 0}
          </h2>

          <p className="mt-3 text-gray-600">
            Pending
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-5xl font-bold text-orange-500">
            {stats.inProgress || 0}
          </h2>

          <p className="mt-3 text-gray-600">
            In Progress
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-5xl font-bold text-green-600">
            {stats.resolved || 0}
          </h2>

          <p className="mt-3 text-gray-600">
            Resolved
          </p>
        </div>

      </div>

    </div>

  )
}

export default PublicDashboard