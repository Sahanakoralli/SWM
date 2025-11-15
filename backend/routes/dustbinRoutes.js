import express from "express";
import {
  updateDustbinData,
  getCurrentDustbins,
  getDustbinHistory,
  collected,
} from "../controllers/dustbinController.js";

const router = express.Router();

router.post("/update", updateDustbinData);
router.get("/current", getCurrentDustbins);
router.get("/history/:binId", getDustbinHistory);
router.post("/collected", collected);

export default router;
