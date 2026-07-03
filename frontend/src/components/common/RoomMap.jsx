import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { formatNPR } from "../../utils/currency";

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

// `rooms` — array of rooms with lat/lng. `height` — CSS height string.
// `singleMarkerZoom` — used when there's exactly one room, to zoom in closer.
export default function RoomMap({ rooms, height = "400px", singleMarkerZoom = 14 }) {
  const navigate = useNavigate();
  const located = rooms.filter((r) => typeof r.lat === "number" && typeof r.lng === "number");

  if (located.length === 0) {
    return (
      <div
        style={{ height }}
        className="rounded-xl border border-text-muted/20 bg-bg-secondary flex items-center justify-center text-text-muted text-sm"
      >
        No location data available yet
      </div>
    );
  }

  const center = [located[0].lat, located[0].lng];
  const zoom = located.length === 1 ? singleMarkerZoom : 7;

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border border-text-muted/20">
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {located.map((room) => (
          <Marker key={room._id} position={[room.lat, room.lng]} icon={markerIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold mb-1">{room.title}</p>
                <p className="text-gray-600 mb-2">{formatNPR(room.price)}/night</p>
                <button
                  onClick={() => navigate(`/room/${room._id}`)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View details →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
