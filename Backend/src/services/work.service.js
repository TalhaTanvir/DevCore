const mongoose = require("mongoose");
const { WorkItem } = require("../models/work.model");

const defaultWorkSeed = [
  {
    key: "fintech-dashboard",
    category: "Fintech",
    title: "Fintech Analytics Platform",
    subtitle:
      "Engineered a real-time finance dashboard with transaction intelligence, automated reporting, and role-based permissions",
    fallback: "#d9dee6",
    image:
      "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80')",
    order: 1,
  },
  {
    key: "ecommerce-store",
    category: "E-Commerce",
    title: "E-Commerce Storefront",
    subtitle:
      "Built a conversion-focused storefront with fast product discovery and a streamlined checkout experience",
    fallback: "#cfd4df",
    image:
      "url('https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80')",
    order: 2,
  },
  {
    key: "mobility-booking-app",
    category: "Mobility",
    title: "Mobility Booking App",
    subtitle: "Developed a mobile-first booking platform with live trip updates and route optimization",
    fallback: "#d6dce6",
    image:
      "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=900&q=80')",
    order: 3,
  },
  {
    key: "real-estate-portal",
    category: "Real Estate",
    title: "Real Estate Portal",
    subtitle:
      "Delivered a property platform with advanced search filters, rich listing pages, and lead capture workflows",
    fallback: "#cbe0e6",
    image:
      "url('https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=900&q=80')",
    order: 4,
  },
  {
    key: "healthcare-patient-system",
    category: "Healthcare",
    title: "Healthcare Patient System",
    subtitle:
      "Built a secure patient portal for appointments, record access, and coordinated care communication",
    fallback: "#dfe2e8",
    image:
      "url('https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80')",
    order: 5,
  },
];

const sortByOrder = (items) => {
  return [...items].sort((a, b) => a.order - b.order);
};

const seedDefaultsIfEmpty = async () => {
  const count = await WorkItem.estimatedDocumentCount();

  if (count === 0) {
    await WorkItem.insertMany(defaultWorkSeed);
  }
};

const listActiveWorkItems = async () => {
  if (mongoose.connection.readyState !== 1) {
    return sortByOrder(defaultWorkSeed);
  }

  await seedDefaultsIfEmpty();

  return WorkItem.find({ isActive: true })
    .sort({ order: 1, createdAt: 1 })
    .select("key category title subtitle fallback image imagePublicId order")
    .lean();
};

const ensureDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Database is not connected");
    error.statusCode = 503;
    throw error;
  }
};

const listAllWorkItems = async () => {
  ensureDatabaseConnected();

  return WorkItem.find({})
    .sort({ order: 1, createdAt: 1 })
    .lean();
};

const getWorkItemById = async (workItemId) => {
  ensureDatabaseConnected();

  return WorkItem.findById(workItemId).lean();
};

const createWorkItem = async (payload) => {
  ensureDatabaseConnected();

  const createdWorkItem = await WorkItem.create(payload);
  return createdWorkItem.toObject();
};

const updateWorkItem = async (workItemId, payload) => {
  ensureDatabaseConnected();

  return WorkItem.findByIdAndUpdate(workItemId, payload, {
    new: true,
    runValidators: true,
  }).lean();
};

const deleteWorkItem = async (workItemId) => {
  ensureDatabaseConnected();

  return WorkItem.findByIdAndDelete(workItemId).lean();
};

module.exports = {
  listActiveWorkItems,
  listAllWorkItems,
  getWorkItemById,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
  defaultWorkSeed,
};
