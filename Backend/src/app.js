const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serviceRoutes = require("./routes/service.routes");
const adminRoutes = require("./routes/admin.routes");
const workRoutes = require("./routes/work.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const faqRoutes = require("./routes/faq.routes");
const cloudinaryRoutes = require("./routes/cloudinary.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();
app.set("trust proxy", 1);

const frontendOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    // Allow non-browser clients (no Origin header).
    if (!origin) {
      return callback(null, true);
    }

    if (frontendOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS origin not allowed"));
  },
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/work", workRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/contact", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
