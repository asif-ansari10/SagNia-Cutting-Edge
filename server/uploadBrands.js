import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "./models/Brand.js";
import brands from "./data/brandsSeed.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

async function uploadData() {
  try {
    await Brand.deleteMany({});
    await Brand.insertMany(brands);
    console.log("✅ Brands Uploaded Successfully");
  } catch (err) {
    console.log("❌ Upload Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

uploadData();
