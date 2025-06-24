import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: "user", enum: ["user", "admin"] }, // ✅ qo‘shildi
  },
  { timestamps: true }
);

// Model mavjud bo‘lsa qayta yaratmaslik
export default mongoose.models.User || mongoose.model("User", UserSchema);
