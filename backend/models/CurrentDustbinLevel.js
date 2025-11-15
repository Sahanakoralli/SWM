import mongoose from "mongoose";

const currentDustbinSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  fillLevel: { type: Number, required: true },
  gasLevel: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DustbinLocation", // Reference back to dustbinLocation
  },
});

const CurrentDustbin = mongoose.model("CurrentDustbin", currentDustbinSchema);
export default CurrentDustbin;
