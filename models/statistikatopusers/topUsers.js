import mongoose from "mongoose";

const UserStatsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    avatar: { type: String },
    faculty: { type: String },
    course: { type: String },
    fullName: { type: String }, // name + lastName
    clubs: [
      {
        clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
        role: { type: String, enum: ["owner", "member"] },
      },
    ],

    // Kunlik statistika
    daily: {
      date: { type: Date }, // oxirgi yangilangan kun
      activeMinutes: { type: Number, default: 0 },
      topSeat: {
        seatId: { type: String },
        usageCount: { type: Number, default: 0 },
      },
    },

    // Haftalik statistika
    weekly: {
      weekStart: { type: Date }, // hafta boshi
      activeMinutes: { type: Number, default: 0 },
      topSeat: {
        seatId: { type: String },
        usageCount: { type: Number, default: 0 },
      },
    },

    // Oylik statistika
    monthly: {
      month: { type: Date }, // oy boshi
      activeMinutes: { type: Number, default: 0 },
      topSeat: {
        seatId: { type: String },
        usageCount: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserStats ||
  mongoose.model("UserStats", UserStatsSchema);
