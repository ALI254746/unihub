import mongoose from "mongoose";

const clubJoinSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    direction: { type: String, required: true },
    course: { type: String, required: true },
    phone: { type: String, required: true },
    reason: { type: String, required: true },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    clubName: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // klub egasi
  },
  { timestamps: true }
);

export default mongoose.models.ClubJoin ||
  mongoose.model("ClubJoin", clubJoinSchema);
