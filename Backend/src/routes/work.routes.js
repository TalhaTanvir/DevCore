const express = require("express");
const workController = require("../controllers/work.controller");
const { requireAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.get("/", workController.getPublicWorkItems);

router.get("/admin", requireAdmin, workController.getAdminWorkItems);
router.get("/admin/:id", requireAdmin, workController.getAdminWorkItemById);
router.post("/admin", requireAdmin, workController.createAdminWorkItem);
router.put("/admin/:id", requireAdmin, workController.updateAdminWorkItem);
router.delete("/admin/:id", requireAdmin, workController.deleteAdminWorkItem);

module.exports = router;
