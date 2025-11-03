import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/sagnia-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Shrink effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollTo = (position) => {
    window.scrollTo({ top: position, behavior: "smooth" });
  };

  // Scroll to specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Handle navigation or scroll
  const handleScrollLink = (id) => {
    setOpen(false);

    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(id), 400);
    }
  };

  // Handle Home button
  const handleHomeClick = () => {
    setOpen(false);

    if (location.pathname === "/") {
      // Already on homepage → scroll to top smoothly
      scrollTo(0);
    } else {
      // Navigate home → then scroll to top
      navigate("/");
      setTimeout(() => scrollTo(0), 400);
    }
  };

  const links = [
    { name: "HOME", type: "home" },
    { name: "BRANDS", type: "route", path: "/brands" },
    { name: "EDGE BANDING", type: "scroll", target: "edgeBanding" },
    { name: "PANEL CUTTING", type: "scroll", target: "panelCutting" },
    { name: "CNC", type: "scroll", target: "cncSection" },
    { name: "FAQ's", type: "route", path: "#" },
    { name: "CONTACT", type: "route", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-richblack/95 shadow-lg py-3" : "bg-richblack py-6"
      }`}
    >
      {/* Top contact bar */}
      <div
        className={`text-center text-lightgold text-sm transition-all duration-500 ${
          scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 py-2"
        }`}
      >
        Call us today:{" "}
        <span className="text-gold font-medium">0113 234 0737</span>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16">
        {/* Logo */}
        <div
          className={`flex items-center transition-all duration-500 ${
            scrolled ? "scale-75" : "scale-100"
          }`}
        >
          <Link to="/" onClick={() => handleHomeClick()}>
            <img
              src={logo}
              alt="SagNia Logo"
              className="h-16 md:h-20 w-auto transition-all duration-500 cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          {links.map((link) => (
            <li key={link.name}>
              {link.type === "route" ? (
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`transition-colors duration-300 relative after:block after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                    location.pathname === link.path
                      ? "text-gold after:w-full"
                      : "text-white hover:text-gold"
                  }`}
                >
                  {link.name}
                </Link>
              ) : link.type === "scroll" ? (
                <button
                  onClick={() => handleScrollLink(link.target)}
                  className="text-white hover:text-gold transition-colors duration-300 relative after:block after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </button>
              ) : (
                <button
                  onClick={handleHomeClick}
                  className="text-white hover:text-gold transition-colors duration-300 relative after:block after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  HOME
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <button className="hidden md:block bg-gold text-black px-5 py-2 rounded-md font-semibold hover:bg-lightgold transition-all">
          Login
        </button>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-gold text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-richblack border-t border-softgray text-center mt-2 pb-4">
          {links.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`block py-3 text-lightgold hover:text-gold transition-colors ${
                  location.pathname === link.path ? "text-gold" : ""
                }`}
              >
                {link.name}
              </Link>
            ) : link.type === "scroll" ? (
              <button
                key={link.name}
                onClick={() => handleScrollLink(link.target)}
                className="block w-full py-3 text-lightgold hover:text-gold transition-colors"
              >
                {link.name}
              </button>
            ) : (
              <button
                key="HOME"
                onClick={handleHomeClick}
                className="block w-full py-3 text-lightgold hover:text-gold transition-colors"
              >
                HOME
              </button>
            )
          )}
          <button className="bg-gold text-black w-11/12 mx-auto mt-4 py-2 rounded-md font-semibold hover:bg-lightgold transition-all">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
