import { useEffect, useState } from "react";
import heroBg1 from "../assets/hero-bg-1.png";
import heroBg2 from "../assets/hero-bg-2.webp";
import heroBg3 from "../assets/hero-bg-3.jpg";

export default function HeroSection() {
  const images = [heroBg1, heroBg2, heroBg3];
  const [currentImage, setCurrentImage] = useState(0);
  const [offset, setOffset] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto background loop every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen overflow-hidden flex justify-center items-center text-center px-4 sm:px-6 md:px-10">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            transform: `translateY(${offset * 0.2}px)`,
          }}
        ></div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* Static Text */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-4xl">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gold drop-shadow-lg leading-tight"
          style={{ lineHeight: "1.2" }}
        >
          Cutting Edge Innovation
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-lightgold mt-4 md:mt-6 max-w-2xl font-sans px-2">
          Where precision meets luxury. Experience excellence with SagNia.
        </p>

        <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-gold text-black font-semibold text-sm sm:text-base md:text-lg rounded-xl hover:bg-lightgold transition-all shadow-md">
          Get Quote
        </button>
      </div>
    </section>
  );
}
