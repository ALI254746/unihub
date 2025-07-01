// models/Club.js
import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    interest: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        direction: { type: String, required: true },
        course: { type: String, required: true },
        phone: { type: String, required: true },
        joinedAt: { type: Date, default: Date.now }, // 🕒 A’zo bo‘lgan vaqt
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Club || mongoose.model("Club", clubSchema);
