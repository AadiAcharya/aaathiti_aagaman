import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or system preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || saved === "light" ? saved : "dark";
    }
    return "dark";
  });

  // Set theme on mount
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = theme === "dark";
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Navigation links data
  const navLinks = [
    { label: "Browse Property", path: "/properties" },
    { label: "Browse Rooms", path: "/rooms" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Rental Guides", path: "/rental-guide" },
  ];

  const logoColor = theme === "dark" ? "#FF6B6B" : "#2563EB";
  const logoStroke = theme === "dark" ? "#64748B" : "#2563EB";

  return (
    <header className={`w-full shadow-sm transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-slate-900 border-b border-slate-800" 
        : "bg-white border-b border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition flex-shrink-0"
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="19"
              fill={logoColor}
              opacity="0.1"
            />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke={logoStroke}
              strokeWidth="2"
            />
            <text
              x="20"
              y="26"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill={logoStroke}
              fontFamily="sans-serif"
            >
              AA
            </text>
          </svg>
          <span className={`text-lg font-bold hidden sm:inline transition-colors duration-300 ${
            theme === "dark" ? "text-slate-100" : "text-gray-900"
          }`}>
            Aathiti Aagaman
          </span>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className={`hidden lg:flex items-center gap-8 font-semibold text-base transition-colors duration-300 ${
          theme === "dark" ? "text-slate-300" : "text-gray-700"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                theme === "dark"
                  ? "hover:text-blue-400"
                  : "hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-700"
            }`}
            title={
              theme === "dark" ? "Switch to Day Mode" : "Switch to Night Mode"
            }
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            )}
          </button>

          {/* Become A Host Button */}
          <button
            onClick={() => navigate("/hosting")}
            className={`rounded-full px-6 py-2 font-semibold transition-colors text-white ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Become A Host
          </button>

          {/* Auth Section */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-2 border rounded-full px-3 py-2 hover:shadow-md transition ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>

            {/* Desktop Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border overflow-hidden transition-all duration-200 z-50 ${
                dropdownOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              } ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => {
                  navigate("/sign-in");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate("/sign-up");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Sign Up
              </button>
              <div className={`border-t ${
                theme === "dark" ? "border-slate-700" : "border-gray-200"
              }`}></div>
              <button
                onClick={() => {
                  navigate("/account");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                👤 Account
              </button>
              <button
                onClick={() => {
                  navigate("/messages");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                💬 Messages
              </button>
              <button
                onClick={() => {
                  navigate("/wishlist");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                ❤️ Wishlist
              </button>
              <div className={`border-t ${
                theme === "dark" ? "border-slate-700" : "border-gray-200"
              }`}></div>
              <button
                onClick={() => {
                  navigate("/host");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 font-semibold transition ${
                  theme === "dark"
                    ? "text-blue-400 hover:bg-slate-700"
                    : "text-blue-600 hover:bg-gray-100"
                }`}
              >
                🏠 Host Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/help");
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                ❓ Help Center
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors ${
            theme === "dark" ? "text-slate-300" : "text-gray-700"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className={`md:hidden border-t transition-colors duration-300 px-6 py-4 space-y-2 ${
          theme === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-gray-50 border-gray-200"
        }`}>
          {/* Desktop Navigation Links for Mobile */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block font-semibold py-2 transition ${
                theme === "dark"
                  ? "text-slate-300 hover:text-blue-400"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className={`border-t my-3 ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}></div>

          {/* Auth Links for Mobile */}
          <button
            onClick={() => {
              navigate("/sign-in");
              setMenuOpen(false);
            }}
            className={`block w-full text-left font-semibold py-2 transition ${
              theme === "dark"
                ? "text-slate-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              navigate("/sign-up");
              setMenuOpen(false);
            }}
            className={`block w-full text-left font-semibold py-2 transition ${
              theme === "dark"
                ? "text-slate-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Sign Up
          </button>

          <div className={`border-t my-3 ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}></div>

          {/* Account Links for Mobile */}
          <button
            onClick={() => {
              navigate("/account");
              setMenuOpen(false);
            }}
            className={`block w-full text-left py-2 transition ${
              theme === "dark"
                ? "text-slate-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            👤 Account
          </button>
          <button
            onClick={() => {
              navigate("/messages");
              setMenuOpen(false);
            }}
            className={`block w-full text-left py-2 transition ${
              theme === "dark"
                ? "text-slate-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            💬 Messages
          </button>
          <button
            onClick={() => {
              navigate("/wishlist");
              setMenuOpen(false);
            }}
            className={`block w-full text-left py-2 transition ${
              theme === "dark"
                ? "text-slate-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            ❤️ Wishlist
          </button>

          <div className={`border-t my-3 ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}></div>

          {/* Host & Help for Mobile */}
          <button
            onClick={() => {
              navigate("/host");
              setMenuOpen(false);
            }}
            className={`block w-full text-left font-semibold py-2 transition ${
              theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            🏠 Host Dashboard
          </button>
          <button
            onClick={() => {
              navigate("/help");
              setMenuOpen(false);
            }}
            className={`block w-full text-left py-2 transition ${
              theme === "dark"
                ? "text-slate-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            ❓ Help Center
          </button>

          <div className={`border-t my-3 ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}></div>

          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition ${
              theme === "dark"
                ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span>{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          {/* Become A Host for Mobile */}
          <button
            onClick={() => {
              navigate("/hosting");
              setMenuOpen(false);
            }}
            className={`w-full mt-4 rounded-full px-6 py-2 font-semibold transition text-white ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Become A Host
          </button>
        </nav>
      )}
    </header>
  );
}