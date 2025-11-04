import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Error connecting to server.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-richblack text-white px-4 sm:px-6 lg:px-16 pt-40 pb-16 flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-serif text-gold font-semibold">
          Contact Us
        </h2>
        <p className="text-lightgold text-lg mt-3 font-sans">
          Have questions? Fill out the form below and our team will get in touch with you soon.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-softgray/20 backdrop-blur-md border border-softgray rounded-2xl shadow-lg w-full max-w-lg p-8"
      >
        <div className="mb-5">
          <label className="block text-lightgold mb-2 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white focus:ring-2 focus:ring-gold"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-5">
          <label className="block text-lightgold mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white focus:ring-2 focus:ring-gold"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-5">
          <label className="block text-lightgold mb-2 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white focus:ring-2 focus:ring-gold"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lightgold mb-2 font-medium">Message</label>
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white focus:ring-2 focus:ring-gold resize-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* ✅ Animated Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-all text-lg 
            ${loading ? "bg-lightgold cursor-not-allowed opacity-70" : "bg-gold hover:bg-lightgold text-black"}`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <span className="loader"></span> Sending...
            </div>
          ) : (
            "Send Message"
          )}
        </button>

        {status && <p className="text-center text-sm text-lightgold mt-4">{status}</p>}
      </form>
    </section>
  );
}
