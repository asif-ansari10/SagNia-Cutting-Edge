import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/sagnia-logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect scroll for shrinking effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar links
  const links = [
    { name: "HOME", path: "/" },
    { name: "BRANDS", path: "/brands" },
    { name: "EDGE BANDING", path: "#" },
    { name: "PANEL CUTTING", path: "#" },
    { name: "CNC", path: "#" },
    { name: "FAQ's", path: "#" },
    { name: "CONTACT", path: "/contact" },
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

      {/* Main Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16">
        {/* Logo */}
        <div
          className={`flex items-center transition-all duration-500 ${
            scrolled ? "scale-75" : "scale-100"
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="SagNia Logo"
              className="h-16 md:h-20 w-auto transition-all duration-500"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setOpen(false)}
                className={`transition-colors duration-300 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  location.pathname === link.path
                    ? "text-gold after:w-full"
                    : "text-white hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
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

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-richblack border-t border-softgray text-center mt-2 pb-4">
          {links.map((link) => (
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
          ))}
          <button className="bg-gold text-black w-11/12 mx-auto mt-4 py-2 rounded-md font-semibold hover:bg-lightgold transition-all">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
