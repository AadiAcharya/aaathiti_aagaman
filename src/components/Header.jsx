import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

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
          className="text-3xl font-extrabold text-text-primary hover:text-accent transition"
          data-node-id="2:3641"
        >
          LOGO
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
            Find a Property
          </Link>
          <Link
            to="/"
            className="hover:text-accent transition"
            data-node-id="2:3649"
          >
            Share Stories
          </Link>
          <Link
            to="/"
            className="hover:text-accent transition"
            data-node-id="2:3650"
          >
            Rental Guides
          </Link>
          {/* <Link
            to="/"
            className="hover:text-accent transition"
            data-node-id="2:3651"
          >
            Download Mobile App
          </Link> */}
        </nav>

        {/* Right Section - Desktop */}
        <div
          className="hidden md:flex items-center gap-4"
          data-name="right-section"
          data-node-id="2:3657"
        >
          {/* Become A Host Button */}
          <button
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 py-2 font-semibold transition"
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
          <button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 py-2 font-semibold transition">
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
        <button onClick={()=> navigate("/sign-in")} className="block w-full text-left px-3 py-2 hover:text-text-muted">
          Sign Up
        </button>
        <button onClick={()=> navigate("/sign-up")} className="block w-full text-left px-3 py-2 hover:text-text-muted">
          Login
        </button>
        <button onClick={()=> navigate("/help")} className="block w-full text-left px-3 py-2  hover:text-text-muted">
          Help Center
        </button>
      </div>
    </header>
  );
}
