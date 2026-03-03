const mongoose = require("mongoose");
const { Service } = require("../models/service.model");

const defaultServicesSeed = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end web application development including frontend, backend, APIs, authentication, and deployment.",
    icon: "window",
    order: 1,
  },
  {
    title: "Front-End Development",
    description:
      "Modern, responsive interfaces built with clean component architecture, strong UX, and high performance.",
    icon: "screen",
    order: 2,
  },
  {
    title: "Ecommerce Store Development",
    description:
      "Scalable online stores with product management, secure checkout, payment integration, and conversion-focused UI.",
    icon: "tag",
    order: 3,
  },
  {
    title: "Animation & Motion Design",
    description:
      "Interactive motion for websites and products, from micro-interactions to branded visual storytelling.",
    icon: "spark",
    order: 4,
  },
];

const sortByOrder = (services) => {
  return [...services].sort((a, b) => a.order - b.order);
};

const seedDefaultsIfEmpty = async () => {
  const count = await Service.estimatedDocumentCount();

  if (count === 0) {
    await Service.insertMany(defaultServicesSeed);
  }
};

const listActiveServices = async () => {
  if (mongoose.connection.readyState !== 1) {
    return sortByOrder(defaultServicesSeed);
  }

  await seedDefaultsIfEmpty();

  return Service.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .select("title description icon order")
    .lean();
};

const ensureDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Database is not connected");
    error.statusCode = 503;
    throw error;
  }
};

const listAllServices = async () => {
  ensureDatabaseConnected();

  return Service.find({})
    .sort({ order: 1, createdAt: 1 })
    .lean();
};

const getServiceById = async (serviceId) => {
  ensureDatabaseConnected();

  return Service.findById(serviceId).lean();
};

const createService = async (payload) => {
  ensureDatabaseConnected();

  const createdService = await Service.create(payload);
  return createdService.toObject();
};

const updateService = async (serviceId, payload) => {
  ensureDatabaseConnected();

  return Service.findByIdAndUpdate(serviceId, payload, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteService = async (serviceId) => {
  ensureDatabaseConnected();

  return Service.findByIdAndDelete(serviceId).lean();
};

module.exports = {
  listActiveServices,
  listAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  defaultServicesSeed,
};
