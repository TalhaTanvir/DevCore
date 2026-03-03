const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn("MONGODB_URI is not set. Starting server without database connection.");
    return;
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
