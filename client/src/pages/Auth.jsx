import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, CarFront } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api";
import { useUser } from "../UserContext";

export default function Auth() {
  const navigate = useNavigate();
  const { loginUser } = useUser();

  // ✅ simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ✅ state
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⭐ NEW — inline errors
  const [errors, setErrors] = useState({});

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};

    const trimmedEmail = email.trim().toLowerCase();

    if (isSignup && !name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email address";
    }

    // ✅ ONLY MIN LENGTH (as you requested)
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ run validation first
    if (!validateForm()) return;

    const trimmedEmail = email.trim().toLowerCase();

    try {
      setLoading(true);

      if (isSignup) {
        // REGISTER
        await API.post("/api/auth/register", {
          name,
          email: trimmedEmail,
          password,
        });

        toast.success("Account created! Please login.");
        setIsSignup(false);
        setName("");
        setPassword("");
        setErrors({});
      } else {
        // LOGIN
        const res = await API.post("/api/auth/login", {
          email: trimmedEmail,
          password,
        });

        await loginUser(res.data.token);
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">
      {/* ================= LEFT BRAND PANEL ================= */}
      <div className="hidden lg:flex flex-col justify-center px-12 lg:px-16 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-500 text-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <CarFront size={40} />
            <h1 className="text-3xl font-bold">Rentify</h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Drive smarter,
            <br />
            earn faster.
          </h2>

          <p className="text-white/80 mb-8">
            Join thousands of users who trust Rentify for seamless
            car rentals and passive earnings.
          </p>

          <div className="space-y-3 text-sm text-white/90">
            <p>✓ Instant bookings</p>
            <p>✓ Verified hosts</p>
            <p>✓ Secure payments</p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT FORM PANEL ================= */}
      <div className="flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-6 sm:mb-8">
            <div className="flex justify-center items-center gap-2 mb-2">
              <CarFront className="text-blue-900 w-6 sm:w-8 h-6 sm:h-8" />
              <span className="font-bold text-lg sm:text-xl text-blue-900">
                Rentify
              </span>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-1 sm:mb-2">
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>

            <p className="text-center text-gray-500 text-xs sm:text-sm mb-5 sm:mb-6">
              {isSignup
                ? "Start your journey with Rentify"
                : "Login to continue your journey"}
            </p>

            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              {/* NAME */}
              {isSignup && (
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1.5 px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1.5 px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <label className="text-xs sm:text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1.5 px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg sm:rounded-xl pr-10 sm:pr-12 text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-2.5 sm:right-3 top-8 sm:top-[38px] text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition disabled:opacity-60 text-sm sm:text-base"
              >
                {loading
                  ? isSignup
                    ? "Creating account..."
                    : "Logging in..."
                  : isSignup
                  ? "Create Account"
                  : "Continue"}
              </button>
            </form>

            <p
              onClick={() => {
                setIsSignup(!isSignup);
                setErrors({});
              }}
              className="text-center text-xs sm:text-sm text-blue-700 mt-4 sm:mt-6 cursor-pointer font-medium hover:underline"
            >
              {isSignup
                ? "Already have an account? Login"
                : "New here? Create an account"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
