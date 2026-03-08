// FUNCTIONS YOU NEED TO ADD:
// 1. const [searchTab, setSearchTab] = useState('rooms'); - For tab switching
// 2. Form submission handlers for search, newsletter, etc.
// 3. Navigation handlers for buttons (optional - can use <Link> from react-router)

// Property card component
const PropertyCard = ({
  title,
  location,
  bedrooms,
  bathrooms,
  parking,
  pets,
  price,
  isTopRated,
  image,
}) => (
  <div className="bg-bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition border border-text-muted/20">
    <div className="bg-text-muted/10 h-48 relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover hover:scale-110 transition"
      />
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

export default function Home() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Banner Section */}
      <div className="bg-bg-secondary py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-6xl font-bold text-text-muted opacity-20 mb-8">
            DISCOVER LUXURY
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
                  <button className="text-primary border-b-2 border-primary capitalize font-semibold pb-2 transition">
                    rooms
                  </button>
                  <button className="text-text-secondary hover:text-primary capitalize font-semibold pb-2 transition">
                    flats
                  </button>
                  <button className="text-text-secondary hover:text-primary capitalize font-semibold pb-2 transition">
                    hostels
                  </button>
                  <button className="text-text-secondary hover:text-primary capitalize font-semibold pb-2 transition">
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
            </div>

            {/* Search Button - YOU ADD: onClick handler */}
            <div className="flex justify-end">
              <button className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-3 font-semibold transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Properties */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Latest on the Property Listing
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PropertyCard
            title="Well Furnished Apartment"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property1.svg"
          />
          <PropertyCard
            title="Comfortable Family Flat"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property2.svg"
          />
          <PropertyCard
            title="Beach House Summer"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property3.svg"
          />
          <PropertyCard
            title="Double Size Room"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property4.svg"
          />
        </div>
      </div>

      {/* Nearby Properties */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Nearby Listed Properties
            </h2>
            <div className="w-32 h-1.5 bg-primary rounded"></div>
          </div>
          <button className="text-accent font-semibold hover:text-primary transition">
            Show On Map →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PropertyCard
            title="Well Furnished Apartment"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property1.svg"
          />
          <PropertyCard
            title="Comfortable Family Flat"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property2.svg"
          />
          <PropertyCard
            title="Beach House Summer"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property3.svg"
          />
          <PropertyCard
            title="Double Size Room"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property4.svg"
          />
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
          <PropertyCard
            title="Well Furnished Apartment"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            isTopRated={true}
            image="/images/property1.svg"
          />
          <PropertyCard
            title="Comfortable Family Flat"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            isTopRated={true}
            image="/images/property2.svg"
          />
          <PropertyCard
            title="Beach House Summer"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            isTopRated={true}
            image="/images/property3.svg"
          />
          <PropertyCard
            title="Double Size Room"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            isTopRated={true}
            image="/images/property4.svg"
          />
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
          <PropertyCard
            title="Well Furnished Apartment"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property1.svg"
          />
          <PropertyCard
            title="Blue Door Villa Modern"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property2.svg"
          />
          <PropertyCard
            title="Beach House Apartment"
            location="100 Smart Street, LA, USA"
            bedrooms="3"
            bathrooms="1"
            parking="2"
            pets="0"
            price="$1000 - 5000 USD"
            image="/images/property3.svg"
          />
        </div>
      </div>

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
          <BlogCard
            title="Choose the right property!"
            category="Economy"
            image="/images/blog1.svg"
          />
          <BlogCard
            title="Best environment for rental"
            category="Lifestyle"
            image="/images/blog2.svg"
          />
          <BlogCard
            title="Boys Hostel Apartment"
            category="Property"
            image="/images/blog3.svg"
          />
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

      {/* Newsletter - YOU ADD: value, onChange, onSubmit */}
      <div className="bg-bg-secondary py-12 my-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                NEWSLETTER
              </h3>
              <p className="text-text-secondary">Stay Upto Date</p>
            </div>
            <div className="flex-1 flex gap-4">
              <input
                type="email"
                placeholder="Your Email..."
                className="flex-1 bg-background text-text-primary placeholder-text-muted rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 font-semibold transition">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
