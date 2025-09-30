import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "blocked"],
      default: "accepted",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Friend || mongoose.model("Friend", FriendSchema);
