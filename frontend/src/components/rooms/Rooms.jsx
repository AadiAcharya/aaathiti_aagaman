import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { roomsAPI, authAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import { isTopRated } from "../../utils/rating";
import StarRating from "../common/StarRating";
import TopRatedBadge from "../common/TopRatedBadge";
import { Heart, ImageOff, LayoutGrid, Map } from "lucide-react";
import RoomMap from "../common/RoomMap";

export default function Rooms() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { role } = useAuth();
  const isHost = role === "host" || role === "admin";

  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const LIMIT = 6;

  const [roomType, setRoomType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [viewMode, setViewMode] = useState("grid"); // "grid" | "map"
  const [mapRooms, setMapRooms] = useState([]);
  const [mapLoading, setMapLoading] = useState(false);

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
      if (roomType !== "all") params.type = roomType;
      if (priceRange !== "all") params.priceRange = priceRange;
      if (sortBy !== "default") params.sortBy = sortBy;

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

  // Map view shows all matching rooms at once, not just the current page
  useEffect(() => {
    if (viewMode !== "map") return;
    const fetchAllForMap = async () => {
      try {
        setMapLoading(true);
        const params = { page: 1, limit: 100 };
        if (roomType !== "all") params.type = roomType;
        if (priceRange !== "all") params.priceRange = priceRange;
        if (sortBy !== "default") params.sortBy = sortBy;
        const data = await roomsAPI.getAll(params);
        setMapRooms(data.rooms);
      } catch {
        setMapRooms([]);
      } finally {
        setMapLoading(false);
      }
    };
    fetchAllForMap();
  }, [viewMode, roomType, priceRange, sortBy]);

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

  const hasMore = page * LIMIT < total;
  const filtersActive =
    roomType !== "all" || priceRange !== "all" || sortBy !== "default";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-background text-text-primary"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1
            className={`text-5xl font-bold ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            } mb-4`}
          >
            Available Rooms
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-lg`}
          >
            Browse our selection of comfortable accommodations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className={`px-6 py-3 ${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 text-text-primary"
                : "bg-white border-gray-300 text-gray-900"
            } border rounded-lg focus:outline-none focus:border-primary`}
          >
            <option value="all">All Room Types</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={`px-6 py-3 ${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 text-text-primary"
                : "bg-white border-gray-300 text-gray-900"
            } border rounded-lg focus:outline-none focus:border-primary`}
          >
            <option value="all">Price Range</option>
            <option value="under-15000">Under Rs 15,000</option>
            <option value="15000-30000">Rs 15,000 - Rs 30,000</option>
            <option value="over-30000">Over Rs 30,000</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-6 py-3 ${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 text-text-primary"
                : "bg-white border-gray-300 text-gray-900"
            } border rounded-lg focus:outline-none focus:border-primary`}
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>

          {filtersActive && (
            <button
              onClick={resetFilters}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                theme === "dark"
                  ? "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              Clear Filters
            </button>
          )}

          <div
            className={`px-6 py-3 ${
              theme === "dark" ? "text-text-secondary" : "text-gray-500"
            } font-semibold`}
          >
            {loading ? "Loading..." : `${total} rooms found`}
          </div>

          <div
            className={`ml-auto flex rounded-lg border overflow-hidden ${
              theme === "dark" ? "border-primary/10" : "border-gray-300"
            }`}
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-3 flex items-center gap-2 text-sm font-semibold transition ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : theme === "dark"
                    ? "bg-bg-secondary text-text-secondary hover:text-text-primary"
                    : "bg-white text-gray-600 hover:text-gray-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-3 flex items-center gap-2 text-sm font-semibold transition ${
                viewMode === "map"
                  ? "bg-primary text-white"
                  : theme === "dark"
                    ? "bg-bg-secondary text-text-secondary hover:text-text-primary"
                    : "bg-white text-gray-600 hover:text-gray-900"
              }`}
            >
              <Map className="w-4 h-4" /> Map
            </button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === "map" && (
          <div className="mb-12">
            {mapLoading ? (
              <div
                className={`h-[500px] rounded-xl border flex items-center justify-center ${
                  theme === "dark"
                    ? "border-primary/10 text-text-secondary"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                Loading map...
              </div>
            ) : (
              <RoomMap rooms={mapRooms} height="500px" />
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error} —{" "}
            <button onClick={fetchRooms} className="underline font-semibold">
              retry
            </button>
          </div>
        )}

        {viewMode === "grid" && (
        <>
        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div
                key={i}
                className={`${
                  theme === "dark"
                    ? "bg-bg-secondary border-primary/10"
                    : "bg-white border-gray-200"
                } rounded-lg overflow-hidden border animate-pulse`}
              >
                <div
                  className={`h-56 ${
                    theme === "dark" ? "bg-primary/10" : "bg-gray-300"
                  }`}
                />
                <div className="p-6 space-y-3">
                  <div
                    className={`h-4 ${
                      theme === "dark" ? "bg-primary/10" : "bg-gray-300"
                    } rounded w-3/4`}
                  />
                  <div
                    className={`h-3 ${
                      theme === "dark" ? "bg-primary/10" : "bg-gray-300"
                    } rounded w-1/2`}
                  />
                  <div
                    className={`h-3 ${
                      theme === "dark" ? "bg-primary/10" : "bg-gray-300"
                    } rounded w-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rooms Grid */}
        {!loading && rooms.length === 0 && !error && (
          <div
            className={`text-center py-20 ${
              theme === "dark" ? "text-text-secondary" : "text-gray-500"
            }`}
          >
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
                className={`${
                  theme === "dark"
                    ? "bg-bg-secondary border-primary/10 hover:shadow-2xl"
                    : "bg-white border-gray-200 hover:shadow-xl"
                } rounded-xl overflow-hidden border shadow-sm transition-shadow duration-300 group cursor-pointer flex flex-col`}
              >
                {/* Room Image */}
                <div
                  className={`relative h-56 overflow-hidden shrink-0 ${
                    theme === "dark" ? "bg-bg-secondary" : "bg-gray-100"
                  }`}
                >
                  {room.image ? (
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`${room.image ? "hidden" : "flex"} absolute inset-0 items-center justify-center ${
                      theme === "dark" ? "text-text-muted" : "text-gray-400"
                    }`}
                  >
                    <ImageOff className="w-10 h-10" />
                  </div>
                  {isTopRated(room.rating, room.reviews) && (
                    <TopRatedBadge className="absolute top-4 left-4" />
                  )}
                  <div
                    className={`absolute top-4 right-4 ${
                      theme === "dark"
                        ? "bg-white/90"
                        : "bg-white/80 backdrop-blur-sm"
                    } px-3 py-1 rounded-full`}
                  >
                    <p
                      className={`font-bold ${
                        theme === "dark" ? "text-primary" : "text-blue-600"
                      }`}
                    >
                      {formatNPR(room.price)}
                      <span
                        className={`text-sm font-normal ${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-600"
                        }`}
                      >
                        /night
                      </span>
                    </p>
                  </div>
                </div>

                {/* Room Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3
                      className={`font-bold ${
                        theme === "dark" ? "text-text-primary" : "text-gray-900"
                      } text-xl line-clamp-1`}
                    >
                      {room.title}
                    </h3>
                    <StarRating rating={room.rating} reviews={room.reviews} showValue />
                  </div>

                  <p
                    className={`${
                      theme === "dark" ? "text-text-secondary" : "text-gray-600"
                    } text-sm mb-4 line-clamp-2`}
                  >
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities?.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 ${
                          theme === "dark"
                            ? "bg-primary/10 text-primary"
                            : "bg-blue-100 text-blue-800"
                        } text-xs rounded-full font-medium`}
                      >
                        {amenity}
                      </span>
                    ))}
                    {(room.amenities?.length || 0) > 4 && (
                      <span
                        className={`px-3 py-1 ${
                          theme === "dark"
                            ? "bg-bg-secondary text-text-muted border border-primary/10"
                            : "bg-gray-100 text-gray-500"
                        } text-xs rounded-full font-medium`}
                      >
                        +{room.amenities.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/room/${room._id}`);
                      }}
                      className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition"
                    >
                      Book Now
                    </button>
                    {!isHost && (
                      <button
                        onClick={(e) => toggleWishlist(e, room._id)}
                        className={`px-4 border-2 ${
                          theme === "dark"
                            ? "border-primary text-primary hover:bg-primary hover:text-white"
                            : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        } font-semibold rounded-lg transition`}
                      >
                        <Heart
                          className={`w-6 h-6 mx-auto ${
                            isWishlisted(room._id)
                              ? "fill-red-500 text-red-500"
                              : "fill-none text-current"
                          }`}
                        />
                      </button>
                    )}
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
              className={`${
                theme === "dark"
                  ? "bg-bg-secondary hover:bg-primary/10 text-text-primary border-primary/10"
                  : "bg-white hover:bg-gray-100 text-gray-800 border-gray-300"
              } font-semibold px-8 py-4 rounded-full border transition`}
            >
              ← Previous
            </button>
          )}
          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className={`${
                theme === "dark"
                  ? "bg-bg-secondary hover:bg-primary/10 text-text-primary border-primary/10"
                  : "bg-white hover:bg-gray-100 text-gray-800 border-gray-300"
              } font-semibold px-8 py-4 rounded-full border transition`}
            >
              Next →
            </button>
          )}
        </div>
        </>
        )}
      </main>
    </div>
  );
}
