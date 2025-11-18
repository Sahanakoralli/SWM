import BinData from "../models/BinData.js";
import CurrentDustbinLevel from "../models/CurrentDustbinLevel.js";
import { io } from "../server.js";

export const getDustbinHistory = async (req, res) => {
  try {
    const { binId } = req.params;
    console.log("Inside history: " + binId);
    const data = await BinData.find({ binId }).sort({ timestamp: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
};

export const updateDustbinData = async (req, res) => {
  try {
    const { binId, fillLevel, gasLevel } = req.body;

    if (!binId || fillLevel === undefined || gasLevel === undefined) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // Save full record in binData (history)
    console.log("fill level = ", fillLevel, " updated for ", binId);
    await BinData.create({ binId, fillLevel, gasLevel });

    // Update or insert currentDustbinLevel
    const existing = await CurrentDustbinLevel.findOne({ binId });

    if (!existing) {
      await CurrentDustbinLevel.create({ binId, fillLevel, gasLevel });
      console.log(`🆕 Added new bin: ${binId}`);
    } else if (
      existing.fillLevel !== fillLevel ||
      existing.gasLevel !== gasLevel
    ) {
      existing.fillLevel = fillLevel;
      existing.gasLevel = gasLevel;
      existing.timestamp = Date.now();
      await existing.save();
      console.log(`♻️ Updated ${binId}`);

      if (fillLevel >= 80) {
        console.log("alert send of binId ", binId);
        io.emit("bin_alert", {
          binId,
          fillLevel,
          message: "Dustbin is above 80%. Please collect",
        });
      }
    }

    res.status(200).json({ message: "Dustbin data updated" });
  } catch (err) {
    console.error("❌ Error updating dustbin:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getCurrentDustbins = async (req, res) => {
  try {
    const bins = await CurrentDustbinLevel.find().populate("location");
    res.json(bins);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bins" });
  }
};

export const collected = async (req, res) => {
  try {
    const { binId } = req.body;
    console.log("Collected binId = ", binId);
    await CurrentDustbinLevel.findOneAndUpdate({ binId }, { fillLevel: 0 });
    io.emit("bin_alert", {
      binId,
      message: "Garbage Collected Successfully",
    });
    res.status(200).json("Collector update send");
  } catch (error) {
    console.log("Error in collected ", error);
    res.status(500).json({ message: "error in collected", error: error });
  }
};
