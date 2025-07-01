import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    direction: { type: String, required: true },
    course: { type: String, required: true },
    group: { type: String, required: true },
    phone: { type: String, required: true },
    bio: String,
    social: {
      telegram: String,
      instagram: String,
      linkedin: String,
    },
    achievements: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
