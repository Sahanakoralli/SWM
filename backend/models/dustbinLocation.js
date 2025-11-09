import mongoose from "mongoose";

const dustbinLocationSchema = new mongoose.Schema({
  binId: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: String,
});

export default mongoose.model("dustbinLocation", dustbinLocationSchema);
