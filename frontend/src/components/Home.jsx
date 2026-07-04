import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { roomsAPI, authAPI } from "../services/api";
import { blogs } from "../data/propertyData";
import BecomeHostModal from "./BecomeHostModal";
import StarRating from "./common/StarRating";
import TopRatedBadge from "./common/TopRatedBadge";
import ScaledDashboard from "./common/ScaledDashboard";
import DashboardMockup from "./common/DashboardMockup";
import { formatNPR } from "../utils/currency";
import { isTopRated } from "../utils/rating";
import {
  Home as HomeIcon,
  Heart,
  HeartCrack,
  MapPin,
  Bed,
  ShowerHead,
  Car,
  PawPrint,
  Search,
  Users,
  Star,
  Globe,
  ShieldCheck,
  Headset,
  Sparkles,
  MessageSquare,
} from "lucide-react";

// ─── Room Card ────────────────────────────────────────────────────────────────
const RoomCard = ({ room, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { role } = useAuth();
  const isHost = role === "host" || role === "admin";
  const priceLabel = formatNPR(room.price);
  return (
    <div
      onClick={() => navigate(`/room/${room._id}`)}
      className={`${
        theme === "dark"
          ? "bg-bg-secondary border-text-muted/10 hover:shadow-2xl hover:shadow-primary/10"
          : "bg-white border-gray-200 hover:shadow-lg"
      } rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer hover:-translate-y-1`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {!isHost && (
          <button
            onClick={(e) => onToggleFavorite(e, room._id)}
            className="absolute top-3 left-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "fill-white/80 text-gray-700"
              }`}
            />
          </button>
        )}
        {isTopRated(room.rating, room.reviews) && (
          <TopRatedBadge className="absolute top-3 right-3" />
        )}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white font-bold text-lg truncate">
            {room.title}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-primary text-sm font-bold mb-1">
          {priceLabel}/night
        </p>
        <h3
          className={`${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          } font-bold text-base mb-1 truncate`}
        >
          {room.title}
        </h3>
        <p
          className={`${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          } text-sm mb-2 flex items-center gap-1`}
        >
          <MapPin className="w-4 h-4" /> {room.location}
        </p>
        <div className="mb-3">
          <StarRating rating={room.rating} reviews={room.reviews} showValue size="w-3.5 h-3.5" />
        </div>
        <div
          className={`flex gap-3 ${
            theme === "dark" ? "text-text-secondary" : "text-gray-500"
          } text-xs border-t ${
            theme === "dark" ? "border-text-muted/10" : "border-gray-200"
          } pt-3`}
        >
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" /> {room.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <ShowerHead className="w-4 h-4" /> {room.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Car className="w-4 h-4" /> {room.parking}
          </span>
          <span className="flex items-center gap-1">
            <PawPrint className="w-4 h-4" /> {room.pets}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ title, category, image, excerpt, date, onClick }) => {
  const { theme } = useTheme();
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl overflow-hidden ${
        theme === "dark"
          ? "bg-bg-secondary border-text-muted/10 hover:shadow-xl hover:shadow-primary/5"
          : "bg-white border-gray-200 hover:shadow-lg"
      } transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-3 py-1 ${
              theme === "dark"
                ? "bg-primary/10 text-primary"
                : "bg-blue-100 text-blue-800"
            } text-xs font-bold rounded-full`}
          >
            {category}
          </span>
          <span
            className={`${
              theme === "dark" ? "text-text-muted" : "text-gray-500"
            } text-xs`}
          >
            {date}
          </span>
        </div>
        <h3
          className={`${
            theme === "dark"
              ? "text-text-primary group-hover:text-primary"
              : "text-gray-900 group-hover:text-blue-600"
          } font-bold text-base mb-2 transition-colors line-clamp-2`}
        >
          {title}
        </h3>
        {excerpt && (
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-sm line-clamp-2`}
          >
            {excerpt}
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-bg-secondary border-text-muted/10"
          : "bg-white border-gray-200"
      } rounded-2xl overflow-hidden animate-pulse`}
    >
      <div
        className={`h-52 ${theme === "dark" ? "bg-primary/10" : "bg-gray-300"}`}
      />
      <div className="p-5 space-y-3">
        <div
          className={`h-3 ${
            theme === "dark" ? "bg-primary/10" : "bg-gray-300"
          } rounded w-1/3`}
        />
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
      </div>
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title, subtitle, action }) => {
  const { theme } = useTheme();
  return (
    <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2
          className={`text-3xl md:text-4xl font-bold ${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          } mb-2`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            {subtitle}
          </p>
        )}
        <div className="w-16 h-1 bg-primary rounded-full mt-3" />
      </div>
      {action}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
// Fixed width + shrink-0 since these live in a horizontally scrolling marquee
const StatCard = ({ icon, value, label }) => {
  const Icon = icon;
  const { theme } = useTheme();
  return (
    <div
      className={`text-center p-6 w-48 shrink-0 ${
        theme === "dark"
          ? "bg-bg-secondary border-text-muted/10 hover:border-primary/30"
          : "bg-white border-gray-200 hover:border-blue-200"
      } rounded-2xl border transition`}
    >
      <div className="mb-2 flex justify-center">
        <Icon className="w-9 h-9 text-primary" />
      </div>
      <p className="text-3xl font-bold text-primary mb-1">{value}</p>
      <p
        className={`${
          theme === "dark" ? "text-text-secondary" : "text-gray-600"
        } text-sm`}
      >
        {label}
      </p>
    </div>
  );
};

// ─── Stats Marquee ──────────────────────────────────────────────────────────
// Cards aren't interactive, so instead of a static grid they scroll past
// continuously — the list is duplicated once so the loop is seamless
// (animating to -50% lands exactly back on the start of the duplicate copy).
const StatsMarquee = ({ items }) => (
  <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
    <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
      {[...items, ...items].map((s, i) => (
        <StatCard key={i} {...s} />
      ))}
    </div>
  </div>
);

// ─── Main Home Component ──────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const isHost = user?.role === "host" || user?.role === "admin";

  const [hostModalOpen, setHostModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [guests, setGuests] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [email, setEmail] = useState("");

  const [rooms, setRooms] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // ── Wishlist: synced from backend if logged in, else localStorage ─────────
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("roomFavorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleLocal = (roomId) => {
    setWishlist((prev) => {
      const next = prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId];
      localStorage.setItem("roomFavorites", JSON.stringify(next));
      return next;
    });
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

  const isWishlisted = (roomId) =>
    wishlist.includes(roomId) || wishlist.includes(roomId?.toString());

  const fetchRooms = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        const [mainRes, topRes, featRes] = await Promise.all([
          roomsAPI.getAll({
            limit: 20,
            ...(selectedTab !== "all" ? { type: selectedTab } : {}),
            ...params,
          }),
          roomsAPI.getAll({ limit: 20 }),
          roomsAPI.getAll({ limit: 20 }),
        ]);
        setRooms(mainRes.rooms || []);
        setTotal(mainRes.total || 0);
        setTopRated(
          [...(topRes.rooms || [])]
            .filter((r) => isTopRated(r.rating, r.reviews))
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4),
        );
        setFeatured(
          [...(featRes.rooms || [])]
            .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
            .slice(0, 3),
        );
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedTab],
  );

  useEffect(() => {
    fetchRooms();
    setVisibleCount(4);
  }, [selectedTab, fetchRooms]);

  const handleSearch = () => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    fetchRooms(params);
    setVisibleCount(4);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGuests("");
    setSortBy("default");
    setMaxPrice(60000);
    setSelectedTab("all");
    fetchRooms({});
    setVisibleCount(4);
  };

  const sortedRooms = [...rooms]
    .sort((a, b) => {
      const getNum = (r) => r.price || 0;
      if (sortBy === "price-low") return getNum(a) - getNum(b);
      if (sortBy === "price-high") return getNum(b) - getNum(a);
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    })
    .filter((r) => !r.price || r.price <= maxPrice);

  const handleNewsletterSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    alert(`Thank you! We'll send updates to ${email}`);
    setEmail("");
  };

  // All loaded rooms deduplicated (for wishlist lookup)
  const allLoadedRooms = [...rooms, ...topRated, ...featured].filter(
    (r, idx, arr) => arr.findIndex((x) => x._id === r._id) === idx,
  );

  const favoriteRooms = allLoadedRooms.filter((r) => isWishlisted(r._id));

  const filtersActive =
    searchTerm ||
    sortBy !== "default" ||
    maxPrice !== 60000 ||
    selectedTab !== "all";

  const tabs = [
    { value: "all", label: "All" },
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
  ];

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-[#0b1220] via-[#131c2e] to-[#0b1220] flex flex-col">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-primary/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="flex-1 min-h-8 sm:min-h-12 lg:min-h-16 shrink-0" />

        <div className="relative z-10 text-center px-5">
          <h1 className="text-white font-normal leading-[1.05] tracking-tight text-[40px] min-[400px]:text-[44px] sm:text-6xl lg:text-7xl xl:text-[80px]">
            <span className="block animate-fade-up">Find your stay.</span>
            <span className="block animate-fade-up [animation-delay:100ms]">
              Anywhere in Nepal.
            </span>
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
              document
                .getElementById("properties")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="animate-fade-up [animation-delay:220ms] mt-5 sm:mt-6 w-full max-w-xl mx-auto"
          >
            <div className="flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/15 pl-5 pr-1.5 py-1.5">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by city, area, or property name"
                className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-white/50 outline-none py-2"
              />
              <button
                type="submit"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white hover:scale-105 active:scale-95 transition-transform shrink-0 flex items-center justify-center"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </form>

          <p className="animate-fade-up [animation-delay:340ms] mt-4 sm:mt-5 text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto">
            Verified rooms, flats, villas & hostels across the country
            <br />— booked safely, hosted honestly.
          </p>

          <div className="animate-fade-up [animation-delay:460ms] mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate("/rooms")}
              className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-primary-hover hover:shadow-lg transition-all"
            >
              Browse Rooms
            </button>
            <button
              onClick={() => setHostModalOpen(true)}
              className="text-white text-sm font-medium px-6 py-2.5 rounded-full ring-1 ring-white/25 hover:bg-white/10 transition-colors"
            >
              Become a Host
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-10 sm:min-h-12 lg:min-h-16 shrink-0" />

        <div className="animate-hero-rise [animation-delay:620ms] relative z-10 w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto shrink-0 mb-6 sm:mb-10 lg:mb-14">
          <ScaledDashboard>
            <DashboardMockup />
          </ScaledDashboard>
        </div>
      </section>

      {/* ── Search Filters ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-10">
        <div
          className={`${
            theme === "dark"
              ? "bg-background border-primary/20 shadow-2xl shadow-primary/5"
              : "bg-white border-gray-200 shadow-lg"
          } rounded-3xl p-6 md:p-8 border`}
        >
          <div className="flex gap-2 sm:gap-6 mb-6 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                className={`capitalize font-semibold pb-2 px-1 text-sm sm:text-base whitespace-nowrap transition border-b-2 ${
                  selectedTab === tab.value
                    ? "text-primary border-primary"
                    : `${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-500"
                      } border-transparent hover:text-primary`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-xs font-semibold block mb-1 uppercase tracking-wide`}
              >
                Location
              </label>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                type="text"
                placeholder="Which city?"
                className={`w-full ${
                  theme === "dark"
                    ? "bg-bg-secondary text-text-primary placeholder-text-muted"
                    : "bg-gray-100 text-gray-900 placeholder-gray-400"
                } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm`}
              />
            </div>
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-xs font-semibold block mb-1 uppercase tracking-wide`}
              >
                Sort By
              </label>
              <select
                className={`w-full ${
                  theme === "dark"
                    ? "bg-bg-secondary text-text-primary"
                    : "bg-gray-100 text-gray-900"
                } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm`}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-xs font-semibold block mb-1 uppercase tracking-wide`}
              >
                Guests
              </label>
              <input
                type="number"
                value={guests}
                min={1}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="How many?"
                className={`w-full ${
                  theme === "dark"
                    ? "bg-bg-secondary text-text-primary placeholder-text-muted"
                    : "bg-gray-100 text-gray-900 placeholder-gray-400"
                } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm`}
              />
            </div>
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-xs font-semibold block mb-1 uppercase tracking-wide`}
              >
                Max Price:{" "}
                <span className="text-primary font-bold">
                  {formatNPR(maxPrice)}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="60000"
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            {filtersActive && (
              <button
                onClick={resetFilters}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition ${
                  theme === "dark"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Reset
              </button>
            )}
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-hover transition w-full sm:w-auto"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats Marquee ──────────────────────────────────────────────────── */}
      <div className="bg-primary/5 border-y border-primary/10 py-8">
        <StatsMarquee
          items={[
            { icon: HomeIcon, value: "500+", label: "Properties Listed" },
            { icon: Users, value: "12K+", label: "Happy Guests" },
            { icon: Globe, value: "50+", label: "Cities Covered" },
            { icon: Star, value: "4.8", label: "Average Rating" },
            { icon: ShieldCheck, value: "100%", label: "Verified Hosts" },
            { icon: Headset, value: "24/7", label: "Guest Support" },
            { icon: Sparkles, value: "30+", label: "Amenities Offered" },
            { icon: MessageSquare, value: "1.2K+", label: "Verified Reviews" },
          ]}
        />
      </div>

      {/* ── Nearby Properties ──────────────────────────────────────────────── */}
      <div id="properties" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <SectionHeader
          title="Nearby Listed Properties"
          subtitle={loading ? "Loading..." : `${total} properties found`}
          action={
            <button
              onClick={() => navigate("/rooms")}
              className="text-primary font-semibold hover:underline text-sm flex items-center gap-1 whitespace-nowrap"
            >
              Show on Map →
            </button>
          }
        />
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedRooms.length === 0 ? (
          <div
            className={`text-center py-16 ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            <div className="flex justify-center mb-4">
              <Search className="w-9 h-9" />
            </div>
            <p className="text-xl font-semibold mb-2">No properties found</p>
            <p className="mb-6">Try adjusting your filters</p>
            <button
              onClick={resetFilters}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold transition hover:bg-primary-hover"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedRooms.slice(0, visibleCount).map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  isFavorite={isWishlisted(room._id)}
                  onToggleFavorite={toggleWishlist}
                />
              ))}
            </div>
            {visibleCount < sortedRooms.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className={`${
                    theme === "dark"
                      ? "bg-bg-secondary text-text-primary"
                      : "bg-white text-gray-900"
                  } hover:bg-primary/10 font-semibold px-10 py-3 rounded-full border border-primary/20 transition`}
                >
                  Load More ({sortedRooms.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Top Rated ──────────────────────────────────────────────────────── */}
      {topRated.length > 0 && (
        <div
          className={`${
            theme === "dark" ? "bg-bg-secondary/50" : "bg-gray-100"
          } py-16 md:py-20`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeader
              title="Top Rated Properties"
              subtitle="Our highest-rated stays, loved by guests"
              action={
                <button
                  onClick={() => navigate("/rooms")}
                  className="text-primary font-semibold hover:underline text-sm whitespace-nowrap"
                >
                  View All →
                </button>
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRated.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  isFavorite={isWishlisted(room._id)}
                  onToggleFavorite={toggleWishlist}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Featured Properties ────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <SectionHeader
            title="Featured Properties"
            subtitle="Handpicked properties for an exceptional stay"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((room) => (
              <div key={room._id}>
                <div
                  onClick={() => navigate(`/room/${room._id}`)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-full min-h-[280px]"
                >
                  {room.image ? (
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ minHeight: "280px" }}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-primary/10 flex items-center justify-center"
                      style={{ minHeight: "280px" }}
                    >
                      <HomeIcon className="w-14 h-14 text-primary" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">
                      Featured
                    </p>
                    <h3 className="text-white font-bold text-lg mb-1">
                      {room.title}
                    </h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {room.location}
                    </p>
                    <p className="text-primary font-bold mt-2">
                      {formatNPR(room.price)}/night
                    </p>
                  </div>
                  {!isHost && (
                    <button
                      onClick={(e) => toggleWishlist(e, room._id)}
                      className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted(room._id)
                            ? "fill-red-500 text-red-500"
                            : "fill-white/80 text-gray-700"
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Favorites (hosts don't have a wishlist) ─────────────────────────── */}
      {!isHost && wishlist.length > 0 && (
        <div
          className={`${
            theme === "dark" ? "bg-bg-secondary/50" : "bg-gray-100"
          } py-16`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeader
              title={`My Favorites (${favoriteRooms.length})`}
              subtitle={
                favoriteRooms.length === 0
                  ? "Scroll down to add properties to your favorites"
                  : undefined
              }
            />
            {favoriteRooms.length === 0 ? (
              <div
                className={`text-center py-8 ${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                }`}
              >
                <div className="flex justify-center mb-3">
                  <HeartCrack className="w-9 h-9" />
                </div>
                <p>
                  Your saved favorites are from a previous session and are no
                  longer available.
                </p>
                <button
                  onClick={() => {
                    setWishlist([]);
                    localStorage.removeItem("roomFavorites");
                  }}
                  className="mt-4 text-primary underline text-sm"
                >
                  Clear old favorites
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteRooms.map((room) => (
                  <RoomCard
                    key={room._id}
                    room={room}
                    isFavorite={true}
                    onToggleFavorite={toggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Try Hosting (only shown to logged-out visitors) ─────────────────── */}
      {!isAuthenticated && (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
            <div>
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                For Property Owners
              </p>
              <h2
                className={`text-3xl md:text-4xl font-bold ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } mb-4`}
              >
                Try Hosting
                <br />
                With Us
              </h2>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } mb-6 leading-relaxed`}
              >
                Earn extra income by listing your property. Join thousands of
                hosts earning with Aatithi Aagaman. Full control over your
                listings, pricing, and availability.
              </p>
              <div
                className={`grid grid-cols-2 gap-3 mb-8 text-sm ${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                }`}
              >
                {[
                  "Set your own price",
                  "Full calendar control",
                  "Instant payouts",
                  "24/7 host support",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="text-primary">✓</span> {f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setHostModalOpen(true)}
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-primary/20"
                >
                  Become A Host
                </button>
                <button
                  onClick={() => navigate("/how-it-works")}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div
              className={`h-64 md:h-80 ${
                theme === "dark" ? "bg-background" : "bg-white"
              } rounded-2xl overflow-hidden border border-primary/10`}
            >
              <img
                src="/images/hosting.svg"
                alt="Start Hosting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ── Blog / Rental Guides ──────────────────────────────────────────── */}
      <div
        className={`${
          theme === "dark" ? "bg-bg-secondary/50" : "bg-gray-100"
        } py-16 md:py-20`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeader
            title="Property Rental Guides & Tips"
            subtitle="Expert advice to help you find or list your perfect property"
            action={
              <button
                onClick={() => navigate("/rental-guide")}
                className="text-primary font-semibold hover:underline text-sm whitespace-nowrap"
              >
                View All Guides →
              </button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard
                key={blog.id}
                {...blog}
                onClick={() => navigate("/rental-guide")}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Browse Properties ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div
            className={`h-72 ${
              theme === "dark"
                ? "bg-bg-secondary border-text-muted/10"
                : "bg-white border-gray-200"
            } rounded-2xl overflow-hidden border order-2 md:order-1`}
          >
            <img
              src="/images/browse.svg"
              alt="Browse Properties"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Explore
            </p>
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              Browse For More Properties
            </h2>
            <p
              className={`${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              } mb-8 leading-relaxed`}
            >
              Explore our full catalogue of properties sorted by type, location,
              and price range.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setSelectedTab(tab.value);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`capitalize px-4 py-2 border rounded-full text-sm font-semibold transition ${
                    selectedTab === tab.value
                      ? "bg-primary text-white border-primary"
                      : theme === "dark"
                        ? "bg-bg-secondary border-primary/20 text-text-primary hover:bg-primary hover:text-white hover:border-primary"
                        : "bg-white border-primary/20 text-gray-900 hover:bg-primary hover:text-white hover:border-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate("/rooms")}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-primary/20"
            >
              Find A Property
            </button>
          </div>
        </div>
      </div>

      {/* ── About Section ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              About Us
            </p>
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              Discover More About Property Rental
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-6" />
            <p
              className={`${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              } mb-6 leading-relaxed`}
            >
              Aatithi Aagaman connects guests with exceptional properties across
              Nepal. Whether you're looking for a cozy room, a modern
              flat, a luxury villa, or a budget hostel — we have it all.
            </p>
            <p
              className={`${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              } mb-8 leading-relaxed`}
            >
              Our platform makes finding and booking your next stay simple,
              safe, and seamless — with verified listings, real reviews, and
              secure payments.
            </p>
            <div className="space-y-2 mb-8">
              {[
                { label: "Ask A Question", onClick: () => navigate("/help") },
                { label: "Find A Property", onClick: () => navigate("/rooms") },
                ...(!isAuthenticated
                  ? [{ label: "Become A Host", onClick: () => setHostModalOpen(true) }]
                  : []),
              ].map(({ label, onClick }) => (
                <p
                  key={label}
                  onClick={onClick}
                  className={`font-semibold ${
                    theme === "dark" ? "text-text-secondary" : "text-gray-600"
                  } hover:text-primary cursor-pointer transition flex items-center gap-2`}
                >
                  <span className="text-primary">→</span> {label}
                </p>
              ))}
            </div>
            <button
              onClick={() => navigate("/how-it-works")}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Discover More
            </button>
          </div>
          <div
            className={`h-72 md:h-96 ${
              theme === "dark"
                ? "bg-bg-secondary border-text-muted/10"
                : "bg-white border-gray-200"
            } rounded-2xl overflow-hidden border`}
          >
            <img
              src="/images/about.svg"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <div className="bg-primary/5 border-t border-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="text-center md:text-left shrink-0">
              <h3
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } mb-1`}
              >
                Stay In The Loop
              </h3>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-sm`}
              >
                Get the latest listings and rental tips in your inbox
              </p>
            </div>
            <div className="flex gap-3 w-full md:max-w-md">
              <input
                type="email"
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNewsletterSubmit()}
                className={`flex-1 min-w-0 ${
                  theme === "dark"
                    ? "bg-background text-text-primary placeholder-text-muted border-text-muted/20"
                    : "bg-white text-gray-900 placeholder-gray-400 border-gray-200"
                } rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary border text-sm`}
              />
              <button
                onClick={handleNewsletterSubmit}
                className="bg-primary hover:bg-primary-hover text-white rounded-full px-5 py-3 font-semibold transition text-sm whitespace-nowrap shrink-0"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <BecomeHostModal
        isOpen={hostModalOpen}
        onClose={() => setHostModalOpen(false)}
      />
    </div>
  );
}
