import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-32 px-6 text-center">

      <div className="max-w-md mx-auto">

        <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-6">
          <AlertTriangle className="text-blue-900" size={36} />
        </div>

        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          404
        </h1>

        <p className="text-gray-500 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition shadow"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
}
