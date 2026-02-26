import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/favicon2.svg";
import { Menu, X } from "lucide-react";
import { useUser } from "../UserContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ⭐ USER CONTEXT
  const { user } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!user;
  const isHost = user?.isHost || false;
  const isAdmin = user?.isAdmin || false;

  const avatar = user?.avatar || "";
  const userName = user?.name || "";

  const isActive = (path) => location.pathname === path;

  // ⭐⭐⭐ UPDATED FILTER (ONLY CHANGE)
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/cars", label: "Cars" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ].filter((link) => {
    // ❌ hide About + Contact for admin
    if (isAdmin && (link.path === "/contact" || link.path === "/about"))
      return false;
    return true;
  });

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-fit">
            <img
              src={logo}
              alt="Rentify Logo"
              className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
            />
            <div className="block">
              <h1 className="font-bold text-sm sm:text-xl text-blue-900">
                Rentify
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 -mt-1">
                Drive Your Way
              </p>
            </div>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-6 sm:gap-8 flex-1 justify-center tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors text-sm lg:text-base ${
                  isActive(link.path)
                    ? "text-blue-900 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-900"
                    : "text-gray-600 hover:text-blue-900"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* ⭐ My Rides — hide for admin */}
            {isLoggedIn && !isAdmin && (
              <Link
                to="/dashboard/bookings"
                className={`relative transition-colors text-sm lg:text-base ${
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
          <div className="hidden md:flex items-center gap-2 lg:gap-4 min-w-fit justify-end">

            {/* ⭐ Become Host — hide for admin */}
            {isLoggedIn && !isHost && !isAdmin && (
              <Link
                to="/host"
                className="border border-blue-900 text-blue-900 px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition-colors text-xs lg:text-sm font-medium"
              >
                Become a Host
              </Link>
            )}

            {/* Login */}
            {!isLoggedIn ? (
              <Link
                to="/auth"
                className="bg-blue-900 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-800 transition-all shadow hover:shadow-md text-xs lg:text-sm font-medium"
              >
                Get Started
              </Link>
            ) : (
              <button
                onClick={() =>
                  navigate(isAdmin ? "/admin" : "/dashboard/profile")
                }
                className="flex items-center gap-2 pl-2 pr-3 lg:pr-4 py-1.5 rounded-full border border-gray-200 hover:border-blue-300 hover:shadow-sm transition bg-white"
              >
                <img
                  src={
                    avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      userName || "User"
                    )}`
                  }
                  alt="avatar"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                />
                <span className="text-xs lg:text-sm font-medium text-gray-700 hidden lg:block">
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
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU — UNCHANGED */}
      {/* (your mobile code remains exactly the same) */}
    </nav>
  );
}