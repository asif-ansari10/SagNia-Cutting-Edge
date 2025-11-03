import edgeImg from "../assets/edge-banding.png";

export default function EdgeBanding() {
  return (
    <section
      id="edgeBanding"
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-10"
    >
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl text-gold font-serif mb-4">
          Edge Banding
        </h2>
        <p className="text-lightgold mb-6 leading-relaxed">
          With our outstanding facilities, we offer edge banding on boards from
          8mm–50mm using veneer, ABS, and paper edging. For intricate projects,
          we also provide hand-machined edging using Festool machines for curves
          and internals.
        </p>
        <button className="bg-gold text-black font-semibold px-6 py-3 rounded-lg hover:bg-lightgold transition-all">
          Get Online Quote
        </button>
      </div>
      <img
        src={edgeImg}
        alt="Edge Banding"
        className="md:w-1/2 rounded-xl shadow-lg object-cover"
      />
    </section>
  );
}
