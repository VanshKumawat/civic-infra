import { useEffect, useState } from "react"
import API from "../api/axios"
import { Link } from "react-router-dom"

function OfficerDashboard() {
  const [complaints, setComplaints] = useState([])

  async function fetchComplaints() {
    try {
      const res = await API.get("/complaints")
      setComplaints(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-8 sm:py-10">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-900">
          Officer Dashboard
        </h1>
        <Link
          to="/complaints"
          className="bg-blue-900 text-white px-5 py-3 rounded-lg text-center text-sm sm:text-base"
        >
          Manage Complaints
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">ID</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Title</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Category</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Location</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Status</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Created</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 sm:p-4 text-sm sm:text-base">{complaint.id}</td>
                  <td className="p-3 sm:p-4 font-semibold text-sm sm:text-base">{complaint.title}</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">{complaint.category}</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">{complaint.location}</td>
                  <td className="p-3 sm:p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs sm:text-sm ${
                        complaint.status === "Pending"
                          ? "bg-red-500"
                          : complaint.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">
                    {new Date(complaint.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OfficerDashboard
