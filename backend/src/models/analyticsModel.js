import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true,
    },
    clicks: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        ipAddress: String,
        deviceType: String,
        browser: String,
        operatingSystem: String,
        country: String,
        city: String,
      },
    ],
    totalClicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
