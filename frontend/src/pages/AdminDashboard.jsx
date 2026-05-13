import { useEffect, useState } from "react"
import API from "../api/axios"

function AdminDashboard() {
  const [users, setUsers] = useState([])

  async function fetchUsers() {
    try {
      const res = await API.get("/admin/users")
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateRole(id, role, department) {
    try {
      await API.put(`/admin/users/role/${id}`, { role, department })
      alert("User updated")
      fetchUsers()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-8 sm:py-10">

      <h1 className="text-2xl sm:text-4xl font-bold text-blue-900 mb-6 sm:mb-8">
        Admin Panel
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">ID</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Name</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Email</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Role</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Department</th>
                <th className="p-3 sm:p-4 text-left text-sm sm:text-base">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3 sm:p-4 text-sm sm:text-base">{user.id}</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">{user.name}</td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">{user.email}</td>

                  <td className="p-3 sm:p-4">
                    <select
                      defaultValue={user.role}
                      id={`role-${user.id}`}
                      className="border p-1.5 sm:p-2 rounded text-sm sm:text-base w-full"
                    >
                      <option value="citizen">citizen</option>
                      <option value="officer">officer</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>

                  <td className="p-3 sm:p-4">
                    <select
                      defaultValue={user.department || ""}
                      id={`department-${user.id}`}
                      className="border p-1.5 sm:p-2 rounded text-sm sm:text-base w-full"
                    >
                      <option value="">No Department</option>
                      <option value="Road Department">Road Department</option>
                      <option value="Water Department">Water Department</option>
                      <option value="Electricity Department">Electricity Department</option>
                      <option value="Sanitation Department">Sanitation Department</option>
                      <option value="Drainage Department">Drainage Department</option>
                    </select>
                  </td>

                  <td className="p-3 sm:p-4">
                    <button
                      onClick={() =>
                        updateRole(
                          user.id,
                          document.getElementById(`role-${user.id}`).value,
                          document.getElementById(`department-${user.id}`).value
                        )
                      }
                      className="bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap"
                    >
                      Save
                    </button>
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

export default AdminDashboard
