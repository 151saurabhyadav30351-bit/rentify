import { Link } from "react-router-dom";
import { Users, Gauge, Fuel } from "lucide-react";

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">

      <img
        src={car.image}
        alt={car.name}
        className="h-36 sm:h-48 md:h-56 w-full object-cover"
      />

      <div className="p-3 sm:p-5">

        <span className="inline-block text-xs font-medium bg-blue-900/10 text-blue-900 px-2 sm:px-3 py-0.5 rounded-full mb-2">
          {car.type}
        </span>

        <h3 className="text-sm sm:text-lg font-semibold text-blue-900 mt-1 sm:mt-3">
          {car.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          City: {car.city}
        </p>

        {/* Specs */}
        <div className="text-xs sm:text-sm text-gray-500 mt-2 flex gap-2 sm:gap-5 flex-wrap">

          <span className="flex items-center gap-1">
            <Users size={12} className="sm:w-4 sm:h-4" />
            {car.seats}
          </span>

          <span className="flex items-center gap-1">
            <Gauge size={12} className="sm:w-4 sm:h-4" />
            {car.transmission}
          </span>

          <span className="flex items-center gap-1">
            <Fuel size={12} className="sm:w-4 sm:h-4" />
            {car.fuel}
          </span>

        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mt-3 sm:mt-4">

          <p className="text-blue-900 font-bold text-sm sm:text-lg">
            ₹{car.price}
            <span className="text-xs sm:text-sm text-gray-500">/day</span>
          </p>

          <Link
            to={`/cars/${car.id}`}
            className="bg-blue-900 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-800 transition text-xs sm:text-sm font-medium text-center"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
}
