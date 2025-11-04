// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const app = express();
// app.use(cors());
// app.use(express.json());

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.CLIENT_EMAIL,
//     pass: process.env.CLIENT_APP_PASSWORD
//   }
// });

// app.post("/send-contact", async (req, res) => {
//   const { name, email, phone, message } = req.body;

//   try {
//     await transporter.sendMail({
//       from: `"SagNia Website Contact" <${process.env.CLIENT_EMAIL}>`,
//       to: process.env.CLIENT_EMAIL,
//       subject: `Query Message from ${name}`,
//       text: `
// SagNia Contact Query Message:

// Name: ${name}
// Email: ${email}
// Phone: ${phone}

// Message:
// ${message}
// `,
//     });

//     res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false });
//   }
// });


// app.post("/send-quote", async (req, res) => {
//   const data = req.body;

//   const message = `
// 🪚 New Quote Request 🪚

// Project Name: ${data.projectName}

// --- CUSTOMER INFO ---
// Name: ${data.name}
// Email: ${data.email}
// Phone: ${data.phone}

// --- SELECTION ---
// Brand: ${data.brand}
// Category: ${data.category}

// --- MEASUREMENTS ---
// Length: ${data.length} mm
// Width: ${data.width} mm
// Thickness: ${data.thickness} mm
// `;

//   try {
//     await transporter.sendMail({
//       from: `"SagNia Cutting Edge" <${process.env.CLIENT_EMAIL}>`,
//       to: process.env.CLIENT_EMAIL,
//       subject: `New Quote Request: ${data.projectName}`,
//       text: message,
//     });

//     res.json({ success: true, message: "Quote sent successfully!" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// });

// app.listen(5000, () =>
//   console.log("✅ Server running on http://localhost:5000")
// );

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import brandRoutes from "./routes/brandRoutes.js"; // API Routes for DB brands/categories

dotenv.config();

// Required to fix "__dirname" in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve local uploaded images (logos & category images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ CONNECT MONGODB ATLAS
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err.message));

// ✅ Email Transporter
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
      subject: `Query Message from ${name}`,
      text: `
SagNia Contact Query Message:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

// ✅ QUOTE REQUEST FORM API
app.post("/send-quote", async (req, res) => {
  const data = req.body;

  const message = `
🪚 New Quote Request 🪚

Project Name: ${data.projectName}

--- CUSTOMER INFO ---
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

--- SELECTION ---
Brand: ${data.brand}
Category: ${data.category}

--- MEASUREMENTS ---
Length: ${data.length} mm
Width: ${data.width} mm
Thickness: ${data.thickness} mm

${data.comments ? `--- COMMENTS ---\n${data.comments}` : ""}
`;

  try {
    await transporter.sendMail({
      from: `"SagNia Cutting Edge" <${process.env.CLIENT_EMAIL}>`,
      to: process.env.CLIENT_EMAIL,
      subject: `New Quote Request: ${data.projectName}`,
      text: message,
    });

    res.json({ success: true, message: "Quote sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// ✅ BRAND & CATEGORY FETCH ROUTES
app.use("/api/brands", brandRoutes);

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
