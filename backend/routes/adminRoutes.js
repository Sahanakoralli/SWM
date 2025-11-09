import express from "express";
import { addUser, addDustbin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/addDustbin", addDustbin);

export default router;
