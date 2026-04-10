import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // Theme state: 'light' or 'dark'
  // Theme state: 'light' or 'dark'.
  // On first render, check localStorage and system preference.
  const [theme, setTheme] = useState('dark');

  // Set theme on mount (immediate effect, avoids flicker)
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        document.body.classList.toggle('dark', saved === 'dark');
      } else {
        // Optionally, use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
        document.body.classList.toggle('dark', prefersDark);
      }
    }
  }, []);

  // Update theme when changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // This approach ensures the theme is set immediately on page load (avoiding a flash),
  // and persists the user's choice in localStorage.

  return (
    <header
      className="w-full bg-bg-secondary shadow-sm"
      data-name="Main Header"
      data-node-id="2:3639"
    >
      <div
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        data-name="Header"
        data-node-id="2:3640"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
          data-node-id="2:3641"
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="19" fill={theme === 'dark' ? '#FF6B6B' : '#2563EB'} opacity="0.1" />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke={theme === 'dark' ? '#64748B' : '#2563EB'}
              strokeWidth="2"
            />
            <text
              x="20"
              y="26"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill={theme === 'dark' ? '#64748B' : '#2563EB'}
              fontFamily="sans-serif"
            >
              AA
            </text>
          </svg>
          <span className="text-lg font-bold text-text-muted hidden sm:inline">
            Aathiti Aagaman
          </span>
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full border border-bg-secondary bg-bg-secondary hover:bg-bg-secondary/80 transition text-xl"
          title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          )}
        </button>

        {/* Navigation Links - Desktop */}
        <nav
          className="hidden md:flex items-center gap-8 text-text-primary font-semibold text-base"
          data-name="header navigations"
          data-node-id="2:3647"
        >
          <Link
            to="/properties"
            className="hover:text-accent transition"
            data-node-id="2:3648"
          >
            Browse Property
          </Link>
          <Link to="/rooms" className="hover:text-accent transition">
            Browse Rooms
          </Link>
          <Link
            to="/how-it-works"
            className="hover:text-accent transition"
            data-node-id="2:3649"
          >
            How It Works
          </Link>
          <Link
            to="/rental-guide"
            className="hover:text-accent transition"
            data-node-id="2:3650"
          >
            Rental Guides
          </Link>
        </nav>

        {/* Right Section - Desktop */}
        <div
          className="hidden md:flex items-center gap-4"
          data-name="right-section"
          data-node-id="2:3657"
        >
          {/* Become A Host Button */}
          <button
            onClick={() => navigate("/hosting")}
            className="bg-primary hover:bg-primary-hover text-white rounded-full px-6 py-2 font-semibold transition"
            data-node-id="2:3645"
          >
            Become A Host
          </button>

          {/* Auth Section */}
          <div
            className="flex items-center gap-3 bg-white border border-bg-secondary rounded-full px-3 py-2"
            data-name="auth btn"
            data-node-id="2:3658"
          >
            {/* Menu Icon (Hamburger) */}
            {/* <svg
              className="w-6 h-6 text-gray-700 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-node-id="2:3662"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg> */}

            {/* User Avatar */}
            <button className="" onClick={() => setOpen(!open)}>
              <svg
                className="w-8 h-8 text-gray-600 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 24 24"
                data-node-id="2:3660"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-primary"
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
        <nav className="md:hidden bg-background border-t border-bg-secondary px-6 py-4 space-y-3">
          <Link
            to="/properties"
            className="block text-text-primary font-semibold hover:text-accent"
          >
            Find a Property
          </Link>
          <Link
            to="/"
            className="block text-text-primary font-semibold hover:text-accent"
          >
            Share Stories
          </Link>
          <Link
            to="/"
            className="block text-text-primary font-semibold hover:text-accent"
          >
            Rental Guides
          </Link>
          <Link
            to="/"
            className="block text-text-primary font-semibold hover:text-accent"
          >
            Download Mobile App
          </Link>
          <Link
            to="/help"
            className="block text-text-primary font-semibold hover:text-accent"
          >
            Help Center
          </Link>
          <button
            onClick={() => navigate("/hosting")}
            className="w-full mt-4 bg-primary hover:bg-primary-hover text-white rounded-full px-6 py-2 font-semibold transition"
          >
            Become A Host
          </button>
        </nav>
      )}

      {/* making signup login secion */}
      {/* {open && (
        <div className="text-white">
          <button className="block w-full text-left px-3 py-2 hover:text-text-muted">Sign Up</button>
          <button className="block w-full text-left px-3 py-2 hover:text-text-muted">login</button>
          <button className="block w-full text-left px-3 py-2 hover:text-text-muted">Help</button>
        </div>
      )} */}
      <div
        className={`
        absolute right-0 mt-2 z-50 w-40 bg-white rounded-xl shadow-lg p-2 transition-all duration-200
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <button
          onClick={() => navigate("/sign-in")}
          className="block w-full text-left px-3 py-2 hover:text-text-muted"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/sign-up")}
          className="block w-full text-left px-3 py-2 hover:text-text-muted"
        >
          Login
        </button>
        <div className="border-t border-gray-200 my-2"></div>
        <button
          onClick={() => navigate("/account")}
          className="block w-full text-left px-3 py-2 hover:text-text-muted"
        >
          👤 Account
        </button>
        <button
          onClick={() => navigate("/messages")}
          className="block w-full text-left px-3 py-2 hover:text-text-muted"
        >
          💬 Messages
        </button>
        <button
          onClick={() => navigate("/wishlist")}
          className="block w-full text-left px-3 py-2 hover:text-text-muted"
        >
          ❤️ Wishlist
        </button>
        <div className="border-t border-gray-200 my-2"></div>
        <button
          onClick={() => navigate("/host")}
          className="block w-full text-left px-3 py-2 hover:text-text-muted font-semibold text-primary"
        >
          🏠 Host Dashboard
        </button>
        <button
          onClick={() => navigate("/help")}
          className="block w-full text-left px-3 py-2  hover:text-text-muted"
        >
          ❓ Help Center
        </button>
      </div>
    </header>
  );
}
