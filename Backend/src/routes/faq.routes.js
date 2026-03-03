const express = require("express");
const faqController = require("../controllers/faq.controller");
const { requireAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.get("/", faqController.getPublicFaqs);

router.get("/admin", requireAdmin, faqController.getAdminFaqs);
router.get("/admin/:id", requireAdmin, faqController.getAdminFaqById);
router.post("/admin", requireAdmin, faqController.createAdminFaq);
router.put("/admin/:id", requireAdmin, faqController.updateAdminFaq);
router.delete("/admin/:id", requireAdmin, faqController.deleteAdminFaq);

module.exports = router;
