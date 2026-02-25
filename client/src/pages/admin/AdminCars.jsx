import { useEffect, useState } from "react";
import API from "../../api";
import toast from "react-hot-toast";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get("/api/admin/cars");
        setCars(res.data);
      } catch (err) {
        console.error("Admin cars error:", err);
        toast.error("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ================= DISABLE =================
  const handleToggleDisable = async (carId) => {
    try {
      setActionLoading(carId);

      const res = await API.patch(`/api/admin/cars/${carId}/disable`);

      setCars((prev) =>
        prev.map((c) =>
          c._id === carId ? { ...c, isDisabled: res.data.isDisabled } : c
        )
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  // ================= DELETE =================
  const handleDeleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirmDelete) return;

    try {
      setActionLoading(carId);

      await API.delete(`/api/admin/cars/${carId}`);

      setCars((prev) => prev.filter((c) => c._id !== carId));

      toast.success("Car deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(null);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <p className="text-gray-500">Loading cars...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        All Cars
      </h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/80 backdrop-blur text-gray-600">
            <tr>
              <th className="text-left p-4">Car</th>
              <th className="text-left p-4">City</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Owner</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => (
              <tr
                key={car._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">
                  {car.brand} {car.title}
                </td>

                <td className="p-4 text-gray-600">{car.city}</td>

                <td className="p-4">₹{car.pricePerDay}</td>

                <td className="p-4 text-gray-600">
                  {car.owner?.name || "—"}
                </td>

                <td className="p-4">
                  {car.isDisabled ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      Disabled
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                      Active
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleToggleDisable(car._id)}
                      disabled={actionLoading === car._id}
                      className={`px-3 py-1.5 text-xs rounded-lg font-medium transition
                        ${
                          car.isDisabled
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        }
                        disabled:opacity-50`}
                    >
                      {actionLoading === car._id
                        ? "Please..."
                        : car.isDisabled
                        ? "Enable"
                        : "Disable"}
                    </button>

                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      disabled={actionLoading === car._id}
                      className="px-3 py-1.5 text-xs rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}