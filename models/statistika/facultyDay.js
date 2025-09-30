import mongoose from "mongoose";

const FacultyDaySchema = new mongoose.Schema({
  faculty: { type: String, required: true },
  hoursUsed: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
});

const DailyFacultyStatsSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true }, // masalan "2025-09-20"
  data: [FacultyDaySchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DailyFacultyStats ||
  mongoose.model("DailyFacultyStats", DailyFacultyStatsSchema);
