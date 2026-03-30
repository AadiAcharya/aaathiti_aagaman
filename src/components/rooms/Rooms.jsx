export default function Rooms() {
  const rooms = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop",
      title: "Luxury King Suite",
      description: "Spacious room with king bed and city views",
      price: "$180",
      amenities: ["WiFi", "TV", "AC", "Mini Bar"],
      rating: 4.9,
      reviews: 124,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
      title: "Deluxe Double Room",
      description: "Comfortable room with two queen beds",
      price: "$150",
      amenities: ["WiFi", "TV", "AC", "Coffee Maker"],
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop",
      title: "Ocean View Suite",
      description: "Premium room with breathtaking ocean views",
      price: "$250",
      amenities: ["WiFi", "TV", "AC", "Balcony", "Mini Bar"],
      rating: 5.0,
      reviews: 156,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      title: "Standard Single Room",
      description: "Cozy room perfect for solo travelers",
      price: "$100",
      amenities: ["WiFi", "TV", "AC"],
      rating: 4.5,
      reviews: 67,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
      title: "Family Suite",
      description: "Large suite ideal for families with children",
      price: "$280",
      amenities: ["WiFi", "TV", "AC", "Kitchen", "Living Room"],
      rating: 4.8,
      reviews: 142,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop",
      title: "Executive Business Room",
      description: "Professional space with work desk and fast WiFi",
      price: "$200",
      amenities: ["WiFi", "TV", "AC", "Work Desk", "Coffee Maker"],
      rating: 4.6,
      reviews: 89,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            Available Rooms
          </h1>
          <p className="text-text-secondary text-lg">
            Browse our selection of comfortable accommodations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          <select className="px-6 py-3 bg-bg-secondary border border-primary/10 rounded-lg focus:outline-none focus:border-primary text-text-primary">
            <option>All Room Types</option>
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
          </select>
          <select className="px-6 py-3 bg-bg-secondary border border-primary/10 rounded-lg focus:outline-none focus:border-primary text-text-primary">
            <option>Price Range</option>
            <option>Under $150</option>
            <option>$150 - $250</option>
            <option>Over $250</option>
          </select>
          <select className="px-6 py-3 bg-bg-secondary border border-primary/10 rounded-lg focus:outline-none focus:border-primary text-text-primary">
            <option>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-bg-secondary rounded-lg overflow-hidden border border-primary/10 hover:shadow-2xl transition group"
            >
              {/* Room Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <p className="font-bold text-primary">{room.price}<span className="text-sm font-normal text-text-secondary">/night</span></p>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-text-primary text-xl">
                    {room.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="font-semibold text-text-primary text-sm">
                      {room.rating}
                    </span>
                    <span className="text-text-secondary text-sm">
                      ({room.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-text-secondary text-sm mb-4">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition">
                    Book Now
                  </button>
                  <button className="px-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition">
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="bg-bg-secondary hover:bg-primary/10 text-text-primary font-semibold px-12 py-4 rounded-full border border-primary/10 transition">
            Load More Rooms
          </button>
        </div>
      </main>
    </div>
  );
}