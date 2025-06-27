import mongoose from "mongoose";

const ElonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["yangilik", "ogohlantirish", "e'lon"],
      default: "yangilik",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Elon || mongoose.model("Elon", ElonSchema);
