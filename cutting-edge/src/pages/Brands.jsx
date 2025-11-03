import { Link } from "react-router-dom";
import { brandsData } from "../data/brandsData";

export default function Brands() {
  return (
    <section className="min-h-screen bg-richblack text-white px-4 sm:px-6 lg:px-16 pt-32 pb-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold font-semibold">
          Our Brands
        </h2>
        <p className="text-lightgold text-base sm:text-lg mt-3 font-sans max-w-2xl mx-auto px-2">
          Explore our trusted partners known for excellence and innovation.
        </p>
      </div>

      {/* Responsive Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
        {brandsData.map((brand) => (
          <Link
            key={brand.id}
            to={`/brands/${brand.id}`}
            className="bg-softgray/20 border border-softgray hover:border-gold rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center w-full max-w-[200px] transition-all duration-300 hover:scale-105"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-12 sm:h-16 w-auto object-contain mb-3"
            />
            <p className="text-xs sm:text-sm text-lightgold font-semibold text-center">
              {brand.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
