import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { roomsData, sortRooms } from "../../data/propertyData";

export default function Rooms() {
  const navigate = useNavigate();

  const [roomType, setRoomType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(6);
  const [roomFavorites, setRoomFavorites] = useState(()=>{
    const saved = localStorage.getItem("roomFavorites");
    return saved ? JSON.parse(saved) : []
  })

  useEffect(()=>{
  localStorage.setItem("roomFavorites", JSON.stringify(roomFavorites))
  }, [roomFavorites])

  const toggleRoomFavorite = (roomId) => {
    if (roomFavorites.includes(roomId)){
      setRoomFavorites(roomFavorites.filter((id)=> id !== roomId))
    }
    else  {
      setRoomFavorites([...roomFavorites, roomId] )
    }
  }


  const getFilteredRooms = () => {
    let filtered = [...roomsData];

    if (roomType !== "all") {
      filtered = filtered.filter((room) => room.type === roomType);
    }

    if (priceRange === "under-150") {
      filtered = filtered.filter((room) => room.price < 150);
    } else if (priceRange === "over-250") {
      filtered = filtered.filter((room) => room.price > 250);
    } else if (priceRange === "150-250") {
      filtered = filtered.filter(
        (room) => room.price >= 150 && room.price <= 250,
      );
    }

    return sortRooms(filtered, sortBy);
  };
  const filteredRooms = getFilteredRooms();

  useEffect(() => {
    setVisibleCount(6);
  }, [roomType, priceRange, sortBy]);

  const resetFilters = () => {
    setRoomType("all");
    setPriceRange("all");
    setSortBy("default");
    setVisibleCount(6);
  };

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
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="px-6 py-3 bg-bg-secondary border border-primary/10 rounded-lg focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="all">All Room Types</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-6 py-3 bg-bg-secondary border border-primary/10 rounded-lg focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="all">Price Range</option>
            <option value="under-150">Under $150</option>
            <option value="150-250">$150 - $250</option>
            <option value="over-250">Over $250</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 bg-bg-secondary border border-primary/10 rounded-lg focus:outline-none focus:border-primary text-text-primary"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>

          {(roomType !== "all" ||
            priceRange !== "all" ||
            sortBy !== "default") && (
            <button 
            onClick={resetFilters}
            className=" px-6 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition">
              Clear Filters
            </button>
          )}

          <div className="px-6 py-3 text-text-secondary font-semibold">
            {filteredRooms.length} rooms found
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.slice(0, visibleCount).map((room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/room/${room.id}`)}
              className="bg-bg-secondary rounded-lg overflow-hidden border border-primary/10 hover:shadow-2xl transition group cursor-pointer"
            >
              {/* Room Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <p className="font-bold text-primary">
                    {room.priceDisplay}
                    <span className="text-sm font-normal text-text-secondary">
                      /night
                    </span>
                  </p>
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
                  <button 
                  onClick={(e)=> {
                    e.stopPropagation()
                    toggleRoomFavorite(room.id)
                  }}
                  className="px-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition">
                    
                    <span className="text-2xl">{(roomFavorites.includes(room.id) ? "❤️":"🤍")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          {visibleCount < filteredRooms.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="bg-bg-secondary hover:bg-primary/10 text-text-primary font-semibold px-12 py-4 rounded-full border border-primary/10 transition"
            >
              Load More Rooms ({filteredRooms.length - visibleCount} remaining )
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
