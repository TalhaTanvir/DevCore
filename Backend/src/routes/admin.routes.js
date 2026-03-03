const express = require("express");
const adminController = require("../controllers/admin.controller");
const { requireAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);
router.get("/me", requireAdmin, adminController.getAdminProfile);

module.exports = router;
