import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // ⭐ extra safety
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      type: String,
      default: "",
    },

    // 🔥 HOST FLAG
    isHost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ⭐ HARD UNIQUE INDEX (race-condition safe)
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

export default User;
