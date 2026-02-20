import { useEffect, useState, useMemo } from "react";
import API from "../api";
import { CalendarDays, MapPin, User } from "lucide-react";

export default function HostBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/api/bookings/host", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setBookings(res.data))
      .catch(() => {});
  }, [token]);

  // ===============================
  // 🔥 ANALYTICS
  // ===============================
  const analytics = useMemo(() => {
    const totalBookings = bookings.length;

    const totalEarnings = bookings.reduce(
      (sum, b) => sum + (b.totalAmount || 0),
      0
    );

    const uniqueCars = new Set(
      bookings.map((b) => b.car?._id)
    ).size;

    return {
      totalBookings,
      totalEarnings,
      activeCars: uniqueCars,
    };
  }, [bookings]);

  return (
    // ⭐ DASHBOARD-NATIVE WRAPPER (FIXED)
    <div className="p-6 md:p-8">
      {/* ================= HEADER ================= */}
      <div className="mb-10 max-w-5xl">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Host Dashboard
        </h2>
        <p className="text-gray-500 mt-2">
          Monitor your performance and manage bookings
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{analytics.totalEarnings}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {analytics.totalBookings}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-sm text-gray-500">Cars Booked</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {analytics.activeCars}
          </p>
        </div>
      </div>

      {/* ================= BOOKINGS HEADER ================= */}
      <div className="max-w-5xl flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          Bookings
        </h3>

        <span className="text-sm text-gray-500">
          {bookings.length} total
        </span>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {bookings.length === 0 ? (
        <div className="max-w-5xl bg-white border border-gray-100 rounded-2xl shadow-sm py-20 px-6 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center">
              <CalendarDays size={26} className="text-gray-400" />
            </div>

            <h4 className="text-lg font-semibold text-gray-900">
              No bookings yet
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              When customers book your cars, the reservations will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm hover:shadow-md transition"
            >
              {/* LEFT */}
              <div className="flex gap-5 items-start">
                <img
                  src={
                    booking.car?.image ||
                    `https://ui-avatars.com/api/?name=${booking.car?.title}`
                  }
                  alt={booking.car?.title}
                  className="w-40 h-24 rounded-xl object-cover bg-gray-100"
                />

                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {booking.car?.title}
                  </h4>

                  {/* Customer */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <User size={14} />
                    {booking.user?.name || "Customer"}
                  </div>

                  {/* Dates */}
                  <div className="flex items-start gap-2 mt-3 text-sm text-gray-600">
                    <CalendarDays size={16} />
                    <span>
                      {new Date(booking.fromDate).toLocaleDateString()} →{" "}
                      {new Date(booking.toDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* City */}
                  <div className="flex items-start gap-2 mt-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{booking.city}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right min-w-[160px]">
                <p className="text-sm text-gray-500">You Earn</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{booking.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
