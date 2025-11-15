import mongoose from "mongoose";

const dustbinLocationSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: String,
  currentDustbin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CurrentDustbin", // Reference to the currentDustbin model
  },
});

const DustbinLocation = mongoose.model(
  "DustbinLocation",
  dustbinLocationSchema
);
export default DustbinLocation;
