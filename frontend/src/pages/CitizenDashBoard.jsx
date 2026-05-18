import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

const CATEGORY_ICONS = {
  Pothole: "🚧",
  "Water Leakage": "💧",
  Streetlight: "💡",
  Garbage: "🗑️",
  Drainage: "🌊",
}

const STATUS_CONFIG = {
  Pending: { color: "text-red-600", bg: "bg-red-50", bar: "bg-red-400", dot: "bg-red-500" },
  "In Progress": { color: "text-blue-600", bg: "bg-blue-50", bar: "bg-blue-400", dot: "bg-blue-500" },
  Resolved: { color: "text-green-600", bg: "bg-green-50", bar: "bg-green-400", dot: "bg-green-500" },
}

function StatCard({ label, value, color, icon, sublabel }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value ?? 0}</p>
        <p className="text-sm text-gray-500">{label}</p>
        {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  )
}

export default function CitizenDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const [stats, setStats] = useState({})
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, complaintsRes] = await Promise.all([
          API.get("/complaints/stats"),
          API.get("/complaints"),
        ])
        setStats(statsRes.data)
        setRecent(complaintsRes.data.slice(0, 5))
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const total = stats.total || 0
  const resolved = stats.resolved || 0
  const rate = total > 0 ? Math.round((resolved / total) * 100) : 0

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">

        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-slate-900 to-slate-700 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">{greeting}</p>
            <h1 className="text-2xl sm:text-3xl font-bold">{user.name} 👋</h1>
            <p className="text-slate-300 mt-2 text-sm sm:text-base max-w-md">
              Welcome to your civic dashboard. Report issues, track progress, and help build a better city.
            </p>
          </div>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition whitespace-nowrap self-start sm:self-auto"
          >
            + File New Complaint
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Filed" value={stats.total} icon="📋" color="bg-slate-100" />
          <StatCard label="Pending" value={stats.pending} icon="⏳" color="bg-red-50" />
          <StatCard label="In Progress" value={stats.inProgress} icon="🔧" color="bg-blue-50" />
          <StatCard label="Resolved" value={stats.resolved} icon="✅" color="bg-green-50" />
        </div>

        {/* Resolution progress */}
        {total > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-800">Your Resolution Rate</p>
              <span className="text-2xl font-bold text-green-600">{rate}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-700"
                style={{ width: `${rate}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{resolved} of {total} complaints resolved</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Complaints */}
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
                <p className="text-3xl mb-2">📭</p>
                <p className="text-sm font-medium">No complaints yet</p>
                <Link to="/submit" className="text-blue-600 text-sm hover:underline mt-1 block">File your first one →</Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recent.map((c) => {
                  const s = STATUS_CONFIG[c.status] || STATUS_CONFIG.Pending
                  return (
                    <div key={c.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">
                        {CATEGORY_ICONS[c.category] || "📌"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{c.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">📍 {c.location}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color} shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {c.status}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/submit"
                  className="flex items-center gap-3 w-full bg-slate-900 text-white px-4 py-3 rounded-xl font-medium text-sm hover:bg-slate-700 transition"
                >
                  <span className="text-lg">📝</span> File a Complaint
                </Link>
                <Link
                  to="/complaints"
                  className="flex items-center gap-3 w-full bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-medium text-sm hover:bg-gray-100 transition border border-gray-200"
                >
                  <span className="text-lg">📋</span> My Complaints
                </Link>
                <Link
                  to="/public-dashboard"
                  className="flex items-center gap-3 w-full bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-medium text-sm hover:bg-gray-100 transition border border-gray-200"
                >
                  <span className="text-lg">🌐</span> Public Stats
                </Link>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5">
              <p className="text-sm font-semibold text-blue-800 mb-1">💡 Tip</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Attach a clear photo when filing a complaint — it helps officers resolve issues faster.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
