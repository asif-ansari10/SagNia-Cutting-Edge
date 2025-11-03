import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import CategoryDetail from "./pages/CategoryDetail";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";


export default function App() {
  return (
    <div className="bg-richblack text-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandId" element={<BrandDetail />} />
          <Route path="/brands/:brandId/:categoryId" element={<CategoryDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
