import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    verifyOtp: {
      type: String,
      default: "",
    },
    verifyOtpExpaire: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpaire: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
// This code defines a Mongoose schema for a User model in a MongoDB database.
