import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },
    // models/User.js
    usageSessions: [
      {
        seatId: { type: String },
        startedAt: { type: Date },
        finishedAt: { type: Date },
        duration: { type: Number }, // daqiqalarda
      },
    ],
    totalActiveMinutes: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
