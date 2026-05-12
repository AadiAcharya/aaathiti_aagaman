import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { propertiesAPI } from "../services/api";

// ─── Property Card ────────────────────────────────────────────────────────────
const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div
      onClick={() => navigate("/properties")}
      className={`${
        theme === "dark"
          ? "bg-bg-secondary border-text-muted/10 hover:shadow-2xl hover:shadow-primary/10"
          : "bg-white border-gray-200 hover:shadow-lg"
      } rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer hover:-translate-y-1`}
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
            <span className="text-5xl">🏠</span>
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
        <h3
          className={`${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          } font-bold text-base mb-1 truncate`}
        >
          {property.title}
        </h3>
        <p
          className={`${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          } text-sm mb-3 flex items-center gap-1`}
        >
          <span>📍</span> {property.location}
        </p>
        <div
          className={`flex gap-3 ${
            theme === "dark" ? "text-text-secondary" : "text-gray-500"
          } text-xs border-t ${
            theme === "dark" ? "border-text-muted/10" : "border-gray-200"
          } pt-3`}
        >
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

// ─── Skeleton ─────────────────────────────────────────────────────────────────
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

// ─── Main Component ───────────────────────────────────────────────────────────
const TABS = ["rooms", "flats", "hostels", "villas"];
const LIMIT = 9;

export default function Properties() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Filter state (synced with URL params) ─────────────────────────────────
  const [category, setCategory] = useState(
    searchParams.get("category") || "rooms",
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "default");
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || 20000,
  );
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  // ── Data state ────────────────────────────────────────────────────────────
  const [properties, setProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // ── Favorites ─────────────────────────────────────────────────────────────
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      const parsed = saved ? JSON.parse(saved) : [];
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
  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const params = { category, limit: LIMIT, page };
      if (search) params.search = search;
      const res = await propertiesAPI.getAll(params);
      setProperties(res.properties || []);
      setTotal(res.total || 0);
    } catch (err) {
      console.error("Failed to fetch:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [category, page, search]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Sync URL params
  useEffect(() => {
    const params = { category };
    if (search) params.search = search;
    if (sortBy !== "default") params.sort = sortBy;
    if (maxPrice !== 20000) params.maxPrice = maxPrice;
    setSearchParams(params, { replace: true });
  }, [category, search, sortBy, maxPrice]);

  // ── Client-side sort + price filter ──────────────────────────────────────
  const displayed = [...properties]
    .filter((p) => !p.priceMax || p.priceMax <= maxPrice)
    .sort((a, b) => {
      const n = (p) => p.priceMin || 0;
      if (sortBy === "price-low") return n(a) - n(b);
      if (sortBy === "price-high") return n(b) - n(a);
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const totalPages = Math.ceil(total / LIMIT);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProperties();
  };
  const resetFilters = () => {
    setCategory("rooms");
    setSearch("");
    setSortBy("default");
    setMaxPrice(20000);
    setPage(1);
  };
  const filtersActive =
    search ||
    sortBy !== "default" ||
    maxPrice !== 20000 ||
    category !== "rooms";

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div
        className={`${
          theme === "dark" ? "bg-bg-secondary" : "bg-white"
        } border-b ${
          theme === "dark" ? "border-text-muted/10" : "border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            } mb-2`}
          >
            Browse Properties
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            {loading ? "Searching..." : `${total} properties found`}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Search + Filter Bar ─────────────────────────────────────────── */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <svg
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                theme === "dark" ? "text-text-muted" : "text-gray-400"
              }`}
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
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location or title..."
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                theme === "dark"
                  ? "bg-bg-secondary border-text-muted/20 text-text-primary placeholder-text-muted"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition text-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilter((v) => !v)}
            className={`border-2 px-4 py-3 rounded-xl font-semibold transition text-sm flex items-center gap-2 ${
              showFilter
                ? "border-primary bg-primary text-white"
                : `${
                    theme === "dark"
                      ? "border-primary/30 text-text-primary hover:border-primary"
                      : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                  }`
            }`}
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters{" "}
            {filtersActive && (
              <span className="w-2 h-2 rounded-full bg-accent" />
            )}
          </button>
        </form>

        {/* ── Expandable Filters ──────────────────────────────────────────── */}
        {showFilter && (
          <div
            className={`${
              theme === "dark" ? "bg-bg-secondary" : "bg-white"
            } border ${
              theme === "dark" ? "border-primary/20" : "border-gray-200"
            } rounded-2xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6`}
          >
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-500"
                } text-xs font-semibold uppercase tracking-wide block mb-2`}
              >
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full border rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm ${
                  theme === "dark"
                    ? "bg-slate-700 border-text-muted/20 text-text-primary"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                }`}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-500"
                } text-xs font-semibold uppercase tracking-wide block mb-2`}
              >
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
                className="w-full accent-primary mt-2"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className={`w-full border-2 rounded-xl py-2.5 font-semibold transition text-sm ${
                  theme === "dark"
                    ? "border-slate-600 hover:border-primary text-slate-300 hover:text-primary"
                    : "border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600"
                }`}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* ── Category Tabs ───────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleCategoryChange(tab)}
              className={`capitalize whitespace-nowrap px-5 py-2.5 rounded-full font-semibold text-sm transition border-2 ${
                category === tab
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : `${
                      theme === "dark"
                        ? "border-primary/20 text-text-secondary hover:border-primary hover:text-primary"
                        : "border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-600"
                    }`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Results Info ────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-sm`}
          >
            {loading
              ? "Loading..."
              : `Showing ${displayed.length} of ${total} properties`}
          </p>
          {filtersActive && (
            <button
              onClick={resetFilters}
              className="text-primary text-sm hover:underline font-semibold"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* ── Grid ────────────────────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div
            className={`text-center py-24 rounded-2xl ${
              theme === "dark" ? "bg-bg-secondary" : "bg-gray-100"
            }`}
          >
            <p className="text-5xl mb-4">🔍</p>
            <p
              className={`text-xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-2`}
            >
              No properties found
            </p>
            <p
              className={`${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              } mb-6`}
            >
              Try adjusting your search or filters
            </p>
            <button
              onClick={resetFilters}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-hover transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((property) => (
              <PropertyCard
                key={property._id || property.id}
                property={property}
                isFavorite={favorites.includes(property._id || property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ──────────────────────────────────────────────────── */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === 1
                  ? "bg-bg-secondary text-text-muted cursor-not-allowed"
                  : "bg-bg-secondary text-text-primary hover:bg-primary hover:text-white"
              }`}
            >
              &larr;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  page === i + 1
                    ? "bg-primary text-white"
                    : "bg-bg-secondary text-text-primary hover:bg-primary/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                page === totalPages
                  ? "bg-bg-secondary text-text-muted cursor-not-allowed"
                  : "bg-bg-secondary text-text-primary hover:bg-primary hover:text-white"
              }`}
            >
              &rarr;
            </button>
          </div>
        )}

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <div
          className={`mt-20 ${theme === "dark" ? "bg-slate-800" : "bg-white"} rounded-3xl p-8 md:p-12 border ${theme === "dark" ? "border-slate-700" : "border-gray-200"} text-center`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
            Can't find what you're looking for?
          </h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            List your own property and reach thousands of guests, or contact us
            and we'll help you find the perfect stay.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate("/add-property")}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-primary/20"
            >
              List Your Property
            </button>
            <button
              onClick={() => navigate("/help")}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
