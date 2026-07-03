import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { Home as HomeIcon, Heart, HeartCrack, Search } from "lucide-react";
import { formatNPR } from "../utils/currency";
import { isTopRated } from "../utils/rating";
import StarRating from "./common/StarRating";
import TopRatedBadge from "./common/TopRatedBadge";
import Card from "./ui/Card";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";
import EmptyState from "./ui/EmptyState";
import Skeleton from "./ui/Skeleton";

export default function Wishlist() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const isHost = role === "host" || role === "admin";

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
          My Wishlist
        </h1>
        <p className="text-text-secondary mb-10">
          {loading ? "Loading…" : `${rooms.length} saved ${rooms.length === 1 ? "room" : "rooms"}`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} padding="p-0" className="overflow-hidden">
                <Skeleton className="h-52 w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <Card className="py-20">
            <EmptyState
              icon={HeartCrack}
              title="Your wishlist is empty"
              description="Tap the heart icon on any room to save it here."
              action={
                <Button icon={Search} onClick={() => navigate("/rooms")}>
                  Browse Rooms
                </Button>
              }
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => {
              const id = room._id || room.id;
              return (
                <Card
                  key={id}
                  hoverable
                  padding="p-0"
                  onClick={() => navigate(`/room/${id}`)}
                  className="overflow-hidden cursor-pointer group"
                >
                  <div className="h-52 relative overflow-hidden">
                    {room.image ? (
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-subtle flex items-center justify-center">
                        <HomeIcon className="w-9 h-9 text-primary" />
                      </div>
                    )}
                    {isTopRated(room.rating, room.reviews) && (
                      <TopRatedBadge className="absolute top-3 right-3" />
                    )}
                    <IconButton
                      icon={Heart}
                      label="Remove from wishlist"
                      variant="solid"
                      className="absolute top-3 left-3 !bg-white/20 backdrop-blur-sm hover:!bg-white/40 [&_svg]:fill-danger [&_svg]:text-danger"
                      onClick={(e) => removeFromWishlist(e, id)}
                    />
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-lg truncate">{room.title}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-primary text-sm font-bold mb-1">{formatNPR(room.price)}</p>
                    <h3 className="text-text-primary font-semibold text-base truncate mb-1">{room.title}</h3>
                    <StarRating rating={room.rating} reviews={room.reviews} showValue size="w-3.5 h-3.5" />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
