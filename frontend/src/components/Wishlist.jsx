import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { Home as HomeIcon, Heart, HeartCrack, Search } from "lucide-react";
import { formatNPR } from "../utils/currency";
import { isTopRated } from "../utils/rating";
import StarRating from "./common/StarRating";
import TopRatedBadge from "./common/TopRatedBadge";

export default function Wishlist() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated, role } = useAuth();
  const isHost = role === "host" || role === "admin";

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in, or if this is a host account (hosts don't have wishlists)
  useEffect(() => {
    if (!isAuthenticated) navigate("/sign-in");
    else if (isHost) navigate("/host");
  }, [isAuthenticated, isHost, navigate]);

  useEffect(() => {
    if (!isAuthenticated || isHost) return;
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await authAPI.getMe();
        setRooms(res.user?.wishlist || []);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [isAuthenticated, isHost]);

  const removeFromWishlist = async (e, roomId) => {
    e.stopPropagation();
    try {
      await authAPI.toggleWishlist(roomId);
      setRooms((prev) => prev.filter((r) => (r._id || r.id) !== roomId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  if (!isAuthenticated || isHost) return null;

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1
          className={`text-3xl md:text-4xl font-bold ${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          } mb-2`}
        >
          My Wishlist
        </h1>
        <p
          className={`${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          } mb-10`}
        >
          {loading
            ? "Loading..."
            : `${rooms.length} saved ${rooms.length === 1 ? "room" : "rooms"}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`${
                  theme === "dark"
                    ? "bg-bg-secondary border-text-muted/10"
                    : "bg-white border-gray-200"
                } rounded-2xl overflow-hidden border animate-pulse`}
              >
                <div
                  className={`h-52 ${
                    theme === "dark" ? "bg-primary/10" : "bg-gray-200"
                  }`}
                />
                <div className="p-5 space-y-3">
                  <div
                    className={`h-3 ${
                      theme === "dark" ? "bg-primary/10" : "bg-gray-200"
                    } rounded w-1/3`}
                  />
                  <div
                    className={`h-4 ${
                      theme === "dark" ? "bg-primary/10" : "bg-gray-200"
                    } rounded w-3/4`}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div
            className={`text-center py-20 rounded-2xl border ${
              theme === "dark"
                ? "bg-bg-secondary/50 border-text-muted/10"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-center mb-4">
              <HeartCrack
                className={`w-12 h-12 ${
                  theme === "dark" ? "text-text-muted" : "text-gray-400"
                }`}
              />
            </div>
            <p
              className={`text-xl font-semibold mb-2 ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              }`}
            >
              Your wishlist is empty
            </p>
            <p
              className={`mb-6 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              Tap the heart icon on any room to save it here.
            </p>
            <button
              onClick={() => navigate("/rooms")}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-semibold transition"
            >
              <Search className="w-4 h-4" /> Browse Rooms
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => {
              const id = room._id || room.id;
              return (
                <div
                  key={id}
                  onClick={() => navigate(`/room/${id}`)}
                  className={`${
                    theme === "dark"
                      ? "bg-bg-secondary border-text-muted/10 hover:shadow-2xl hover:shadow-primary/10"
                      : "bg-white border-gray-200 hover:shadow-lg"
                  } rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer hover:-translate-y-1`}
                >
                  <div className="h-52 relative overflow-hidden">
                    {room.image ? (
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <HomeIcon className="w-9 h-9 text-primary" />
                      </div>
                    )}
                    {isTopRated(room.rating, room.reviews) && (
                      <TopRatedBadge className="absolute top-3 right-3" />
                    )}
                    <button
                      onClick={(e) => removeFromWishlist(e, id)}
                      title="Remove from wishlist"
                      className="absolute top-3 left-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-lg truncate">
                        {room.title}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-primary text-sm font-bold mb-1">
                      {formatNPR(room.price)}
                    </p>
                    <h3
                      className={`${
                        theme === "dark" ? "text-text-primary" : "text-gray-900"
                      } font-bold text-base truncate mb-1`}
                    >
                      {room.title}
                    </h3>
                    <StarRating rating={room.rating} reviews={room.reviews} showValue size="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
