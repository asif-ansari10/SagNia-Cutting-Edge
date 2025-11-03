import { useParams, Link } from "react-router-dom";
import { brandsData } from "../data/brandsData";

export default function BrandDetail() {
  const { brandId } = useParams();
  const brand = brandsData.find((b) => b.id === brandId);

  if (!brand)
    return (
      <div className="text-center py-20 text-lightgold">
        Brand not found.
      </div>
    );

  return (
    <section className="min-h-screen bg-richblack text-white px-4 sm:px-6 lg:px-16 pt-40 pb-16">
    {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold mb-4">
          {brand.name}
        </h1>
        <p className="text-lightgold text-base sm:text-lg max-w-3xl mx-auto">
          {brand.description}
        </p>
      </div>

      {/* Banner */}
      <img
        src={brand.banner}
        alt={`${brand.name} banner`}
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover rounded-xl mb-12 shadow-lg"
      />

      {/* Categories Section */}
      <h2 className="text-2xl sm:text-3xl font-serif text-gold mb-8 text-center">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {brand.categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-softgray/20 border border-softgray hover:border-gold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 sm:h-56 md:h-64 object-cover"
            />
            <div className="p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-semibold text-lightgold mb-2">
                {cat.name}
              </h3>
              <p className="text-softgray text-sm mb-4 line-clamp-3">
                {cat.description}
              </p>
              <Link
                to={`/brands/${brand.id}/${cat.id}`}
                className="inline-block bg-gold text-black font-semibold text-sm sm:text-base px-4 sm:px-5 py-2 rounded-lg hover:bg-lightgold transition-all"
              >
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
