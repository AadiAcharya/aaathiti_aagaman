import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertiesAPI } from "../../services/api";

const STORAGE_KEYS = [
  "addProperty_type",
  "addProperty_amenities",
  "addProperty_description",
  "addProperty_facilities",
  "addProperty_safety",
];
const clearStorage = () => STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));

const steps = ["Type", "Amenities", "Description", "Facilities", "Safety", "Post"];
const StepBar = ({ current }) => (
  <div className="max-w-6xl mx-auto px-6 pt-8 pb-2">
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            i < current ? "bg-primary text-white" :
            i === current ? "bg-primary text-white ring-4 ring-primary/20" :
            "bg-bg-secondary text-text-muted border border-text-muted/20"
          }`}>
            {i < current ? "✓" : i + 1}
          </div>
          <span className={`text-xs font-semibold hidden sm:block ${i === current ? "text-primary" : "text-text-muted"}`}>{s}</span>
          {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < current ? "bg-primary" : "bg-text-muted/20"}`} />}
        </div>
      ))}
    </div>
  </div>
);

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

      await propertiesAPI.create({
        title:       property.title,
        location:    property.location || "Not specified",
        description: property.description || "",
        category:    property.category || "rooms",
        bedrooms:    String(property.bedrooms || "1"),
        bathrooms:   String(property.bathrooms || "1"),
        parking:     String(property.parking || "0"),
        pets:        property.pets || "No",
        price:       `$${property.price} USD`,
        priceMin:    Number(property.price) || 0,
        priceMax:    Number(property.price) || 0,
        amenities:   [...(property.amenities || []), ...(property.facilities || [])],
        safety:      property.safety || [],
        image:       property.image || "",
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
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-text-primary mb-4">Property Posted!</h2>
        <p className="text-text-secondary mb-8">
          Your property is now live. Guests can find and book it right away.
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate("/properties")}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-xl transition shadow-lg">
            Browse Listings
          </button>
          <button onClick={() => navigate("/")}
            className="bg-bg-secondary hover:bg-background text-text-primary font-bold px-8 py-3 rounded-xl border border-text-muted transition">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );

  if (!property) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
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
                  <span className="text-6xl">🏠</span>
                </div>
              )}
            </div>

            {/* Title & Info */}
            <div className="bg-bg-secondary rounded-2xl p-6 border border-text-muted/20">
              <h1 className="text-2xl font-bold text-text-primary mb-2">{property.title}</h1>
              <p className="text-text-secondary flex items-center gap-1 mb-4">
                <span>📍</span> {property.location}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">{property.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "🏷️", label: "Type",      value: property.type },
                  { icon: "🛏️", label: "Bedrooms",  value: property.bedrooms },
                  { icon: "🚿", label: "Bathrooms", value: property.bathrooms },
                  { icon: "🐾", label: "Pets",      value: property.pets },
                ].map((item) => (
                  <div key={item.label} className="bg-background rounded-xl p-4 text-center border border-text-muted/10">
                    <p className="text-2xl mb-1">{item.icon}</p>
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
                  <span className="text-2xl font-bold text-primary">${property.price}</span>
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
                    <span className={done ? "text-green-500" : "text-text-muted"}>
                      {done ? "✓" : "○"}
                    </span>
                    <span className={done ? "text-text-primary" : "text-text-muted"}>{label}</span>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button onClick={handlePost} disabled={submitting}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition mb-3 disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg">
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Posting...
                  </>
                ) : "🚀 Post My Property"}
              </button>

              <button onClick={() => navigate("/safety")}
                className="w-full bg-bg-secondary hover:bg-background text-text-primary font-bold py-3 rounded-xl border-2 border-text-muted/30 transition text-sm">
                ← Back to Edit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}