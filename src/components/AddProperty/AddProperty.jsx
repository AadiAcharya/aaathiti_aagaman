export default function AddProperty() {
  const propertyTypes = [
    { id: 1, name: "Apartment" },
    { id: 2, name: "Flat" },
    { id: 3, name: "Room" },
    { id: 4, name: "Villa" },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-bg-secondary h-28 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-4xl font-extrabold text-text-primary">LOGO</h1>
            <nav className="hidden md:flex gap-8">
              <p className="text-text-primary font-semibold">Find a Property</p>
              <p className="text-text-primary font-semibold">Share Stories</p>
              <p className="text-text-primary font-semibold">Rental Guides</p>
              <p className="text-text-primary font-semibold">
                Download Mobile App
              </p>
            </nav>
          </div>
          <button className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded-full transition">
            Become A Host
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-text-primary mb-12">
            What kind of place will you host?
          </h2>

          {/* Property Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {propertyTypes.map((type) => (
              <div key={type.id} className="group cursor-pointer">
                <div className="relative bg-bg-secondary rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition">
                  {/* Image Placeholder */}
                  <div className="h-24 bg-text-muted/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded bg-text-secondary/50"></div>
                  </div>
                  {/* Label */}
                  <div className="p-6 text-center">
                    <p className="text-lg font-bold text-text-primary">
                      {type.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <div>
            <button className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-full transition">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-primary/10 mt-20 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* About Section */}
            <div>
              <h3 className="text-3xl font-extrabold text-text-primary mb-6">
                LOGO
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex gap-4">
                <button className="bg-text-muted/30 hover:bg-text-muted/40 text-text-primary font-semibold px-4 py-2 rounded transition flex items-center gap-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/c1bc9882-1e6c-47bd-ab77-a71077c71f79"
                    alt="Play Store"
                    className="w-5 h-5"
                  />
                  PlayStore
                </button>
                <button className="bg-text-muted/30 hover:bg-text-muted/40 text-text-primary font-semibold px-4 py-2 rounded transition flex items-center gap-2">
                  <img
                    src="https://www.figma.com/api/mcp/asset/2c08f4ad-1d18-45c0-bc29-625c25e89440"
                    alt="App Store"
                    className="w-5 h-5"
                  />
                  AppleStore
                </button>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-text-primary text-lg mb-6">
                COMPANY
              </h4>
              <ul className="space-y-3">
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    About Us
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    Legal Information
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    Contact Us
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    Blogs
                  </p>
                </li>
              </ul>
            </div>

            {/* Help Center Links */}
            <div>
              <h4 className="font-bold text-text-primary text-lg mb-6">
                HELP CENTER
              </h4>
              <ul className="space-y-3">
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    Find a Property
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    How To Host?
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    Why Us?
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    FAQs
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary hover:text-text-primary transition cursor-pointer">
                    Rental Guides
                  </p>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-bold text-text-primary text-lg mb-6">
                CONTACT INFO
              </h4>
              <ul className="space-y-3">
                <li>
                  <p className="text-text-secondary">Phone: 1234567890</p>
                </li>
                <li>
                  <p className="text-text-secondary">
                    Email: company@email.com
                  </p>
                </li>
                <li>
                  <p className="text-text-secondary">
                    Location: 100 Smart Street, LA, USA
                  </p>
                </li>
              </ul>
              <div className="mt-6">
                <img
                  src="https://www.figma.com/api/mcp/asset/d03a6c27-42f1-4ae3-97a8-11287ef50e9b"
                  alt="Social Media"
                  className="w-32 h-8"
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-primary/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-text-secondary text-sm">
            <p>© 2022 thecreation.design | All rights reserved</p>
            <p>
              Created with love by{" "}
              <span className="font-bold">thecreation.design</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}