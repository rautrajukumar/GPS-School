import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSchool, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Navigation links array for convenience
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/academics", label: "Academics" },
    { to: "/admissions", label: "Admissions" },
    { to: "/gallery", label: "Gallery" },
    { to: "/events-news", label: "Events & News" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-green-700 font-bold text-lg">
          <FaSchool className="text-primary text-2xl" />
          <span className="whitespace-nowrap">Gaushala Public School</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `whitespace-nowrap font-medium text-gray-700 hover:text-secondary transition ${
                  isActive ? "text-secondary font-bold" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded focus:outline-none focus:ring"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block font-medium text-gray-700 hover:text-secondary transition ${
                    isActive ? "text-secondary font-bold" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
