import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import brandRoutes from "./routes/brandRoutes.js";

dotenv.config();

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://sag-nia-cutting-edge.vercel.app",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow same-origin / curl / server-to-server (no origin header)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Express v5: DON'T use "*". Use a regex for preflight.
app.options(/.*/, cors());

app.use(express.json());

// Static files (logos, banners, categories)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// Mailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CLIENT_EMAIL,
    pass: process.env.CLIENT_APP_PASSWORD,
  },
});

// Contact API
app.post("/send-contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"SagNia Website Contact" <${process.env.CLIENT_EMAIL}>`,
      to: process.env.CLIENT_EMAIL,
      subject: `New Contact Submission from ${name}`,
      text: `
SagNia Contact Request:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.log("❌ Contact Email Error:", error);
    res.status(500).json({ success: false });
  }
});

// Quote API
app.post("/send-quote", async (req, res) => {
  const data = req.body;

  const message = `
🪚 New Quote Request Received 🪚

Project Name: ${data.projectName}

-- Customer Info --
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

-- Product Selection --
Brand: ${data.brand}
Category: ${data.category}

-- Measurements --
Length: ${data.length} mm
Width: ${data.width} mm
Thickness: ${data.thickness} mm

${data.comments ? `Additional Comments:\n${data.comments}` : ""}
`;

  try {
    await transporter.sendMail({
      from: `"SagNia Cutting Edge" <${process.env.CLIENT_EMAIL}>`,
      to: process.env.CLIENT_EMAIL,
      subject: `Quote Request - ${data.projectName}`,
      text: message,
    });

    res.json({ success: true, message: "Quote sent successfully!" });
  } catch (error) {
    console.log("❌ Quote Email Error:", error);
    res.status(500).json({ success: false, message: "Failed to send quote" });
  }
});

// Brands API
app.use("/api/brands", brandRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
