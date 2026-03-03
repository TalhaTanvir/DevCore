const express = require("express");
const serviceController = require("../controllers/service.controller");
const { requireAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.get("/", serviceController.getPublicServices);

router.get("/admin", requireAdmin, serviceController.getAdminServices);
router.get("/admin/:id", requireAdmin, serviceController.getAdminServiceById);
router.post("/admin", requireAdmin, serviceController.createAdminService);
router.put("/admin/:id", requireAdmin, serviceController.updateAdminService);
router.delete("/admin/:id", requireAdmin, serviceController.deleteAdminService);

module.exports = router;
