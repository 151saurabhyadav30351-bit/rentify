import express from "express";
import { addCar, getCars, getCarById, getMyCars, deleteCar, updateCar } from "../controllers/carController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addCar);        // ← MUST HAVE protect
router.get("/", getCars);
router.get("/my", protect, getMyCars);
router.get("/:id", getCarById);
router.delete("/:id", protect, deleteCar);
router.put("/:id", protect, updateCar);

export default router;
