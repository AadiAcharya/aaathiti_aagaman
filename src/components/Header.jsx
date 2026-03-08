import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-bg-secondary shadow-sm" data-name="Main Header" data-node-id="2:3639">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" data-name="Header" data-node-id="2:3640">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-text-primary hover:text-accent transition" data-node-id="2:3641">
          LOGO
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-text-secondary font-semibold text-base" data-name="header navigations" data-node-id="2:3647">
          <Link to="/" className="hover:text-text-primary transition" data-node-id="2:3648">
            Home
          </Link>
          <Link to="/about" className="hover:text-text-primary transition" data-node-id="2:3649">
            About
          </Link>
          <Link to="/projects" className="hover:text-text-primary transition" data-node-id="2:3650">
            Projects
          </Link>
          <Link to="/contact" className="hover:text-text-primary transition" data-node-id="2:3651">
            Contact
          </Link>
          <svg
            className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            data-node-id="2:3652"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
            />
          </svg>
        </nav>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-4" data-name="initial-options" data-node-id="2:3657">
          {/* Auth Section */}
          <div
            className="flex items-center gap-3 bg-background border border-bg-secondary rounded-full px-3 py-2"
            data-name="auth btn"
            data-node-id="2:3658"
          >
            {/* Menu Icon */}
            <svg
              className="w-6 h-6 text-text-secondary cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
              data-node-id="2:3662"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>

            {/* User Avatar */}
            <svg
              className="w-8 h-8 text-text-muted cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
              data-node-id="2:3660"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-secondary"
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
          <Link to="/" className="block text-text-secondary font-semibold hover:text-text-primary">
            Home
          </Link>
          <Link to="/about" className="block text-text-secondary font-semibold hover:text-text-primary">
            About
          </Link>
          <Link to="/projects" className="block text-text-secondary font-semibold hover:text-text-primary">
            Projects
          </Link>
          <Link to="/contact" className="block text-text-secondary font-semibold hover:text-text-primary">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
