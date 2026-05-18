import { useEffect, useState } from "react"
import API from "../api/axios"

const ROLES = ["citizen", "officer", "admin"]
const DEPARTMENTS = [
  "",
  "Road Department",
  "Water Department",
  "Electricity Department",
  "Sanitation Department",
  "Drainage Department",
]

const ROLE_STYLES = {
  citizen: "bg-slate-100 text-slate-700",
  officer: "bg-blue-100 text-blue-700",
  admin: "bg-purple-100 text-purple-700",
}

function UserRow({ user, onSave }) {
  const [role, setRole] = useState(user.role)
  const [department, setDepartment] = useState(user.department || "")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const isDirty = role !== user.role || department !== (user.department || "")

  async function handleSave() {
    setSaving(true)
    try {
      await onSave(user.id, role, department)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors group">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value)
            if (e.target.value !== "officer") setDepartment("")
          }}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 bg-white w-full"
        >
          {ROLES.map(r => (
            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>
      </td>

      <td className="px-5 py-4">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          disabled={role !== "officer"}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 bg-white w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">No Department</option>
          {DEPARTMENTS.filter(Boolean).map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </td>

      <td className="px-5 py-4">
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            saved
              ? "bg-green-100 text-green-700"
              : isDirty
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {saving ? "Saving…" : saved ? "✓ Saved" : "Save"}
        </button>
      </td>
    </tr>
  )
}

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  async function fetchUsers() {
    try {
      const res = await API.get("/admin/users")
      setUsers(res.data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(id, role, department) {
    await API.put(`/admin/users/role/${id}`, { role, department })
    await fetchUsers()
  }

  useEffect(() => { fetchUsers() }, [])

  const filtered = users.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = filterRole === "all" || u.role === filterRole
    return matchSearch && matchRole
  })

  const counts = {
    all: users.length,
    citizen: users.filter(u => u.role === "citizen").length,
    officer: users.filter(u => u.role === "officer").length,
    admin: users.filter(u => u.role === "admin").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-500 text-sm mt-1">Assign roles and departments to registered users</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-600 shadow-sm">
              {users.length} total users
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 bg-white"
          />
          <div className="flex gap-2">
            {["all", "citizen", "officer", "admin"].map(r => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filterRole === r
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
                <span className={`ml-1.5 text-xs ${filterRole === r ? "text-white/70" : "text-gray-400"}`}>
                  {counts[r]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-300">
              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Loading users…
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-3xl mb-2">👤</p>
              <p className="font-medium text-sm">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">User</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Role</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Department</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <UserRow key={u.id} user={u} onSave={handleSave} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 px-1">
          Showing {filtered.length} of {users.length} users · Department selector only applies when role is Officer
        </p>
      </div>
    </div>
  )
}
