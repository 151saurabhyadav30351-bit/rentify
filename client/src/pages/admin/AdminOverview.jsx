import { useEffect, useState } from "react";
import API from "../../api";
import { Users, Car, CalendarCheck } from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/api/admin/stats");
        setStats(res.data || {});
      } catch (err) {
        console.error("Admin stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: Users,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Cars",
      value: stats.totalCars ?? 0,
      icon: Car,
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings ?? 0,
      icon: CalendarCheck,
      bg: "bg-violet-50",
      iconBg: "bg-violet-100 text-violet-700",
    },
  ];

  const isEmpty =
    !stats.totalUsers &&
    !stats.totalCars &&
    !stats.totalBookings;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage the platform efficiently
        </p>
      </div>

      {/* ✅ LOADING SKELETON */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border shadow-sm animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-8 w-16 bg-gray-200 rounded" />
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* ✅ STATS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`${card.bg} rounded-2xl p-6 border shadow-sm hover:shadow-md transition`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {card.title}
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 mt-1">
                      {card.value}
                    </h2>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
                  >
                    <card.icon size={22} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ EMPTY STATE (only when platform fresh) */}
          {isEmpty && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-yellow-800">
              Platform has no data yet. Once users start using Rentify,
              stats will appear here.
            </div>
          )}
        </>
      )}

      {/* Welcome Panel */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Welcome, Admin !
        </h2>
        <p className="text-gray-500 mt-1">
          Monitor users, cars, and bookings from your control center.
        </p>
      </div>
    </div>
  );
}