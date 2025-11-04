import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import CategoryDetail from "./pages/CategoryDetail";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

// Quote Flow Pages
import QuoteStart from "./pages/QuoteStart";       // Step 1: Enter project name
import ProductQuote from "./pages/ProductQuote";   // Step 4: Enter measurements, comments
import FinalQuote from "./pages/FinalQuote";       // Step 5: Review & Submit

export default function App() {
  return (
    <div className="bg-richblack text-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Routes>

          {/* Public Browsing Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandId" element={<BrandDetail />} />
          <Route path="/brands/:brandId/:categoryId" element={<CategoryDetail />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          {/* Quote Guided Flow */}
          <Route path="/quote/start" element={<QuoteStart />} />               {/* Step 1 */}
          <Route path="/quote/brands" element={<Brands />} />                  {/* Step 2 */}
          <Route path="/quote/brands/:brandId" element={<BrandDetail />} />    {/* Step 3 */}
          <Route path="/quote/product/:brandId/:categoryId" element={<ProductQuote />} /> {/* Step 4 */}
          <Route path="/quote/final" element={<FinalQuote />} />               {/* Step 5 */}

        </Routes>
      </main>

      <Footer />
    </div>
  );
}
