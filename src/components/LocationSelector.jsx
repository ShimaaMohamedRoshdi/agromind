import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

export default function LocationSelector({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng); // Send coordinates to parent
      },
    });
    return position === null ? null : <Marker position={position} />;
  };

  return (
    <MapContainer
      center={[30.033, 31.233]}
      zoom={6}
      style={{ height: "300px", marginTop: "10px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
    </MapContainer>
  );
}
