const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1200,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1200,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

testimonialSchema.index({ order: 1, createdAt: 1 });

module.exports = {
  Testimonial: mongoose.model("Testimonial", testimonialSchema),
};
