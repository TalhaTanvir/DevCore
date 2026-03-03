const mongoose = require("mongoose");
const serviceService = require("../services/service.service");

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

const getPublicServices = async (req, res) => {
  try {
    const services = await serviceService.listActiveServices();

    return res.status(200).json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch services");
  }
};

const getAdminServices = async (req, res) => {
  try {
    const services = await serviceService.listAllServices();

    return res.status(200).json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch services");
  }
};

const getAdminServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service id",
      });
    }

    const service = await serviceService.getServiceById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch service");
  }
};

const createAdminService = async (req, res) => {
  try {
    const createdService = await serviceService.createService(req.body);

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: createdService,
    });
  } catch (error) {
    return sendError(res, error, "Failed to create service");
  }
};

const updateAdminService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service id",
      });
    }

    const updatedService = await serviceService.updateService(id, req.body);

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    return sendError(res, error, "Failed to update service");
  }
};

const deleteAdminService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service id",
      });
    }

    const deletedService = await serviceService.deleteService(id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: deletedService,
    });
  } catch (error) {
    return sendError(res, error, "Failed to delete service");
  }
};

module.exports = {
  getPublicServices,
  getAdminServices,
  getAdminServiceById,
  createAdminService,
  updateAdminService,
  deleteAdminService,
};
