import { Link, useLocation } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    if (path === "/street" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;

    return false;
  };

  const navigationLinks = [
    { name: "street", to: "/street" },
    { name: "music", to: "/music" },
    { name: "events", to: "/events" },
    { name: "about", to: "/about" },
    { name: "contact", to: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-300 text-center md:text-left">
            © 2025 Paul Taylor
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-sm transition-colors duration-200 hover:text-white ${
                  isActiveLink(link.to) ? "text-white" : "text-gray-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
