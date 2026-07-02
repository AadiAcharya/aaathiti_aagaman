import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { propertiesAPI } from "../services/api";
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
} from "lucide-react";

export default function Wishlist() {
  const navigate = useNavigate();
  const { theme } = useTheme();

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
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await propertiesAPI.getAll({ limit: 100 });
        setProperties(res.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((f) => f !== id));
  };

  const wishlistedProperties = properties.filter((p) =>
    favorites.includes(p._id || p.id),
  );

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
            : `${wishlistedProperties.length} saved ${
                wishlistedProperties.length === 1 ? "property" : "properties"
              }`}
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
        ) : wishlistedProperties.length === 0 ? (
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
              Tap the heart icon on any property to save it here.
            </p>
            <button
              onClick={() => navigate("/properties")}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-semibold transition"
            >
              <Search className="w-4 h-4" /> Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProperties.map((property) => {
              const id = property._id || property.id;
              return (
                <div
                  key={id}
                  onClick={() => navigate("/properties")}
                  className={`${
                    theme === "dark"
                      ? "bg-bg-secondary border-text-muted/10 hover:shadow-2xl hover:shadow-primary/10"
                      : "bg-white border-gray-200 hover:shadow-lg"
                  } rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer hover:-translate-y-1`}
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
                        <HomeIcon className="w-9 h-9 text-primary" />
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(id);
                      }}
                      title="Remove from wishlist"
                      className="absolute top-3 left-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-lg truncate">
                        {property.title}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-primary text-sm font-bold mb-1">
                      {property.price}
                    </p>
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
                      <MapPin className="w-4 h-4" /> {property.location}
                    </p>
                    <div
                      className={`flex gap-3 ${
                        theme === "dark" ? "text-text-secondary" : "text-gray-500"
                      } text-xs border-t ${
                        theme === "dark" ? "border-text-muted/10" : "border-gray-200"
                      } pt-3`}
                    >
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" /> {property.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShowerHead className="w-4 h-4" /> {property.bathrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Car className="w-4 h-4" /> {property.parking}
                      </span>
                      <span className="flex items-center gap-1">
                        <PawPrint className="w-4 h-4" /> {property.pets}
                      </span>
                    </div>
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
