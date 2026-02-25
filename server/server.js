import "dotenv/config";
console.log("ENV CHECK:", process.env.CLOUDINARY_CLOUD_NAME);
import "./configs/cloudinary.js";
import express from"express";
import cors from"cors";
import { connect } from "mongoose";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
connectDB();
app.get("/",(req,res)=>
    res.send("API is running.... fast as fuck "))

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
