import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuote } from "../context/QuoteContext";

export default function BrandDetail() {
  const { brandId } = useParams();
  const { setQuoteData } = useQuote();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/brands/${brandId}`)
      .then(res => res.json())
      .then(data => setBrand(data));
  }, [brandId]);

  if (!brand)
    return <div className="text-center pt-40 text-lightgold">Loading...</div>;

  return (
    <section className="pt-40 px-6 lg:px-16 text-white pb-16">

      <h1 className="text-center text-4xl md:text-5xl text-gold font-serif mb-6">{brand.name}</h1>
      <p className="text-center text-lightgold max-w-3xl mx-auto">{brand.description}</p>

      <img
  src={`http://localhost:5000${brand.banner}`}
  className="w-full rounded-xl shadow-lg my-12"
  alt={brand.name}
/>


      <h2 className="text-center text-3xl text-gold font-serif mb-8">Categories</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {brand.categories.map((cat) => (
          <div key={cat.id} className="border border-softgray bg-softgray/10 rounded-xl hover:border-gold transition p-4">
            <img
  src={`http://localhost:5000${cat.image}`}
  className="w-full h-56 object-cover rounded-md mb-4"
  alt={cat.name}
/>

            <h3 className="text-lightgold text-xl font-semibold mb-2">{cat.name}</h3>
            <p className="text-softgray text-sm mb-4">{cat.description}</p>

            <Link
              to={`/quote/product/${brand.id}/${cat.id}`}
              onClick={() => setQuoteData(prev => ({ ...prev, brand: brand.name, category: cat.name }))}
              className="inline-block bg-gold text-black px-5 py-2 rounded-lg hover:bg-lightgold transition"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
