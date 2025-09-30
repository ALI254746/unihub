import mongoose from "mongoose";

const SeatBookingSchema = new mongoose.Schema({
  seatId: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["empty", "booked", "active"],
    default: "empty",
  },
  expiresAt: { type: Date }, // faqat booked uchun vaqt (vaqtinchalik)
  usageStartedAt: { type: Date }, // faqat active uchun doimiy saqlanadigan vaqt boshlanishi
  usageExpiresAt: { type: Date }, // faqat active uchun doimiy saqlanadigan vaqt tugashi
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now },
  faculty: { type: String }, // User.faculty dan avtomatik ko‘chiriladi
  course: { type: String },
});

export default mongoose.models.SeatBooking ||
  mongoose.model("SeatBooking", SeatBookingSchema);
