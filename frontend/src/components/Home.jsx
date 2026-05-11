import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { propertiesAPI } from "../services/api";
import { blogs } from "../data/propertyData";

// ─── Property Card ────────────────────────────────────────────────────────────
const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/properties`)}
      className="bg-bg-secondary rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-text-muted/10 group cursor-pointer hover:-translate-y-1"
    >
      <div className="h-52 relative overflow-hidden">
        {property.image ? (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl">🏠</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property._id || property.id);
          }}
          className="absolute top-3 left-3 text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        {property.isTopRated && (
          <div className="absolute top-3 right-3 bg-accent text-background px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            ★ TOP RATED
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white font-bold text-lg truncate">
            {property.title}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-accent text-sm font-bold mb-1">{property.price}</p>
        <h3 className="text-text-primary font-bold text-base mb-1 truncate">
          {property.title}
        </h3>
        <p className="text-text-secondary text-sm mb-3 flex items-center gap-1">
          <span>📍</span> {property.location}
        </p>
        <div className="flex gap-3 text-text-secondary text-xs border-t border-text-muted/10 pt-3">
          <span className="flex items-center gap-1">
            🛏️ {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            🚿 {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">🚗 {property.parking}</span>
          <span className="flex items-center gap-1">🐾 {property.pets}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ title, category, image, excerpt, date, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer rounded-2xl overflow-hidden bg-bg-secondary border border-text-muted/10 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
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
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
          {category}
        </span>
        <span className="text-text-muted text-xs">{date}</span>
      </div>
      <h3 className="text-text-primary font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h3>
      {excerpt && (
        <p className="text-text-secondary text-sm line-clamp-2">{excerpt}</p>
      )}
    </div>
  </div>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-bg-secondary rounded-2xl overflow-hidden border border-text-muted/10 animate-pulse">
    <div className="h-52 bg-primary/10" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-primary/10 rounded w-1/3" />
      <div className="h-4 bg-primary/10 rounded w-3/4" />
      <div className="h-3 bg-primary/10 rounded w-1/2" />
    </div>
  </div>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title, subtitle, action }) => (
  <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
        {title}
      </h2>
      {subtitle && <p className="text-text-secondary">{subtitle}</p>}
      <div className="w-16 h-1 bg-primary rounded-full mt-3" />
    </div>
    {action}
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, value, label }) => (
  <div className="text-center p-6 bg-bg-secondary rounded-2xl border border-text-muted/10 hover:border-primary/30 transition">
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-3xl font-bold text-primary mb-1">{value}</p>
    <p className="text-text-secondary text-sm">{label}</p>
  </div>
);

// ─── Main Home Component ──────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("rooms");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [email, setEmail] = useState("");

  const [properties, setProperties] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // ── Favorites: keyed by MongoDB _id, cleared of stale string IDs ──────────
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      const parsed = saved ? JSON.parse(saved) : [];
      // Only keep valid MongoDB ObjectId strings (24 hex chars)
      return parsed.filter(
        (id) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id),
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const fetchProperties = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        const [mainRes, topRes, featRes] = await Promise.all([
          propertiesAPI.getAll({ category: selectedTab, limit: 20, ...params }),
          propertiesAPI.getAll({ isTopRated: true, limit: 4 }),
          propertiesAPI.getAll({ isFeatured: true, limit: 3 }),
        ]);
        setProperties(mainRes.properties || []);
        setTotal(mainRes.total || 0);
        setTopRated(topRes.properties || []);
        setFeatured(featRes.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedTab],
  );

  useEffect(() => {
    fetchProperties();
    setVisibleCount(4);
  }, [selectedTab]);

  const handleSearch = () => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    fetchProperties(params);
    setVisibleCount(4);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCheckIn("");
    setCheckOut("");
    setGuests("");
    setSortBy("default");
    setMaxPrice(20000);
    setSelectedTab("rooms");
    fetchProperties({});
    setVisibleCount(4);
  };

  const sortedProperties = [...properties]
    .sort((a, b) => {
      const getNum = (p) => p.priceMin || 0;
      if (sortBy === "price-low") return getNum(a) - getNum(b);
      if (sortBy === "price-high") return getNum(b) - getNum(a);
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    })
    .filter((p) => !p.priceMax || p.priceMax <= maxPrice);

  const handleNewsletterSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    alert(`Thank you! We'll send updates to ${email}`);
    setEmail("");
  };

  // All loaded properties deduplicated (for favorites lookup)
  const allLoadedProperties = [...properties, ...topRated, ...featured].filter(
    (p, idx, arr) => {
      const id = p._id || p.id;
      return arr.findIndex((x) => (x._id || x.id) === id) === idx;
    },
  );

  const favoriteProperties = allLoadedProperties.filter((p) =>
    favorites.includes(p._id || p.id),
  );

  const filtersActive =
    searchTerm ||
    sortBy !== "default" ||
    maxPrice !== 20000 ||
    selectedTab !== "rooms";
  const tabs = ["rooms", "flats", "hostels", "villas"];

  return (
    <div className="w-full bg-background min-h-screen">
      {/* ── Hero / Banner ──────────────────────────────────────────────────── */}
      <div className="relative bg-bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="mb-10 text-center md:text-left">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Welcome to
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-4 leading-tight">
              Aatithi
              <br />
              <span className="text-primary">Aagaman</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto md:mx-0">
              Find your perfect stay — rooms, flats, villas & hostels across the
              country
            </p>
          </div>

          <div className="bg-background border border-primary/20 rounded-3xl p-6 md:p-8 shadow-2xl shadow-primary/5">
            <div className="flex gap-2 sm:gap-6 mb-6 overflow-x-auto pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`capitalize font-semibold pb-2 px-1 text-sm sm:text-base whitespace-nowrap transition border-b-2 ${
                    selectedTab === tab
                      ? "text-primary border-primary"
                      : "text-text-secondary border-transparent hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="text-text-secondary text-xs font-semibold block mb-1 uppercase tracking-wide">
                  Location
                </label>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  type="text"
                  placeholder="Which city?"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="text-text-secondary text-xs font-semibold block mb-1 uppercase tracking-wide">
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-bg-secondary text-text-primary rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="text-text-secondary text-xs font-semibold block mb-1 uppercase tracking-wide">
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-bg-secondary text-text-primary rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="text-text-secondary text-xs font-semibold block mb-1 uppercase tracking-wide">
                  Guests
                </label>
                <input
                  type="number"
                  value={guests}
                  min={1}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="How many?"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div>
                <label className="text-text-secondary text-xs font-semibold block mb-1 uppercase tracking-wide">
                  Sort By
                </label>
                <select
                  className="w-full bg-bg-secondary text-text-primary rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
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
                <label className="text-text-secondary text-xs font-semibold block mb-1 uppercase tracking-wide">
                  Max Price:{" "}
                  <span className="text-primary font-bold">
                    ${maxPrice.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20000"
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
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2.5 font-semibold transition text-sm"
                >
                  Clear
                </button>
              )}
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-2.5 font-semibold transition text-sm flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <div className="bg-primary/5 border-y border-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🏠", value: "500+", label: "Properties Listed" },
              { icon: "👥", value: "12K+", label: "Happy Guests" },
              { icon: "🌆", value: "50+", label: "Cities Covered" },
              { icon: "⭐", value: "4.8", label: "Average Rating" },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Nearby Properties ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <SectionHeader
          title="Nearby Listed Properties"
          subtitle={loading ? "Loading..." : `${total} properties found`}
          action={
            <button
              onClick={() => navigate("/properties")}
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
        ) : sortedProperties.length === 0 ? (
          <div className="text-center py-16 text-text-secondary">
            <p className="text-4xl mb-4">🔍</p>
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
              {sortedProperties.slice(0, visibleCount).map((property) => (
                <PropertyCard
                  key={property._id || property.id}
                  property={property}
                  isFavorite={favorites.includes(property._id || property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            {visibleCount < sortedProperties.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                  className="bg-bg-secondary hover:bg-primary/10 text-text-primary font-semibold px-10 py-3 rounded-full border border-primary/20 transition"
                >
                  Load More ({sortedProperties.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Top Rated ──────────────────────────────────────────────────────── */}
      {topRated.length > 0 && (
        <div className="bg-bg-secondary/50 py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeader
              title="Top Rated Properties"
              subtitle="Our highest-rated stays, loved by guests"
              action={
                <button
                  onClick={() => navigate("/properties")}
                  className="text-primary font-semibold hover:underline text-sm whitespace-nowrap"
                >
                  View All →
                </button>
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRated.map((property) => (
                <PropertyCard
                  key={property._id || property.id}
                  property={property}
                  isFavorite={favorites.includes(property._id || property.id)}
                  onToggleFavorite={toggleFavorite}
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
            {featured.map((property, i) => (
              <div
                key={property._id || property.id}
                className={i === 0 ? "md:row-span-2" : ""}
              >
                <div
                  onClick={() => navigate("/properties")}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-full min-h-[280px]"
                >
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ minHeight: i === 0 ? "400px" : "200px" }}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-primary/10 flex items-center justify-center"
                      style={{ minHeight: i === 0 ? "400px" : "200px" }}
                    >
                      <span className="text-6xl">🏠</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">
                      Featured
                    </p>
                    <h3 className="text-white font-bold text-lg mb-1">
                      {property.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      📍 {property.location}
                    </p>
                    <p className="text-accent font-bold mt-2">
                      {property.price}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property._id || property.id);
                    }}
                    className="absolute top-4 right-4 text-xl w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
                  >
                    {favorites.includes(property._id || property.id)
                      ? "❤️"
                      : "🤍"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Favorites ─────────────────────────────────────────────────────── */}
      {favorites.length > 0 && (
        <div className="bg-bg-secondary/50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <SectionHeader
              title={`My Favorites (${favoriteProperties.length})`}
              subtitle={
                favoriteProperties.length === 0
                  ? "Scroll down to add properties to your favorites"
                  : undefined
              }
            />
            {favoriteProperties.length === 0 ? (
              <div className="text-center py-8 text-text-secondary">
                <p className="text-4xl mb-3">💔</p>
                <p>
                  Your saved favorites are from a previous session and are no
                  longer available.
                </p>
                <button
                  onClick={() => {
                    setFavorites([]);
                    localStorage.removeItem("favorites");
                  }}
                  className="mt-4 text-primary underline text-sm"
                >
                  Clear old favorites
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteProperties.map((property) => (
                  <PropertyCard
                    key={property._id || property.id}
                    property={property}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Try Hosting ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
            <div>
              <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                For Property Owners
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Try Hosting
                <br />
                With Us
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Earn extra income by listing your property. Join thousands of
                hosts earning with Aatithi Aagaman. Full control over your
                listings, pricing, and availability.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-text-secondary">
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
                  onClick={() => navigate("/add-property")}
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
            <div className="h-64 md:h-80 bg-background rounded-2xl overflow-hidden border border-primary/10">
              <img
                src="/images/hosting.svg"
                alt="Start Hosting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Blog / Rental Guides ──────────────────────────────────────────── */}
      <div className="bg-bg-secondary/50 py-16 md:py-20">
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
          <div className="h-72 bg-bg-secondary rounded-2xl overflow-hidden border border-text-muted/10 order-2 md:order-1">
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
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Browse For More Properties
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Explore our full catalogue of properties sorted by type, location,
              and price range.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setSelectedTab(tab);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`capitalize px-4 py-2 border rounded-full text-sm font-semibold transition ${
                    selectedTab === tab
                      ? "bg-primary text-white border-primary"
                      : "bg-bg-secondary border-primary/20 text-text-primary hover:bg-primary hover:text-white hover:border-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate("/properties")}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-primary/20"
            >
              Find A Property
            </button>
          </div>
        </div>
      </div>

      {/* ── Download App ──────────────────────────────────────────────────── */}
      <div className="bg-bg-secondary/50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/5 rounded-3xl p-8 md:p-12 border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
                  Mobile App
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  Book On The Go
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  Download our mobile app and manage your bookings, get
                  notifications, and explore properties anywhere, anytime.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-background hover:bg-primary text-text-primary hover:text-white px-6 py-3 rounded-xl font-semibold transition border border-text-muted/20 flex items-center gap-2">
                    <span className="text-xl">📱</span> Play Store
                  </button>
                  <button className="bg-background hover:bg-primary text-text-primary hover:text-white px-6 py-3 rounded-xl font-semibold transition border border-text-muted/20 flex items-center gap-2">
                    <span className="text-xl">🍎</span> App Store
                  </button>
                </div>
              </div>
              <div className="h-64 bg-background rounded-2xl border border-text-muted/10 flex items-center justify-center">
                <p className="text-6xl">📱</p>
              </div>
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Discover More About Property Rental
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-6" />
            <p className="text-text-secondary mb-6 leading-relaxed">
              Aatithi Aagaman connects guests with exceptional properties across
              the country. Whether you're looking for a cozy room, a modern
              flat, a luxury villa, or a budget hostel — we have it all.
            </p>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Our platform makes finding and booking your next stay simple,
              safe, and seamless — with verified listings, real reviews, and
              secure payments.
            </p>
            <div className="space-y-2 mb-8">
              {[
                { label: "Ask A Question", path: "/help" },
                { label: "Find A Property", path: "/properties" },
                { label: "Become A Host", path: "/add-property" },
              ].map(({ label, path }) => (
                <p
                  key={label}
                  onClick={() => navigate(path)}
                  className="font-semibold text-text-secondary hover:text-primary cursor-pointer transition flex items-center gap-2"
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
          <div className="h-72 md:h-96 bg-bg-secondary rounded-2xl overflow-hidden border border-text-muted/10">
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
              <h3 className="text-2xl font-bold text-text-primary mb-1">
                Stay In The Loop
              </h3>
              <p className="text-text-secondary text-sm">
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
                className="flex-1 min-w-0 bg-background text-text-primary placeholder-text-muted rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary border border-text-muted/20 text-sm"
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
    </div>
  );
}
