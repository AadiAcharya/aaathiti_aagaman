export default function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      title: "Family Apartment",
      location: "100 Smart Street, LA, USA",
      image: "https://via.placeholder.com/279x240",
    },
    {
      id: 2,
      title: "Family Apartment",
      location: "100 Smart Street, LA, USA",
      image: "https://via.placeholder.com/279x240",
    },
    {
      id: 3,
      title: "Family Apartment",
      location: "100 Smart Street, LA, USA",
      image: "https://via.placeholder.com/279x240",
    },
    {
      id: 4,
      title: "Family Apartment",
      location: "100 Smart Street, LA, USA",
      image: "https://via.placeholder.com/279x240",
    },
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="p-10 md:p-20 flex-1">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-text-primary mb-8">
          Wishlists
        </h1>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg overflow-hidden bg-bg-secondary h-80 cursor-pointer transition-transform hover:scale-102"
            >
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Remove Button */}
              <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white border-none cursor-pointer text-lg flex items-center justify-center transition-colors hover:bg-black/70">
                ✕
              </button>

              {/* Item Info Overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
              >
                <p className="text-white text-base font-bold mb-1">
                  {item.title}
                </p>
                <p className="text-white text-sm font-medium">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
