import panelImg from "../assets/panel-cutting.png";
import { Link } from "react-router-dom";


export default function PanelCutting() {
  return (
    <section
      id="panelCutting"
      className="flex flex-col md:flex-row-reverse items-center justify-between px-6 md:px-16 py-20 gap-10"
    >
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl text-gold font-serif mb-4">
          Panel Cutting
        </h2>
        <p className="text-lightgold mb-6 leading-relaxed">
          We offer a cutting service for MFC, MDF, and solid surfaces. Use our
          instant quote calculator for quick pricing. Whether one piece or
          twenty, all cuts are handled with precision.
        </p>
        <Link to="/quote/start">
        <button className="bg-gold text-black font-semibold px-6 py-3 rounded-lg hover:bg-lightgold transition-all">
          Get Online Quote
        </button>
        </Link>
      </div>
      <img
        src={panelImg}
        alt="Panel Cutting"
        className="md:w-1/2 rounded-xl shadow-lg object-cover"
      />
    </section>
  );
}
