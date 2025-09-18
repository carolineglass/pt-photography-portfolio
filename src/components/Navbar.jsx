import { useState } from "react";
import { RiMenuLine, RiCloseLine, RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useCategories } from "../hooks/usePhotos";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { categories, loading: categoriesLoading } = useCategories();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  //get first category slug for default link
  const firstCategory =
    categories.length > 0 ? `/${categories[0].slug.current}` : null;

  //check if link is active for border-bottom styling
  const isActiveLink = (path) => {
    if (firstCategory && path === firstCategory && location.pathname === "/")
      return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;

    return false;
  };

  //create navigation links array from categories with about and contact links
  const navigationLinks = !categoriesLoading
    ? [
        ...categories.map((cat) => ({
          name: cat.title,
          to: `/${cat.slug.current}`,
        })),
        { name: "about", to: "/about" },
        { name: "contact", to: "/contact" },
      ]
    : [];

  return (
    <nav aria-label="Header Navigation">
      <div className="flex flex-wrap px-4 sm:px-6 lg:px-12 py-8">
        <div className="flex items-center h-16 grow shrink-0 basis-[67%]">
          {/* Logo Section */}
          <div className="flex grow shrink md:basis-[33%] items-center">
            <Link
              to="/"
              onClick={() => {
                const isMobile =
                  !window.matchMedia("(min-width: 768px)").matches;
                if (isMobile && isMenuOpen) {
                  closeMenu();
                }
              }}
              className="lg:text-3xl text-2xl text-gray-800 font-didot"
            >
              PAUL TAYLOR
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex lg:text-base text-sm items-center grow shrink basis-[34%] justify-center">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-gray-700 py-1 font-medium flex mx-[0.5vw]
                ${isActiveLink(link.to) ? "border-b-[2px]" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden justify-end">
            <button
              onClick={toggleMenu}
              className="text-gray-700 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <RiCloseLine className="h-6 w-6" />
              ) : (
                <RiMenuLine className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden flex basis-full justify-center">
            <div className="w-full text-center px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
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
                  href="https://instagram.com/thisispaultaylor"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-600"
                  aria-label="Instagram"
                  onClick={closeMenu}
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a
                  href="https://x.com/paultaylor__"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-600"
                  aria-label="X (formerly Twitter)"
                  onClick={closeMenu}
                >
                  <RiTwitterXLine className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Social Icons*/}
        <div className="hidden md:flex items-center space-x-4 grow shrink-0 basis-[33%] justify-end">
          <a
            href="https://instagram.com/thisispaultaylor"
            target="_blank"
            rel="noopener"
            className="text-gray-600"
            aria-label="Instagram"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/paultaylor__"
            target="_blank"
            rel="noopener"
            className="text-gray-600"
            aria-label="X (formerly Twitter)"
          >
            <RiTwitterXLine className="h-6 w-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
