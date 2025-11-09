import axios from "axios";
import CurrentDustbinLevel from "../models/CurrentDustbinLevel.js";
import DustbinLocation from "../models/DustbinLocation.js";

export const optimizeRoute = async (req, res) => {
  try {
    const { truckLocation, dumpLocation } = req.body;

    if (!truckLocation || !dumpLocation) {
      return res
        .status(400)
        .json({ message: "Truck and dump coordinates required" });
    }

    // Get full bins (>=80%)
    const fullBins = await CurrentDustbinLevel.find({
      fillLevel: { $gte: 80 },
    });
    if (!fullBins.length)
      return res.status(200).json({ message: "No full bins to collect" });

    // Get their locations
    const locations = await DustbinLocation.find({
      binId: { $in: fullBins.map((b) => b.binId) },
    });

    const waypoints = locations
      .map((loc) => `${loc.latitude},${loc.longitude}`)
      .join("|");

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${truckLocation.latitude},${truckLocation.longitude}&destination=${dumpLocation.latitude},${dumpLocation.longitude}&waypoints=optimize:true|${waypoints}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const { data } = await axios.get(url);

    if (data.status !== "OK")
      return res
        .status(500)
        .json({ message: "Google API error", details: data.status });

    res.json({
      message: "Optimized route found",
      optimized_order: data.routes[0].waypoint_order,
      legs: data.routes[0].legs.map((leg) => ({
        start: leg.start_address,
        end: leg.end_address,
        distance: leg.distance.text,
        duration: leg.duration.text,
      })),
      polyline: data.routes[0].overview_polyline.points,
    });
  } catch (err) {
    console.error("Route error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
