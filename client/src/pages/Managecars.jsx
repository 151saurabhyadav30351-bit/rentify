import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";
import { Loader2, Pencil, Trash2, CarFront } from "lucide-react";

export default function Managecars() {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCars = () => {
    setLoading(true);

    API.get("/api/cars/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setMyCars(res.data))
      .catch(() => toast.error("Failed to load cars"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await API.delete(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Car deleted");
      fetchCars();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (car) => {
    navigate(`/dashboard/edit-car/${car._id}`);
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 max-w-5xl">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Manage Cars
        </h1>
        <p className="text-gray-500 text-sm">
          View and manage your listed vehicles.
        </p>
      </div>

      {/* Container */}
      <div className="max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-blue-900" size={30} />
          </div>
        )}

        {/* Empty */}
        {!loading && myCars.length === 0 && (
          <div className="text-center py-16">
            <CarFront className="mx-auto text-gray-400 mb-3" size={36} />
            <h3 className="font-semibold text-gray-900">
              No cars listed yet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Add your first car to start accepting bookings.
            </p>
            <button
              onClick={() => navigate("/dashboard/add-car")}
              className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
            >
              Add Car
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && myCars.length > 0 && (
          <div>
            {/* Header Row */}
            <div className="grid grid-cols-12 px-6 py-3 text-xs font-semibold text-gray-900 border-b bg-gray-50">
              <div className="col-span-6">Car</div>
              <div className="col-span-3">City</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Data Rows */}
            {myCars.map((car) => (
              <div
                key={car._id}
                className="group grid grid-cols-12 items-center px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-all duration-200"
              >
                {/* Car Info */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {car.image ? (
                      <img
                        src={car.image}
                        alt={car.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No img
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 leading-tight">
                      {car.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seats || 4} seats •{" "}
                      {car.transmission || "Manual"}
                    </p>
                  </div>
                </div>

                {/* City */}
                <div className="col-span-3 text-sm text-gray-600">
                  {car.city}
                </div>

                {/* Price */}
                <div className="col-span-2 font-semibold text-gray-900">
                  ₹{car.pricePerDay}
                  <span className="text-gray-400 text-xs">/day</span>
                </div>

                {/* ⭐ PREMIUM ACTIONS */}
                <div className="col-span-1 flex justify-end">
                  <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-1 shadow-sm group-hover:shadow-md transition-all duration-200">
                    
                    <button
                      onClick={() => handleEdit(car)}
                      className="p-2 rounded-md text-gray-500 hover:text-blue-900 hover:bg-white transition-all duration-150"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(car._id)}
                      className="p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-white transition-all duration-150"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
