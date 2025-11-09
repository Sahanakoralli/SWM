import express from "express";
import { optimizeRoute } from "../controllers/routeController.js";

const router = express.Router();

router.post("/optimize", optimizeRoute);

export default router;
