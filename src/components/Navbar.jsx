import { useState } from "react";
import { Menu, X, Instagram, Twitter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  //check if link is active for border-bottom styling
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
    <nav aria-label="Header Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-3xl text-gray-800">
              PAUL TAYLOR
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-gray-700 py-2 font-medium
                ${isActiveLink(link.to) ? "border-b-[2px]" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Social Icons*/}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              className="text-gray-600"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              className="text-gray-600"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {/* Mobile Navigation Links */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-gray-700 block px-3 py-2 text-base font-medium"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Social Icons */}
              <div className="flex items-center justify-center space-x-6 pt-4 pb-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-600"
                  aria-label="Instagram"
                  onClick={closeMenu}
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-600"
                  aria-label="Twitter"
                  onClick={closeMenu}
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
