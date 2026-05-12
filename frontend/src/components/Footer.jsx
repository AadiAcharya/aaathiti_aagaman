import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer
      className={`w-full ${
        theme === "dark" ? "bg-bg-secondary" : "bg-gray-100"
      } py-16 px-8 md:px-20 mt-16`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3
              className={`${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } font-bold text-2xl mb-4`}
            >
              AATHITI
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              } text-sm leading-relaxed mb-6`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-3">
              <button
                className={`${
                  theme === "dark"
                    ? "bg-bg-secondary border-text-muted text-text-primary hover:bg-primary hover:text-white"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-blue-600 hover:text-white"
                } border px-4 py-2 rounded-md text-sm font-medium transition`}
              >
                PlayStore
              </button>
              <button
                className={`${
                  theme === "dark"
                    ? "bg-bg-secondary border-text-muted text-text-primary hover:bg-primary hover:text-white"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-blue-600 hover:text-white"
                } border px-4 py-2 rounded-md text-sm font-medium transition`}
              >
                AppleStore
              </button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4
              className={`${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } font-bold text-lg mb-6`}
            >
              COMPANY
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Legal Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Help Center Links */}
          <div>
            <h4
              className={`${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } font-bold text-lg mb-6`}
            >
              HELP CENTER
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/properties"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Find a Property
                </a>
              </li>
              <li>
                <a
                  href="/hosting"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  How To Host?
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Why Us?
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Rental Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className={`${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } font-bold text-lg mb-6`}
            >
              CONTACT INFO
            </h4>
            <ul className="space-y-3">
              <li
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-sm`}
              >
                <span
                  className={`${
                    theme === "dark" ? "text-text-muted" : "text-gray-500"
                  }`}
                >
                  Phone:{" "}
                </span>
                <a
                  href="tel:+977 9865004688"
                  className={`${
                    theme === "dark"
                      ? "text-primary hover:text-primary-hover"
                      : "text-blue-600 hover:text-blue-800"
                  } transition`}
                >
                  +977 9865004688
                </a>
              </li>
              <li
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-sm`}
              >
                <span
                  className={`${
                    theme === "dark" ? "text-text-muted" : "text-gray-500"
                  }`}
                >
                  Email:{" "}
                </span>
                <a
                  href="mailto:aadityaacharya156@gmail.com"
                  className={`${
                    theme === "dark"
                      ? "text-primary hover:text-primary-hover"
                      : "text-blue-600 hover:text-blue-800"
                  } transition`}
                >
                  aadityaacharya156@gmail.com
                </a>
              </li>
              <li
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } text-sm`}
              >
                <span
                  className={`${
                    theme === "dark" ? "text-text-muted" : "text-gray-500"
                  }`}
                >
                  Location:{" "}
                </span>
                <span
                  className={`${
                    theme === "dark" ? "text-text-secondary" : "text-gray-700"
                  }`}
                >
                  100 Smart Street, LA, USA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t ${
            theme === "dark" ? "border-text-muted" : "border-gray-200"
          } my-8`}
        ></div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-xs`}
          >
            © 2026 CCT project Design | All rights reserved
          </p>
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-xs`}
          >
            Created with love by{" "}
            <span className="text-primary font-bold">The CodeMan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
