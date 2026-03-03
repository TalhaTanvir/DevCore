const mongoose = require("mongoose");
const testimonialService = require("../services/testimonial.service");

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

const getPublicTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.listActiveTestimonials();

    return res.status(200).json({
      success: true,
      data: testimonials,
      count: testimonials.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch testimonials");
  }
};

const getAdminTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.listAllTestimonials();

    return res.status(200).json({
      success: true,
      data: testimonials,
      count: testimonials.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch testimonials");
  }
};

const getAdminTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial id",
      });
    }

    const testimonial = await testimonialService.getTestimonialById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch testimonial");
  }
};

const createAdminTestimonial = async (req, res) => {
  try {
    const createdTestimonial = await testimonialService.createTestimonial(req.body);

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: createdTestimonial,
    });
  } catch (error) {
    return sendError(res, error, "Failed to create testimonial");
  }
};

const updateAdminTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial id",
      });
    }

    const updatedTestimonial = await testimonialService.updateTestimonial(id, req.body);

    if (!updatedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    return sendError(res, error, "Failed to update testimonial");
  }
};

const deleteAdminTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial id",
      });
    }

    const deletedTestimonial = await testimonialService.deleteTestimonial(id);

    if (!deletedTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      data: deletedTestimonial,
    });
  } catch (error) {
    return sendError(res, error, "Failed to delete testimonial");
  }
};

module.exports = {
  getPublicTestimonials,
  getAdminTestimonials,
  getAdminTestimonialById,
  createAdminTestimonial,
  updateAdminTestimonial,
  deleteAdminTestimonial,
};
