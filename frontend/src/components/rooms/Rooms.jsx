import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { roomsAPI, authAPI } from "../../services/api";

export default function Rooms() {
  const navigate = useNavigate();

  const [rooms, setRooms]           = useState([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [page, setPage]             = useState(1);
  const LIMIT = 6;

  const [roomType, setRoomType]     = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy]         = useState("default");

  // Wishlist stored in state (synced from backend if logged in, else localStorage)
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("roomFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { page, limit: LIMIT };
      if (roomType   !== "all")     params.type       = roomType;
      if (priceRange !== "all")     params.priceRange = priceRange;
      if (sortBy     !== "default") params.sortBy     = sortBy;

      const data = await roomsAPI.getAll(params);
      setRooms(data.rooms);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [roomType, priceRange, sortBy, page]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [roomType, priceRange, sortBy]);

  const resetFilters = () => {
    setRoomType("all");
    setPriceRange("all");
    setSortBy("default");
    setPage(1);
  };

  const toggleWishlist = async (e, roomId) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { wishlist: updated } = await authAPI.toggleWishlist(roomId);
        setWishlist(updated.map((id) => id.toString()));
      } catch {
        // fallback to local
        toggleLocal(roomId);
      }
    } else {
      toggleLocal(roomId);
    }
  };

  const toggleLocal = (roomId) => {
    setWishlist((prev) => {
      const next = prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId];
      localStorage.setItem("roomFavorites", JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (roomId) =>
    wishlist.includes(roomId) || wishlist.includes(roomId.toString());

  const hasMore      = page * LIMIT < total;
  const filtersActive = roomType !== "all" || priceRange !== "all" || sortBy !== "default";

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-text-primary mb-4">Available Rooms</h1>
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

          {filtersActive && (
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg font-semibold transition"
            >
              Clear Filters
            </button>
          )}

          <div className="px-6 py-3 text-text-secondary font-semibold">
            {loading ? "Loading..." : `${total} rooms found`}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error} —{" "}
            <button onClick={fetchRooms} className="underline font-semibold">
              retry
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div key={i} className="bg-bg-secondary rounded-lg overflow-hidden border border-primary/10 animate-pulse">
                <div className="h-56 bg-primary/10" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-primary/10 rounded w-3/4" />
                  <div className="h-3 bg-primary/10 rounded w-1/2" />
                  <div className="h-3 bg-primary/10 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rooms Grid */}
        {!loading && rooms.length === 0 && !error && (
          <div className="text-center py-20 text-text-secondary">
            <p className="text-2xl mb-2">No rooms found</p>
            <p>Try adjusting your filters</p>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room._id}
                onClick={() => navigate(`/room/${room._id}`)}
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
                      ${room.price}
                      <span className="text-sm font-normal text-text-secondary">/night</span>
                    </p>
                  </div>
                </div>

                {/* Room Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-text-primary text-xl">{room.title}</h3>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="font-semibold text-text-primary text-sm">{room.rating}</span>
                      <span className="text-text-secondary text-sm">({room.reviews})</span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm mb-4">{room.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities?.map((amenity, index) => (
                      <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/room/${room._id}`); }}
                      className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={(e) => toggleWishlist(e, room._id)}
                      className="px-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition"
                    >
                      <span className="text-2xl">{isWishlisted(room._id) ? "❤️" : "🤍"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-4">
          {page > 1 && (
            <button
              onClick={() => setPage((p) => p - 1)}
              className="bg-bg-secondary hover:bg-primary/10 text-text-primary font-semibold px-8 py-4 rounded-full border border-primary/10 transition"
            >
              ← Previous
            </button>
          )}
          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="bg-bg-secondary hover:bg-primary/10 text-text-primary font-semibold px-8 py-4 rounded-full border border-primary/10 transition"
            >
              Load More ({total - page * LIMIT} remaining)
            </button>
          )}
        </div>
      </main>
    </div>
  );
}