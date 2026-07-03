import { Link } from "react-router-dom";
import Logo from "./common/Logo";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "Contact Us", to: "/help" },
      { label: "Rental Guide", to: "/rental-guide" },
    ],
  },
  {
    title: "Help Center",
    links: [
      { label: "Find a Property", to: "/rooms" },
      { label: "How To Host?", to: "/hosting" },
      { label: "FAQs", to: "/how-it-works" },
      { label: "Report an Issue", to: "/help" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-bg-secondary border-t border-border py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <Logo className="w-8 h-8" />
              <span className="font-display font-bold text-lg text-text-primary">
                Aathiti Aagaman
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Find your next stay or list your own property — Aathiti Aagaman
              connects hosts and guests across Nepal.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm tracking-wide uppercase text-text-primary mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-secondary hover:text-primary transition-colors duration-[var(--duration-fast)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase text-text-primary mb-5">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-text-secondary">
                <span className="text-text-muted">Phone: </span>
                <a
                  href="tel:+977 9865004688"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  +977 9865004688
                </a>
              </li>
              <li className="text-text-secondary">
                <span className="text-text-muted">Email: </span>
                <a
                  href="mailto:aadityaacharya156@gmail.com"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  aadityaacharya156@gmail.com
                </a>
              </li>
              <li className="text-text-secondary">
                <span className="text-text-muted">Location: </span>
                Bharatpur-10, Chitwan, Nepal
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-xs text-text-muted text-center md:text-left">
            © 2026 Aathiti Aagaman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
