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
    <div style={{ backgroundColor: "#3B82F6", minHeight: "100vh" }}>
      {/* Header Background */}
      <div style={{ backgroundColor: "#eff0f2", height: "104px" }}>
        {/* Main Header */}
        <div style={{ height: "70px", marginTop: "17px", paddingLeft: "76px" }}>
          <div style={{ fontSize: "35px", fontWeight: "800", color: "#484848" }}>
            LOGO
          </div>
          <div
            style={{
              display: "flex",
              gap: "30px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#484848",
              marginTop: "-50px",
              marginLeft: "241px",
            }}
          >
            <p>Find a Property</p>
            <p>Share Stories</p>
            <p>Rental Guides</p>
            <p>Download Mobile App</p>
          </div>
          <div
            style={{
              position: "absolute",
              right: "80px",
              top: "24px",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "23px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#484848",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px 80px" }}>
        {/* Title */}
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            color: "#484848",
            marginBottom: "30px",
          }}
        >
          Wishlists
        </h1>

        {/* Wishlist Items Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(279px, 1fr))",
            gap: "30px",
          }}
        >
          {wishlistItems.map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#9a9a9a",
                  height: "300px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Remove Button */}
                <button
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  ✕
                </button>

                {/* Item Info Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700",
                      margin: "0 0 5px 0",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#eff0f2", marginTop: "60px", padding: "60px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "60px" }}>
          {/* About Section */}
          <div>
            <h3 style={{ fontSize: "50px", fontWeight: "800", color: "#484848", marginBottom: "20px" }}>
              LOGO
            </h3>
            <p style={{ fontSize: "15px", color: "#9a9a9a", lineHeight: "1.5", marginBottom: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <button style={{ backgroundColor: "#e0e2e6", border: "none", borderRadius: "6px", padding: "12px 24px", cursor: "pointer", fontSize: "15px", fontWeight: "600", color: "#484848" }}>
                📱 PlayStore
              </button>
              <button style={{ backgroundColor: "#e0e2e6", border: "none", borderRadius: "6px", padding: "12px 24px", cursor: "pointer", fontSize: "15px", fontWeight: "600", color: "#484848" }}>
                🍎 AppleStore
              </button>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#484848", marginBottom: "20px" }}>
              COMPANY
            </h4>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>About Us</li>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>Legal Information</li>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>Contact Us</li>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>Blogs</li>
            </ul>
          </div>

          {/* Help Center Section */}
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#484848", marginBottom: "20px" }}>
              HELP CENTER
            </h4>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>Find a Property</li>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>How To Host?</li>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>Why Us?</li>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>FAQs</li>
              <li style={{ marginBottom: "15px", fontSize: "15px", color: "#484848" }}>Rental Guides</li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "700", color: "#484848", marginBottom: "20px" }}>
              CONTACT INFO
            </h4>
            <p style={{ fontSize: "15px", color: "#484848", marginBottom: "12px" }}>
              Phone: 1234567890
            </p>
            <p style={{ fontSize: "15px", color: "#484848", marginBottom: "12px" }}>
              Email: company@email.com
            </p>
            <p style={{ fontSize: "15px", color: "#484848", marginBottom: "20px" }}>
              Location: 100 Smart Street, LA, USA
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>f</a>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>𝕏</a>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>📷</a>
              <a href="#" style={{ fontSize: "18px", textDecoration: "none" }}>in</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid #d0d0d0", marginTop: "40px", paddingTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "16px", color: "#484848" }}>
          <p style={{ margin: "0" }}>© 2022 thecreation.design | All rights reserved</p>
          <p style={{ margin: "0" }}>Created with love by <span style={{ fontWeight: "700" }}>thecreation.design</span></p>
        </div>
      </footer>
    </div>
  );
}
