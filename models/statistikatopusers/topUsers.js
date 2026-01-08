import mongoose from "mongoose";

const DailySessionSchema = new mongoose.Schema({
  seatId: { type: String },
  startedAt: { type: Date },
  finishedAt: { type: Date },
  duration: { type: Number }, // daqiqa
});

const ClubInfoSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
  name: { type: String }, // Club nomi
  role: { type: String, enum: ["owner", "member"], default: "member" },
});

const DailyStatsSchema = new mongoose.Schema({
  date: { type: Date },
  activeMinutes: { type: Number, default: 0 },
  topSeat: {
    seatId: { type: String },
    usageCount: { type: Number, default: 0 },
  },
  sessions: [DailySessionSchema],
});

const UserStatsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String },
    avatar: { type: String },
    faculty: { type: String },
    course: { type: String },
    clubs: [ClubInfoSchema],
    rank: { type: Number }, // Top 10 dagi o'rni
    daily: DailyStatsSchema,
    weekly: {
      weekStart: { type: Date },
      activeMinutes: { type: Number, default: 0 },
      topSeat: {
        seatId: { type: String },
        usageCount: { type: Number, default: 0 },
      },
      rank: { type: Number }, // haftalik top 10 dagi o'rni
    },
    monthly: {
      month: { type: Date },
      activeMinutes: { type: Number, default: 0 },
      topSeat: {
        seatId: { type: String },
        usageCount: { type: Number, default: 0 },
        rank: { type: Number }, // haftalik top 10 dagi o'rni
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserStats ||
  mongoose.model("UserStats", UserStatsSchema);
