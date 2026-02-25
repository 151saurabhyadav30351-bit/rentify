import express from "express";
import { createContact } from "../controllers/contactController.js";
import {
  getAllContactsAdmin,
  deleteContactAdmin,
} from "../controllers/contactController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// PUBLIC — user sends message
router.post("/", createContact);

// 🔐 ADMIN — fetch all messages
router.get("/admin", protect, adminOnly, getAllContactsAdmin);

// 🔐 ADMIN — delete message
router.delete("/admin/:id", protect, adminOnly, deleteContactAdmin);

export default router;