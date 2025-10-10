import mongoose from "mongoose";

const SeatBookingSchema = new mongoose.Schema({
  seatId: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["empty", "booked", "active"], default: "empty" },
  expiresAt: { type: Date },
  usageStartedAt: { type: Date },
  usageExpiresAt: { type: Date },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  faculty: String,
  course: String,
});

export default mongoose.models.SeatBooking || mongoose.model("SeatBooking", SeatBookingSchema);
