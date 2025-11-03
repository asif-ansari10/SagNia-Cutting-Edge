import './App.css'

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import CategoryDetail from "./pages/CategoryDetail";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-richblack text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:brandId" element={<BrandDetail />} />
        <Route path="/brands/:brandId/:categoryId" element={<CategoryDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
