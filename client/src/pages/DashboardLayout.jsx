import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  User,
  CalendarCheck,
  PlusSquare,
  Car,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { useUser } from "../UserContext";

export default function DashboardLayout() {
  const navigate = useNavigate();

  // ⭐ SINGLE SOURCE OF TRUTH
  const { user, logoutUser } = useUser();
  const isHost = user?.isHost || false;

  // ✅ FIXED LOGOUT (reactive everywhere)
  const logout = () => {
    logoutUser();          // ⭐ CRITICAL
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen pt-16">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-900">Dashboard</h2>

        <nav className="space-y-3">
          {/* ALWAYS VISIBLE */}
          <NavLink
            to="/dashboard/profile"
            className="flex gap-2 items-center text-gray-600 hover:text-blue-900"
          >
            <User size={18} /> Profile
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            className="flex gap-2 items-center text-gray-600 hover:text-blue-900"
          >
            <CalendarCheck size={18} /> My Bookings
          </NavLink>

          {/* ⭐ HOST ONLY — REACTIVE */}
          {isHost && (
            <>
              <NavLink
                to="/dashboard/add-car"
                className="flex gap-2 items-center text-gray-600 hover:text-blue-900"
              >
                <PlusSquare size={18} /> Add Car
              </NavLink>

              <NavLink
                to="/dashboard/manage-cars"
                className="flex gap-2 items-center text-gray-600 hover:text-blue-900"
              >
                <Car size={18} /> Manage Cars
              </NavLink>

              <NavLink
                to="/dashboard/host-bookings"
                className="flex gap-2 items-center text-gray-600 hover:text-blue-900"
              >
                <ClipboardList size={18} /> Host Dashboard
              </NavLink>
            </>
          )}

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="flex gap-2 items-center text-red-500 mt-6"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}