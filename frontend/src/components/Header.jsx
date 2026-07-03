import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import BecomeHostModal from "./BecomeHostModal";
import Logo from "./common/Logo";
import Button from "./ui/Button";
import IconButton from "./ui/IconButton";
import {
  Settings,
  MessageCircle,
  Heart,
  HelpCircle,
  DoorOpen,
  Moon,
  Sun,
  Menu,
  X,
  User,
  ShieldAlert,
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, role, logout } = useAuth();
  const isHost = role === "host" || role === "admin";

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hostModalOpen, setHostModalOpen] = useState(false);

  const navLinks = isHost
    ? [
        { label: "Dashboard", path: "/host" },
        { label: "Add Property", path: "/add-property" },
      ]
    : [
        { label: "Browse Rooms", path: "/rooms" },
        { label: "How It Works", path: "/how-it-works" },
        { label: "Rental Guides", path: "/rental-guide" },
      ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userRole");
    localStorage.removeItem("hostRequest");
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <Logo className="w-9 h-9 transition-transform duration-[var(--duration-fast)] group-hover:scale-105" />
          <span className="text-lg font-display font-bold text-text-primary hidden sm:inline">
            Aathiti Aagaman
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-text-secondary">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="transition-colors duration-[var(--duration-fast)] hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <IconButton
            icon={theme === "dark" ? Sun : Moon}
            label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            variant="solid"
            onClick={toggleTheme}
          />

          {!isAuthenticated && (
            <Button onClick={() => setHostModalOpen(true)}>Become A Host</Button>
          )}

          {role === "admin" && (
            <Button variant="danger" icon={ShieldAlert} onClick={() => navigate("/admin")}>
              Admin
            </Button>
          )}

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border
                bg-bg-elevated text-text-secondary hover:border-border-strong transition-colors duration-[var(--duration-fast)]"
              aria-label="Account menu"
            >
              {isAuthenticated ? (
                <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-semibold flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>

            <div
              className={`absolute right-0 mt-2 w-52 rounded-card border border-border bg-bg-elevated shadow-elevated
                overflow-hidden transition-all duration-[var(--duration-base)] z-50
                ${dropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
            >
              {!isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      navigate("/sign-in");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate("/sign-up");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                  >
                    Sign Up
                  </button>
                  <div className="border-t border-border" />
                </>
              )}
              <button
                onClick={() => {
                  navigate("/account");
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
              >
                <Settings className="w-4 h-4" /> Account
              </button>
              {!isHost && (
                <>
                  <button
                    onClick={() => {
                      navigate("/messages");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Messages
                  </button>
                  <button
                    onClick={() => {
                      navigate("/wishlist");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                  >
                    <Heart className="w-4 h-4" /> Wishlist
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  navigate("/help");
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
              >
                <HelpCircle className="w-4 h-4" /> Help Center
              </button>
              {isAuthenticated && (
                <>
                  <div className="border-t border-border" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-medium text-danger hover:bg-danger-subtle transition-colors"
                  >
                    <DoorOpen className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <IconButton
          icon={menuOpen ? X : Menu}
          label="Toggle menu"
          variant="ghost"
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        />
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-border my-2" />

          {!isAuthenticated && (
            <>
              <button
                onClick={() => {
                  navigate("/sign-in");
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate("/sign-up");
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign Up
              </button>
              <div className="border-t border-border my-2" />
            </>
          )}

          <button
            onClick={() => {
              navigate("/account");
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <Settings className="w-4 h-4" /> Account
          </button>
          {!isHost && (
            <>
              <button
                onClick={() => {
                  navigate("/messages");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Messages
              </button>
              <button
                onClick={() => {
                  navigate("/wishlist");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <Heart className="w-4 h-4" /> Wishlist
              </button>
            </>
          )}

          <div className="border-t border-border my-2" />

          <button
            onClick={() => {
              navigate("/help");
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> Help Center
          </button>

          {role === "admin" && (
            <button
              onClick={() => {
                navigate("/admin");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left py-2.5 text-sm font-semibold text-danger"
            >
              <ShieldAlert className="w-4 h-4" /> Admin Panel
            </button>
          )}

          {isAuthenticated && (
            <>
              <div className="border-t border-border my-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left py-2.5 text-sm font-semibold text-danger"
              >
                <DoorOpen className="w-4 h-4" /> Logout
              </button>
            </>
          )}

          <div className="border-t border-border my-2" />

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-control)] bg-bg-secondary text-text-secondary font-medium transition-colors hover:bg-bg-elevated"
          >
            <span className="inline-flex items-center gap-2">
              {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>

          {!isAuthenticated && (
            <Button
              fullWidth
              className="mt-3"
              onClick={() => {
                setHostModalOpen(true);
                setMenuOpen(false);
              }}
            >
              Become A Host
            </Button>
          )}
        </nav>
      )}

      <BecomeHostModal
        isOpen={hostModalOpen}
        onClose={() => setHostModalOpen(false)}
      />
    </header>
  );
}
