import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { Users, Car, CalendarCheck } from "lucide-react";

export default function AdminOverview() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
  });

  const [preview, setPreview] = useState({
    users: [],
    cars: [],
    bookings: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, carsRes, bookingsRes] =
          await Promise.all([
            API.get("/api/admin/stats"),
            API.get("/api/admin/users"),
            API.get("/api/admin/cars"),
            API.get("/api/admin/bookings"),
          ]);

        setStats(statsRes.data || {});

        setPreview({
          users: usersRes.data?.slice(0, 2) || [],
          cars: carsRes.data?.slice(0, 2) || [],
          bookings: bookingsRes.data?.slice(0, 2) || [],
        });
      } catch (err) {
        console.error("Admin overview error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB");

  const getRoleBadge = (u) => {
    if (u.isAdmin)
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
          Admin
        </span>
      );
    if (u.isHost)
      return (
        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
          Host
        </span>
      );
    return (
      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
        User
      </span>
    );
  };

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

      {/* ===== STATS CARDS (UNCHANGED) ===== */}
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
      )}

      {/* ✅ Welcome (spacing improved) */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Welcome, Admin !
        </h2>
        <p className="text-gray-500 mt-1">
          Monitor users, cars, and bookings from your control center.
        </p>
      </div>

      {/* ===== 🔥 SaaS TABLE PANELS — POLISHED ===== */}
      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        {/* USERS */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/70">
            <h3 className="font-semibold text-gray-900">
              Users 
            </h3>
          </div>

          <div className="divide-y divide-gray-100 flex-1">
            {preview.users.length === 0 ? (
              <p className="p-6 text-sm text-gray-500 text-center">
                No users yet
              </p>
            ) : (
              preview.users.map((u) => (
                <div
                  key={u._id}
                  className="px-5 py-4 flex items-center justify-between hover:bg-gray-50/60 transition"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {u.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {u.email}
                    </p>
                  </div>
                  {getRoleBadge(u)}
                </div>
              ))
            )}
          </div>

          <div className="p-4 mt-auto">
            <button
              onClick={() => navigate("/admin/users")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition"
            >
              View All Users →
            </button>
          </div>
        </div>

        {/* CARS */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/70">
            <h3 className="font-semibold text-gray-900">
              Car Listings
            </h3>
          </div>

          <div className="divide-y divide-gray-100 flex-1">
            {preview.cars.length === 0 ? (
              <p className="p-6 text-sm text-gray-500 text-center">
                No cars yet
              </p>
            ) : (
              preview.cars.map((c) => (
                <div
                  key={c._id}
                  className="px-5 py-4 flex items-center justify-between hover:bg-gray-50/60 transition"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {c.brand} {c.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Owner: {c.owner?.name || "—"}
                    </p>
                  </div>

                  <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="p-4 mt-auto">
            <button
              onClick={() => navigate("/admin/cars")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition"
            >
              View All Cars →
            </button>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col h-full">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/70">
            <h3 className="font-semibold text-gray-900">
              Recent Bookings
            </h3>
          </div>

          <div className="divide-y divide-gray-100 flex-1">
            {preview.bookings.length === 0 ? (
              <p className="p-6 text-sm text-gray-500 text-center">
                No bookings yet
              </p>
            ) : (
              preview.bookings.map((b) => (
                <div
                  key={b._id}
                  className="px-5 py-4 hover:bg-gray-50/60 transition"
                >
                  <p className="font-medium text-gray-900">
                    {b.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {b.car?.brand} {b.car?.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(b.fromDate)} —{" "}
                    {formatDate(b.toDate)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="p-4 mt-auto">
            <button
              onClick={() => navigate("/admin/bookings")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition"
            >
              View All Bookings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}