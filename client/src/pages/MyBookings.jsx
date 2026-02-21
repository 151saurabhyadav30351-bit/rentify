import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../BookingContext";
import { CalendarDays, MapPin, XCircle, CarFront } from "lucide-react";
import toast from "react-hot-toast";

export default function MyBookings() {
  const { bookings, fetchBookings, cancelBooking } =
    useContext(BookingContext);

  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ newest first
  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ================= CANCEL HANDLER =================
  const handleCancel = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!ok) return;

    try {
      setCancelingId(id);
      await cancelBooking(id);
      toast.success("Booking cancelled successfully");
    } catch {
      toast.error("Failed to cancel booking");
    } finally {
      setCancelingId(null);
    }
  };

  return (
    // ⭐ DASHBOARD-NATIVE WRAPPER (FIXED)
    <div className="p-4 md:p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 md:mb-10 max-w-5xl">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          My Bookings
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          View and manage your all car bookings
        </p>
      </div>

      {/* Empty State */}
      {sortedBookings.length === 0 ? (
        <div className="max-w-5xl text-center py-16 md:py-24 bg-white rounded-2xl shadow">
          <CarFront
            size={40}
            className="mx-auto text-gray-300 mb-3"
          />
          <p className="text-gray-400 text-base md:text-lg">
            You don't have any bookings yet
          </p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6 max-w-5xl">
          {sortedBookings.map((booking, index) => (
            <div
              key={booking._id || index}
              className="bg-white border rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-6"
            >
              {/* ================= IMAGE (Full width on mobile, shrunk on desktop) ================= */}
              <img
                src={
                  booking.car?.image ||
                  `https://ui-avatars.com/api/?name=${booking.car?.title}`
                }
                alt={booking.car?.title}
                className="w-full lg:w-40 h-44 lg:h-24 rounded-xl object-cover bg-gray-100 mb-4 lg:mb-0 lg:flex-shrink-0"
              />

              {/* ================= MIDDLE (Info - naturally block on mobile) ================= */}
              <div className="space-y-3 mb-4 lg:mb-0 lg:flex-1">
                <div>
                  <span className="inline-block text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg">
                    Booking #{index + 1}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {booking.car?.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {booking.car?.brand}
                  </p>
                </div>

                {/* Rental period */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CalendarDays size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Rental Period</p>
                    <p className="text-gray-600">
                      {formatDate(booking.fromDate)} to {formatDate(booking.toDate)}
                    </p>
                  </div>
                </div>

                {/* Pickup */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Pick-up Location</p>
                    <p className="text-gray-600">{booking.city}</p>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT (Price + Button - naturally block on mobile) ================= */}
              <div className="flex flex-col items-start gap-4 lg:items-end lg:min-w-[200px]">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-600">
                    ₹{booking.totalAmount}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Booked on {formatDate(booking.createdAt)}
                  </p>
                </div>

                <button
                  onClick={() => handleCancel(booking._id)}
                  disabled={cancelingId === booking._id}
                  className="w-full lg:w-auto flex items-center justify-center lg:justify-end gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition disabled:opacity-50"
                >
                  <XCircle size={18} />
                  {cancelingId === booking._id ? "Cancelling..." : "Cancel Booking"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
