import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { roomsAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import { PartyPopper, Home, MapPin, Tag, Bed, ShowerHead, PawPrint, Rocket, Check, Circle } from "lucide-react";
import StepBar from "./StepBar";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

const STORAGE_KEYS = [
  "addProperty_type",
  "addProperty_amenities",
  "addProperty_description",
  "addProperty_facilities",
  "addProperty_safety",
];
const clearStorage = () => STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));

export default function Post() {
  const navigate    = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState("");
  const [property,   setProperty]   = useState(null);

  useEffect(() => {
    try {
      const typeData = localStorage.getItem("addProperty_type");
      const amenData = localStorage.getItem("addProperty_amenities");
      const descData = localStorage.getItem("addProperty_description");
      const facData  = localStorage.getItem("addProperty_facilities");
      const safeData = localStorage.getItem("addProperty_safety");

      const type  = typeData ? JSON.parse(typeData)  : {};
      const amen  = amenData ? JSON.parse(amenData)  : [];
      const desc  = descData ? JSON.parse(descData)  : {};
      const fac   = facData  ? JSON.parse(facData)   : [];
      const safe  = safeData ? JSON.parse(safeData)  : [];

      setProperty({
        ...type,
        ...desc,
        amenities:  amen,
        facilities: fac,
        safety:     safe,
      });
    } catch (e) {
      console.error("Failed to load property data", e);
    }
  }, []);

  const handlePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/sign-in"); return; }
    if (!property?.title) { setError("Missing property details. Please go back and fill in the form."); return; }

    try {
      setSubmitting(true);
      setError("");

      const bedroomCount = Number(property.bedrooms) || 1;

      await roomsAPI.create({
        title:        property.title,
        description:  property.description || "No description provided yet.",
        location:     property.location || "Not specified",
        image:        property.image || "",
        images:       property.images || [],
        price:        Number(property.price) || 0,
        priceDisplay: formatNPR(property.price || 0),
        type:         bedroomCount >= 3 ? "suite" : bedroomCount === 2 ? "double" : "single",
        bedType:      property.type || "",
        bedrooms:     String(property.bedrooms || "1"),
        bathrooms:    String(property.bathrooms || "1"),
        maxGuests:    Math.max(1, bedroomCount * 2),
        parking:      String(property.parking || "0"),
        pets:         property.pets || "No",
        amenities:    [...(property.amenities || []), ...(property.facilities || [])],
        safety:       property.safety || [],
      });

      clearStorage();
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to post property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (submitted) return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center mb-6"><PartyPopper className="w-16 h-16 text-primary" /></div>
        <h2 className="text-3xl font-bold text-text-primary mb-4">Property Posted!</h2>
        <p className="text-text-secondary mb-8">
          Your property is now live. Guests can find and book it right away.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/rooms")}>
            Browse Listings
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );

  if (!property) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );

  const Badge = ({ label, items }) =>
    items?.length > 0 ? (
      <div className="bg-bg-secondary rounded-2xl p-6 border border-text-muted/20">
        <h3 className="text-lg font-bold text-text-primary mb-4">{label}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className="bg-background min-h-screen">
      <StepBar current={5} />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-text-primary mb-2">Review Your Property</h2>
          <p className="text-text-secondary">Everything look good? Post it when you're ready.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left — Details ──────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Image */}
            <div className="rounded-2xl overflow-hidden bg-bg-secondary h-72 border border-text-muted/20">
              {property.image ? (
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Home className="w-14 h-14 text-text-muted" />
                </div>
              )}
            </div>
            {(property.images || []).length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {property.images.map((img, i) => (
                  <div key={i} className="h-16 rounded-lg overflow-hidden border border-text-muted/20">
                    <img src={img} alt={`Additional ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Title & Info */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-text-muted/20">
              <h1 className="text-2xl font-bold text-text-primary mb-2">{property.title}</h1>
              <p className="text-text-secondary flex items-center gap-1.5 mb-4">
                <MapPin className="w-4 h-4" /> {property.location}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">{property.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Tag,        label: "Type",      value: property.type },
                  { icon: Bed,        label: "Bedrooms",  value: property.bedrooms },
                  { icon: ShowerHead, label: "Bathrooms", value: property.bathrooms },
                  { icon: PawPrint,   label: "Pets",      value: property.pets },
                ].map((item) => (
                  <div key={item.label} className="bg-background rounded-xl p-4 text-center border border-text-muted/10">
                    <item.icon className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <p className="text-lg font-bold text-primary capitalize">{item.value}</p>
                    <p className="text-text-secondary text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Badge label="Amenities"       items={property.amenities} />
            <Badge label="Facilities"      items={property.facilities} />
            <Badge label="Safety Features" items={property.safety} />
          </div>

          {/* ── Right — Sidebar ─────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-bg-secondary rounded-2xl p-6 border border-text-muted/20 sticky top-24">
              <h3 className="text-xl font-bold text-text-primary mb-6">Summary</h3>

              <div className="space-y-4 mb-6">
                {[
                  { label: "Property Type", value: property.type },
                  { label: "Category",      value: property.category },
                  { label: "Location",      value: property.location },
                  { label: "Bedrooms",      value: property.bedrooms },
                  { label: "Bathrooms",     value: property.bathrooms },
                  { label: "Parking",       value: property.parking },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-text-muted/10">
                    <span className="text-text-secondary text-sm">{label}</span>
                    <span className="text-text-primary font-semibold text-sm capitalize">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-text-secondary text-sm">Price</span>
                  <span className="text-2xl font-bold text-primary">{formatNPR(property.price)}</span>
                </div>
              </div>

              {/* Completeness check */}
              <div className="mb-6 space-y-2">
                {[
                  { label: "Property type",  done: !!property.type },
                  { label: "Title & details", done: !!property.title },
                  { label: "Amenities",      done: (property.amenities?.length || 0) > 0 },
                  { label: "Safety",         done: (property.safety?.length || 0) > 0 },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    {done ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Circle className="w-4 h-4 text-text-muted" />
                    )}
                    <span className={done ? "text-text-primary" : "text-text-muted"}>{label}</span>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-danger-subtle border border-danger/30 rounded-xl text-danger text-sm">
                  {error}
                </div>
              )}

              <Button
                fullWidth
                size="lg"
                icon={Rocket}
                loading={submitting}
                onClick={handlePost}
                className="mb-3"
              >
                Post My Property
              </Button>

              <Button variant="secondary" fullWidth onClick={() => navigate("/safety")}>
                ← Back to Edit
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}