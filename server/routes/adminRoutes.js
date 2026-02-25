import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import {
  getAdminStats,
  getAllUsers,
  getAllCarsAdmin,
  getAllBookingsAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// 🔐 ALL admin routes protected twice
router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/cars", protect, adminOnly, getAllCarsAdmin);
router.get("/bookings", protect, adminOnly, getAllBookingsAdmin);

export default router;