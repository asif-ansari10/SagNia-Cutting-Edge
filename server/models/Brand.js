import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: String,             // keep consistent with frontend IDs (e.g., "poplar")
  name: String,
  image: String,          // store like "/assets/brands/allin/poplar.png"
  description: String,
});

const BrandSchema = new mongoose.Schema({
  id: String,             // match URLs (e.g., "allin-le-vanneau")
  name: String,
  logo: String,           // example "/assets/brands/logos/allin.png"
  banner: String,         // example "/assets/brands/banners/allin-banner.png"
  description: String,
  categories: [CategorySchema],
});

export default mongoose.model("Brand", BrandSchema);
