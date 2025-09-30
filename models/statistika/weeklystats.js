import mongoose from "mongoose";

const WeeklyDataSchema = new mongoose.Schema({
  day: { type: String, required: true }, // Monday, Tuesday, ...
  hoursUsed: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
});

const WeeklyStatsSchema = new mongoose.Schema({
  weekStart: { type: Date, required: true }, // Dushanba
  weekEnd: { type: Date, required: true }, // Yakshanba
  data: [WeeklyDataSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.WeeklyStats ||
  mongoose.model("WeeklyStats", WeeklyStatsSchema);
