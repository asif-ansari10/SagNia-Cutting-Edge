import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from "react-icons/fa";
import logo from "../assets/sagnia-logo.png";

export default function Footer() {
  return (
    <footer className="bg-richblack text-white py-10 px-6 md:px-16 border-t border-softgray">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <img src={logo} alt="SagNia Logo" className="h-16 w-auto mb-4" />
          <p className="text-softgray text-sm leading-relaxed">
            At <span className="text-gold font-semibold">SagNia Cutting Edge</span>, we combine innovation with craftsmanship to deliver premium quality solutions for your modern interiors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Edge Banding", "Panel Cutting", "CNC", "FAQs", "Contact"].map((item, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  className="hover:text-gold transition-colors duration-300 text-softgray"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-softgray">
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

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-softgray pt-5 text-center text-softgray text-sm">
        © {new Date().getFullYear()} <span className="text-gold font-semibold">SagNia Cutting Edge</span>. All rights reserved.
      </div>
    </footer>
  );
}
