const serviceService = require("../services/service.service");

const getPublicServices = async (req, res) => {
  try {
    const services = await serviceService.listActiveServices();

    return res.status(200).json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

module.exports = {
  getPublicServices,
};
