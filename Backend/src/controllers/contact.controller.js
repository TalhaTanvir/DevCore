const contactService = require("../services/contact.service");

const parseErrorStatus = (error) => {
  if (error.statusCode) {
    return error.statusCode;
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return 400;
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

const sanitizeInterests = (interests) => {
  if (!Array.isArray(interests)) {
    return [];
  }

  return interests
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .slice(0, 15);
};

const createContactInquiry = async (req, res) => {
  try {
    const payload = {
      name: req.body?.name,
      email: req.body?.email,
      phoneNumber: req.body?.phoneNumber,
      need: req.body?.need,
      budget: Number(req.body?.budget),
      interests: sanitizeInterests(req.body?.interests),
    };

    const createdInquiry = await contactService.createInquiry(payload);

    return res.status(201).json({
      success: true,
      message: "Contact inquiry submitted successfully",
      data: {
        id: createdInquiry._id,
        status: createdInquiry.status,
      },
    });
  } catch (error) {
    return sendError(res, error, "Failed to submit contact inquiry");
  }
};

const getAdminInquiries = async (req, res) => {
  try {
    const inquiries = await contactService.listInquiries();

    return res.status(200).json({
      success: true,
      data: inquiries,
      count: inquiries.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch inquiries");
  }
};

module.exports = {
  createContactInquiry,
  getAdminInquiries,
};

