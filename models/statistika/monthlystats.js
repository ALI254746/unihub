import mongoose from "mongoose";

const MonthlyStatsSchema = new mongoose.Schema({
  month: { type: String, required: true, unique: true }, // masalan "2025-09"
  hoursUsed: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.MonthlyStats ||
  mongoose.model("MonthlyStats", MonthlyStatsSchema);
