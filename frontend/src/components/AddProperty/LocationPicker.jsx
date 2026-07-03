import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { LocateFixed } from "lucide-react";

// Vite doesn't resolve Leaflet's default marker image paths, so point at the CDN copies
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DEFAULT_CENTER = [27.7172, 85.324]; // Kathmandu

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function Recenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], Math.max(map.getZoom(), 13));
  }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// Interactive location picker: click or drag the marker to set lat/lng.
// `lat`/`lng` — currently picked position (null until the host picks one).
// `onPick(lat, lng)` — called on click, marker drag, or "use my location".
export default function LocationPicker({ lat, lng, onPick, height = "280px" }) {
  const hasPin = typeof lat === "number" && typeof lng === "number";
  const center = hasPin ? [lat, lng] : DEFAULT_CENTER;

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      onPick(pos.coords.latitude, pos.coords.longitude);
    });
  };

  return (
    <div className="space-y-2">
      <div style={{ height }} className="rounded-xl overflow-hidden border border-text-muted/20 relative z-0">
        <MapContainer center={center} zoom={hasPin ? 14 : 12} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPick={onPick} />
          {hasPin && (
            <Marker
              position={[lat, lng]}
              icon={markerIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const pos = e.target.getLatLng();
                  onPick(pos.lat, pos.lng);
                },
              }}
            />
          )}
          {hasPin && <Recenter lat={lat} lng={lng} />}
        </MapContainer>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-text-muted text-xs">
          {hasPin ? "Drag the pin or click elsewhere on the map to adjust." : "Click on the map to drop a pin at your property."}
        </p>
        <button
          type="button"
          onClick={useMyLocation}
          className="shrink-0 inline-flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline"
        >
          <LocateFixed className="w-3.5 h-3.5" /> Use my location
        </button>
      </div>
    </div>
  );
}
