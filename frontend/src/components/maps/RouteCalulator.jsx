import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";

// ✅ Helper function to decode Google’s encoded polyline
function decodePolyline(encoded) {
  let points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
}

// ✅ Component that manually adds a Polyline to the map
function PolylinePath({ path, color }) {
  const map = useMap();
  const polylineRef = useRef(null);

  useEffect(() => {
    if (!map || path.length === 0) return;

    if (polylineRef.current) polylineRef.current.setMap(null);

    polylineRef.current = new google.maps.Polyline({
      path,
      strokeColor: color || "#FF0000",
      strokeOpacity: 0.9,
      strokeWeight: 5,
      map,
    });

    return () => {
      if (polylineRef.current) polylineRef.current.setMap(null);
    };
  }, [map, path, color]);

  return null;
}

export default function RouteCalculator() {
  const [polylinePath, setPolylinePath] = useState([]);
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optimizedOrder, setOptimizedOrder] = useState([]);

  const [truckLocation, setTructLocation] = useState({
    latitude: 17.3297,
    longitude: 76.8343,
  });
  const [dumpLocation, setDumbLocation] = useState({
    latitude: 17.321,
    longitude: 76.845,
  });
  // Kalaburagi coordinates
  const [status, setStatus] = useState("Waiting for location...");

  useEffect(() => {
    const updateLocation = () => {
      if (!navigator.geolocation) {
        setStatus("Geolocation not supported ❌");
        return;
      }

      navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setTructLocation({ latitude: latitude, longitude: longitude });
          setStatus("Location updated ✅");
          console.log("truct location ", truckLocation);
          // Optional: Send to backend API
          // try {
          //   await axios.post("http://localhost:5000/api/truck/update-location", {
          //     latitude,
          //     longitude,
          //   });
          //   console.log("🚚 Truck location updated on server");
          // } catch (error) {
          //   console.error("❌ Error updating location:", error);
          // }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setStatus("Unable to get location ❌");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    };

    // First call immediately
    updateLocation();

    // Then update every 10 seconds
    const interval = setInterval(updateLocation, 10000);

    // Cleanup when component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleRoute = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/route/optimize",
        {
          truckLocation,
          dumpLocation,
        }
      );

      console.log(response);
      if (response.data.polyline) {
        const path = decodePolyline(response.data.polyline);
        setPolylinePath(path);
      }

      // Assuming backend returns fullBins or locations
      const routeBins = response.data.locations || [];
      setOptimizedOrder(response.data.optimized_order || []);
      setBins(routeBins);
      console.log(bins);
    } catch (err) {
      console.error("Error fetching route:", err);
      alert("Failed to fetch route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "80vh", width: "100%" }}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: 17.3297, lng: 76.8343 }}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          {/* ✅ Truck marker */}
          <Marker
            position={{
              lat: truckLocation.latitude,
              lng: truckLocation.longitude,
            }}
            title="Garbage Truck (Start)"
            label="🚛"
          />

          {/* ✅ Dump marker */}
          <Marker
            position={{
              lat: dumpLocation.latitude,
              lng: dumpLocation.longitude,
            }}
            title="Dump Yard"
            label="🏭"
          />

          {/* ✅ Dustbin markers */}
          {/* {optimizedOrder.map((bin, index) => {
            <Marker
              key={index}
              position={{
                lat: bins[bin].latitude,
                lng: bins[bin].longitude,
              }}
              label={index + 1}
            />;
          })} */}
          {bins.map((bin, index) => (
            <Marker
              key={index}
              position={{ lat: bin.latitude, lng: bin.longitude }}
              title={`Dustbin: ${bin.address || bin.binId}`}
              label={`${optimizedOrder.indexOf(index) + 1} `}
            />
          ))}

          {/* ✅ Route polyline */}
          {polylinePath.length > 0 && (
            <PolylinePath path={polylinePath} color="#FF0000" />
          )}
        </Map>
      </div>

      <button
        onClick={handleRoute}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {loading ? "Calculating Route..." : "Show Optimized Route"}
      </button>
    </APIProvider>
  );
}
