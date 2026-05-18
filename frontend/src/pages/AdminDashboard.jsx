import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

const STATUS_CONFIG = {
  Pending: { color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500" },
  "In Progress": { color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-500" },
  Resolved: { color: "text-green-600", bg: "bg-green-50", dot: "bg-green-500" },
}

const DEPARTMENTS = [
  { name: "Road Department", icon: "🛣️", color: "bg-orange-50 border-orange-200" },
  { name: "Water Department", icon: "💧", color: "bg-blue-50 border-blue-200" },
  { name: "Electricity Department", icon: "⚡", color: "bg-yellow-50 border-yellow-200" },
  { name: "Sanitation Department", icon: "🗑️", color: "bg-green-50 border-green-200" },
  { name: "Drainage Department", icon: "🌊", color: "bg-cyan-50 border-cyan-200" },
]

function StatCard({ label, value, icon, accent, sub }) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border ${accent}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-bold mt-1">{value ?? 0}</p>
          <p className="text-sm mt-1 opacity-75">{label}</p>
          {sub && <p className="text-xs opacity-60 mt-0.5">{sub}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, usersRes, complaintsRes] = await Promise.all([
          API.get("/complaints/stats"),
          API.get("/admin/users"),
          API.get("/complaints"),
        ])
        setStats(statsRes.data)
        setUsers(usersRes.data)
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

  const citizenCount = users.filter(u => u.role === "citizen").length
  const officerCount = users.filter(u => u.role === "officer").length

  // Department breakdown
  const deptBreakdown = DEPARTMENTS.map(dept => {
    const deptComplaints = complaints.filter(c => c.department === dept.name)
    const deptResolved = deptComplaints.filter(c => c.status === "Resolved").length
    const deptPending = deptComplaints.filter(c => c.status === "Pending").length
    return {
      ...dept,
      total: deptComplaints.length,
      resolved: deptResolved,
      pending: deptPending,
      rate: deptComplaints.length > 0 ? Math.round((deptResolved / deptComplaints.length) * 100) : 0,
    }
  })

  const recent = complaints.slice(0, 6)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="bg-linear-to-rrom-slate-900 via-slate-800 to-blue-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">System Administrator</p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">{greeting}, {user.name}</h1>
            <p className="text-slate-300 mt-2 text-sm max-w-lg">
              System overview — {total} total complaints across {DEPARTMENTS.length} departments. {pending} pending resolution.
            </p>
          </div>
          <div className="flex gap-3 self-start sm:self-auto flex-wrap">
            <Link
              to="/complaints"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-medium text-sm transition"
            >
              📋 Complaints
            </Link>
            <Link
              to="/users"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-100 transition"
            >
              👥 Manage Users
            </Link>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Complaints" value={total} icon="📋"
            accent="bg-white border-gray-100 text-gray-800"
          />
          <StatCard
            label="Pending" value={pending} icon="⏳"
            accent="bg-red-500 border-red-400 text-white"
            sub={`${total > 0 ? Math.round((pending / total) * 100) : 0}% of total`}
          />
          <StatCard
            label="In Progress" value={inProgress} icon="🔧"
            accent="bg-blue-500 border-blue-400 text-white"
          />
          <StatCard
            label="Resolved" value={resolved} icon="✅"
            accent="bg-green-500 border-green-400 text-white"
            sub={`${resolutionRate}% rate`}
          />
        </div>

        {/* User stats + Resolution bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl">👥</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">👤</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{citizenCount}</p>
              <p className="text-sm text-gray-500">Citizens</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">🏛️</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{officerCount}</p>
              <p className="text-sm text-gray-500">Officers</p>
            </div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-gray-800">System-wide Resolution Rate</p>
              <p className="text-xs text-gray-400 mt-0.5">Across all departments</p>
            </div>
            <span className={`text-3xl font-bold ${resolutionRate >= 70 ? "text-green-600" : resolutionRate >= 40 ? "text-yellow-600" : "text-red-600"}`}>
              {resolutionRate}%
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${resolutionRate >= 70 ? "bg-linear-to-r from-green-400 to-green-600" : resolutionRate >= 40 ? "bg-linear-to-rrom-yellow-400 to-yellow-500" : "bg-linear-to-r from-red-400 to-red-500"}`}
              style={{ width: `${resolutionRate}%` }}
            />
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Pending: {pending}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> In Progress: {inProgress}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-400" /> Resolved: {resolved}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Recent complaints */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase">Complaint</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase hidden md:table-cell">Dept</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recent.map((c) => {
                      const s = STATUS_CONFIG[c.status] || STATUS_CONFIG.Pending
                      return (
                        <tr key={c.id} className="hover:bg-gray-50 transition">
                          <td className="px-5 py-3.5">
                            <p className="font-semibold text-gray-800 truncate max-w-40">{c.title}</p>
                            <p className="text-xs text-gray-400">{c.category}</p>
                          </td>
                          <td className="px-5 py-3.5 text-xs text-gray-500 hidden md:table-cell">{c.department || "—"}</td>
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

          {/* Department breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">By Department</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {deptBreakdown.map((dept) => (
                <div key={dept.name} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{dept.icon}</span>
                      <p className="text-xs font-semibold text-gray-700 truncate max-w-30">
                        {dept.name.replace(" Department", "")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{dept.total} total</span>
                      <span className="font-semibold text-gray-700">{dept.rate}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700"
                      style={{ width: `${dept.rate}%` }}
                    />
                  </div>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs text-red-500">{dept.pending} pending</span>
                    <span className="text-xs text-green-500">{dept.resolved} resolved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick nav cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/complaints" className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition group">
            <div className="text-2xl mb-3">📋</div>
            <p className="font-bold text-gray-800 group-hover:text-blue-700 transition">Manage Complaints</p>
            <p className="text-sm text-gray-400 mt-1">View, filter and update all complaints</p>
          </Link>
          <Link to="/users" className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-md transition group">
            <div className="text-2xl mb-3">👥</div>
            <p className="font-bold text-gray-800 group-hover:text-purple-700 transition">User Management</p>
            <p className="text-sm text-gray-400 mt-1">Assign roles and departments to users</p>
          </Link>
          <Link to="/public-dashboard" className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition group">
            <div className="text-2xl mb-3">🌐</div>
            <p className="font-bold text-gray-800 group-hover:text-green-700 transition">Public Dashboard</p>
            <p className="text-sm text-gray-400 mt-1">View what citizens see publicly</p>
          </Link>
        </div>

      </div>
    </div>
  )
}
