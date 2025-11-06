import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import brandRoutes from "./routes/brandRoutes.js";

dotenv.config();

// Fix "__dirname" in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ CORS (very important)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sag-nia-cutting-edge.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Allow preflight
app.options("*", cors());

app.use(express.json());

// ✅ Serve image files from /uploads (for brands/categories)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// ✅ Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CLIENT_EMAIL,
    pass: process.env.CLIENT_APP_PASSWORD,
  },
});

// ✅ CONTACT FORM API
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

// ✅ QUOTE REQUEST API
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

// ✅ GET Brands/Categories from DB
app.use("/api/brands", brandRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port: ${PORT}`)
);
