import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  User,
  CalendarCheck,
  PlusSquare,
  Car,
  LogOut,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
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

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-16 bg-gray-50">
      {/* Desktop Sidebar (hidden on small) */}
      <aside className="hidden md:block w-64 bg-white border-r p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-900">Dashboard</h2>

        <nav className="space-y-3">
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

          <button onClick={logout} className="flex gap-2 items-center text-red-500 mt-6">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Mobile header + nav */}
      <div className="md:hidden w-full bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-semibold text-blue-900">Dashboard</h2>
          <button
            onClick={() => setMobileNavOpen((s) => !s)}
            className="p-2 rounded-md text-gray-600"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-dashboard-nav"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileNavOpen && (
          <div id="mobile-dashboard-nav" className="px-4 pb-4">
            <nav className="space-y-2">
              <NavLink
                to="/dashboard/profile"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileNavOpen(false)}
              >
                <User size={16} className="inline mr-2" /> Profile
              </NavLink>

              <NavLink
                to="/dashboard/bookings"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileNavOpen(false)}
              >
                <CalendarCheck size={16} className="inline mr-2" /> My Bookings
              </NavLink>

              {isHost && (
                <>
                  <NavLink
                    to="/dashboard/add-car"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <PlusSquare size={16} className="inline mr-2" /> Add Car
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-cars"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <Car size={16} className="inline mr-2" /> Manage Cars
                  </NavLink>

                  <NavLink
                    to="/dashboard/host-bookings"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <ClipboardList size={16} className="inline mr-2" /> Host Dashboard
                  </NavLink>
                </>
              )}

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

      {/* Content */}
      <main className="flex-1">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
