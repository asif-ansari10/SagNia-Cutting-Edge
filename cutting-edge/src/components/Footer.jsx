import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from "react-icons/fa";
import logo from "../assets/sagnia-logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollOrNavigate = (target) => {
    if (location.pathname === "/") {
      scrollToSection(target);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(target), 400);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 400);
    }
  };

  return (
    <footer className="bg-richblack text-white py-10 px-6 md:px-16 border-t border-softgray">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <img src={logo} alt="SagNia Logo" className="h-16 w-auto mb-4" />
          <p className="text-white text-sm leading-relaxed">
            At <span className="text-gold font-semibold">SagNia Cutting Edge</span>,
            we combine innovation with craftsmanship to deliver premium quality solutions
            for your modern interiors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">

            <li>
              <button
                onClick={handleHomeClick}
                className="text-white hover:text-gold transition-colors duration-300"
              >
                Home
              </button>
            </li>

            <li>
              <button
                onClick={() => handleScrollOrNavigate("edgeBanding")}
                className="text-white hover:text-gold transition-colors duration-300"
              >
                Edge Banding
              </button>
            </li>

            <li>
              <button
                onClick={() => handleScrollOrNavigate("panelCutting")}
                className="text-white hover:text-gold transition-colors duration-300"
              >
                Panel Cutting
              </button>
            </li>

            <li>
              <button
                onClick={() => handleScrollOrNavigate("cncSection")}
                className="text-white hover:text-gold transition-colors duration-300"
              >
                CNC
              </button>
            </li>

            <li>
              <Link
                to="/faqs"
                className="text-white hover:text-gold transition-colors duration-300"
              >
                FAQs
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="text-white hover:text-gold transition-colors duration-300"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-center gap-2">
              <FaPhone className="text-gold" />
              <span>0113 234 0737</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gold" />
              <span>info@sagniaedge.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-softgray/30 hover:bg-gold rounded-full transition-colors duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-softgray/30 hover:bg-gold rounded-full transition-colors duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-softgray/30 hover:bg-gold rounded-full transition-colors duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-softgray pt-5 text-center text-softgray text-sm">
        © {new Date().getFullYear()} <span className="text-gold font-semibold">SagNia Cutting Edge</span>. All rights reserved.
      </div>
    </footer>
  );
}
