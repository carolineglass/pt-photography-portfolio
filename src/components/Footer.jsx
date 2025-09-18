import { Link, useLocation } from "react-router-dom";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { useCategories } from "../hooks/usePhotos";

const Footer = () => {
  const location = useLocation();
  const { categories, loading: categoriesLoading } = useCategories();

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
    <footer>
      <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex flex-wrap items-center grow shrink-0 basis-[67%] mb-6 md:mb-0">
            {/* Copyright */}
            <div className="text-sm text-center mb-6 flex grow shrink basis-full items-center justify-center md:mb-0 md:text-left md:basis-[33%] md:justify-start">
              © 2025 Paul Taylor
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-6 grow shrink basis-[34%]">
              <a
                href="https://instagram.com/thisispaultaylor"
                target="_blank"
                rel="noopener"
                className="transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/paultaylor__"
                target="_blank"
                rel="noopener"
                className="transition-colors duration-200"
                aria-label="X (formerly Twitter)"
              >
                <RiTwitterXLine className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 grow shrink-0 basis-[33%] md:justify-end"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-sm transition-colors duration-200 ${
                  isActiveLink(link.to) ? "text-gray-400" : ""
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
