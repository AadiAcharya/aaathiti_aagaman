import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { roomsAPI, authAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import { isTopRated } from "../../utils/rating";
import StarRating from "../common/StarRating";
import TopRatedBadge from "../common/TopRatedBadge";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Pagination from "../ui/Pagination";
import EmptyState from "../ui/EmptyState";
import Skeleton from "../ui/Skeleton";
import { Heart, ImageOff, LayoutGrid, Map, SearchX } from "lucide-react";
import RoomMap from "../common/RoomMap";

export default function Rooms() {
  const navigate = useNavigate();
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

  const totalPages = Math.max(1, Math.ceil(total / LIMIT));
  const filtersActive =
    roomType !== "all" || priceRange !== "all" || sortBy !== "default";

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-3">
            Available Rooms
          </h1>
          <p className="text-text-secondary text-lg">
            Browse our selection of comfortable accommodations
          </p>
        </div>

        {/* Filter / sort / view control bar */}
        <Card padding="p-4" className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-44">
              <Select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                <option value="all">All Room Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </Select>
            </div>
            <div className="w-48">
              <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="all">Price Range</option>
                <option value="under-15000">Under Rs 15,000</option>
                <option value="15000-30000">Rs 15,000 - Rs 30,000</option>
                <option value="over-30000">Over Rs 30,000</option>
              </Select>
            </div>
            <div className="w-44">
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </Select>
            </div>

            {filtersActive && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Clear Filters
              </Button>
            )}

            <div className="text-text-secondary text-sm font-medium">
              {loading ? "Loading…" : `${total} rooms found`}
            </div>

            <div className="ml-auto inline-flex items-center gap-1 rounded-full bg-bg-secondary p-1">
              {[
                { id: "grid", label: "Grid", icon: LayoutGrid },
                { id: "map", label: "Map", icon: Map },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setViewMode(v.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-[var(--duration-fast)] ${
                    viewMode === v.id
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <v.icon className="w-3.5 h-3.5" /> {v.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {viewMode === "map" && (
          <div className="mb-12">
            {mapLoading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <RoomMap rooms={mapRooms} height="500px" />
            )}
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 rounded-[var(--radius-control)] bg-danger-subtle border border-danger/30 text-danger">
            {error} —{" "}
            <button onClick={fetchRooms} className="underline font-semibold">
              retry
            </button>
          </div>
        )}

        {viewMode === "grid" && (
          <>
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: LIMIT }).map((_, i) => (
                  <Card key={i} padding="p-0" className="overflow-hidden">
                    <Skeleton className="h-56 w-full rounded-none" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!loading && rooms.length === 0 && !error && (
              <EmptyState
                icon={SearchX}
                title="No rooms found"
                description="Try adjusting your filters."
                action={
                  filtersActive && (
                    <Button variant="secondary" size="sm" onClick={resetFilters}>
                      Clear Filters
                    </Button>
                  )
                }
              />
            )}

            {!loading && rooms.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <Card
                    key={room._id}
                    hoverable
                    padding="p-0"
                    onClick={() => navigate(`/room/${room._id}`)}
                    className="overflow-hidden cursor-pointer flex flex-col group"
                  >
                    <div className="relative h-56 overflow-hidden shrink-0 bg-bg-secondary">
                      {room.image ? (
                        <img
                          src={room.image}
                          alt={room.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[var(--duration-slow)]"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`${room.image ? "hidden" : "flex"} absolute inset-0 items-center justify-center text-text-muted`}
                      >
                        <ImageOff className="w-10 h-10" />
                      </div>
                      {isTopRated(room.rating, room.reviews) && (
                        <TopRatedBadge className="absolute top-4 left-4" />
                      )}
                      <div className="absolute top-4 right-4 bg-bg-elevated/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <p className="font-bold text-primary">
                          {formatNPR(room.price)}
                          <span className="text-sm font-normal text-text-secondary"> /night</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <h3 className="font-semibold text-text-primary text-xl line-clamp-1">
                          {room.title}
                        </h3>
                        <StarRating rating={room.rating} reviews={room.reviews} showValue />
                      </div>

                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {room.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities?.slice(0, 4).map((amenity, index) => (
                          <Badge key={index} tone="primary">
                            {amenity}
                          </Badge>
                        ))}
                        {(room.amenities?.length || 0) > 4 && (
                          <Badge tone="default">+{room.amenities.length - 4} more</Badge>
                        )}
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <Button
                          fullWidth
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/room/${room._id}`);
                          }}
                        >
                          Book Now
                        </Button>
                        {!isHost && (
                          <button
                            onClick={(e) => toggleWishlist(e, room._id)}
                            className="px-4 rounded-[var(--radius-control)] border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-[var(--duration-fast)]"
                          >
                            <Heart
                              className={`w-5 h-5 mx-auto ${
                                isWishlisted(room._id)
                                  ? "fill-danger text-danger"
                                  : "fill-none text-current"
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!loading && rooms.length > 0 && (
              <div className="mt-12">
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
