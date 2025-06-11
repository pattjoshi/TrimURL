import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    customAlias: {
      type: String,
      unique: true,
      sparse: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiresAt: {
      type: Date,
    },
    isPasswordProtected: {
      type: Boolean,
      default: false,
    },
    password: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
