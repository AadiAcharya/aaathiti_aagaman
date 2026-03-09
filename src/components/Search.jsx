import { useState } from "react";

export default function Search() {
  const [favorites, setFavorites] = useState({});
  const [selectedMapMarker, setSelectedMapMarker] = useState(null);

  const properties = [
    {
      id: 1,
      title: "Well Furnished Apartment",
      location: "100 Smart Street, LA, USA",
      host: "John Doberman",
      price: "$ 1000  -  $ 5000",
      bedrooms: 3,
      bathrooms: 1,
      parking: 2,
      pets: 0,
      type: "Apartment on Rent",
      period: "For Long Period: 1 - 2 Years",
      image: "/images/property1.svg",
      mapPosition: { top: "20%", left: "30%" },
    },
    {
      id: 2,
      title: "Large Room with Attached Bathroom",
      location: "36 Canberra Street, LA, USA",
      host: "Harry Potter",
      price: "$ 1000  -  $ 5000",
      bedrooms: 1,
      bathrooms: 1,
      parking: 2,
      pets: 0,
      type: "Home Room on Rent",
      period: "For Short Period: 3 - 5 Months",
      image: "/images/property2.svg",
      mapPosition: { top: "45%", left: "65%" },
    },
    {
      id: 3,
      title: "Well Furnished Apartment",
      location: "100 Smart Street, LA, USA",
      host: "John Doberman",
      price: "$ 1000  -  $ 5000",
      bedrooms: 3,
      bathrooms: 1,
      parking: 2,
      pets: 0,
      type: "Apartment on Rent",
      period: "For Long Period: 1 - 2 Years",
      image: "/images/property3.svg",
      mapPosition: { top: "70%", left: "40%" },
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-white min-h-screen overflow-x-hidden">
      {/* Main Content */}
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Results Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
              10 Results Found
            </h1>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex gap-2 flex-wrap">
                {/* Filter Chip 1 */}
                <div className="bg-gray-200 rounded-full px-5 py-2 flex items-center gap-2">
                  <span className="text-gray-700 text-sm font-medium">
                    100 Smart Street
                  </span>
                  <button className="text-gray-600 hover:text-gray-800 text-xl leading-none">
                    ×
                  </button>
                </div>

                {/* Filter Chip 2 */}
                <div className="bg-gray-200 rounded-full px-5 py-2 flex items-center gap-2">
                  <span className="text-gray-700 text-sm font-medium">
                    12 Mar 2021
                  </span>
                  <button className="text-gray-600 hover:text-gray-800 text-xl leading-none">
                    ×
                  </button>
                </div>

                {/* Filter Chip 3 */}
                <div className="bg-gray-200 rounded-full px-5 py-2 flex items-center gap-2">
                  <span className="text-gray-700 text-sm font-medium">
                    Short Period
                  </span>
                  <button className="text-gray-600 hover:text-gray-800 text-xl leading-none">
                    ×
                  </button>
                </div>
              </div>

              {/* Filters Button */}
              <button className="border-2 border-gray-600 text-gray-700 px-7 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                Filters
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-12">
            {/* Left Column - Properties */}
            <div className="space-y-8">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
                >
                  {/* Image Container */}
                  <div className="relative h-64 md:h-72 bg-gray-300 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    {/* Heart Button */}
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition"
                      aria-label="Toggle favorite"
                    >
                      <svg
                        className={`w-6 h-6 ${
                          favorites[property.id]
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                        fill={favorites[property.id] ? "currentColor" : "none"}
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

                    {/* Host Info Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white rounded-lg p-3 shadow-md">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0"></div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">
                          Listed By:
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {property.host}
                        </p>
                        <p className="text-xs text-gray-700 font-medium">
                          For: {property.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {property.location}
                    </p>

                    {/* Amenities Row */}
                    <div className="flex gap-6 items-center mb-4">
                      {/* Bedrooms */}
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
                        </svg>
                        <span className="text-base font-semibold text-gray-800">
                          {property.bedrooms}
                        </span>
                      </div>

                      {/* Bathrooms */}
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm13 17H4v-2h16v2zm0-5H4V8h16v7z" />
                        </svg>
                        <span className="text-base font-semibold text-gray-800">
                          {property.bathrooms}
                        </span>
                      </div>

                      {/* Parking */}
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z" />
                        </svg>
                        <span className="text-base font-semibold text-gray-800">
                          {property.parking}
                        </span>
                      </div>

                      {/* Pets */}
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.5 9.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M9 5.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M15 5.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M19.5 9.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91c-.46-.54-1.05-1.08-1.75-1.32c-.11-.04-.22-.07-.33-.09c-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09c-.7.24-1.28.78-1.75 1.32c-.87 1.02-1.6 1.89-2.48 2.91c-1.31 1.31-2.92 2.76-2.62 4.79c.29 1.02 1.02 2.03 2.33 2.32c.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44c1.31-.29 2.04-1.31 2.33-2.32c.31-2.04-1.3-3.49-2.61-4.8z" />
                        </svg>
                        <span className="text-base font-semibold text-gray-800">
                          {property.pets}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-gray-600 font-semibold">
                      <span>{property.type}</span>
                      <span>{property.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Map */}
            <div className="relative h-[500px] lg:sticky lg:top-32 lg:h-[600px] bg-gray-300 rounded-2xl overflow-hidden shadow-lg">
              {/* Map Background - Street Map Style */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
                {/* Street lines pattern */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="50"
                    x2="400"
                    y2="50"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="120"
                    x2="400"
                    y2="120"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="190"
                    x2="400"
                    y2="190"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="80"
                    y1="0"
                    x2="80"
                    y2="300"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="160"
                    y1="0"
                    x2="160"
                    y2="300"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="240"
                    y1="0"
                    x2="240"
                    y2="300"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="320"
                    y1="0"
                    x2="320"
                    y2="300"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <text x="150" y="30" fontSize="12" fill="gray" opacity="0.5">
                    Pacific Hwy
                  </text>
                  <text x="20" y="100" fontSize="11" fill="gray" opacity="0.5">
                    Smart St
                  </text>
                </svg>
              </div>

              {/* Property Markers */}
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    top: property.mapPosition.top,
                    left: property.mapPosition.left,
                  }}
                  onMouseEnter={() => setSelectedMapMarker(property.id)}
                  onMouseLeave={() => setSelectedMapMarker(null)}
                >
                  {/* Marker Pin */}
                  <div className="relative w-12 h-12">
                    {/* Pin Circle */}
                    <div className="absolute inset-0 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white text-sm font-bold border-4 border-white hover:bg-blue-700 transition">
                      ${property.price.split(" ")[1]}k
                    </div>
                  </div>

                  {/* Popup Card */}
                  {selectedMapMarker === property.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-white rounded-lg shadow-2xl z-30 w-64 overflow-hidden pointer-events-none">
                      {/* Image */}
                      <div className="h-36 bg-gray-400 relative overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                      {/* Content */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 text-sm mb-1">
                          {property.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {property.location}
                        </p>
                        <p className="text-sm font-bold text-blue-600 mb-3">
                          {property.price}
                        </p>
                        {/* Amenities Icons */}
                        <div className="flex gap-4 text-xs text-gray-700 font-semibold">
                          <span className="flex items-center gap-1">
                            🛏️ {property.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            🚿 {property.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            🚗 {property.parking}
                          </span>
                        </div>
                      </div>
                      {/* Arrow pointer */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-gray-600 font-semibold mb-12">
            Other as per found results...
          </p>
        </div>
      </div>
    </div>
  );
}
