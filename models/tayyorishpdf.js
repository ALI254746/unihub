import mongoose from "mongoose";

const readyWorkSchema = new mongoose.Schema(
  {
    kurs: { type: String, required: true }, // 1-kurs, 2-kurs...
    yonalish: { type: String, required: true }, // KIF, DI, AM
    fan: { type: String, required: true },
    ishTuri: { type: String, required: true }, // mustaqil, amaliy, YN
    topshiriq: { type: String, required: true }, // 1, 2, 3, 4...
    variant: { type: String, required: true },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fileName: String,
    description: { type: String, default: "" }, // izoh (ixtiyoriy)
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.ReadyWork ||
  mongoose.model("ReadyWork", readyWorkSchema);
