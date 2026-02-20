import mongoose from "mongoose";
import Car from "../models/Car.js";
import User from "../models/User.js"; // ⭐ NEW IMPORT

// ===============================
// ADD CAR (Protected)
// ===============================
export const addCar = async (req, res) => {
  try {
    // ✅ CREATE CAR
    const car = await Car.create({
      title: req.body.title,
      brand: req.body.brand,
      city: req.body.city,
      pricePerDay: req.body.pricePerDay,
      image: req.body.image,

      // SPECS
      seats: req.body.seats,
      fuelType: req.body.fuelType,
      transmission: req.body.transmission,

      // OWNER
      owner: req.user.id,
    });

    // ⭐ STEP 2 MAGIC — AUTO HOST PROMOTION
    const user = await User.findById(req.user.id);

    if (user && !user.isHost) {
      user.isHost = true;
      await user.save();
    }

    res.status(201).json(car);

  } catch (error) {
    console.log("ADD CAR ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET ALL CARS (Public)
// ===============================
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

// ===============================
// GET SINGLE CAR
// ===============================
export const getCarById = async (req, res) => {
  try {
    // 🛡️ ObjectId validation (ADD THIS)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid car id" });
    }
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);

  } catch (error) {
    res.status(500).json({ message: "Car not found" });
  }
};

// ===============================
// GET MY CARS (Owner Dashboard)
// ===============================
export const getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch my cars" });
  }
};

// ===============================
// DELETE CAR (Owner only)
// ===============================
export const deleteCar = async (req, res) => {
  try {
     // 🛡️ ObjectId validation (ADD)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid car id" });
    }
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: "Car not found" });

    // OWNER CHECK
    if (car.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await car.deleteOne();

    res.json({ message: "Car deleted" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// ===============================
// UPDATE CAR (Owner only)
// ===============================
export const updateCar = async (req, res) => {
  try {
    // 🛡️ ObjectId validation (ADD)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid car id" });
    }
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: "Car not found" });

    // OWNER CHECK
    if (car.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // BASIC FIELDS
    car.title = req.body.title || car.title;
    car.brand = req.body.brand || car.brand;
    car.city = req.body.city || car.city;
    car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
    car.image = req.body.image || car.image;

    // SPECS
    car.seats = req.body.seats || car.seats;
    car.fuelType = req.body.fuelType || car.fuelType;
    car.transmission = req.body.transmission || car.transmission;

    const updated = await car.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
