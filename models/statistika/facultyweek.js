import mongoose from "mongoose";

const FacultyWeekSchema = new mongoose.Schema({
  faculty: { type: String, required: true },
  hoursUsed: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
});

const WeeklyFacultyStatsSchema = new mongoose.Schema({
  week: { type: String, required: true, unique: true }, // masalan "2025-W38"
  data: [FacultyWeekSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.WeeklyFacultyStats ||
  mongoose.model("WeeklyFacultyStats", WeeklyFacultyStatsSchema);
