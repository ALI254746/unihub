import mongoose from "mongoose";

const dailyUsageStatsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  uniqueUsers: {
    type: Number,
    required: true,
    default: 0,
  },
  totalHoursUsed: {
    type: Number,
    required: true,
    default: 0,
  },
  averageUsage: {
    type: Number,
    required: true,
    default: 0,
  },
  onlineUsers: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.DailyUsageStats ||
  mongoose.model("DailyUsageStats", dailyUsageStatsSchema);
