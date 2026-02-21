import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import CarCard from "../components/CarCard";
import API from "../api";
import { adaptCar } from "../utils/carAdapter";

export default function BrowseCars() {
  const [params] = useSearchParams();

  // ✅ values coming from Home filter
  const initialCity = params.get("city") || "";
  const initialType = params.get("type") || "";
  const initialPrice = params.get("price") || "";

  // ⭐ NEW — CRITICAL FIX
  const initialFrom = params.get("from") || "";
  const initialTo = params.get("to") || "";

  const [cars, setCars] = useState([]);
  const [bookingsMap, setBookingsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState(initialCity);

  // ⭐ FIXED — now synced with Home
  const [fromDate, setFromDate] = useState(initialFrom);
  const [toDate, setToDate] = useState(initialTo);

  const [sort, setSort] = useState("");

  // ================= FETCH CARS + BOOKINGS =================
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await API.get("/api/cars");
        const adapted = res.data.map(adaptCar);
        setCars(adapted);

        // 🔥 fetch bookings per car (required for availability)
        const bookingResults = await Promise.all(
          adapted.map((car) =>
            API.get(`/api/bookings/car/${car.id}`).catch(() => ({ data: [] }))
          )
        );

        const map = {};
        adapted.forEach((car, index) => {
          map[car.id] = bookingResults[index].data || [];
        });

        setBookingsMap(map);
      } catch (err) {
        console.error("Cars fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ================= AVAILABILITY CHECK =================
  const isCarAvailable = (carId) => {
    if (!fromDate || !toDate) return true;

    const ranges = bookingsMap[carId] || [];
    const start = new Date(fromDate);
    const end = new Date(toDate);

    return !ranges.some((b) => {
      const bookedStart = new Date(b.fromDate);
      const bookedEnd = new Date(b.toDate);
      return start <= bookedEnd && end >= bookedStart;
    });
  };

  // ================= FILTERED RESULT =================
  let result = useMemo(() => {
    let filtered = cars.filter((car) => {
      return (
        (!search ||
          car.name.toLowerCase().includes(search.toLowerCase())) &&
        (!city ||
          car.city?.toLowerCase().includes(city.toLowerCase())) &&
        (!initialType || car.type === initialType) &&
        (!initialPrice || car.price <= Number(initialPrice)) &&
        isCarAvailable(car.id)
      );
    });

    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [
    cars,
    search,
    city,
    sort,
    fromDate,
    toDate,
    initialType,
    initialPrice,
    bookingsMap,
  ]);

  // ================= CLEAR =================
  const clearFilters = () => {
    setSearch("");
    setCity("");
    setFromDate("");
    setToDate("");
    setSort("");
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
      {/* Heading */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
          Available Cars
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Find the perfect ride for your journey
        </p>
      </div>

      {/* ⭐ PREMIUM SaaS FILTER */}
      <div className="md:sticky md:top-20 md:sm-top-24 md:z-10 mb-8 sm:mb-12 lg:mb-14">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:flex-wrap lg:flex-nowrap">

              {/* Search car (full width on mobile) */}
              <input
                placeholder="Search cars"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-56 lg:w-64 border border-gray-200 bg-white px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl text-sm md:text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition"
              />

              {/* City */}
              <input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full md:w-40 lg:w-44 border border-gray-200 bg-white px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition"
              />

              {/* From */}
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full md:w-40 lg:w-44 border border-gray-200 bg-white px-3 py-2.5 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition"
              />

              {/* To */}
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full md:w-40 lg:w-44 border border-gray-200 bg-white px-3 py-2.5 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition"
              />

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full md:w-32 lg:w-36 border border-gray-200 bg-white px-3 py-2.5 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition"
              >
                <option value="">Sort</option>
                <option value="low">Price Low-High</option>
                <option value="high">Price High-Low</option>
              </select>

              {/* Clear */}
              <div className="w-full md:w-auto">
                <button
                  onClick={clearFilters}
                  className="w-full md:w-auto px-3 sm:px-4 py-2.5 text-sm font-medium text-blue-900 border border-blue-200 rounded-lg sm:rounded-xl hover:bg-blue-50 transition"
                >
                  Clear
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Result Count */}
      <p className="text-sm sm:text-base font-semibold tracking-wide text-gray-700 mb-8 sm:mb-10 lg:mb-12 text-center">
        Showing {result.length} cars
      </p>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 sm:h-72 bg-gray-200 rounded-lg sm:rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && result.length === 0 && (
        <p className="col-span-full text-center text-gray-600 mt-12 sm:mt-20 text-sm sm:text-base">
          No cars match your filters 🚗
        </p>
      )}

      {/* Cars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {result.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

