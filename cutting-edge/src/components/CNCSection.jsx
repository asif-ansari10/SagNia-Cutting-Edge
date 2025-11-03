import cncImg from "../assets/cnc-machine.png";

export default function CNCSection() {
  return (
    <section
      id="cncSection"
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-10"
    >
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl text-gold font-serif mb-4">CNC</h2>
        <p className="text-lightgold mb-6 leading-relaxed">
          Using our advanced CNC machinery, we can machine your custom designs,
          logos, or kitchen units with absolute precision. Perfect for both
          simple and complex projects.
        </p>
        <button className="bg-gold text-black font-semibold px-6 py-3 rounded-lg hover:bg-lightgold transition-all">
          Get Online Quote
        </button>
      </div>
      <img
        src={cncImg}
        alt="CNC Machine"
        className="md:w-1/2 rounded-xl shadow-lg object-cover"
      />
    </section>
  );
}
