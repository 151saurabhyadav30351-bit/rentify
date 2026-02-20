import { Link } from "react-router-dom";
import { Users, Gauge, Fuel } from "lucide-react";

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">

      <img
        src={car.image}
        alt={car.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <span className="inline-block text-xs font-medium bg-blue-900/10 text-blue-900 px-3 py-1 rounded-full mb-2">
            {car.type}
            </span>


        <h3 className="text-lg font-semibold text-blue-900 mt-3">
          {car.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          City: {car.city}
        </p>

        {/* Specs */}
        <div className="text-sm text-gray-500 mt-3 flex gap-5">

          <span className="flex items-center gap-1">
            <Users size={14} />
            {car.seats}
          </span>

          <span className="flex items-center gap-1">
            <Gauge size={14} />
            {car.transmission}
          </span>

          <span className="flex items-center gap-1">
            <Fuel size={14} />
            {car.fuel}
          </span>

        </div>

        <div className="flex justify-between items-center mt-4">

          <p className="text-blue-900 font-bold text-lg">
            ₹{car.price}
            <span className="text-sm text-gray-500">/day</span>
          </p>

          <Link
            to={`/cars/${car.id}`}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
}
