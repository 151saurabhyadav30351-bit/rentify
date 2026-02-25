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
⭐ TOGGLE BLOCK USER (NEW)
-----------------------------------
*/
export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🚫 prevent admin blocking himself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot block yourself",
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: user.isBlocked ? "User blocked" : "User unblocked",
      isBlocked: user.isBlocked,
    });
  } catch (err) {
    console.log("BLOCK USER ERROR:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

/*
-----------------------------------
⭐ DELETE USER (NEW)
-----------------------------------
*/
export const deleteUserAdmin = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("DELETE USER ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
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

/*
-----------------------------------
TOGGLE CAR DISABLE (ADMIN)
-----------------------------------
*/
export const toggleDisableCarAdmin = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    car.isDisabled = !car.isDisabled;
    await car.save();

    res.json({
      message: car.isDisabled ? "Car disabled" : "Car enabled",
      isDisabled: car.isDisabled,
    });
  } catch (err) {
    console.log("DISABLE CAR ERROR:", err);
    res.status(500).json({ message: "Failed to update car" });
  }
};

/*
-----------------------------------
DELETE CAR (ADMIN)
-----------------------------------
*/
export const deleteCarAdmin = async (req, res) => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.log("DELETE CAR ADMIN ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
/*
-----------------------------------
ADMIN CANCEL BOOKING
-----------------------------------
*/
export const cancelBookingAdmin = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled by admin" });
  } catch (err) {
    console.log("ADMIN CANCEL BOOKING ERROR:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
};