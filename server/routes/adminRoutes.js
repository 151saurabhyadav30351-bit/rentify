import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  getAdminStats,
  getAllUsers,
  toggleBlockUser,
  deleteUserAdmin,
  getAllCarsAdmin,
  getAllBookingsAdmin,
  toggleDisableCarAdmin,
  deleteCarAdmin,
  cancelBookingAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// 🔐 ALL admin routes protected twice
router.get("/stats", protect, adminOnly, getAdminStats);

// 👤 USER MANAGEMENT
router.get("/users", protect, adminOnly, getAllUsers);
router.patch("/users/:id/block", protect, adminOnly, toggleBlockUser);
router.delete("/users/:id", protect, adminOnly, deleteUserAdmin);

// 🚗 CARS
router.get("/cars", protect, adminOnly, getAllCarsAdmin);
router.patch("/cars/:id/disable", protect, adminOnly, toggleDisableCarAdmin);
router.delete("/cars/:id", protect, adminOnly, deleteCarAdmin);

// 📅 BOOKINGS
router.get("/bookings", protect, adminOnly, getAllBookingsAdmin);
router.delete("/bookings/:id", protect, adminOnly, cancelBookingAdmin);

export default router;