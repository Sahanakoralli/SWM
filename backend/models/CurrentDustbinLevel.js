import mongoose from "mongoose";

const currentDustbinSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  fillLevel: { type: Number, required: true },
  gasLevel: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("currentDustbinLevel", currentDustbinSchema);
