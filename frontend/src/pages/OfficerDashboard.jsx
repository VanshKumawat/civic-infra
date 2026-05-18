import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

const STATUS_CONFIG = {
  Pending: { color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", bar: "bg-red-400" },
  "In Progress": { color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-500", bar: "bg-blue-400" },
  Resolved: { color: "text-green-600", bg: "bg-green-50", dot: "bg-green-500", bar: "bg-green-400" },
}

const DEPT_ICONS = {
  "Road Department": "🛣️",
  "Water Department": "💧",
  "Electricity Department": "⚡",
  "Sanitation Department": "🗑️",
  "Drainage Department": "🌊",
}

function StatCard({ label, value, icon, accent }) {
  return (
    <div className={`rounded-2xl p-5 flex items-center gap-4 ${accent}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-2xl font-bold">{value ?? 0}</p>
        <p className="text-sm opacity-80">{label}</p>
      </div>
    </div>
  )
}

export default function OfficerDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const [stats, setStats] = useState({})
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, complaintsRes] = await Promise.all([
          API.get("/complaints/stats"),
          API.get("/complaints"),
        ])
        setStats(statsRes.data)
        setComplaints(complaintsRes.data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const total = stats.total || 0
  const pending = stats.pending || 0
  const inProgress = stats.inProgress || 0
  const resolved = stats.resolved || 0
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0

  const recent = complaints.slice(0, 6)
  const pendingList = complaints.filter(c => c.status === "Pending").slice(0, 4)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="bg-linear-to-r from-blue-900 to-blue-700 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{DEPT_ICONS[user.department] || "🏛️"}</span>
              <p className="text-blue-300 text-sm font-medium">{user.department}</p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">{greeting}, {user.name}</h1>
            <p className="text-blue-200 mt-2 text-sm max-w-md">
              Here's what's happening in your department today. You have {pending} pending complaint{pending !== 1 ? "s" : ""} awaiting action.
            </p>
          </div>
          <Link
            to="/complaints"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition whitespace-nowrap self-start sm:self-auto"
          >
            Manage Complaints →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Assigned" value={total} icon="📋" accent="bg-white border border-gray-100 shadow-sm text-gray-800" />
          <StatCard label="Pending" value={pending} icon="⏳" accent="bg-red-500 text-white shadow-sm" />
          <StatCard label="In Progress" value={inProgress} icon="🔧" accent="bg-blue-500 text-white shadow-sm" />
          <StatCard label="Resolved" value={resolved} icon="✅" accent="bg-green-500 text-white shadow-sm" />
        </div>

        {/* Resolution Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-gray-800">Department Resolution Rate</p>
              <p className="text-xs text-gray-400 mt-0.5">{resolved} resolved out of {total} total</p>
            </div>
            <span className={`text-3xl font-bold ${resolutionRate >= 70 ? "text-green-600" : resolutionRate >= 40 ? "text-yellow-600" : "text-red-600"}`}>
              {resolutionRate}%
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${resolutionRate >= 70 ? "bg-linear-to-r from-green-400 to-green-600" : resolutionRate >= 40 ? "bg-linear-to-r from-yellow-400 to-yellow-500" : "bg-linear-to-r from-red-400 to-red-500"}`}
              style={{ width: `${resolutionRate}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent complaints table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">Recent Complaints</h2>
              <Link to="/complaints" className="text-sm text-blue-600 hover:underline font-medium">View all →</Link>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-16 text-gray-300">
                <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Loading…
              </div>
            ) : recent.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-3xl mb-2">🎉</p>
                <p className="text-sm font-medium">No complaints assigned yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase">Title</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase hidden md:table-cell">Location</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recent.map((c) => {
                      const s = STATUS_CONFIG[c.status] || STATUS_CONFIG.Pending
                      return (
                        <tr key={c.id} className="hover:bg-gray-50 transition">
                          <td className="px-5 py-3.5">
                            <p className="font-semibold text-gray-800 truncate max-w-45">{c.title}</p>
                            <p className="text-xs text-gray-400">{c.category}</p>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">📍 {c.location}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Urgent - pending complaints */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <h2 className="font-bold text-gray-800 text-sm">Needs Attention</h2>
              </div>
              {pendingList.length === 0 ? (
                <p className="text-center text-gray-400 text-xs py-6">All caught up! 🎉</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {pendingList.map(c => (
                    <div key={c.id} className="px-5 py-3 hover:bg-red-50 transition">
                      <p className="text-sm font-semibold text-gray-800 truncate">{c.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">📍 {c.location}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="px-5 py-3 border-t border-gray-100">
                <Link to="/complaints" className="text-xs text-blue-600 hover:underline font-medium">Manage all →</Link>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-3 text-sm">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  to="/complaints"
                  className="flex items-center gap-3 w-full bg-blue-900 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-800 transition"
                >
                  <span>📋</span> All Complaints
                </Link>
                <Link
                  to="/complaints"
                  className="flex items-center gap-3 w-full bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-100 transition border border-gray-200"
                >
                  <span>⏳</span> Pending Only
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
