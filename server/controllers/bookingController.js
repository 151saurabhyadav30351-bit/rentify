import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import mongoose from "mongoose";

/*
-----------------------------------
CREATE BOOKING
-----------------------------------
*/
export const createBooking = async (req, res) => {
  try {
    // 🔴 NEW — ADMIN CANNOT BOOK (SECURITY LAYER)
    if (req.user?.isAdmin) {
      return res.status(403).json({
        message: "Admins are not allowed to make bookings",
      });
    }

    const {
      carId,
      fromDate,
      toDate,
      days,
      price,
      total,
      city,
    } = req.body;

    // 🛡️ ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({
        message: "Invalid car id",
      });
    }

    // 🛡️ Basic validation
    if (!carId || !fromDate || !toDate) {
      return res.status(400).json({
        message: "Missing required booking fields",
      });
    }

    // ✅ NEW — check car exists & availability
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    // 🔴 CRITICAL FIX — prevent booking unavailable car
    if (!car.isAvailable) {
      return res.status(400).json({
        message: "This car is currently unavailable",
      });
    }

    // 🛡️ Date validation
    const start = new Date(fromDate);
    const end = new Date(toDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res.status(400).json({
        message: "Cannot book past dates",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        message: "Invalid date range",
      });
    }

    // 🔥 Prevent overlapping bookings
    const conflict = await Booking.findOne({
      car: carId,
      fromDate: { $lte: toDate },
      toDate: { $gte: fromDate },
    });

    if (conflict) {
      return res.status(409).json({
        message: "Car already booked for selected dates",
      });
    }

    // ✅ Create booking
    const booking = await Booking.create({
      user: req.user.id,
      car: carId,
      fromDate,
      toDate,
      days,
      pricePerDay: price,
      totalAmount: total,
      city,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.log("BOOKING ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

/*
-----------------------------------
GET MY BOOKINGS (RENTER)
-----------------------------------
*/
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("car");

    res.json(bookings);
  } catch (err) {
    console.log("GET MY BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/*
-----------------------------------
🔥 GET HOST BOOKINGS
-----------------------------------
*/
export const getHostBookings = async (req, res) => {
  const userIsHost = await Car.exists({ owner: req.user.id });

  if (!userIsHost) {
    return res.status(403).json({
      message: "Host access only",
    });
  }

  try {
    const hostCars = await Car.find({
      owner: req.user.id,
    }).select("_id");

    const carIds = hostCars.map((car) => car._id);

    const bookings = await Booking.find({
      car: { $in: carIds },
    })
      .populate("car")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.log("GET HOST BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch host bookings" });
  }
};

/*
-----------------------------------
CANCEL BOOKING
-----------------------------------
*/
export const cancelBooking = async (req, res) => {
  try {
    const deleted = await Booking.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.log("CANCEL BOOKING ERROR:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
};

/*
-----------------------------------
GET BOOKINGS FOR A CAR (Public)
-----------------------------------
*/
export const getCarBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      car: req.params.carId,
    })
      .select("fromDate toDate")
      .lean();

    res.json(bookings);
  } catch (err) {
    console.log("GET CAR BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch car bookings" });
  }
};