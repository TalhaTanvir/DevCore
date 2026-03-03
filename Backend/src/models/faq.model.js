const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
      unique: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 220,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
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

faqSchema.index({ order: 1, createdAt: 1 });

module.exports = {
  Faq: mongoose.model("Faq", faqSchema),
};
