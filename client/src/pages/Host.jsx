import { useNavigate } from "react-router-dom";
import {
  Car,
  IndianRupee,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Host() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ⭐ PROFESSIONAL CTA HANDLER
  const handleBecomeHost = () => {
    // 🚨 Not logged in
    if (!token) {
      toast.error("Please login to become a host");
      navigate("/auth");
      return;
    }

    // ✅ Logged in → proceed normally
    navigate("/dashboard/add-car");
  };

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto">
      {/* 🔷 Hero Section */}
      <div className="text-center mb-14">
        <Car className="mx-auto text-blue-900 mb-4" size={52} />

        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Become a Host on Rentify
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Turn your idle car into a steady income stream. List your vehicle,
          reach thousands of renters, and earn money effortlessly.
        </p>
      </div>

      {/* 🔷 Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-14">
        {/* Earnings */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <IndianRupee className="mx-auto text-blue-900 mb-3" size={32} />
          <h3 className="font-semibold text-lg text-blue-900 mb-2">
            Earn Extra Income
          </h3>
          <p className="text-sm text-gray-500">
            Monetize your unused car and generate passive monthly earnings.
          </p>
        </div>

        {/* Protection */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <ShieldCheck className="mx-auto text-blue-900 mb-3" size={32} />
          <h3 className="font-semibold text-lg text-blue-900 mb-2">
            Secure & Protected
          </h3>
          <p className="text-sm text-gray-500">
            Your vehicle and bookings are protected with our safety checks.
          </p>
        </div>

        {/* Flexibility */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
          <Clock className="mx-auto text-blue-900 mb-3" size={32} />
          <h3 className="font-semibold text-lg text-blue-900 mb-2">
            Full Flexibility
          </h3>
          <p className="text-sm text-gray-500">
            You decide pricing, availability, and when your car is listed.
          </p>
        </div>
      </div>

      {/* 🔷 CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-10 text-center text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-3">
          Ready to start earning?
        </h3>

        <p className="text-blue-100 mb-6">
          Add your first car and unlock your host dashboard.
        </p>

        <button
          onClick={handleBecomeHost}
          className="
            inline-flex items-center gap-2
            bg-white text-blue-900
            px-7 py-3 rounded-xl font-semibold
            hover:scale-105 hover:shadow-lg
            active:scale-95
            transition-all duration-200
          "
        >
          Add Your First Car
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}