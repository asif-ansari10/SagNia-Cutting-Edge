import { useQuote } from "../context/QuoteContext";
import { useNavigate } from "react-router-dom";

export default function QuoteStart() {
  const { quoteData, setQuoteData } = useQuote();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!quoteData.projectName.trim()) return alert("Enter project name");
    navigate("/quote/brands");
  };

  return (
    <section className="min-h-screen pt-40 text-white text-center">
      <h1 className="text-4xl font-serif text-gold">Start Your Quote</h1>

      <input
        type="text"
        value={quoteData.projectName}
        onChange={(e) => setQuoteData({ ...quoteData, projectName: e.target.value })}
        placeholder="Enter Project Name"
        className="mt-6 p-3 bg-softgray/40 rounded-lg border border-softgray w-80 text-center"
      />

      <button
        onClick={handleNext}
        className="block mx-auto mt-6 bg-gold text-black px-6 py-3 rounded-xl hover:bg-lightgold"
      >
        Next
      </button>
    </section>
  );
}
