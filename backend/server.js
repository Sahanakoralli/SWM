import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import os from "os";

import connectDB from "./db/conn.js";
import dotenv from "dotenv";
import cors from "cors";

//routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dustbinRoutes from "./routes/dustbinRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import BinData from "./models/BinData.js";
import DustbinLocation from "./models/DustbinLocation.js";
import CurrentDustbin from "./models/CurrentDustbinLevel.js";

//express
const app = express();
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//socket

io.on("connection", (socket) => {
  console.log("A new User connected:", socket.id);
});

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

const det = async () => {
  // await BinData.deleteMany({ binId: "BIN_001" });
  // await BinData.deleteMany({});
  // await CurrentDustbin.deleteMany({});
  // await DustbinLocation.deleteMany({});
  // await mongoose.connection.db.dropCollection("bindata");
  // await mongoose.connection.db.dropCollection("currentdustbinlevels");
  // await mongoose.connection.db.dropCollection("dustbinlocations");
};

// det();
function getLocalIp() {
  const nets = os.networkInterfaces();
  // console.log("nets ", nets);
  for (const name of Object.keys(nets)) {
    // console.log("name ", name);
    for (const net of nets[name]) {
      // console.log("name ", net);
      if (name === "Wi-Fi" && net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}
server.listen(PORT, () => {
  const ip = getLocalIp();
  console.log("");
  console.log(`Server running on port ${PORT}`);

  console.log(`Network:   http://${ip}:${PORT}`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log("");
});
export { io };
