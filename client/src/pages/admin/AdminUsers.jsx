import { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ⭐ per-row action loading
  const [actionLoading, setActionLoading] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/api/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Admin users error:", err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ================= FILTER =================
  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  // ================= BLOCK / UNBLOCK =================
  const handleToggleBlock = async (userId) => {
    try {
      setActionLoading(userId);

      const res = await API.patch(`/api/admin/users/${userId}/block`);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isBlocked: res.data.isBlocked } : u
        )
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  // ================= DELETE =================
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      setActionLoading(userId);

      await API.delete(`/api/admin/users/${userId}`);

      setUsers((prev) => prev.filter((u) => u._id !== userId));

      toast.success("User deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(null);
    }
  };

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="bg-white rounded-2xl border p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        All Users
      </h1>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 backdrop-blur text-gray-600">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Joined</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* NAME */}
                  <td className="p-4 font-medium">{u.name}</td>

                  {/* EMAIL */}
                  <td className="p-4 text-gray-600">{u.email}</td>

                  {/* ROLE */}
                  <td className="p-4">
                    {u.isAdmin ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        Admin
                      </span>
                    ) : u.isHost ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">
                        Host
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        User
                      </span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    {u.isBlocked ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                        Active
                      </span>
                    )}
                  </td>

                  {/* JOINED */}
                  <td className="p-4 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      {/* BLOCK / UNBLOCK */}
                      {!u.isAdmin && (
                        <button
                          onClick={() => handleToggleBlock(u._id)}
                          disabled={actionLoading === u._id}
                          className={`px-3 py-1.5 text-xs rounded-lg font-medium transition
                            ${
                              u.isBlocked
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            }
                            disabled:opacity-50`}
                        >
                          {actionLoading === u._id
                            ? "Please..."
                            : u.isBlocked
                            ? "Unblock"
                            : "Block"}
                        </button>
                      )}

                      {/* DELETE */}
                      {!u.isAdmin && (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          disabled={actionLoading === u._id}
                          className="px-3 py-1.5 text-xs rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}