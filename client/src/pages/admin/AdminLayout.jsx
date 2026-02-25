import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  CalendarCheck,
  Mail ,
  LogOut,
} from "lucide-react";
import { useUser } from "../../UserContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const logout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-900">Admin Panel</h2>

        <nav className="space-y-3">
          <NavLink
            to="/admin"
            end
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900"
          >
            <LayoutDashboard size={18} /> Overview
          </NavLink>

          <NavLink
            to="/admin/users"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900"
          >
            <Users size={18} /> Users
          </NavLink>

          <NavLink
            to="/admin/cars"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900"
          >
            <Car size={18} /> Cars
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900"
          >
            <CalendarCheck size={18} /> Bookings
          </NavLink>

          <NavLink
            to="/admin/support"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900"
          >
            <Mail size={18} /> Support
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 mt-6"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}