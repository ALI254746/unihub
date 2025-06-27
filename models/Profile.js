import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: String,
    gpa: Number,
    direction: String,
    course: String,
    group: String,
    phone: String,
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
