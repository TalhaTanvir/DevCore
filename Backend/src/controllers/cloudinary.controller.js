const { cloudinary, ensureCloudinaryConfigured } = require("../config/cloudinary");

const parseErrorStatus = (error) => {
  if (error.statusCode) {
    return error.statusCode;
  }

  return 500;
};

const sendError = (res, error, fallbackMessage) => {
  const status = parseErrorStatus(error);

  return res.status(status).json({
    success: false,
    message: fallbackMessage,
    error: error.message,
  });
};

const getFolderFromRequest = (req) => {
  const requestedFolder = String(req.body?.folder || "").trim();

  if (!requestedFolder) {
    return "devcore/work";
  }

  return requestedFolder;
};

const signUpload = async (req, res) => {
  try {
    ensureCloudinaryConfigured();

    const timestamp = Math.round(Date.now() / 1000);
    const folder = getFolderFromRequest(req);
    const paramsToSign = { timestamp, folder };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return res.status(200).json({
      success: true,
      data: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        timestamp,
        folder,
        signature,
      },
    });
  } catch (error) {
    return sendError(res, error, "Failed to create upload signature");
  }
};

const deleteAsset = async (req, res) => {
  try {
    ensureCloudinaryConfigured();

    const publicId = String(
      req.body?.publicId || req.query?.publicId || ""
    ).trim();

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "publicId is required",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    return res.status(200).json({
      success: true,
      message: "Asset deletion request completed",
      data: result,
    });
  } catch (error) {
    return sendError(res, error, "Failed to delete Cloudinary asset");
  }
};

module.exports = {
  signUpload,
  deleteAsset,
};
