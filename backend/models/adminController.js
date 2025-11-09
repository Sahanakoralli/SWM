import User from "../models/User.js";
import DustbinLocation from "../models/DustbinLocation.js";

export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User added successfully", newUser });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
};

export const addDustbin = async (req, res) => {
  try {
    const { binId, latitude, longitude, address } = req.body;
    const existing = await DustbinLocation.findOne({ binId });
    if (existing)
      return res.status(400).json({ message: "Bin already exists" });

    const newBin = await DustbinLocation.create({
      binId,
      latitude,
      longitude,
      address,
    });
    res.status(201).json({ message: "Dustbin added successfully", newBin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding dustbin", error: err.message });
  }
};
