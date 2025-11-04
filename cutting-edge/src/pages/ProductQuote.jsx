// import { useParams, useNavigate } from "react-router-dom";
// import { useQuote } from "../context/QuoteContext";
// import { brandsData } from "../data/brandsData";
// import { useState } from "react";

// export default function ProductQuote() {
//   const { brandId, categoryId } = useParams();   // ✅ Get brand + category from URL
//   const { quoteData, setQuoteData } = useQuote();
//   const navigate = useNavigate();

//   // ✅ Always reliable: find brand & category directly from brand data
//   const brand = brandsData.find((b) => b.id === brandId);
//   const category = brand?.categories.find((c) => c.id === categoryId);

//   const [form, setForm] = useState({
//     projectName: quoteData.projectName || "",
//     length: quoteData.length || "",
//     width: quoteData.width || "",
//     thickness: quoteData.thickness || "",
//     comments: quoteData.comments || "",
//   });

//   if (!brand || !category) {
//     return (
//       <section className="min-h-screen flex justify-center items-center text-lightgold text-2xl pt-40">
//         Product Not Found
//       </section>
//     );
//   }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     if (!form.projectName) return alert("Please enter a project name.");

//     setQuoteData({
//       ...quoteData,
//       brand: brand.name,
//       category: category.name,
//       product: category.name,
//       projectName: form.projectName,
//       length: form.length,
//       width: form.width,
//       thickness: form.thickness,
//       comments: form.comments,
//     });

//     navigate("/quote/final");
//   };

//   return (
//     <section className="min-h-screen bg-richblack text-white px-6 sm:px-12 lg:px-20 pt-40 pb-16">

//       {/* Title */}
//       <h1 className="text-4xl font-serif text-gold mb-10 text-center">
//         {category.name}
//       </h1>

//       {/* Product Layout */}
//       <div className="grid md:grid-cols-3 gap-10 items-start">

//         {/* Category Image */}
//         <img
//           src={category.image}
//           alt={category.name}
//           className="w-full rounded-xl shadow-lg object-cover"
//         />

//         {/* Description */}
//         <p className="text-softgray leading-relaxed text-lg">
//           {category.description}
//         </p>

//         {/* Brand Logo */}
//         <div className="flex justify-center items-center">
//           <img
//             src={brand.logo}
//             alt={brand.name}
//             className="h-24 object-contain opacity-90"
//           />
//         </div>

//       </div>

//       {/* Form Box */}
//       <div className="mt-14 max-w-3xl mx-auto bg-softgray/10 border border-softgray p-6 rounded-xl shadow-lg">

//         {/* Project Name */}
//         <label className="text-lightgold font-medium">Project Name</label>
//         <input
//           type="text"
//           name="projectName"
//           value={form.projectName}
//           onChange={handleChange}
//           placeholder="Enter project name"
//           className="w-full mt-2 p-3 rounded bg-softgray/20 border border-softgray focus:outline-none focus:border-gold"
//         />

//         {/* Dimensions */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//           <input
//             type="number"
//             name="length"
//             placeholder="Length (mm)"
//             value={form.length}
//             onChange={handleChange}
//             className="p-3 rounded bg-softgray/20 border border-softgray focus:outline-none focus:border-gold"
//           />
//           <input
//             type="number"
//             name="width"
//             placeholder="Width (mm)"
//             value={form.width}
//             onChange={handleChange}
//             className="p-3 rounded bg-softgray/20 border border-softgray focus:outline-none focus:border-gold"
//           />
//           <input
//             type="number"
//             name="thickness"
//             placeholder="Thickness (mm)"
//             value={form.thickness}
//             onChange={handleChange}
//             className="p-3 rounded bg-softgray/20 border border-softgray focus:outline-none focus:border-gold"
//           />
//         </div>

//         {/* Comments */}
//         <label className="text-lightgold font-medium mt-6 block">Comment (Optional)</label>
//         <textarea
//           name="comments"
//           rows="4"
//           value={form.comments}
//           onChange={handleChange}
//           placeholder="Any additional details..."
//           className="w-full mt-2 p-3 rounded bg-softgray/20 border border-softgray focus:outline-none focus:border-gold resize-none"
//         />

//         {/* Next Button */}
//         <button
//           onClick={handleNext}
//           className="mt-6 w-full bg-gold text-black font-semibold text-lg py-3 rounded-xl hover:bg-lightgold transition-all shadow-lg"
//         >
//           Continue to Final Quote
//         </button>

//       </div>

//     </section>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import { useEffect, useState } from "react";

export default function ProductQuote() {
  const { brandId, categoryId } = useParams();
  const { quoteData, setQuoteData } = useQuote();
  const navigate = useNavigate();

  const [brand, setBrand] = useState(null);

  const [form, setForm] = useState({
    projectName: quoteData.projectName || "",
    length: quoteData.length || "",
    width: quoteData.width || "",
    thickness: quoteData.thickness || "",
    comments: quoteData.comments || "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/brands/${brandId}`)
      .then((res) => res.json())
      .then((data) => setBrand(data))
      .catch(() => setBrand(null));
  }, [brandId]);

  if (!brand)
    return <div className="text-center pt-40 text-lightgold text-xl">Loading...</div>;

  const category = brand.categories.find((c) => c.id === categoryId);
  if (!category)
    return <div className="text-center pt-40 text-lightgold text-xl">Category Not Found</div>;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = () => {
    setQuoteData({
      ...quoteData,
      ...form,
      brand: brand.name,
      category: category.name,
      product: category.name,
    });
    navigate("/quote/final");
  };

  const categoryImg = `http://localhost:5000${category.image}`;
  const brandLogo = `http://localhost:5000${brand.logo}`;

  return (
    <section className="min-h-screen bg-richblack text-white px-6 sm:px-12 lg:px-20 pt-40 pb-20">

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl text-gold font-serif text-center mb-10">
        {category.name}
      </h1>

      {/* Product Display */}
      <div className="grid md:grid-cols-3 gap-12 items-center">

        {/* Category Image */}
        <img
          src={categoryImg}
          alt={category.name}
          className="rounded-xl shadow-xl w-full object-cover border border-softgray"
        />

        {/* Description */}
        <p className="text-softgray text-lg leading-relaxed md:col-span-1">
          {category.description}
        </p>

        {/* Brand Logo */}
        <div className="flex justify-center items-center">
          <img
            src={brandLogo}
            alt={brand.name}
            className="h-28 object-contain opacity-90"
          />
        </div>
      </div>

      {/* Form */}
      <div className="mt-16 max-w-3xl mx-auto bg-softgray/10 border border-softgray p-8 rounded-2xl shadow-lg backdrop-blur-md">

        {/* Project Name */}
        <label className="text-lightgold font-medium text-lg">Project Name</label>
        <input
          type="text"
          name="projectName"
          value={form.projectName}
          onChange={handleChange}
          placeholder="Enter project name"
          className="w-full mt-2 p-3 rounded-lg bg-softgray/20 border border-softgray focus:border-gold outline-none"
        />

        {/* Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {["length", "width", "thickness"].map((field, i) => (
            <input
              key={i}
              type="number"
              name={field}
              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (mm)`}
              value={form[field]}
              onChange={handleChange}
              className="p-3 rounded-lg bg-softgray/20 border border-softgray focus:border-gold outline-none"
            />
          ))}
        </div>

        {/* Comments */}
        <label className="text-lightgold font-medium mt-6 block">Comment (Optional)</label>
        <textarea
          name="comments"
          rows="4"
          value={form.comments}
          onChange={handleChange}
          placeholder="Any additional details..."
          className="w-full mt-2 p-3 rounded-lg bg-softgray/20 border border-softgray focus:border-gold outline-none resize-none"
        />

        {/* Button */}
        <button
          onClick={handleNext}
          className="mt-8 w-full bg-gold text-black font-semibold text-lg py-3 rounded-xl hover:bg-lightgold transition shadow-lg"
        >
          Continue to Final Quote
        </button>

      </div>
    </section>
  );
}
