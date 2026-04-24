import { useState } from "react";

const PropertyCard = ({ title, location, price, image }) => (
  <div className="bg-bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition">
    <div className="bg-text-muted/10 h-48 relative overflow-hidden group">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition"
      />
      <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition">
        <svg
          className="w-5 h-5 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
        <span className="h-1.5 w-1.5 bg-text-secondary rounded-full"></span>
        <span className="h-1.5 w-1.5 bg-text-muted/30 rounded-full"></span>
        <span className="h-1.5 w-1.5 bg-text-muted/30 rounded-full"></span>
      </div>
    </div>
    <div className="p-4">
      <p className="text-text-secondary text-sm font-semibold mb-2">{price}</p>
      <h3 className="text-text-primary font-bold text-lg mb-1">{title}</h3>
      <p className="text-text-secondary text-sm">{location}</p>
    </div>
  </div>
);

export default function Properties() {
  const [activeCategory, setActiveCategory] = useState("apartments");

  const properties = [
    {
      id: 1,
      title: "Well Furnished Apartment",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property1.svg",
    },
    {
      id: 2,
      title: "Amazing Dream Building",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property2.svg",
    },
    {
      id: 3,
      title: "Boys Hostel Apartment",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property3.svg",
    },
    {
      id: 4,
      title: "Well Furnished Apartment",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property4.svg",
    },
    {
      id: 5,
      title: "Amazing Dream Building",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property1.svg",
    },
    {
      id: 6,
      title: "Boys Hostel Apartment",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property2.svg",
    },
    {
      id: 7,
      title: "Well Furnished Apartment",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property3.svg",
    },
    {
      id: 8,
      title: "Amazing Dream Building",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property4.svg",
    },
    {
      id: 9,
      title: "Boys Hostel Apartment",
      location: "100 Smart Street, LA, USA",
      price: "$ 1000 - 5000 USD",
      image: "/images/property1.svg",
    },
  ];

  const categories = [
    { id: "apartments", label: "Apartments" },
    { id: "houses", label: "Houses" },
    { id: "villas", label: "Villas" },
    { id: "homestays", label: "Homestays" },
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Category Tabs and Filters */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-lg font-semibold pb-2 transition relative ${
                  activeCategory === cat.id
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-text-primary rounded"></div>
                )}
              </button>
            ))}
          </div>
          <button className="border border-text-secondary rounded-full px-6 py-2 font-semibold text-text-primary hover:bg-bg-secondary transition flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {properties.map((property, index) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              location={property.location}
              price={property.price}
              image={property.image}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="text-center mb-16">
          <p className="text-text-secondary font-semibold">
            Paginations or Load on scroll...
          </p>
        </div>
      </div>
    </div>
  );
}
