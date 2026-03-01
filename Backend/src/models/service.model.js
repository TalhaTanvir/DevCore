const mongoose = require("mongoose");

const ALLOWED_ICONS = ["window", "screen", "tag", "spark"];

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 600,
    },
    icon: {
      type: String,
      required: true,
      enum: ALLOWED_ICONS,
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

serviceSchema.index({ order: 1, createdAt: 1 });

module.exports = {
  Service: mongoose.model("Service", serviceSchema),
  ALLOWED_ICONS,
};
