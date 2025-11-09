import mongoose from "mongoose";

const binDataSchema = new mongoose.Schema({
  binId: { type: String, required: true },
  fillLevel: { type: Number, required: true },
  gasLevel: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("binData", binDataSchema);
