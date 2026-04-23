import { useState, useEffect } from "react";
import { properties, blogs } from "../data/propertyData";

// Property card component
const PropertyCard = ({
  id,
  title,
  location,
  bedrooms,
  bathrooms,
  parking,
  pets,
  price,
  isTopRated,
  image,
  isFavorite,
  onToggleFavorite,
}) => (
  <div className="bg-bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition border border-text-muted/20">
    <div className="bg-text-muted/10 h-48 relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover hover:scale-110 transition"
      />
      <button
        onClick={() => onToggleFavorite(id)}
        className="absolute top-3 left-3  hover:bg-background text-2xl px-3 py-1 rounded-full transition"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      {isTopRated && (
        <div className="absolute top-3 right-3 bg-accent text-background px-3 py-1 rounded-full text-xs font-semibold">
          ★★★★★
        </div>
      )}
    </div>
    <div className="p-4">
      <p className="text-accent text-sm font-semibold">{price}</p>
      <h3 className="text-text-primary font-bold text-lg mt-2">{title}</h3>
      <p className="text-text-secondary text-sm mt-1">{location}</p>
      <div className="flex gap-4 mt-4 text-text-secondary text-sm">
        <span>🛏️ {bedrooms}</span>
        <span>🚿 {bathrooms}</span>
        <span>🚗 {parking}</span>
        <span>🐾 {pets}</span>
      </div>
    </div>
  </div>
);

// Blog card component
const BlogCard = ({ title, category, image }) => (
  <div className="rounded-lg overflow-hidden hover:transform hover:scale-105 transition">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-lg"
    />
    <h3 className="text-text-primary font-bold text-lg mt-3">{title}</h3>
    <p className="text-accent text-sm font-semibold">{category}</p>
  </div>
);

const extractPrice = (priceString) => {
  const numbers = priceString.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    return Math.max(...numbers.map(Number));
  }
};

const sortProperties = (properties, sortBy) => {
  const sorted = [...properties];

  if (sortBy === "price-low") {
    return sorted.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
  }
  if (sortBy === "price-high") {
    return sorted.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
  }
  if (sortBy === "name") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  return sorted;
};

export default function Home() {
  // UI state
  const [selectedTab, setSelectedTab] = useState("rooms");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [email, setEmail] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(3);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite function
  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      setFavorites(favorites.filter((id) => id !== propertyId));
    } else {
      setFavorites([...favorites, propertyId]);
    }
  };

  // Search/filter state for the search button
  const [appliedSearch, setAppliedSearch] = useState({
    term: "",
    tab: "rooms",
    price: 10000,
    sort: "default",
  });

  // On mount, show loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Reset visible count when filters change, but avoid cascading renders
  useEffect(() => {
    // Only update after initial mount
    if (visibleCount !== 3) {
      // eslint-disable-next-line
      setVisibleCount(3);
    }
    // eslint-disable-next-line
  }, [selectedTab, searchTerm, maxPrice, sortBy]);

  // Search button handler
  const handleSearch = () => {
    setAppliedSearch({
      term: searchTerm,
      tab: selectedTab,
      price: maxPrice,
      sort: sortBy,
    });
  };

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm("");
    setMaxPrice(10000);
    setSortBy("default");
    setVisibleCount(3);
    setAppliedSearch({
      term: "",
      tab: "rooms",
      price: 10000,
      sort: "default",
    });
    setSelectedTab("rooms");
  };

  const filteredProperties = properties.filter((property) => {
    const matchesCategory = property.category === appliedSearch.tab;
    const matchesSearch =
      appliedSearch.term === "" ||
      property.location
        .toLowerCase()
        .includes(appliedSearch.term.toLowerCase()) ||
      property.title.toLowerCase().includes(appliedSearch.term.toLowerCase());
    const matchesPrice = extractPrice(property.price) <= appliedSearch.price;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // newsLetter
  const handleNewsletterSubmit = () => {
    if (email) {
      alert(`thank you! We'll send updates to Your ${email}`);
      setEmail("");
    } else {
      alert("please enter your email");
    }
  };

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Banner Section */}
      <div className="bg-bg-secondary py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-6xl font-bold text-text-muted opacity-20 mb-8">
            Aatithi Aagaman
          </h1>

          {/* Search Bar */}
          <div className="bg-background border border-primary/30 rounded-3xl p-8 shadow-lg">
            {/* Search Tabs - YOU ADD: onClick with setSearchTab */}
            <div className="flex gap-8 mb-8">
              <div className="flex flex-col">
                <p className="text-text-secondary font-semibold text-sm mb-2">
                  FIND
                </p>
                <div className="flex gap-6">
                  <button
                    onClick={() => setSelectedTab("rooms")}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === "rooms"
                        ? "text-primary border-b-2 border-primary"
                        : "text-text-secondary hover:text-primary"
                    }`}
                  >
                    rooms
                  </button>
                  <button
                    onClick={() => setSelectedTab("flats")}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === "flats"
                        ? "text-primary border-b-2 border-primary"
                        : "text-text-secondary hover:text-primary"
                    }`}
                  >
                    Flats
                  </button>
                  <button
                    onClick={() => setSelectedTab("hostels")}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === "hostels"
                        ? "text-primary border-b-2 border-primary"
                        : "text-text-secondary hover:text-primary"
                    }`}
                  >
                    Hostels
                  </button>
                  <button
                    onClick={() => setSelectedTab("villas")}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === "villas"
                        ? "text-primary border-b-2 border-primary"
                        : "text-text-secondary hover:text-primary"
                    }`}
                  >
                    villas
                  </button>
                </div>
              </div>
            </div>

            {/* Search Fields - YOU ADD: value, onChange handlers */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Location
                </label>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Which city do you prefer?"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Check In
                </label>
                <input
                  type="text"
                  placeholder="Add Dates"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Check Out
                </label>
                <input
                  type="text"
                  placeholder="Add Dates"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Guests
                </label>
                <input
                  type="text"
                  placeholder="Add Guests"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Sort By{" "}
                </label>
                <select
                  className="w-full bg-bg-secondary text-text-primary rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
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
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Max Price: ${maxPrice}{" "}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  placeholder="Add Guests"
                  className="w-full"
                />
              </div>
            </div>

            {/* Search Button - YOU ADD: onClick handler */}
            <div className="flex justify-end gap-4">
              {(searchTerm !== "" ||
                maxPrice !== 10000 ||
                sortBy !== "default" ||
                selectedTab !== "rooms") && (
                <button
                  onClick={resetFilters}
                  className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-3 font-semibold transition"
                >
                  Clear Filters
                </button>
              )}
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-3 font-semibold transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Properties */}

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Nearby Listed Properties
            </h2>
            <span className="text-text-secondary text-2xl ml-3">
              ({filteredProperties.length} found)
            </span>
            <div className="w-32 h-1.5 bg-primary rounded"></div>
          </div>
          <button className="text-accent font-semibold hover:text-primary transition">
            Show On Map →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortProperties(filteredProperties, sortBy)
            .slice(0, visibleCount)
            .map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                parking={property.parking}
                pets={property.pets}
                price={property.price}
                image={property.image}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
        </div>
        <div className="flex justify-center mt-8">
          {visibleCount <
            properties.filter((property) => {
              const matchesCategory = property.category === appliedSearch.tab;
              const matchesSearch =
                appliedSearch.term === "" ||
                property.location
                  .toLowerCase()
                  .includes(appliedSearch.term.toLowerCase()) ||
                property.title
                  .toLowerCase()
                  .includes(appliedSearch.term.toLowerCase());
              const matchesPrice =
                extractPrice(property.price) <= appliedSearch.price;
              return matchesCategory && matchesSearch && matchesPrice;
            }).length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition"
            >
              load More Properties
            </button>
          )}
        </div>
      </div>

      {/* Latest Properties */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Latest on the Property Listing
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded mb-12"></div>
          {isLoading ? (
            <div className="text-center py-20">
              <div className="text-primary text-2xl animate-pulse">
                Loading Properties.....
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.slice(0, 4).map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  parking={property.parking}
                  pets={property.pets}
                  price={property.price}
                  image={property.image}
                  isTopRated={property.isTopRated}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Rated Properties */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Top Rated Properties
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties
            .filter((property) => property.isTopRated === true)
            .slice(0, 4)
            .map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                parking={property.parking}
                pets={property.pets}
                price={property.price}
                isTopRated={property.isTopRated}
                image={property.image}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Featured Properties on our Listing
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties
            .filter((property) => property.isFeatured === true)
            .slice(0, 4)
            .map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                parking={property.parking}
                pets={property.pets}
                price={property.price}
                isTopRated={property.isTopRated}
                image={property.image}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </div>

      {/* favorite secion */}
      {favorites.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              My Favorites ({favorites.length})
            </h2>
            <div className="w-32 h-1.5 bg-primary rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {properties
              .filter((p) => favorites.includes(p.id))
              .map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  parking={property.parking}
                  pets={property.pets}
                  price={property.price}
                  isTopRated={property.isTopRated}
                  image={property.image}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
          </div>
        </div>
      )}

      {/* Try Hosting */}
      <div className="bg-bg-secondary py-20 my-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                Try Hosting With Us
              </h2>
              <p className="text-text-secondary mb-8">
                Earn extra just by renting your property...
              </p>
              <button className="bg-accent hover:bg-primary text-background hover:text-white px-8 py-3 rounded-full font-semibold transition">
                Become A Host
              </button>
            </div>
            <div className="h-96 bg-background rounded-lg overflow-hidden">
              <img
                src="/images/hosting.svg"
                alt="Start Hosting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Property Rental Guides & Tips
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              category={blog.category}
              image={blog.image}
            />
          ))}
        </div>

        <div className="text-center">
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition">
            View All Blogs
          </button>
        </div>
      </div>

      {/* Browse Section */}
      <div className="bg-bg-secondary py-20 my-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="h-96 bg-background rounded-lg overflow-hidden">
              <img
                src="/images/browse.svg"
                alt="Browse Properties"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                Browse For More Properties
              </h2>
              <p className="text-text-secondary mb-8">
                Explore properties by their categories/types...
              </p>
              <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition">
                Find A Property
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download App */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-bg-secondary rounded-lg p-12">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                Download Our Mobile App
              </h2>
              <p className="text-text-secondary mb-8">
                Available for free on these platforms
              </p>
              <div className="flex gap-4">
                <button className="bg-background hover:bg-primary text-text-primary hover:text-white px-6 py-2 rounded-lg font-semibold transition">
                  📱 PlayStore
                </button>
                <button className="bg-background hover:bg-primary text-text-primary hover:text-white px-6 py-2 rounded-lg font-semibold transition">
                  🍎 AppleStore
                </button>
              </div>
            </div>
            <div className="h-96 bg-background rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Discover More About Property Rental
            </h2>
            <div className="w-32 h-1.5 bg-primary rounded mb-8"></div>
            <p className="text-text-secondary mb-8 leading-relaxed">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident.
            </p>
            <div className="space-y-3 text-text-secondary mb-8">
              <p className="font-semibold hover:text-primary cursor-pointer transition">
                Ask A Question
              </p>
              <p className="font-semibold hover:text-primary cursor-pointer transition">
                Find A Property
              </p>
            </div>
            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition">
              Discover More
            </button>
          </div>
          <div className="h-96 bg-bg-secondary rounded-lg overflow-hidden">
            <img
              src="/images/about.svg"
              alt="About Us"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Newsletter Section */}
      <div className="bg-bg-secondary py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                NEWSLETTER
              </h3>
              <p className="text-text-secondary">Stay Up to Date</p>
            </div>
            <div className="flex-1 flex gap-4">
              <input
                type="email"
                placeholder="Your Email..."
                value={email}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleNewsletterSubmit()
                }
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background text-text-primary placeholder-text-muted rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 font-semibold transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
