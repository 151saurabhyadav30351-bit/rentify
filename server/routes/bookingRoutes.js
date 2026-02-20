import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getCarBookings,
  getHostBookings,
} from "../controllers/bookingController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/host", protect, getHostBookings); // ⭐ NEW
router.delete("/:id", protect, cancelBooking);
router.get("/car/:carId", getCarBookings);

export default router;
