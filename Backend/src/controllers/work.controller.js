const mongoose = require("mongoose");
const workService = require("../services/work.service");

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

const getPublicWorkItems = async (req, res) => {
  try {
    const workItems = await workService.listActiveWorkItems();

    return res.status(200).json({
      success: true,
      data: workItems,
      count: workItems.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch work items");
  }
};

const getAdminWorkItems = async (req, res) => {
  try {
    const workItems = await workService.listAllWorkItems();

    return res.status(200).json({
      success: true,
      data: workItems,
      count: workItems.length,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch work items");
  }
};

const getAdminWorkItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work item id",
      });
    }

    const workItem = await workService.getWorkItemById(id);

    if (!workItem) {
      return res.status(404).json({
        success: false,
        message: "Work item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: workItem,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch work item");
  }
};

const createAdminWorkItem = async (req, res) => {
  try {
    const createdWorkItem = await workService.createWorkItem(req.body);

    return res.status(201).json({
      success: true,
      message: "Work item created successfully",
      data: createdWorkItem,
    });
  } catch (error) {
    return sendError(res, error, "Failed to create work item");
  }
};

const updateAdminWorkItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work item id",
      });
    }

    const updatedWorkItem = await workService.updateWorkItem(id, req.body);

    if (!updatedWorkItem) {
      return res.status(404).json({
        success: false,
        message: "Work item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Work item updated successfully",
      data: updatedWorkItem,
    });
  } catch (error) {
    return sendError(res, error, "Failed to update work item");
  }
};

const deleteAdminWorkItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid work item id",
      });
    }

    const deletedWorkItem = await workService.deleteWorkItem(id);

    if (!deletedWorkItem) {
      return res.status(404).json({
        success: false,
        message: "Work item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Work item deleted successfully",
      data: deletedWorkItem,
    });
  } catch (error) {
    return sendError(res, error, "Failed to delete work item");
  }
};

module.exports = {
  getPublicWorkItems,
  getAdminWorkItems,
  getAdminWorkItemById,
  createAdminWorkItem,
  updateAdminWorkItem,
  deleteAdminWorkItem,
};
