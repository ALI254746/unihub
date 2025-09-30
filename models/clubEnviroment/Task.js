// models/Task.js
import mongoose from "mongoose";

const uploadedFileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    fileUrl: { type: String }, // admin tomonidan yuklangan fayl
    uploadedFiles: [uploadedFileSchema], // a'zolar tomonidan yuklangan fayllar
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
