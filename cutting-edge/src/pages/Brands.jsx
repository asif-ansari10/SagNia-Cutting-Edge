import { useQuote } from "../context/QuoteContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Brands() {
  const { setQuoteData } = useQuote();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.log("Error fetching brands:", err));
  }, []);

  return (
    <section className="pt-40 text-white px-6 lg:px-16">
      <h2 className="text-center text-4xl text-gold mb-12 font-serif">Select Brand</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/quote/brands/${brand.id}`}
            onClick={() =>
              setQuoteData((prev) => ({ ...prev, brand: brand.id }))
            }
            className="p-6 border border-softgray rounded-xl hover:border-gold hover:scale-105 transition-all text-center"
          >
            <img
              src={`http://localhost:5000${brand.logo}`}
              className="h-16 mx-auto mb-3 object-contain"
              alt={brand.name}
            />
            <p className="text-lightgold">{brand.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
