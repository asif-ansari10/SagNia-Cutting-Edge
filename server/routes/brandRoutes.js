import express from "express";
import Brand from "../models/Brand.js";

const router = express.Router();

// Get all brands
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find().select("id name logo");
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Get single brand
router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findOne({ id: req.params.id }); // ✅ match our custom id
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
