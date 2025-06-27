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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Club || mongoose.model("Club", clubSchema);
