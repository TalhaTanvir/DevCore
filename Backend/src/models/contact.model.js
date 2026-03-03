const mongoose = require("mongoose");

const contactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 200,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 30,
      match: /^[0-9]+$/,
    },
    need: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    interests: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

contactInquirySchema.index({ status: 1, createdAt: -1 });

module.exports = {
  ContactInquiry: mongoose.model("ContactInquiry", contactInquirySchema),
};

