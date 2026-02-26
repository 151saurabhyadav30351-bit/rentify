import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  Users,
  Gauge,
  Fuel,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import API from "../api";
import { adaptCar } from "../utils/carAdapter";
import { BookingContext } from "../BookingContext";
import CarDetailsSkeleton from "../components/skeletons/CarDetailsSkeleton";
import toast from "react-hot-toast";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useContext(BookingContext);

  const [car, setCar] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [bookedRanges, setBookedRanges] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  const token = localStorage.getItem("token");

  // ⭐ NEW — detect admin safely (no backend change)
  let isAdmin = false;
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload?.isAdmin || false;
    }
  } catch {
    isAdmin = false;
  }

  // ================= FETCH CAR =================
  useEffect(() => {
    API.get(`/api/cars/${id}`).then((res) => {
      setCar(adaptCar(res.data));
    });
  }, [id]);

  // ================= FETCH BOOKINGS =================
  useEffect(() => {
    if (!id) return;

    API.get(`/api/bookings/car/${id}`)
      .then((res) => setBookedRanges(res.data))
      .catch(() => {});
  }, [id]);

  // ================= DATE BLOCK CHECK =================
  const isDateBlocked = () => {
    if (!fromDate || !toDate) return false;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    return bookedRanges.some((b) => {
      const bookedStart = new Date(b.fromDate);
      const bookedEnd = new Date(b.toDate);
      return start <= bookedEnd && end >= bookedStart;
    });
  };

  const isValidRange =
    fromDate &&
    toDate &&
    new Date(toDate) > new Date(fromDate) &&
    !isDateBlocked();

  // ================= AVAILABILITY =================
  const isAvailable =
    bookedRanges.length === 0 ||
    (fromDate && toDate ? !isDateBlocked() : true);

  // ================= PRICE =================
  useEffect(() => {
    if (isValidRange && car) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      setDays(diff);
      setTotal(diff * car.price);
    } else {
      setDays(0);
      setTotal(0);
    }
  }, [fromDate, toDate, car, isValidRange]);

  // ================= AUTO FIX INVALID =================
  useEffect(() => {
    if (!fromDate || !toDate) return;
    if (isDateBlocked()) setToDate("");
  }, [fromDate]);

  const today = new Date().toISOString().split("T")[0];

  if (!car) return <CarDetailsSkeleton />;

  // =====================================================
  // ⭐⭐ PROFESSIONAL BOOK HANDLER (ADMIN SAFE)
  // =====================================================
  const handleBooking = async () => {
    // 🚨 NOT LOGGED IN
    if (!token) {
      toast.error("Please login to continue booking");
      navigate("/auth");
      return;
    }

    // 🔴 NEW — ADMIN BLOCK (frontend UX guard)
    if (isAdmin) {
      toast.error("Admin accounts cannot book cars");
      return;
    }

    if (isDateBlocked()) return;

    try {
      setIsChecking(true);

      await addBooking({
        carId: car.id,
        price: car.price,
        city: car.city,
        fromDate,
        toDate,
        days,
        total,
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="pt-24 md:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
      {/* Back */}
      <Link
        to="/cars"
        className="flex items-center gap-2 text-gray-500 hover:text-blue-900 mb-4 sm:mb-6 text-xs sm:text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to all cars
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden">
            <img
              src={
                car.image?.trim()
                  ? car.image
                  : `https://ui-avatars.com/api/?name=${car.name}&background=0F2D52&color=fff`
              }
              alt={car.name}
              className="w-full h-[440px] object-contain bg-gray-100"
            />

            <span
              className={`absolute top-5 left-5 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable for selected dates"}
            </span>
          </div>

          <div className="mt-6 sm:mt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {car.name}
            </h1>

            <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
              <MapPin size={16} className="sm:w-5 sm:h-5" />
              <span>
                {car.type} • {car.city}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 mt-6 sm:mt-8 text-sm sm:text-base text-gray-700">
              <span className="flex items-center gap-2 sm:gap-3">
                <Users size={18} className="sm:w-6 sm:h-6" />
                {car.seats} Seats
              </span>

              <span className="flex items-center gap-2 sm:gap-3">
                <Gauge size={18} className="sm:w-6 sm:h-6" />
                {car.transmission}
              </span>

              <span className="flex items-center gap-2 sm:gap-3">
                <Fuel size={18} className="sm:w-6 sm:h-6" />
                {car.fuel}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-7 lg:sticky lg:top-28">
            <div className="flex items-end justify-between mb-4 sm:mb-5">
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-900">
                ₹{car.price}
              </p>
              <span className="text-xs sm:text-sm font-semibold text-gray-500">
                / day
              </span>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {/* Pickup */}
              <input
                type="date"
                min={today}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900 outline-none"
              />

              {/* Return */}
              <input
                type="date"
                min={fromDate || today}
                value={toDate}
                disabled={!fromDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900 outline-none disabled:bg-gray-100"
              />

              {/* Total */}
              {isValidRange && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-xs sm:text-sm font-semibold text-blue-900">
                  {days} days × ₹{car.price} = ₹{total}
                </div>
              )}

              {/* ⭐ ADMIN SAFE BUTTON */}
              <button
                disabled={!isValidRange || isChecking || isAdmin}
                onClick={handleBooking}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition disabled:opacity-50"
              >
                {isAdmin
                  ? "Admins cannot book"
                  : isChecking
                  ? "Booking your ride..."
                  : "Book Now"}
              </button>

              <p className="text-xs text-center text-gray-400">
                No credit card required to reserve
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}