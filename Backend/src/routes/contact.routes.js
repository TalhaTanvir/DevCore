const express = require("express");
const contactController = require("../controllers/contact.controller");
const { requireAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.post("/", contactController.createContactInquiry);
router.get("/admin", requireAdmin, contactController.getAdminInquiries);

module.exports = router;

