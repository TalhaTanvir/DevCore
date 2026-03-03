const { v2: cloudinary } = require("cloudinary");

const requiredCloudinaryVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const getMissingCloudinaryVars = () =>
  requiredCloudinaryVars.filter((envVar) => !process.env[envVar]);

const ensureCloudinaryConfigured = () => {
  const missing = getMissingCloudinaryVars();

  if (missing.length > 0) {
    const error = new Error(
      `Missing Cloudinary environment variables: ${missing.join(", ")}`
    );
    error.statusCode = 500;
    throw error;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

module.exports = {
  cloudinary,
  ensureCloudinaryConfigured,
};
