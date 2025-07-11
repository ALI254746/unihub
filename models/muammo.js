import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Yotoqxona",
        "Kutubxona",
        "Dars jarayoni",
        "Internet",
        "Boshqaruv",
        "Oshxona",
        "Gigiyena / Tozalik",
        "Boshqa",
      ],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Issue = mongoose.models.Issue || mongoose.model("Issue", issueSchema);
export default Issue;
