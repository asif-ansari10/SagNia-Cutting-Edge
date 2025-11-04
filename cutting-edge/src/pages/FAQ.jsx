import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How much do you charge per cut?", a: "Cutting prices vary based on material type and cut length. Contact us for exact pricing." },
    { q: "Can you edge the board in a different colour?", a: "Yes, we offer multiple edging colour & finish options to match your board." },
    { q: "Can you make units as well?", a: "Yes, we can produce fully assembled units depending on your project needs." },
    { q: "Do you supply any other boards other than those listed?", a: "Yes, we have access to a wide range of suppliers. Let us know your requirement." },
    { q: "Can we collect the boards from the factory?", a: "Yes, collection is available once your order is ready." },
    { q: "Do you accept cash payments?", a: "We accept bank transfer, card payments, and invoicing. Cash availability may vary — please ask." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-richblack text-white px-4 sm:px-6 lg:px-16 pt-40 pb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-gold font-semibold">
          FAQ's
        </h2>
        <p className="text-lightgold text-lg mt-3 font-sans max-w-2xl mx-auto">
          Common questions about our services and process.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-softgray bg-softgray/10 rounded-xl overflow-hidden hover:border-gold transition-all"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-[#e7d37f] hover:text-gold font-medium"
            >
              <span className="font-medium text-lg">{item.q}</span>
              <span className="text-gold text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-5 pb-4 text-[#bfbfbf] text-base border-t border-softgray/40 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
