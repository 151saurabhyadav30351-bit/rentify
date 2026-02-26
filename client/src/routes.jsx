import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseCars from "./pages/BrowseCars";
import CarDetails from "./pages/CarDetails";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/DashboardLayout";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import AddCar from "./pages/AddCar";
import ManageCars from "./pages/Managecars";
import Host from "./pages/Host";
import EditCar from "./pages/EditCar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCars from "./pages/admin/AdminCars";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminContacts from "./pages/admin/AdminContacts";
// ⭐ NEW
import HostBookings from "./pages/HostBookings";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<BrowseCars />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/host" element={<Host />} />

      {/* Dashboard */}
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="add-car" element={<AddCar />} />
        <Route path="manage-cars" element={<ManageCars />} />
        <Route path="edit-car/:id" element={<EditCar />} />

        {/* ⭐ NEW HOST ROUTE */}
        <Route path="host-bookings" element={<HostBookings />} />
      </Route>
        {/* ⭐ ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="support" element={<AdminContacts />} />
        </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
