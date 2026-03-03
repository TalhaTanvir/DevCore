const mongoose = require("mongoose");
const faqService = require("../services/faq.service");

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

const getPublicFaqs = async (req, res) => {
  try {
    const faqs = await faqService.listActiveFaqs();

    return res.status(200).json({
      success: true,
      data: faqs,
      count: faqs.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch faqs");
  }
};

const getAdminFaqs = async (req, res) => {
  try {
    const faqs = await faqService.listAllFaqs();

    return res.status(200).json({
      success: true,
      data: faqs,
      count: faqs.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch faqs");
  }
};

const getAdminFaqById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid faq id",
      });
    }

    const faq = await faqService.getFaqById(id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "Faq not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch faq");
  }
};

const createAdminFaq = async (req, res) => {
  try {
    const createdFaq = await faqService.createFaq(req.body);

    return res.status(201).json({
      success: true,
      message: "Faq created successfully",
      data: createdFaq,
    });
  } catch (error) {
    return sendError(res, error, "Failed to create faq");
  }
};

const updateAdminFaq = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid faq id",
      });
    }

    const updatedFaq = await faqService.updateFaq(id, req.body);

    if (!updatedFaq) {
      return res.status(404).json({
        success: false,
        message: "Faq not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Faq updated successfully",
      data: updatedFaq,
    });
  } catch (error) {
    return sendError(res, error, "Failed to update faq");
  }
};

const deleteAdminFaq = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid faq id",
      });
    }

    const deletedFaq = await faqService.deleteFaq(id);

    if (!deletedFaq) {
      return res.status(404).json({
        success: false,
        message: "Faq not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Faq deleted successfully",
      data: deletedFaq,
    });
  } catch (error) {
    return sendError(res, error, "Failed to delete faq");
  }
};

module.exports = {
  getPublicFaqs,
  getAdminFaqs,
  getAdminFaqById,
  createAdminFaq,
  updateAdminFaq,
  deleteAdminFaq,
};
