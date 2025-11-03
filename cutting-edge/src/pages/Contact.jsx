import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // 🔹 Replace this URL later with your backend API endpoint
      const response = await fetch("http://localhost:5000/send", {
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
  };

  return (
<section className="min-h-screen bg-richblack text-white px-4 sm:px-6 lg:px-16 pt-32 pb-16 flex flex-col items-center justify-center">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-serif text-gold font-semibold">
          Contact Us
        </h2>
        <p className="text-lightgold text-lg mt-3 font-sans">
          Have questions? Fill out the form below and our team will get in touch with you soon.
        </p>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-softgray/20 backdrop-blur-md border border-softgray rounded-2xl shadow-lg w-full max-w-lg p-8"
      >
        {/* Name */}
        <div className="mb-5">
          <label className="block text-lightgold mb-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-lightgold mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label className="block text-lightgold mb-2 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-lightgold mb-2 font-medium">
            Message / Reason
          </label>
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-softgray/40 border border-softgray text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gold text-black font-semibold py-3 rounded-xl hover:bg-lightgold transition-all text-lg"
        >
          Send Message
        </button>

        {status && (
          <p className="text-center text-sm text-lightgold mt-4">{status}</p>
        )}
      </form>

      {/* Contact Info */}
      <div className="mt-10 text-center text-softgray text-sm">
        <p>
          Or reach us directly at{" "}
          <span className="text-gold font-semibold">info@sagniaedge.com</span>
        </p>
        <p className="mt-1">
          Call us at{" "}
          <span className="text-gold font-semibold">0113 234 0737</span>
        </p>
      </div>
    </section>
  );
}
