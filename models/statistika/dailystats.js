import mongoose from "mongoose";

const HourlyDataSchema = new mongoose.Schema({
  hour: { type: String, required: true }, // masalan "9:00"
  hoursUsed: { type: Number, default: 0 }, // umumiy foydalanilgan soatlar
  uniqueUsers: { type: Number, default: 0 }, // nechta kishi foydalangan
});

const DailyStatsSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true }, // sana (faqat bitta kun uchun)
  data: [HourlyDataSchema], // 12 ta nuqta
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DailyStats ||
  mongoose.model("DailyStats", DailyStatsSchema);
