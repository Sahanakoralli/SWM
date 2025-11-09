import express from "express";
import bodyParser from "body-parser";

import connectDB from "./db/conn.js";
import dotenv from "dotenv";
import cors from "cors";

//routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dustbinRoutes from "./routes/dustbinRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";

//express
const app = express();
app.use(express.json());
app.use(cors());

//dotenv
dotenv.config();

const PORT = process.env.PORT;
const databaseURL = process.env.DATABASE;

app.use(bodyParser.json());

const start = async () => {
  try {
    await connectDB(databaseURL);
  } catch (error) {
    console.log(error);
  }
};

start(); // database connection

//routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dustbin", dustbinRoutes);
app.use("/api/route", routeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
