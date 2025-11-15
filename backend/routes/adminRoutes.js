import express from "express";
import {
  addUser,
  addDustbin,
  deleteDustbin,
  updateDustbin,
  alluserList,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/addDustbin", addDustbin);
router.delete("/deleteDustbin/:binId", deleteDustbin);
router.post("/updateDustin/:binId", updateDustbin);

router.post("/addUser", addUser);
router.get("/allUserList", alluserList);
router.post("/updateUser/:_id", updateUser);
router.delete("/user/:_id", deleteUser);

export default router;
