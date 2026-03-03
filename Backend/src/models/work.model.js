const mongoose = require("mongoose");

const workItemSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 160,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 700,
    },
    fallback: {
      type: String,
      required: true,
      trim: true,
      match: /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/,
    },
    image: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1200,
    },
    imagePublicId: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
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

workItemSchema.index({ order: 1, createdAt: 1 });

module.exports = {
  WorkItem: mongoose.model("WorkItem", workItemSchema),
};
