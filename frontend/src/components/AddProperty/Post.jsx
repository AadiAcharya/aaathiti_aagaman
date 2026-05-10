import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { propertiesAPI } from "../../services/api";

/**
 * Post.jsx — Final step of the Add Property flow.
 * Reads accumulated form data from localStorage keys set by previous steps:
 *   - addProperty_type       (from AddProperty.jsx)
 *   - addProperty_amenities  (from Amenities.jsx)
 *   - addProperty_description (from Description.jsx)
 *   - addProperty_facilities  (from Facilities.jsx)
 *   - addProperty_safety      (from Safety.jsx)
 */

const STORAGE_KEYS = [
  "addProperty_type",
  "addProperty_amenities",
  "addProperty_description",
  "addProperty_facilities",
  "addProperty_safety",
];

const clearStorage = () => STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));

export default function Post() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState("");

  // Build property preview from what previous steps saved to localStorage
  const [property, setProperty] = useState({
    title:       "Luxury Apartment in Downtown",
    price:       1500,
    currency:    "USD",
    description: "Beautiful apartment with modern amenities located in the heart of downtown. Perfect for short-term and long-term rentals.",
    bedrooms:    2,
    bathrooms:   2,
    type:        "Apartment",
    category:    "apartments",
    amenities:   ["Kitchen", "Wi-Fi", "Parking", "Balcony"],
    facilities:  ["Air Conditioning", "Heating", "Washing Machine"],
    safety:      ["CCTV", "Security Guard", "Fire Extinguisher"],
    image:       "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  });

  // Merge any data saved by previous steps
useEffect(() => {
  try {
    const typeData  = localStorage.getItem("addProperty_type");
    const amenData  = localStorage.getItem("addProperty_amenities");
    const descData  = localStorage.getItem("addProperty_description");
    const facData   = localStorage.getItem("addProperty_facilities");
    const safeData  = localStorage.getItem("addProperty_safety");

    const saved = {};
    if (typeData)  Object.assign(saved, JSON.parse(typeData));
    if (amenData)  Object.assign(saved, { amenities:  JSON.parse(amenData) });
    if (descData)  Object.assign(saved, JSON.parse(descData));
    if (facData)   Object.assign(saved, { facilities: JSON.parse(facData) });
    if (safeData)  Object.assign(saved, { safety:     JSON.parse(safeData) });

    if (Object.keys(saved).length > 0) {
      setProperty((prev) => ({ ...prev, ...saved }));
    }
  } catch (e) {
    console.error("Failed to load saved property data", e);
  }
}, []);

  const handlePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/sign-in"); return; }

    try {
      setSubmitting(true);
      setError("");

      await propertiesAPI.create({
        title:       property.title,
        location:    property.location || "Not specified",
        description: property.description,
        category:    property.category || "apartments",
        bedrooms:    String(property.bedrooms),
        bathrooms:   String(property.bathrooms),
        price:       `$${property.price} ${property.currency}`,
        priceMin:    property.price,
        priceMax:    property.price,
        amenities:   [...(property.amenities || []), ...(property.facilities || [])],
        safety:      property.safety,
        image:       property.image,
      });

      clearStorage();
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to post property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (submitted) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md p-8">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-text-primary mb-4">Property Posted!</h2>
        <p className="text-text-secondary mb-8">
          Your property is now live. Guests can find and book it right away.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/room-status")}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-lg transition"
          >
            View My Listings
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-bg-secondary hover:bg-background text-text-primary font-bold px-8 py-4 rounded-lg border border-text-muted transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-text-primary mb-12">Review Your Property</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Property Details */}
          <div className="md:col-span-2">
            {/* Image */}
            <div className="mb-8 rounded-lg overflow-hidden bg-bg-secondary h-96">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
            </div>

            {/* Title & Price */}
            <div className="bg-bg-secondary rounded-lg p-8 mb-8 border border-text-muted/20">
              <h1 className="text-3xl font-bold text-text-primary mb-4">{property.title}</h1>
              <p className="text-2xl font-bold text-primary mb-4">
                ${property.price} {property.currency}
              </p>
              <p className="text-text-secondary mb-6">{property.description}</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Bedrooms",  value: property.bedrooms },
                  { label: "Bathrooms", value: property.bathrooms },
                  { label: "Type",      value: property.type },
                ].map((item) => (
                  <div key={item.label} className="bg-background rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{item.value}</p>
                    <p className="text-text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-bg-secondary rounded-lg p-8 mb-8 border border-text-muted/20">
                <h3 className="text-xl font-bold text-text-primary mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-full" />
                      <span className="text-text-secondary">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities */}
            {property.facilities?.length > 0 && (
              <div className="bg-bg-secondary rounded-lg p-8 mb-8 border border-text-muted/20">
                <h3 className="text-xl font-bold text-text-primary mb-4">Facilities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-full" />
                      <span className="text-text-secondary">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety */}
            {property.safety?.length > 0 && (
              <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20">
                <h3 className="text-xl font-bold text-text-primary mb-4">Safety Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.safety.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-full" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="md:col-span-1">
            <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20 sticky top-20">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Summary</h3>

              {[
                { label: "Type",      value: property.type },
                { label: "Bedrooms",  value: property.bedrooms },
                { label: "Bathrooms", value: property.bathrooms },
              ].map((item) => (
                <div key={item.label} className="mb-6 pb-6 border-b border-text-muted/20">
                  <p className="text-text-secondary mb-2">{item.label}</p>
                  <p className="text-text-primary font-semibold">{item.value}</p>
                </div>
              ))}

              <div className="mb-8 pb-8 border-b border-text-muted/20">
                <p className="text-text-secondary mb-2">Price</p>
                <p className="text-2xl font-bold text-primary">${property.price}</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePost}
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-colors mb-4 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Posting...
                  </>
                ) : "Post My Property"}
              </button>

              <button
                onClick={() => navigate("/safety")}
                className="w-full bg-bg-secondary hover:bg-background text-text-primary font-bold py-3 rounded-lg border border-text-muted transition-colors"
              >
                ← Back to Edit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}