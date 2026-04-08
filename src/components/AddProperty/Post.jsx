import React from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();

  // Hard-coded property data
  const property = {
    title: "Luxury Apartment in Downtown",
    price: 1500,
    currency: "USD",
    description:
      "Beautiful apartment with modern amenities located in the heart of downtown. Perfect for short-term and long-term rentals.",
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    amenities: ["Kitchen", "Wi-Fi", "Parking", "Balcony"],
    facilities: ["Air Conditioning", "Heating", "Washing Machine"],
    safety: ["CCTV", "Security Guard", "Fire Extinguisher"],
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-text-primary mb-12">
          Review Your Property
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Property Image and Details */}
          <div className="md:col-span-2">
            {/* Property Image */}
            <div className="mb-8 rounded-lg overflow-hidden bg-bg-secondary h-96">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Price */}
            <div className="bg-bg-secondary rounded-lg p-8 mb-8 border border-text-muted/20">
              <h1 className="text-3xl font-bold text-text-primary mb-4">
                {property.title}
              </h1>
              <p className="text-2xl font-bold text-primary mb-4">
                ${property.price}/{property.currency}
              </p>
              <p className="text-text-secondary mb-6">{property.description}</p>

              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {property.bedrooms}
                  </p>
                  <p className="text-text-secondary">Bedrooms</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {property.bathrooms}
                  </p>
                  <p className="text-text-secondary">Bathrooms</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-xl font-bold text-primary">
                    {property.type}
                  </p>
                  <p className="text-text-secondary">Type</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-bg-secondary rounded-lg p-8 mb-8 border border-text-muted/20">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-bg-secondary rounded-lg p-8 mb-8 border border-text-muted/20">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Facilities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety */}
            <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Safety Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.safety.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="md:col-span-1">
            <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20 sticky top-20">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Summary
              </h3>

              <div className="mb-6 pb-6 border-b border-text-muted/20">
                <p className="text-text-secondary mb-2">Type</p>
                <p className="text-text-primary font-semibold">
                  {property.type}
                </p>
              </div>

              <div className="mb-6 pb-6 border-b border-text-muted/20">
                <p className="text-text-secondary mb-2">Bedrooms</p>
                <p className="text-text-primary font-semibold">
                  {property.bedrooms}
                </p>
              </div>

              <div className="mb-6 pb-6 border-b border-text-muted/20">
                <p className="text-text-secondary mb-2">Bathrooms</p>
                <p className="text-text-primary font-semibold">
                  {property.bathrooms}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-text-muted/20">
                <p className="text-text-secondary mb-2">Price per Night</p>
                <p className="text-2xl font-bold text-primary">
                  ${property.price}
                </p>
              </div>

              <button
                onClick={() => navigate("/hosting")}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-colors mb-4"
              >
                Post My Property
              </button>

              <button
                onClick={() => navigate("/safety")}
                className="w-full bg-bg-secondary hover:bg-background text-text-primary font-bold py-3 rounded-lg border border-text-muted transition-colors"
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Post;

//Information can be added in similar way.
// The other required information can be added in a similar presentation for listing the property fluently...
// Post my property
