import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/favicon2.svg";
import { Menu, X } from "lucide-react";
import { useUser } from "../UserContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // prevent background scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
              <h1 className="font-bold text-sm sm:text-xl text-blue-900">Rentify</h1>
              <p className="hidden sm:block text-xs text-gray-500 -mt-1">Drive Your Way</p>
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

            {/* ⭐ only when logged in */}
            {isLoggedIn && (
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

            {/* ⭐ Become Host — FIXED */}
            {isLoggedIn && !isHost && (
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
                onClick={() => navigate("/dashboard/profile")}
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

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-all duration-300 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: isMenuOpen ? "rgba(0,0,0,0.6)" : "transparent" }}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 z-[1000] w-64 sm:w-72 transform transition-transform duration-300`}
          style={{
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? "visible" : "hidden",
            backgroundColor: "#ffffff",
            minHeight: "100vh",
            boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
          }}
          aria-hidden={!isMenuOpen}
        >
          <div className="p-4 sm:p-6 space-y-6">
            {/* Close button */}
            <div className="flex justify-between items-center bg-white pb-3 border-b border-gray-100">
              <h2 className="font-semibold text-blue-900 text-base sm:text-lg">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-1">
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm sm:text-base ${
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
                  className="block text-gray-600 text-sm sm:text-base"
                >
                  My Rides
                </Link>
              )}

              {isLoggedIn && !isHost && (
                <Link
                  to="/host"
                  onClick={() => setIsMenuOpen(false)}
                  className="block border border-blue-900 text-blue-900 px-4 py-2 rounded-lg text-center text-sm sm:text-base font-medium"
                >
                  Become a Host
                </Link>
              )}

              {!isLoggedIn && (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-blue-900 text-white px-4 py-2 rounded-lg text-center text-sm sm:text-base font-medium"
                >
                  Get Started
                </Link>
              )}

              {isLoggedIn && (
                <button
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                >
                  <img
                    src={
                      avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userName || "User"
                      )}`
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-700">{userName || "User"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}