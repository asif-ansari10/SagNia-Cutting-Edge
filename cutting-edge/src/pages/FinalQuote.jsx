import { useQuote } from "../context/QuoteContext";
import { useState } from "react";

export default function FinalQuote() {
  const { quoteData } = useQuote();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSend = async () => {
  if (!form.name || !form.email || !form.phone) {
    setStatus("❌ Please fill out all contact fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email)) {
    setStatus("❌ Please enter a valid email address.");
    return;
  }

  setLoading(true);
  setStatus("");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/send-quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...quoteData, ...form }),
    });

    const data = await response.json();
    setStatus(data.success ? "✅ Quote Request Sent!" : "❌ Failed to send quote.");
  } catch (error) {
    setStatus("❌ Server error. Try again.");
  }

  setLoading(false);
};



  return (
    <section className="min-h-screen bg-richblack text-white px-6 pt-40 pb-16 max-w-3xl mx-auto">

      <h1 className="text-4xl font-serif text-gold mb-8">Finalize Quote</h1>

      <div className="bg-softgray/10 border border-softgray rounded-xl p-6 space-y-3 text-lightgold">
        <p><b>Project:</b> {quoteData.projectName}</p>
        <p><b>Brand:</b> {quoteData.brand}</p>
        <p><b>Category:</b> {quoteData.category}</p>
        <p><b>Dimensions:</b> {quoteData.length} x {quoteData.width} x {quoteData.thickness} mm</p>
        {quoteData.comments && <p><b>Comments:</b> {quoteData.comments}</p>}
      </div>

      <h2 className="text-2xl text-gold mt-10 mb-4">Your Contact Info</h2>

      <input name="name" onChange={handleChange} placeholder="Your Name"
        className="w-full p-3 rounded bg-softgray/20 border border-softgray mb-4"/>

      <input name="email" onChange={handleChange} placeholder="Email"
        className="w-full p-3 rounded bg-softgray/20 border border-softgray mb-4"/>

      <input name="phone" onChange={handleChange} placeholder="Phone"
        className="w-full p-3 rounded bg-softgray/20 border border-softgray mb-6"/>

      <button
  onClick={handleSend}
  disabled={loading}
  className={`w-full py-3 rounded-xl font-semibold transition-all 
    ${loading ? "bg-lightgold cursor-not-allowed opacity-70" : "bg-gold hover:bg-lightgold text-black"}`}
>
  {loading ? (
    <div className="flex justify-center items-center gap-2">
      <span className="loader"></span> Sending...
    </div>
  ) : (
    "Send Quote"
  )}
</button>


      {status && <p className="text-center mt-4 text-lightgold">{status}</p>}
    </section>
  );
}
