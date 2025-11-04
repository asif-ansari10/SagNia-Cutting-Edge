import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryDetail() {
  const { brandId, categoryId } = useParams();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/brands/${brandId}`)
      .then((res) => res.json())
      .then((data) => setBrand(data))
      .catch(() => setBrand(null));
  }, [brandId]);

  if (!brand)
    return <div className="text-center pt-40 text-lightgold">Loading...</div>;

  const category = brand.categories.find((c) => c.id === categoryId);

  if (!category)
    return <div className="text-center pt-40 text-lightgold">Category Not Found</div>;

  const API = import.meta.env.VITE_API_BASE_URL;
  const categoryImg = `${API}${category.image}`;
  const brandLogo = `${API}${brand.logo}`;

  return (
    <section className="pt-40 px-6 lg:px-16 text-white pb-20">
      <h1 className="text-center text-4xl md:text-5xl text-gold font-serif mb-6">
        {category.name}
      </h1>

      <img
        src={categoryImg}
        alt={category.name}
        className="w-full h-[260px] sm:h-[350px] object-cover rounded-xl mb-10 shadow-lg border border-softgray"
      />

      <p className="text-softgray text-lg max-w-3xl mx-auto text-center leading-relaxed mb-10">
        {category.description}
      </p>

      <div className="flex justify-center">
        <img src={brandLogo} alt={brand.name} className="h-28 object-contain opacity-80" />
      </div>
    </section>
  );
}
