export default function Footer() {
  return (
    <footer className="w-full bg-bg-secondary py-16 px-8 md:px-20 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-text-primary font-bold text-2xl mb-4">
              AATHITI
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-3">
              <button className="bg-bg-secondary border border-text-muted text-text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition">
                PlayStore
              </button>
              <button className="bg-bg-secondary border border-text-muted text-text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition">
                AppleStore
              </button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-text-primary font-bold text-lg mb-6">
              COMPANY
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  Legal Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Help Center Links */}
          <div>
            <h4 className="text-text-primary font-bold text-lg mb-6">
              HELP CENTER
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/properties"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  Find a Property
                </a>
              </li>
              <li>
                <a
                  href="/hosting"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  How To Host?
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  Why Us?
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-primary transition text-sm"
                >
                  Rental Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-text-primary font-bold text-lg mb-6">
              CONTACT INFO
            </h4>
            <ul className="space-y-3">
              <li className="text-text-secondary text-sm">
                <span className="text-text-muted">Phone: </span>
                <a
                  href="tel:+977 9865004688"
                  className="text-primary hover:text-primary-hover transition"
                >
                  +977 9865004688
                </a>
              </li>
              <li className="text-text-secondary text-sm">
                <span className="text-text-muted">Email: </span>
                <a
                  href="mailto:aadityaacharya156@gmail.com"
                  className="text-primary hover:text-primary-hover transition"
                >
                  aadityaacharya156@gmail.com
                </a>
              </li>
              <li className="text-text-secondary text-sm">
                <span className="text-text-muted">Location: </span>
                <span className="text-text-secondary">
                  100 Smart Street, LA, USA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-text-muted my-8"></div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-xs">
            © 2026 CCT project Design | All rights reserved
          </p>
          <p className="text-text-secondary text-xs">
            Created with love by{" "}
            <span className="text-primary font-bold">The CodeMan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
