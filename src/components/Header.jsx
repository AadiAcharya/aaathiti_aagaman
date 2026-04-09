import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

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
            <circle cx="20" cy="20" r="19" fill="#FF6B6B" opacity="0.1" />
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="2"
            />
            <text
              x="20"
              y="26"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill="#FF6B6B"
              fontFamily="sans-serif"
            >
              AA
            </text>
          </svg>
          <span className="text-lg font-bold bg-linear-to-r from-red-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">
            Aathiti Aagaman
          </span>
        </Link>

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
            to="/"
            className="hover:text-accent transition"
            data-node-id="2:3649"
          >
            How It Works
          </Link>
          <Link
            to="/"
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
