import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt qo‘shiladi
);

const talabaXizmatlariSchema = new mongoose.Schema(
  {
    fan: { type: String, required: true },
    xizmatTuri: { type: String, required: true },
    narxi: { type: String, required: true },
    telegramHavola: { type: String, required: true },
    description: { type: String, default: "" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    }, // 👈 YANGI QO‘SHILDI
    kurs: { type: String, required: true },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        value: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],

    comments: [commentSchema], // 👈 Bu yerda to‘liq izohlar ro‘yxati
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TalabaXizmati ||
  mongoose.model("TalabaXizmati", talabaXizmatlariSchema);
