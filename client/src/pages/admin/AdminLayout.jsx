import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  CalendarCheck,
  Mail,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useUser } from "../../UserContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  // ✅ SAME PATTERN AS DASHBOARD
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const logout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* ================= DESKTOP SIDEBAR (UNCHANGED) ================= */}
      <aside className="hidden lg:block w-64 bg-white border-r p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-900">Admin Panel</h2>

        <nav className="space-y-3">
          <NavLink
            to="/admin/profile"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-900"
          >
            <User size={18} /> Profile
          </NavLink>

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

      {/* ================= MOBILE HEADER (MATCHED TO DASHBOARD) ================= */}
      <div className="lg:hidden w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-semibold text-blue-900">
            Admin Panel
          </h2>

          <button
            onClick={() => setMobileNavOpen((s) => !s)}
            className="p-2 rounded-md text-gray-600"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-admin-nav"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileNavOpen && (
          <div id="mobile-admin-nav" className="px-4 pb-4">
            <nav className="space-y-2">
              <NavLink
                to="/admin/profile"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <User size={16} className="inline mr-2" /> Profile
              </NavLink>

              <NavLink
                to="/admin"
                end
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <LayoutDashboard size={16} className="inline mr-2" /> Overview
              </NavLink>

              <NavLink
                to="/admin/users"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Users size={16} className="inline mr-2" /> Users
              </NavLink>

              <NavLink
                to="/admin/cars"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Car size={16} className="inline mr-2" /> Cars
              </NavLink>

              <NavLink
                to="/admin/bookings"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <CalendarCheck size={16} className="inline mr-2" /> Bookings
              </NavLink>

              <NavLink
                to="/admin/support"
                onClick={() => setMobileNavOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Mail size={16} className="inline mr-2" /> Support
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  setMobileNavOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-red-500 hover:bg-gray-100"
              >
                <LogOut size={16} className="inline mr-2" /> Logout
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <main className="flex-1">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}