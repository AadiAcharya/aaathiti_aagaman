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
    <div className="bg-background min-h-screen">
      {/* Header Background */}
      <div className="bg-bg-secondary h-26">
        {/* Main Header */}
        <div className="h-20 mt-4 pl-20">
          <div className="text-4xl font-extrabold text-text-primary">LOGO</div>
          <div className="flex gap-8 text-base font-semibold text-text-primary -mt-12 ml-60">
            <p>Find a Property</p>
            <p>Share Stories</p>
            <p>Rental Guides</p>
            <p>Download Mobile App</p>
          </div>
          <div className="absolute right-20 top-6 flex gap-3 items-center">
            <button className="bg-white border-none rounded-full px-4 py-2 cursor-pointer text-text-primary">
              Sign In
            </button>
            <div className="w-12 h-12 rounded-full bg-text-muted" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-10 md:p-20">
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

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#eff0f2",
          marginTop: "60px",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "60px",
          }}
        >
          {/* About Section */}
          <div>
            <h3
              style={{
                fontSize: "50px",
                fontWeight: "800",
                color: "#484848",
                marginBottom: "20px",
              }}
            >
              LOGO
            </h3>
            <p
              style={{
                fontSize: "15px",
                color: "#9a9a9a",
                lineHeight: "1.5",
                marginBottom: "20px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                style={{
                  backgroundColor: "#e0e2e6",
                  border: "none",
                  borderRadius: "6px",
                  padding: "12px 24px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#484848",
                }}
              >
                📱 PlayStore
              </button>
              <button
                style={{
                  backgroundColor: "#e0e2e6",
                  border: "none",
                  borderRadius: "6px",
                  padding: "12px 24px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#484848",
                }}
              >
                🍎 AppleStore
              </button>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#484848",
                marginBottom: "20px",
              }}
            >
              COMPANY
            </h4>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                About Us
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                Legal Information
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                Contact Us
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                Blogs
              </li>
            </ul>
          </div>

          {/* Help Center Section */}
          <div>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#484848",
                marginBottom: "20px",
              }}
            >
              HELP CENTER
            </h4>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                Find a Property
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                How To Host?
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                Why Us?
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                FAQs
              </li>
              <li
                style={{
                  marginBottom: "15px",
                  fontSize: "15px",
                  color: "#484848",
                }}
              >
                Rental Guides
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#484848",
                marginBottom: "20px",
              }}
            >
              CONTACT INFO
            </h4>
            <p
              style={{
                fontSize: "15px",
                color: "#484848",
                marginBottom: "12px",
              }}
            >
              Phone: 1234567890
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "#484848",
                marginBottom: "12px",
              }}
            >
              Email: company@email.com
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "#484848",
                marginBottom: "20px",
              }}
            >
              Location: 100 Smart Street, LA, USA
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>
                f
              </a>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>
                𝕏
              </a>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>
                📷
              </a>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>
                in
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: "1px solid #d0d0d0",
            marginTop: "40px",
            paddingTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            color: "#484848",
          }}
        >
          <p style={{ margin: "0" }}>
            © 2022 thecreation.design | All rights reserved
          </p>
          <p style={{ margin: "0" }}>
            Created with love by{" "}
            <span style={{ fontWeight: "700" }}>thecreation.design</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
