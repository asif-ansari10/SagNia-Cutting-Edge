import { useParams } from "react-router-dom";
import { brandsData } from "../data/brandsData";

export default function CategoryDetail() {
  const { brandId, categoryId } = useParams();
  const brand = brandsData.find((b) => b.id === brandId);
  const category = brand?.categories.find((c) => c.id === categoryId);

  if (!brand || !category)
    return (
      <div className="text-center py-20 text-lightgold">
        Category not found.
      </div>
    );

  return (
    <section className="min-h-screen bg-richblack text-white px-4 sm:px-6 lg:px-16 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gold mb-4">
          {category.name}
        </h1>
        <p className="text-lightgold text-base sm:text-lg max-w-3xl mx-auto">
          {category.description}
        </p>
      </div>

      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover rounded-xl shadow-lg mb-10"
      />

      {/* CTA */}
      <div className="text-center">
        <a
          href="#"
          className="bg-gold text-black text-sm sm:text-base px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-lightgold transition-all"
        >
          Enquire About This Product
        </a>
      </div>
    </section>
  );
}
