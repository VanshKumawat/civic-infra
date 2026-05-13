import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function Complaints() {
  const [complaints, setComplaints] = useState([])
  const [filter, setFilter] = useState("All")
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  async function fetchComplaints() {
    try {
      const response = await API.get("/complaints")
      setComplaints(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }
    fetchComplaints()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-8 sm:py-10">

      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center">
        Complaints Dashboard
      </h1>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 justify-center">
        {["All", "Pending", "In Progress", "Resolved"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
              filter === item ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {complaints
          .filter((c) => filter === "All" || c.status === filter)
          .map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-2xl shadow-lg p-4 sm:p-5">

              {/* BEFORE IMAGE */}
              <img
                src={`http://localhost:5000/uploads/${complaint.image}`}
                alt=""
                className="w-full h-44 sm:h-52 object-cover rounded-xl"
              />

              {/* AFTER IMAGE (PROOF) */}
              {complaint.proof_image && (
                <img
                  src={`http://localhost:5000/uploads/${complaint.proof_image}`}
                  alt=""
                  className="w-full h-44 sm:h-52 object-cover rounded-xl mt-3 border-4 border-green-500"
                />
              )}

              <h2 className="text-xl sm:text-2xl font-bold mt-4">{complaint.title}</h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{complaint.category}</p>
              <p className="mt-3 text-sm sm:text-base">{complaint.description}</p>
              <p className="mt-3 font-semibold text-sm sm:text-base">📍 {complaint.location}</p>

              {/* STATUS DISPLAY */}
              <div className="mt-4">
                <span
                  className={`px-4 py-1 rounded-full text-white text-sm ${
                    complaint.status === "Pending"
                      ? "bg-red-500"
                      : complaint.status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              {/* ROLE BASED CONTROLS */}
              {user?.role === "officer" || user?.role === "admin" ? (
                <>
                  <p className="mt-4 text-sm font-semibold">Update Status:</p>
                  {(user?.role === "officer" || user?.role === "admin") && (
                    <select
                      value={complaint.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value
                        try {
                          await API.put(`/complaints/update-status/${complaint.id}`, { status: newStatus })
                          fetchComplaints()
                        } catch (error) {
                          console.log(error)
                        }
                      }}
                      className="mt-1 border p-2 rounded w-full text-sm sm:text-base"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  )}

                  <p className="mt-4 text-sm font-semibold">Upload Proof:</p>
                  <input
                    type="file"
                    onChange={async (e) => {
                      const file = e.target.files[0]
                      const formData = new FormData()
                      formData.append("proof", file)
                      try {
                        await API.put(`/complaints/upload-proof/${complaint.id}`, formData)
                        alert("Proof Uploaded")
                        fetchComplaints()
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                    className="mt-2 w-full text-sm"
                  />
                </>
              ) : (
                <p className="mt-4 text-gray-500 text-sm">You can only view status</p>
              )}

            </div>
          ))}
      </div>
    </div>
  )
}

export default Complaints
