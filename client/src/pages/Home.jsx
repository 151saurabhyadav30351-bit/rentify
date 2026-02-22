import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/main_car.png";
import API from "../api";
import { adaptCar } from "../utils/carAdapter";
import CarCard from "../components/CarCard";
import { useUser } from "../UserContext";
import {
  Search,
  CalendarCheck,
  Car,
  Handshake,
  IndianRupee,
  MapPin,
  ShieldCheck,
} from "lucide-react";
export default function Home() {
  const navigate = useNavigate();

  const [featuredCars, setFeaturedCars] = useState([]);

  const { user } = useUser();
  const isLoggedIn = !!user;
  const isHost = user?.isHost;
  // ✅ existing filters
  const [city, setCity] = useState("");
  const [carType, setCarType] = useState("");
  const [price, setPrice] = useState("");

  // ⭐ NEW (important)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    API.get("/api/cars").then((res) => {
      setFeaturedCars(res.data.map(adaptCar).slice(0, 3));
    });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="relative overflow-hidden min-h-[90vh] pb-32 md:pb-56"
        style={{
          background: `
            linear-gradient(
              135deg,
              #0f2a44 0%,
              #1e3a8a 25%,
              #2563eb 55%,
              #14b8a6 100%
            )
          `,
          color: "#fff",
        }}
      >
        {/* DOT BG */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.35) 1.2px, transparent 1.2px)",
            backgroundSize: "26px 26px",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />

        {/* GLOW BLOBS */}
        <div className="absolute top-32 left-40 w-80 h-80 rounded-full bg-cyan-300/40 blur-[120px]" />
        <div className="absolute bottom-40 right-40 w-[420px] h-[420px] rounded-full bg-blue-400/40 blur-[140px]" />

        {/* HERO CONTENT */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full px-4 sm:px-6 lg:px-[80px] py-16 sm:py-24 lg:pt-[100px] lg:pb-[180px] gap-8 lg:gap-0 relative z-10">
          {/* LEFT */}
          <div className="max-w-2xl lg:max-w-[520px]">
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] xl:text-[52px] font-extrabold leading-[1.2]">
              Drive Your Way with <br /> Rentify
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-[18px] opacity-90">
              Find affordable, reliable cars near you in minutes.
            </p>

            <Link to="/cars">
              <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg hover:shadow-xl active:scale-95">
                Browse Cars
              </button>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src={heroImage}
            alt="Car"
            className="w-full sm:max-w-md lg:w-[700px] lg:max-w-none object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] lg:translate-y-5 hidden sm:block"
          />
        </div>

        {/* ================= ELITE HERO SEARCH ================= */}
        <div className="relative md:absolute md:bottom-52 md:left-1/2 md:-translate-x-1/2 w-full px-6 mt-6 md:mt-0 z-20">
          <div className="max-w-5xl mx-auto">

            <div className="
              bg-white/95 backdrop-blur-sm
              border border-white/30
              shadow-lg md:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
              rounded-2xl
              p-3 md:p-4
            ">

              <div className="flex flex-col md:flex-row md:items-center gap-3">

        {/* Pickup Location */}
        <div className="flex-1 md:border-r md:border-gray-200 md:pr-4">
          <label className="text-xs font-semibold text-gray-500">
            Pickup Location
          </label>
          <input
            type="text"
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="
  w-full mt-1 text-sm
  text-gray-800
  bg-gray-50/80
  border border-gray-200
  rounded-lg
  px-3 py-2
  focus:bg-white
  focus:ring-2 focus:ring-blue-600/30
  focus:border-blue-600
  outline-none
"

          />
        </div>

        {/* Pickup Date */}
        <div className="flex-1 md:border-r md:border-gray-200 md:px-4">
          <label className="text-xs font-semibold text-gray-500">
            Pick-up Date
          </label>
          <input
  type="date"
  value={fromDate}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) => setFromDate(e.target.value)}
  className="
    w-full mt-1 text-sm
    text-gray-800
    bg-gray-50/80
    border border-gray-200
    rounded-lg
    px-3 py-2
    focus:bg-white
    focus:ring-2 focus:ring-blue-600/30
    focus:border-blue-600
    outline-none
    transition
  "
/>

        </div>

        {/* Return Date */}
        <div className="flex-1 md:px-4">
          <label className="text-xs font-semibold text-gray-500">
            Return Date
          </label>
          <input
  type="date"
  value={toDate}
  min={fromDate || new Date().toISOString().split("T")[0]}
  onChange={(e) => setToDate(e.target.value)}
  className="
    w-full mt-1 text-sm
    text-gray-800
    bg-gray-50/80
    border border-gray-200
    rounded-lg
    px-3 py-2
    focus:bg-white
    focus:ring-2 focus:ring-blue-600/30
    focus:border-blue-600
    outline-none
    transition
  "
/>

        </div>

        {/* Search Button */}
        <button
          onClick={() =>
            navigate(
              `/cars?city=${city}&type=${carType}&price=${price}&from=${fromDate}&to=${toDate}`
            )
          }
          className="
            md:ml-2
            bg-blue-600 hover:bg-blue-700
            text-white
            px-8 py-3
            rounded-xl
            font-semibold
            shadow-lg
            hover:shadow-xl
            transition-all duration-200
            active:scale-[0.97]
            whitespace-nowrap
          "
        >
          Search
        </button>

      </div>
    </div>
  </div>
</div>

        {/* STATS */}
        <div className="relative md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2 w-full px-4 text-white z-10 mt-4 md:mt-0">
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-16 text-center">
            {[
              { value: "500+", label: "Cars Available" },
              { value: "50K+", label: "Happy Customers" },
              { value: "100+", label: "Cities Covered" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/12 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-lg border border-white/20 shadow-sm"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm opacity-85">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FEATURED CARS (UNCHANGED) ===== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Featured Cars
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Check out our most popular vehicles, trusted by thousands of customers.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8"
          >
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8 lg:mt-10">
            <Link
              to="/cars"
              className="inline-block border-2 border-blue-900 text-blue-900 bg-transparent px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition hover:bg-blue-900 hover:text-white text-sm sm:text-base"
            >
              Explore All Cars →
            </Link>
          </div>
        </div>
      </section>

            {/* HOW IT WORKS SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
              How It Works
            </h2>
            <p className="text-gray-600 mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              Renting a car with Rentify is simple, fast, and hassle-free.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">

            {/* STEP 1 */}
            <div className="relative text-center p-6 sm:p-8 pt-16 sm:pt-20 rounded-2xl shadow-md bg-white hover:shadow-xl transition transform hover:-translate-y-1">
              {/* Number Circle */}
              <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold text-xl sm:text-2xl shadow-lg border-4 border-white">
                1
              </div>
              <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Search className="w-8 sm:w-10 h-8 sm:h-10 text-blue-700" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                Choose Your Car
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
                Find the perfect car based on your location, budget, and needs.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="relative text-center p-6 sm:p-8 pt-16 sm:pt-20 rounded-2xl shadow-md bg-white hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold text-xl sm:text-2xl shadow-lg border-4 border-white">
                2
              </div>
              <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
                <CalendarCheck className="w-8 sm:w-10 h-8 sm:h-10 text-blue-700" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                Book Easily
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
                Choose your dates and confirm your booking in just a few clicks.
              </p>
            </div>

            {/* STEP 3 */}
            <div className="relative text-center p-6 sm:p-8 pt-16 sm:pt-20 rounded-2xl shadow-md bg-white hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold text-xl sm:text-2xl shadow-lg border-4 border-white">
                3
              </div>
              <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Car className="w-8 sm:w-10 h-8 sm:h-10 text-blue-700" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                Drive & Enjoy
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
                Pick up your car and enjoy a smooth, comfortable ride.
              </p>
            </div>

          </div>
        </div>
      </section>

            
        {/* WHY CHOOSE RENTIFY */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Why Ride with Rentify?
            </h2>
            <p className="text-gray-600 mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              A smarter, community-driven way to rent cars and earn from your own vehicle.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

            {/* Feature 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                <Handshake className="w-6 sm:w-7 h-6 sm:h-7 text-blue-700" strokeWidth={2.2} />
              </div>
              <h3 className="font-semibold text-blue-900 text-base sm:text-lg">
                Direct P2P Rentals
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
                Rent cars directly from verified local owners without traditional rental agencies.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                <IndianRupee className="w-6 sm:w-7 h-6 sm:h-7 text-blue-700" strokeWidth={2.2} />
              </div>
              <h3 className="font-semibold text-blue-900 text-base sm:text-lg">
                Earn with Your Car
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
                Car owners can list their vehicles and generate income from unused cars.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                <MapPin className="w-6 sm:w-7 h-6 sm:h-7 text-blue-700" strokeWidth={2.2} />
              </div>
              <h3 className="font-semibold text-blue-900 text-base sm:text-lg">
                Local & Flexible
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
                Find nearby cars with flexible pricing and multiple vehicle options.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="w-6 sm:w-7 h-6 sm:h-7 text-blue-700" strokeWidth={2.2} />
              </div>
              <h3 className="font-semibold text-blue-900 text-base sm:text-lg">
                Community Trust
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 sm:mt-3">
                A transparent and trusted platform for both renters and hosts.
              </p>
            </div>
          </div>
        </div>
      </section>
  
      {/* CTA SECTION */}
      <section className="py-12 sm:py-16 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] bg-gradient-to-r from-blue-900 via-blue-700 to-teal-500 px-4 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 text-center text-white shadow-xl">

            {/* Decorative Circles - Hidden on mobile */}
            <div className="hidden lg:block absolute top-10 left-16 w-40 h-40 rounded-full border border-white/20" />
            <div className="hidden lg:block absolute bottom-16 right-20 w-56 h-56 rounded-full border border-white/20" />
            <div className="hidden lg:block absolute bottom-24 left-1/3 w-32 h-32 rounded-full border border-white/10" />
            
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
              Ready to Hit the Road?
            </h2>

            {/* Sub Text */}
            <p className="mt-3 sm:mt-4 lg:mt-5 text-white/80 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
              Join thousands of satisfied customers who trust Rentify for their car rental needs. Browse our selection and book your perfect ride today.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10">

              {/* Browse */}
              <Link
                to="/cars"
                className="bg-white text-blue-900 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Browse & Book Cars →
              </Link>

              {/* ⭐ SMART CTA */}
              {!isLoggedIn ? (
                <Link
                  to="/auth"
                  className="bg-white/15 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition text-sm sm:text-base"
                >
                  Become a Host
                </Link>
              ) : !isHost ? (
                <Link
                  to="/host"
                  className="bg-white/15 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition text-sm sm:text-base"
                >
                  Become a Host
                </Link>
              ) : (
                <Link
                  to="/dashboard/manage-cars"
                  className="bg-white/15 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-white hover:text-blue-900 transition text-sm sm:text-base"
                >
                  Manage Your Cars
                </Link>
              )}

            </div>
          </div>

        </div>
      </section>

    </>
  )
}
