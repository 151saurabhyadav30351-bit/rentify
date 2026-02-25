import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

/*
-----------------------------------
ADMIN STATS
-----------------------------------
*/
export const getAdminStats = async (req, res) => {
  try {
    const [users, cars, bookings] = await Promise.all([
      User.countDocuments(),
      Car.countDocuments(),
      Booking.countDocuments(),
    ]);

    res.json({
      totalUsers: users,
      totalCars: cars,
      totalBookings: bookings,
    });
  } catch (err) {
    console.log("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

/*
-----------------------------------
GET ALL USERS
-----------------------------------
*/
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.log("ADMIN USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/*
-----------------------------------
GET ALL CARS
-----------------------------------
*/
export const getAllCarsAdmin = async (req, res) => {
  try {
    const cars = await Car.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(cars);
  } catch (err) {
    console.log("ADMIN CARS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

/*
-----------------------------------
GET ALL BOOKINGS
-----------------------------------
*/
export const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("car", "title brand city")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.log("ADMIN BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};