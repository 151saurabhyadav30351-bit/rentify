import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/favicon2.svg";
import { Menu, X } from "lucide-react";
import { useUser } from "../UserContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ⭐ SINGLE SOURCE OF TRUTH
  const { user } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  // ⭐ derive auth state from user (NOT localStorage)
  const isLoggedIn = !!user;

  const avatar = user?.avatar || "";
  const userName = user?.name || "";
  const isHost = user?.isHost || false;

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/cars", label: "Cars" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-[200px]">
            <img
              src={logo}
              alt="Rentify Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="font-bold text-xl text-blue-900">Rentify</h1>
              <p className="text-xs text-gray-500 -mt-1">Drive Your Way</p>
            </div>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors ${
                  isActive(link.path)
                    ? "text-blue-900 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-900"
                    : "text-gray-600 hover:text-blue-900"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* ⭐ only when logged in */}
            {isLoggedIn && (
              <Link
                to="/dashboard/bookings"
                className={`relative transition-colors ${
                  isActive("/dashboard/bookings")
                    ? "text-blue-900 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-900"
                    : "text-gray-600 hover:text-blue-900"
                }`}
              >
                My Rides
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 min-w-[240px] justify-end">

            {/* ⭐ Become Host — FIXED */}
            {isLoggedIn && !isHost && (
              <Link
                to="/host"
                className="border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition-colors text-sm font-medium"
              >
                Become a Host
              </Link>
            )}

            {/* Login */}
            {!isLoggedIn ? (
              <Link
                to="/auth"
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-all shadow hover:shadow-md text-sm font-medium"
              >
                Get Started
              </Link>
            ) : (
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:border-blue-300 hover:shadow-sm transition bg-white"
              >
                <img
                  src={
                    avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      userName || "User"
                    )}`
                  }
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700 hidden lg:block">
                  {userName || "User"}
                </span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-blue-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="px-4 py-4 space-y-4">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block ${
                  isActive(link.path)
                    ? "text-blue-900 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && (
              <Link
                to="/dashboard/bookings"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-600"
              >
                My Bookings
              </Link>
            )}

            {isLoggedIn && !isHost && (
              <Link
                to="/host"
                onClick={() => setIsMenuOpen(false)}
                className="block border border-blue-900 text-blue-900 px-4 py-2 rounded-lg text-center"
              >
                Become a Host
              </Link>
            )}

            {!isLoggedIn && (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-blue-900 text-white px-4 py-2 rounded-lg text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}