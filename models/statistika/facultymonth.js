import mongoose from "mongoose";

const FacultyDataSchema = new mongoose.Schema({
  faculty: { type: String, required: true }, // fakultet nomi
  hoursUsed: { type: Number, default: 0 }, // jami soatlar
  uniqueUsers: { type: Number, default: 0 }, // unikal foydalanuvchilar soni
});

const MonthlyFacultyStatsSchema = new mongoose.Schema({
  month: { type: String, required: true, unique: true }, // masalan "September 2025"
  data: [FacultyDataSchema], // fakultetlar bo'yicha ma'lumot
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.MonthlyFacultyStats ||
  mongoose.model("MonthlyFacultyStats", MonthlyFacultyStatsSchema);
