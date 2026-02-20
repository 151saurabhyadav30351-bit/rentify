import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    pricePerDay: { type: Number, required: true, min: 1,},
    city: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    seats: { type: Number, required: true, min: 1, max: 10, },
    
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric"],
      required: true,
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
carSchema.index({ city: 1 });
carSchema.index({ owner: 1 });
export default mongoose.model("Car", carSchema);
