const mongoose = require("mongoose");
const { ContactInquiry } = require("../models/contact.model");

const ensureDatabaseConnected = () => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Database is not connected");
    error.statusCode = 503;
    throw error;
  }
};

const createInquiry = async (payload) => {
  ensureDatabaseConnected();

  const createdInquiry = await ContactInquiry.create(payload);
  return createdInquiry.toObject();
};

const listInquiries = async () => {
  ensureDatabaseConnected();

  return ContactInquiry.find({})
    .sort({ createdAt: -1 })
    .lean();
};

module.exports = {
  createInquiry,
  listInquiries,
};

