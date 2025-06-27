// models/ClubRequest.js
import mongoose from "mongoose";

const clubRequestSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true }, // Foydalanuvchi to‘liq ismi
    name: { type: String, required: true }, // Klub nomi
    description: { type: String, required: true }, // Klub haqida ma’lumot
    interests: { type: String, required: true }, // Klub yo‘nalishi, texnologiyalar
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Kim yubordi
  },
  { timestamps: true }
);

export default mongoose.models.ClubRequest ||
  mongoose.model("ClubRequest", clubRequestSchema);
