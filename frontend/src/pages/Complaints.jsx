import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

const STATUS_STYLES = {
  Pending: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  "In Progress": { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  Resolved: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function ComplaintModal({ complaint, user, onClose, onStatusChange, onProofUpload }) {
  if (!complaint) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{complaint.title}</h2>
            <p className="text-sm text-gray-500 mt-1">#{complaint.id} &middot; {complaint.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none ml-4 mt-0.5"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Status</p>
              <StatusBadge status={complaint.status} />
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Department</p>
              <p className="text-sm font-medium text-gray-800">{complaint.department || "—"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Location</p>
              <p className="text-sm font-medium text-gray-800">📍 {complaint.location}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Submitted</p>
              <p className="text-sm font-medium text-gray-800">
                {complaint.created_at
                  ? new Date(complaint.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                  : "—"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{complaint.description}</p>
          </div>

          {/* Before image */}
          {complaint.image && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Complaint Image</p>
              <img
                src={`http://localhost:5000/uploads/${complaint.image}`}
                alt="Complaint"
                className="w-full rounded-xl object-cover max-h-64"
              />
            </div>
          )}

          {/* Proof image */}
          {complaint.proof_image && (
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">✓ Resolution Proof</p>
              <img
                src={`http://localhost:5000/uploads/${complaint.proof_image}`}
                alt="Proof"
                className="w-full rounded-xl object-cover max-h-64 border-2 border-green-400"
              />
            </div>
          )}

          {/* Officer / Admin controls */}
          {(user?.role === "officer" || user?.role === "admin") && (
            <div className="border-t border-gray-100 pt-5 space-y-4">
              <p className="text-sm font-semibold text-gray-700">Update Complaint</p>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Change Status</label>
                <select
                  value={complaint.status}
                  onChange={(e) => onStatusChange(complaint.id, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Upload Resolution Proof</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onProofUpload(complaint.id, e.target.files[0])}
                  className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Complaints() {
  const [complaints, setComplaints] = useState([])
  const [filter, setFilter] = useState("All")
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  async function fetchComplaints() {
    try {
      const response = await API.get("/complaints")
      setComplaints(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { navigate("/login"); return }
    fetchComplaints()
  }, [])

  async function handleStatusChange(id, newStatus) {
    try {
      await API.put(`/complaints/update-status/${id}`, { status: newStatus })
      await fetchComplaints()
      // update modal complaint too
      setSelected(prev => prev ? { ...prev, status: newStatus } : prev)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleProofUpload(id, file) {
    if (!file) return
    const formData = new FormData()
    formData.append("proof", file)
    try {
      await API.put(`/complaints/upload-proof/${id}`, formData)
      alert("Proof uploaded successfully")
      await fetchComplaints()
      setSelected(prev => prev ? { ...prev, status: "Resolved" } : prev)
    } catch (err) {
      console.log(err)
    }
  }

  const filtered = complaints.filter(c => filter === "All" || c.status === filter)

  const counts = {
    All: complaints.length,
    Pending: complaints.filter(c => c.status === "Pending").length,
    "In Progress": complaints.filter(c => c.status === "In Progress").length,
    Resolved: complaints.filter(c => c.status === "Resolved").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Complaints</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {user?.role === "citizen" ? "Your submitted complaints" : `${user?.role === "admin" ? "All" : user?.department} complaints`}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {["All", "Pending", "In Progress", "Resolved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === tab
                  ? "bg-slate-900 text-white shadow"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {tab}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${filter === tab ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <svg className="animate-spin w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Loading complaints…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-medium">No complaints found</p>
              <p className="text-sm mt-1">Try a different filter</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Location</th>
                    {(user?.role === "officer" || user?.role === "admin") && (
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Department</th>
                    )}
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Date</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((complaint, idx) => (
                    <tr
                      key={complaint.id}
                      className="hover:bg-gray-50/70 transition-colors group"
                    >
                      <td className="px-5 py-4 text-gray-400 font-mono text-xs">{String(idx + 1).padStart(2, "0")}</td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{complaint.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5 line-clamp-1 max-w-xs">{complaint.description}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{complaint.category}</td>
                      <td className="px-5 py-4 text-gray-600 hidden md:table-cell">
                        <span className="flex items-center gap-1">
                          <span className="text-gray-400">📍</span>
                          <span className="truncate max-w-'120px'">{complaint.location}</span>
                        </span>
                      </td>
                      {(user?.role === "officer" || user?.role === "admin") && (
                        <td className="px-5 py-4 text-gray-600 hidden lg:table-cell text-xs">{complaint.department || "—"}</td>
                      )}
                      <td className="px-5 py-4 text-gray-500 text-xs hidden sm:table-cell whitespace-nowrap">
                        {complaint.created_at
                          ? new Date(complaint.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={complaint.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelected(complaint)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          View
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Row count */}
        {!loading && filtered.length > 0 && (
          <p className="text-xs text-gray-400 mt-3 px-1">
            Showing {filtered.length} of {complaints.length} complaint{complaints.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Detail Modal */}
      <ComplaintModal
        complaint={selected}
        user={user}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
        onProofUpload={handleProofUpload}
      />
    </div>
  )
}

export default Complaints
