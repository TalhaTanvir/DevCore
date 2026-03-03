const mongoose = require("mongoose");
const { Testimonial } = require("../models/testimonial.model");

const defaultTestimonialsSeed = [
  {
    quote:
      "I recently engaged in a website development project with an outstanding team, and the results were nothing short of exceptional. The team exhibited an exemplary level of professionalism, expertise, and dedication throughout the entire process.",
    name: "Joe Glodberg",
    role: "CEO",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    order: 1,
  },
  {
    quote:
      "Their design and engineering workflow was clear from day one. Every milestone was delivered on time, and our product now feels faster, cleaner, and more aligned with our customers.",
    name: "Emily Carter",
    role: "Product Lead",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
    order: 2,
  },
  {
    quote:
      "We trusted them with a full rebuild and got a measurable jump in conversion rates within weeks. Communication stayed sharp, decisions were data-backed, and execution was consistently excellent.",
    name: "Michael Ross",
    role: "Founder",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    order: 3,
  },
];

const sortByOrder = (items) => {
  return [...items].sort((a, b) => a.order - b.order);
};

const seedDefaultsIfEmpty = async () => {
  const count = await Testimonial.estimatedDocumentCount();

  if (count === 0) {
    await Testimonial.insertMany(defaultTestimonialsSeed);
  }
};

const listActiveTestimonials = async () => {
  if (mongoose.connection.readyState !== 1) {
    return sortByOrder(defaultTestimonialsSeed);
  }

  await seedDefaultsIfEmpty();

  return Testimonial.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .select("quote name role avatar order")
    .lean();
};

const ensureDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Database is not connected");
    error.statusCode = 503;
    throw error;
  }
};

const listAllTestimonials = async () => {
  ensureDatabaseConnected();

  return Testimonial.find({})
    .sort({ order: 1, createdAt: 1 })
    .lean();
};

const getTestimonialById = async (testimonialId) => {
  ensureDatabaseConnected();

  return Testimonial.findById(testimonialId).lean();
};

const createTestimonial = async (payload) => {
  ensureDatabaseConnected();

  const createdTestimonial = await Testimonial.create(payload);
  return createdTestimonial.toObject();
};

const updateTestimonial = async (testimonialId, payload) => {
  ensureDatabaseConnected();

  return Testimonial.findByIdAndUpdate(testimonialId, payload, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteTestimonial = async (testimonialId) => {
  ensureDatabaseConnected();

  return Testimonial.findByIdAndDelete(testimonialId).lean();
};

module.exports = {
  listActiveTestimonials,
  listAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  defaultTestimonialsSeed,
};
