import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer
      className={`w-full ${
        theme === "dark" ? "bg-bg-secondary" : "bg-gray-100"
      } py-16 px-8 md:px-20`}
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
              Find your next stay or list your own property — Aathiti
              Aagaman connects hosts and guests across Nepal.
            </p>
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
                <Link
                  to="/how-it-works"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/rental-guide"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Rental Guide
                </Link>
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
                <Link
                  to="/rooms"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Find a Property
                </Link>
              </li>
              <li>
                <Link
                  to="/hosting"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  How To Host?
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className={`${
                    theme === "dark"
                      ? "text-text-secondary hover:text-primary"
                      : "text-gray-600 hover:text-blue-600"
                  } transition text-sm`}
                >
                  Report an Issue
                </Link>
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
                  Bharatpur-10, Chitwan, Nepal
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
