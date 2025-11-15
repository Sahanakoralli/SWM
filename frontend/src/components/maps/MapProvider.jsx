import React, { useCallback, useEffect, useState } from "react";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import Navigation from "../admin/Navigation";

const MapProvider = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const positin = { lat: 17.327350817452675, lng: 76.82729442970417 };
  const [center, setCenter] = useState({
    lat: 17.3297,
    lng: 76.8343,
  });
  const [zoom, setZoom] = useState(13);
  const [bins, setBins] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/dustbin/current`);
      setBins(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When the camera (map view) changes — user drags or zooms the map
  const handleCameraChanged = useCallback((event) => {
    const { center, zoom } = event.detail;
    console.log("Camera changed:", center, "Zoom:", zoom);

    // Optionally update local state
    setCenter(center);
    setZoom(zoom);
  }, []);
  return (
    <>
      {/* <Navigation /> */}
      <APIProvider apiKey={API_KEY}>
        <Box width={"100vw"} height={"90vh"}>
          <Map
            zoom={zoom}
            center={center}
            mapId={import.meta.env.VITE_GOOGLE_MAPS_MAPID}
            onCameraChanged={handleCameraChanged}
            cameraControl={true}
            zoomControl={true}
          >
            {bins.map((item) => (
              <Marker
                key={item.binId}
                position={{
                  lat: item.location.latitude,
                  lng: item.location.longitude,
                }}
                title={`Bin ID: ${item.binId} — Fill Level: ${item.fillLevel}%`}
              />
            ))}
          </Map>
        </Box>
      </APIProvider>
    </>
  );
};

export default MapProvider;
