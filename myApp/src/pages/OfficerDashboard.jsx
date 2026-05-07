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
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          Officer Dashboard
        </h1>

        <Link
          to="/complaints"
          className="bg-blue-900 text-white px-5 py-3 rounded-lg"
        >
          Manage Complaints
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full border-collapse">

          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{complaint.id}</td>

                <td className="p-4 font-semibold">
                  {complaint.title}
                </td>

                <td className="p-4">
                  {complaint.category}
                </td>

                <td className="p-4">
                  {complaint.location}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
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

                <td className="p-4">
                  {new Date(complaint.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default OfficerDashboard