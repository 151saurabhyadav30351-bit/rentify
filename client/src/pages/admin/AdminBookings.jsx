import { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/api/admin/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Admin bookings error:", err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ================= CANCEL =================
  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      setActionLoading(bookingId);

      await API.delete(`/api/admin/bookings/${bookingId}`);

      setBookings((prev) =>
        prev.filter((b) => b._id !== bookingId)
      );

      toast.success("Booking cancelled by admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading bookings...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        All Bookings
      </h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 backdrop-blur text-gray-600">
            <tr>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Car</th>
              <th className="text-left p-4">Dates</th>
              <th className="text-left p-4">Total</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
        {bookings.length === 0 ? (
            <tr>
            <td colSpan="5" className="p-10 text-center text-gray-500">
                <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-medium">
                    No bookings found
                </span>
                <span className="text-sm text-gray-400">
                    Once users start booking cars, they will appear here.
                </span>
                </div>
            </td>
            </tr>
        ) : (
            bookings.map((b) => (
            <tr
                key={b._id}
                className="border-t hover:bg-gray-50 transition"
            >
                <td className="p-4">{b.user?.name}</td>

                <td className="p-4">
                {b.car?.brand} {b.car?.title}
                </td>

                <td className="p-4 text-gray-600">
                {new Date(b.fromDate).toLocaleDateString()} —{" "}
                {new Date(b.toDate).toLocaleDateString()}
                </td>

                <td className="p-4 font-medium">
                ₹{b.totalAmount}
                </td>

                <td className="p-4">
                <button
                    onClick={() => handleCancelBooking(b._id)}
                    disabled={actionLoading === b._id}
                    className="px-3 py-1.5 text-xs rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50"
                >
                    {actionLoading === b._id
                    ? "Please..."
                    : "Cancel"}
                </button>
                </td>
            </tr>
            ))
        )}
        </tbody>
        </table>
      </div>
    </div>
  );
}