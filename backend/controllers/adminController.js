import User from "../models/User.js";
import DustbinLocation from "../models/DustbinLocation.js";
import bcrypt from "bcryptjs";
import CurrentDustbinLevel from "../models/CurrentDustbinLevel.js";
import BinData from "../models/BinData.js";
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: "User added successfully", newUser });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
};

export const addDustbin = async (req, res) => {
  try {
    const { binId, latitude, longitude, address } = req.body;

    if (!binId || !latitude || !longitude || !address) {
      return res.status(400).json({ message: "Missing required fileds" });
    }
    const existing = await DustbinLocation.findOne({ binId });

    if (existing)
      return res.status(400).json({ message: "Bin already exists" });

    const newBin = await DustbinLocation.create({
      binId,
      latitude,
      longitude,
      address,
    });

    let currentDustbin = await CurrentDustbinLevel.findOne({ binId });

    if (!currentDustbin) {
      currentDustbin = new CurrentDustbinLevel({
        binId,
        fillLevel: 0,
        gasLevel: 0,
      });
      await currentDustbin.save();
      console.log(`🆕 Created new current data for ${binId}`);
    }

    newBin.currentDustbin = currentDustbin._id;
    currentDustbin.location = newBin._id;
    await currentDustbin.save();
    await newBin.save();

    res.status(200).json({ message: "Dustbin added successfully", newBin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding dustbin", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("Inside delete user", _id);
    if (!_id) {
      return res.status(400).json({ message: "User id required" });
    }

    await User.deleteOne({ _id: _id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error while deleteing user ${_id}` });
  }
};

export const deleteDustbin = async (req, res) => {
  try {
    const { binId } = req.params;

    console.log("Inside Delete ", binId);
    if (!binId) {
      return res.status(400).json({ message: "Bin Id required" });
    }

    await Promise.all([
      CurrentDustbinLevel.deleteOne({ binId }),
      BinData.deleteMany({ binId }),
      DustbinLocation.deleteOne({ binId }),
    ]);

    res.status(200).json({ message: `Dustbin ${binId} deleted successfully` });
  } catch (error) {
    console.log("Error while deleting dustbin ", error.message);
    res
      .status(500)
      .json({ message: "Erro while deleting dustbin", error: error.message });
  }
};

export const updateDustbin = async (req, res) => {
  try {
    const { binId } = req.params;
    const { address, latitude, longitude } = req.body;
    console.log("inside Update BinId ", binId);
    if (!binId) {
      return res.status(400).json({ message: "Bin Id required" });
    }
    if (!address || !latitude || !longitude) {
      return res.status(400).json({ message: "All filled must be there" });
    }

    const binData = await DustbinLocation.findOne({ binId });
    if (binData) {
      binData.latitude = latitude;
      binData.longitude = longitude;
      binData.address = address;
      await binData.save();
      return res
        .status(200)
        .json({ message: `Dustbin ${binId} updated sucessfully` });
    }
  } catch (error) {
    console.log({ message: "Unable to update", error: error.message });
    res.status(500).json({ message: "Unable to update", error: error.message });
  }
};

export const alluserList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching users", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, email, role } = req.body;

    if (!_id) {
      return res.status(400).json({ message: "User _id is missing" });
    }

    if (!name || !email || !role) {
      return res.status(400).json({ message: "All filled must be there" });
    }
    const userData = await User.findById({ _id });

    if (userData) {
      userData.name = name;
      userData.email = email;
      userData.role = role;
      await userData.save();
      return res
        .status(200)
        .json({ message: `User name=${name} updated successfully` });
    }
  } catch (error) {
    console.log({ message: "Unable to update", error: error.message });
    res.status(500).json({ message: "Unable to update", error: error.message });
  }
};
